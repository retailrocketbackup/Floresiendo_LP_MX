// app/api/screening-analytics/route.ts
// API endpoint for receiving and storing screening form analytics
// MVP: Store in JSON files, can be upgraded to database later

import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

// Directory to store analytics data
const ANALYTICS_DIR = path.join(process.cwd(), "data", "analytics");

// Ensure analytics directory exists
async function ensureAnalyticsDir() {
  try {
    await fs.access(ANALYTICS_DIR);
  } catch {
    await fs.mkdir(ANALYTICS_DIR, { recursive: true });
  }
}

// Get analytics file path for a session
function getSessionFilePath(sessionId: string): string {
  // Sanitize session ID to prevent path traversal
  const sanitizedId = sessionId.replace(/[^a-zA-Z0-9_-]/g, "_");
  return path.join(ANALYTICS_DIR, `${sanitizedId}.json`);
}

// Load existing session data or create new
async function loadSessionData(sessionId: string): Promise<any> {
  const filePath = getSessionFilePath(sessionId);
  try {
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data);
  } catch {
    // File doesn't exist, create new session
    return {
      sessionId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      events: [],
      fieldInteractions: [],
      stepAnalytics: [],
      lastActiveStep: 1,
      lastActiveField: null,
      completed: false,
    };
  }
}

// Save session data
async function saveSessionData(sessionId: string, data: any): Promise<void> {
  await ensureAnalyticsDir();
  const filePath = getSessionFilePath(sessionId);
  data.updatedAt = new Date().toISOString();
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sessionId, type, timestamp, data, fieldInteractions, stepAnalytics, lastActiveStep, lastActiveField } = body;

    if (!sessionId) {
      return NextResponse.json(
        { error: "Session ID required" },
        { status: 400 }
      );
    }

    // Load existing session data
    const sessionData = await loadSessionData(sessionId);

    // Handle different event types
    if (type) {
      // Single event (session_start, session_pause, session_resume, session_complete, heartbeat)
      sessionData.events.push({
        type,
        timestamp,
        data,
        receivedAt: new Date().toISOString(),
      });

      // Update session state based on event
      if (type === "session_complete") {
        sessionData.completed = true;
      }

      if (data?.lastActiveStep) {
        sessionData.lastActiveStep = data.lastActiveStep;
      }
      if (data?.lastActiveField) {
        sessionData.lastActiveField = data.lastActiveField;
      }
    }

    // Handle batched field interactions
    if (fieldInteractions && Array.isArray(fieldInteractions)) {
      sessionData.fieldInteractions.push(...fieldInteractions);
    }

    // Handle batched step analytics
    if (stepAnalytics && Array.isArray(stepAnalytics)) {
      sessionData.stepAnalytics.push(...stepAnalytics);
    }

    // Update last active tracking
    if (lastActiveStep !== undefined) {
      sessionData.lastActiveStep = lastActiveStep;
    }
    if (lastActiveField !== undefined) {
      sessionData.lastActiveField = lastActiveField;
    }

    // Save updated session data
    await saveSessionData(sessionId, sessionData);

    // Log in development
    if (process.env.NODE_ENV === "development") {
      console.log("[Analytics API] Received:", {
        sessionId: sessionId.substring(0, 20) + "...",
        type: type || "batch",
        fieldInteractions: fieldInteractions?.length || 0,
        stepAnalytics: stepAnalytics?.length || 0,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[Analytics API] Error:", error);
    return NextResponse.json(
      { error: "Failed to process analytics" },
      { status: 500 }
    );
  }
}

// GET endpoint for admin dashboard
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get("sessionId");

    // If session ID provided, return specific session
    if (sessionId) {
      const sessionData = await loadSessionData(sessionId);
      return NextResponse.json(sessionData);
    }

    // Otherwise, return aggregate stats
    await ensureAnalyticsDir();
    const files = await fs.readdir(ANALYTICS_DIR);
    const sessions = [];

    for (const file of files) {
      if (file.endsWith(".json")) {
        try {
          const data = await fs.readFile(path.join(ANALYTICS_DIR, file), "utf-8");
          const session = JSON.parse(data);
          sessions.push({
            sessionId: session.sessionId,
            createdAt: session.createdAt,
            updatedAt: session.updatedAt,
            completed: session.completed,
            lastActiveStep: session.lastActiveStep,
            lastActiveField: session.lastActiveField,
            fieldInteractionCount: session.fieldInteractions?.length || 0,
            stepCount: session.stepAnalytics?.length || 0,
          });
        } catch {
          // Skip invalid files
        }
      }
    }

    // Calculate aggregate stats
    const totalSessions = sessions.length;
    const completedSessions = sessions.filter((s) => s.completed).length;
    const completionRate = totalSessions > 0 ? (completedSessions / totalSessions) * 100 : 0;

    // Step drop-off analysis
    const stepDropOff: Record<number, number> = {};
    for (const session of sessions) {
      if (!session.completed) {
        const step = session.lastActiveStep || 1;
        stepDropOff[step] = (stepDropOff[step] || 0) + 1;
      }
    }

    return NextResponse.json({
      summary: {
        totalSessions,
        completedSessions,
        abandonedSessions: totalSessions - completedSessions,
        completionRate: Math.round(completionRate * 10) / 10,
        stepDropOff,
      },
      sessions: sessions.slice(-50), // Return last 50 sessions
    });
  } catch (error) {
    console.error("[Analytics API] Error:", error);
    return NextResponse.json(
      { error: "Failed to retrieve analytics" },
      { status: 500 }
    );
  }
}
