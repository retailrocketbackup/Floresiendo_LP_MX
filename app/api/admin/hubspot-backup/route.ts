// app/api/admin/hubspot-backup/route.ts
// API endpoint for reading HubSpot submission backups

import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const HUBSPOT_BACKUP_DIR = path.join(process.cwd(), "data", "hubspot-backup");

interface HubspotBackup {
  applicationId: string;
  hubspotData: {
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    application_id: string;
    screening_status: string;
    risk_level: string;
    has_medication_flags: string;
    has_mental_health_flags: string;
    funnel_source: string;
    landing_page: string;
    how_found_us: string;
    why_participate: string;
    what_to_heal: string;
  };
  riskLevel: string;
  submittedAt: string;
  hubspotPortalId: string;
  hubspotFormId: string;
  backupCreatedAt: string;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const applicationId = searchParams.get("applicationId");

    // If specific application ID requested
    if (applicationId) {
      const filePath = path.join(HUBSPOT_BACKUP_DIR, `${applicationId}.json`);
      try {
        const data = await fs.readFile(filePath, "utf-8");
        return NextResponse.json(JSON.parse(data));
      } catch {
        return NextResponse.json({ error: "Backup not found" }, { status: 404 });
      }
    }

    // Otherwise return all backups
    try {
      await fs.access(HUBSPOT_BACKUP_DIR);
    } catch {
      // Directory doesn't exist yet
      return NextResponse.json({ backups: [], total: 0 });
    }

    const files = await fs.readdir(HUBSPOT_BACKUP_DIR);
    const backups: HubspotBackup[] = [];

    for (const file of files) {
      if (file.endsWith(".json")) {
        try {
          const data = await fs.readFile(path.join(HUBSPOT_BACKUP_DIR, file), "utf-8");
          const backup = JSON.parse(data);
          backups.push({
            applicationId: backup.hubspotData?.application_id || file.replace(".json", ""),
            ...backup,
          });
        } catch {
          // Skip invalid files
        }
      }
    }

    // Sort by submission date (newest first)
    backups.sort((a, b) =>
      new Date(b.submittedAt || b.backupCreatedAt).getTime() -
      new Date(a.submittedAt || a.backupCreatedAt).getTime()
    );

    return NextResponse.json({
      backups,
      total: backups.length,
    });
  } catch (error) {
    console.error("[HubSpot Backup API] Error:", error);
    return NextResponse.json(
      { error: "Failed to retrieve backups" },
      { status: 500 }
    );
  }
}
