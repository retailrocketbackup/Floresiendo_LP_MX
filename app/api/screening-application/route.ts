// app/api/screening-application/route.ts
import { NextResponse } from "next/server";
import type { ScreeningFormData, RiskLevel } from "@/lib/screening-types";

interface ScreeningSubmission {
  formData: Partial<ScreeningFormData>;
  riskLevel: RiskLevel;
  riskMessages: string[];
  requiresReview: boolean;
}

// Generate a unique application ID
function generateApplicationId(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 8);
  return `FL-${timestamp}-${random}`.toUpperCase();
}

export async function POST(request: Request) {
  try {
    const body: ScreeningSubmission = await request.json();
    const { formData, riskLevel, riskMessages, requiresReview } = body;

    // Validate required data
    if (!formData.basicInfo?.fullName || !formData.basicInfo?.email || !formData.basicInfo?.phone) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Generate application ID
    const applicationId = generateApplicationId();

    // Prepare HubSpot contact data
    const hubspotData = {
      firstname: formData.basicInfo.fullName.split(" ")[0],
      lastname: formData.basicInfo.fullName.split(" ").slice(1).join(" ") || "",
      email: formData.basicInfo.email,
      phone: formData.basicInfo.phone,

      // Custom properties (need to be created in HubSpot first)
      application_id: applicationId,
      screening_status: riskLevel === "green" ? "approved" : riskLevel === "yellow" ? "pending_review" : "rejected",
      risk_level: riskLevel,
      risk_messages: riskMessages.join("; "),

      // Medical flags for review
      has_medication_flags: (
        formData.medications?.hasMaoiInhibitors ||
        formData.medications?.hasSsriAntidepressants ||
        formData.medications?.hasLithium ||
        formData.medications?.hasAntipsychotics
      ) ? "true" : "false",

      has_mental_health_flags: (
        formData.mentalHealth?.hasPsychoticDisorder ||
        formData.mentalHealth?.hasSchizophrenia ||
        formData.mentalHealth?.hasBipolar ||
        formData.mentalHealth?.hasSuicidalIdeation
      ) ? "true" : "false",

      // Source tracking
      funnel_source: "screening_application",
      landing_page: "floresiendo.com/aplicar",

      // Intentions for team context
      why_participate: formData.intentions?.whyParticipate?.substring(0, 500),
      what_to_heal: formData.intentions?.whatToHeal?.substring(0, 500),
      how_found_us: formData.intentions?.howFoundUs,
    };

    // Submit to HubSpot Forms API
    const hubspotPortalId = "50499487";
    const hubspotFormId = "3c9a94a8-ced7-4b41-a287-387f2c2f37a9";

    const hubspotFields = Object.entries(hubspotData)
      .filter(([, value]) => value !== undefined && value !== "")
      .map(([name, value]) => ({ name, value: String(value) }));

    try {
      const hubspotResponse = await fetch(
        `https://api.hsforms.com/submissions/v3/integration/submit/${hubspotPortalId}/${hubspotFormId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fields: hubspotFields,
            context: {
              pageUri: "https://floresiendo.com/aplicar",
              pageName: "Screening Application",
            },
          }),
        }
      );

      if (!hubspotResponse.ok) {
        console.error("[HubSpot] Submission failed:", await hubspotResponse.text());
        // Continue anyway - don't block the user
      }
    } catch (hubspotError) {
      console.error("[HubSpot] Error:", hubspotError);
      // Continue anyway
    }

    // Send notification to team for yellow/red cases
    if (requiresReview || riskLevel === "red") {
      await sendTeamNotification(formData, riskLevel, riskMessages, applicationId);
    }

    // Track event for analytics
    try {
      await fetch(`${getBaseUrl(request)}/api/meta-capi`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventName: "Lead",
          eventData: {
            content_name: "screening_application",
            content_category: "retreat_application",
            value: riskLevel === "green" ? 7100 : 0, // Potential value for approved
            currency: "MXN",
            application_id: applicationId,
            risk_level: riskLevel,
          },
          userData: {
            em: formData.basicInfo.email,
            ph: formData.basicInfo.phone,
            fn: formData.basicInfo.fullName.split(" ")[0],
            ln: formData.basicInfo.fullName.split(" ").slice(1).join(" "),
          },
        }),
      });
    } catch (trackingError) {
      console.error("[Tracking] Error:", trackingError);
    }

    return NextResponse.json({
      success: true,
      applicationId,
      status: riskLevel === "green" ? "approved" : riskLevel === "yellow" ? "pending_review" : "rejected",
      message: riskLevel === "green"
        ? "Tu solicitud ha sido aprobada. Puedes proceder al pago."
        : riskLevel === "yellow"
        ? "Tu solicitud ha sido recibida y será revisada por nuestro equipo."
        : "Tu solicitud no puede ser procesada en este momento.",
    });
  } catch (error) {
    console.error("[Screening API] Error:", error);
    return NextResponse.json(
      { message: "Error processing application", error: String(error) },
      { status: 500 }
    );
  }
}

function getBaseUrl(request: Request): string {
  const url = new URL(request.url);
  return `${url.protocol}//${url.host}`;
}

async function sendTeamNotification(
  formData: Partial<ScreeningFormData>,
  riskLevel: RiskLevel,
  riskMessages: string[],
  applicationId: string
) {
  const riskEmoji = riskLevel === "red" ? "🔴" : "🟡";
  const riskLabel = riskLevel === "red" ? "NO ELEGIBLE" : "REQUIERE REVISIÓN";

  // Log for debugging
  console.log(`[TEAM NOTIFICATION]
    Application: ${applicationId}
    Name: ${formData.basicInfo?.fullName}
    Risk Level: ${riskLevel}
    Flags: ${riskMessages.join(", ")}
    Phone: ${formData.basicInfo?.phone}
    Email: ${formData.basicInfo?.email}
  `);

  // Send email notification via Resend (free tier: 100 emails/day)
  const resendApiKey = process.env.RESEND_API_KEY;

  if (resendApiKey) {
    try {
      const emailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: ${riskLevel === 'red' ? '#dc2626' : '#ca8a04'};">
            ${riskEmoji} Nueva Solicitud - ${riskLabel}
          </h2>

          <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>ID:</strong> ${applicationId}</p>
            <p><strong>Nombre:</strong> ${formData.basicInfo?.fullName}</p>
            <p><strong>Email:</strong> ${formData.basicInfo?.email}</p>
            <p><strong>Teléfono:</strong> ${formData.basicInfo?.phone}</p>
          </div>

          <div style="background: ${riskLevel === 'red' ? '#fef2f2' : '#fefce8'}; padding: 20px; border-radius: 8px; border-left: 4px solid ${riskLevel === 'red' ? '#dc2626' : '#ca8a04'};">
            <h3 style="margin-top: 0;">Banderas Detectadas:</h3>
            <ul>
              ${riskMessages.map(msg => `<li>${msg}</li>`).join('')}
            </ul>
          </div>

          <div style="margin-top: 20px;">
            <a href="https://wa.me/${formData.basicInfo?.phone?.replace(/\D/g, '')}?text=${encodeURIComponent(`Hola ${formData.basicInfo?.fullName?.split(' ')[0]}, soy del equipo Floresiendo. Recibimos tu solicitud (${applicationId}) y nos gustaría conversar contigo sobre algunos detalles.`)}"
               style="display: inline-block; background: #25D366; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold;">
              📱 Contactar por WhatsApp
            </a>
          </div>

          <p style="color: #6b7280; font-size: 12px; margin-top: 30px;">
            Ver contacto completo en <a href="https://app.hubspot.com/contacts/50499487">HubSpot</a>
          </p>
        </div>
      `;

      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Floresiendo <notificaciones@escuelafloresiendomexico.com>',
          to: ['henriquez.alan@gmail.com'],
          subject: `${riskEmoji} ${riskLabel}: ${formData.basicInfo?.fullName} - ${applicationId}`,
          html: emailHtml,
        }),
      });

      console.log('[Notification] Email sent to team');
    } catch (emailError) {
      console.error('[Notification] Email error:', emailError);
    }
  } else {
    console.log('[Notification] RESEND_API_KEY not configured - skipping email notification');
  }
}
