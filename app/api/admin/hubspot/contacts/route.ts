// app/api/admin/hubspot/contacts/route.ts
// Fetch HubSpot contacts to display conversion metrics in Meta Ads dashboard

import { NextRequest, NextResponse } from 'next/server';

const HUBSPOT_API_BASE = 'https://api.hubapi.com';

// Authenticate admin request
function isAuthorized(request: NextRequest): boolean {
  const password = request.nextUrl.searchParams.get('password');
  const headerPassword = request.headers.get('x-admin-password');
  const adminPassword = process.env.ADMIN_PASSWORD;

  // Auto-auth in development
  if (process.env.NODE_ENV === 'development') {
    return true;
  }

  return password === adminPassword || headerPassword === adminPassword;
}

interface HubSpotContact {
  id: string;
  properties: {
    firstname?: string;
    lastname?: string;
    email?: string;
    phone?: string;
    createdate?: string;
    // HubSpot automatic analytics (READ-ONLY, often empty for API-created contacts)
    hs_analytics_source?: string;
    hs_analytics_source_data_1?: string;
    hs_analytics_source_data_2?: string;
    hs_analytics_first_url?: string;
    lifecyclestage?: string;
    // Custom Floresiendo properties for attribution (we set these via API)
    floresiendo_source?: string;      // 'paid_facebook', 'paid_google', 'direct', etc.
    floresiendo_medium?: string;      // 'cpc', 'organic', 'referral', 'none'
    floresiendo_campaign?: string;    // UTM campaign name
    floresiendo_fbclid?: string;      // Facebook click ID
    funnel_source?: string;
    landing_page?: string;
  };
  createdAt: string;
}

interface HubSpotResponse {
  results: HubSpotContact[];
  paging?: {
    next?: {
      after: string;
    };
  };
}

export interface ConversionSummary {
  total: number;
  paid: number;
  organic: number;
  direct: number;
  referral: number;
  email: number;
  social: number;
  unknown: number;
  byFunnel: Record<string, number>;
  byDate: Record<string, { total: number; paid: number; organic: number }>;
  recentContacts: Array<{
    id: string;
    name: string;
    email?: string;
    source: string;
    sourceDetail?: string;
    funnel?: string;
    createdAt: string;
    isPaid: boolean;
  }>;
}

// Categorize traffic source
function categorizeSource(contact: HubSpotContact): {
  category: 'paid' | 'organic' | 'direct' | 'referral' | 'email' | 'social' | 'unknown';
  isPaid: boolean;
  sourceDetail?: string;
} {
  // PRIORITY 1: Check our custom Floresiendo properties (we set these via API)
  const floresSource = contact.properties.floresiendo_source?.toLowerCase() || '';
  const floresMedium = contact.properties.floresiendo_medium?.toLowerCase() || '';
  const floresFbclid = contact.properties.floresiendo_fbclid;
  const floresCampaign = contact.properties.floresiendo_campaign;

  if (floresSource) {
    // Paid Facebook/Instagram
    if (floresSource.includes('paid_facebook') || floresSource === 'facebook' && floresMedium === 'cpc') {
      return {
        category: 'paid',
        isPaid: true,
        sourceDetail: floresCampaign ? `Facebook Ads - ${floresCampaign}` : 'Facebook Ads'
      };
    }

    // Paid Google
    if (floresSource.includes('paid_google') || floresSource === 'google' && floresMedium === 'cpc') {
      return {
        category: 'paid',
        isPaid: true,
        sourceDetail: floresCampaign ? `Google Ads - ${floresCampaign}` : 'Google Ads'
      };
    }

    // Other paid sources
    // IMPORTANT: Only consider 'cpc' medium as paid if the source isn't 'direct'
    // This prevents false positives when medium is 'cpc' but source is 'direct'
    if (floresSource.startsWith('paid_') || (floresMedium === 'cpc' && floresSource !== 'direct')) {
      return {
        category: 'paid',
        isPaid: true,
        sourceDetail: floresCampaign || floresSource.replace('paid_', '')
      };
    }

    // Direct
    if (floresSource === 'direct') {
      return { category: 'direct', isPaid: false };
    }

    // Organic/referral (has UTM source but not paid)
    if (floresSource && floresMedium !== 'cpc') {
      return {
        category: 'referral',
        isPaid: false,
        sourceDetail: floresSource
      };
    }
  }

  // Has fbclid custom property (definite paid Facebook)
  if (floresFbclid) {
    return {
      category: 'paid',
      isPaid: true,
      sourceDetail: floresCampaign ? `Facebook Ads - ${floresCampaign}` : 'Facebook Ads'
    };
  }

  // PRIORITY 2: Fall back to HubSpot's automatic analytics (often empty for API contacts)
  const source = contact.properties.hs_analytics_source?.toLowerCase() || '';
  const sourceData1 = contact.properties.hs_analytics_source_data_1?.toLowerCase() || '';
  const sourceData2 = contact.properties.hs_analytics_source_data_2?.toLowerCase() || '';
  const firstUrl = contact.properties.hs_analytics_first_url?.toLowerCase() || '';

  // Check for paid traffic indicators in URL
  const hasFbclid = firstUrl.includes('fbclid') || sourceData1.includes('fbclid');
  const hasGclid = firstUrl.includes('gclid') || sourceData1.includes('gclid');
  const hasUtmPaid =
    sourceData1.includes('cpc') ||
    sourceData1.includes('paid') ||
    sourceData2.includes('cpc') ||
    sourceData2.includes('paid');

  // Paid social (Facebook/Instagram Ads)
  if (source === 'paid_social' || hasFbclid || (source === 'social' && hasUtmPaid)) {
    return {
      category: 'paid',
      isPaid: true,
      sourceDetail: hasFbclid ? 'Facebook Ads' : 'Paid Social'
    };
  }

  // Paid search (Google Ads)
  if (source === 'paid_search' || hasGclid) {
    return {
      category: 'paid',
      isPaid: true,
      sourceDetail: 'Google Ads'
    };
  }

  // Organic search
  if (source === 'organic_search') {
    return { category: 'organic', isPaid: false, sourceDetail: sourceData1 || 'Search' };
  }

  // Organic social
  if (source === 'organic_social' || source === 'social') {
    return { category: 'social', isPaid: false, sourceDetail: sourceData1 || 'Social' };
  }

  // Direct traffic
  if (source === 'direct' || source === 'direct_traffic') {
    return { category: 'direct', isPaid: false };
  }

  // Referral
  if (source === 'referral' || source === 'referrals') {
    return { category: 'referral', isPaid: false, sourceDetail: sourceData1 };
  }

  // Email
  if (source === 'email' || source === 'email_marketing') {
    return { category: 'email', isPaid: false, sourceDetail: sourceData1 };
  }

  // Unknown/other
  return { category: 'unknown', isPaid: false, sourceDetail: source || undefined };
}

// Extract funnel from URL or property
function extractFunnel(contact: HubSpotContact): string | undefined {
  // Check custom property first
  if (contact.properties.funnel_source) {
    return contact.properties.funnel_source;
  }

  // Extract from first URL
  const firstUrl = contact.properties.hs_analytics_first_url || '';

  // Match common funnel patterns
  const funnelPatterns = [
    /\/f\/([^/?]+)/,           // /f/meditacion-gratis
    /\/funnels?\/([^/?]+)/,    // /funnel/something
    /funnel[_-]?source=([^&]+)/, // ?funnel_source=xxx
  ];

  for (const pattern of funnelPatterns) {
    const match = firstUrl.match(pattern);
    if (match) {
      return match[1];
    }
  }

  return undefined;
}

export async function GET(request: NextRequest) {
  // Check authorization
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const hubspotToken = process.env.HUBSPOT_PRIVATE_APP_TOKEN;

  if (!hubspotToken) {
    // Return mock data if no token is configured
    return NextResponse.json({
      summary: {
        total: 0,
        paid: 0,
        organic: 0,
        direct: 0,
        referral: 0,
        email: 0,
        social: 0,
        unknown: 0,
        byFunnel: {},
        byDate: {},
        recentContacts: [],
      },
      error: 'HUBSPOT_PRIVATE_APP_TOKEN not configured. Add it to .env.local to enable HubSpot integration.',
      configured: false,
    });
  }

  try {
    // Get query parameters
    const searchParams = request.nextUrl.searchParams;
    const limit = parseInt(searchParams.get('limit') || '100', 10);
    const daysBack = parseInt(searchParams.get('days') || '30', 10);

    // Calculate date filter
    const fromDate = new Date();
    fromDate.setDate(fromDate.getDate() - daysBack);
    const fromTimestamp = fromDate.getTime();

    // Properties to fetch
    const properties = [
      'firstname',
      'lastname',
      'email',
      'phone',
      'createdate',
      // HubSpot automatic analytics (often empty for API-created contacts)
      'hs_analytics_source',
      'hs_analytics_source_data_1',
      'hs_analytics_source_data_2',
      'hs_analytics_first_url',
      'lifecyclestage',
      // Custom Floresiendo properties for attribution
      'floresiendo_source',
      'floresiendo_medium',
      'floresiendo_campaign',
      'floresiendo_fbclid',
      'funnel_source',
      'landing_page',
    ].join(',');

    // Fetch contacts from HubSpot
    const url = new URL(`${HUBSPOT_API_BASE}/crm/v3/objects/contacts`);
    url.searchParams.set('limit', String(Math.min(limit, 100)));
    url.searchParams.set('properties', properties);
    url.searchParams.set('sorts', '-createdate'); // Most recent first

    const response = await fetch(url.toString(), {
      headers: {
        'Authorization': `Bearer ${hubspotToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[HubSpot API Error]', response.status, errorText);
      return NextResponse.json(
        { error: `HubSpot API error: ${response.status}`, details: errorText },
        { status: response.status }
      );
    }

    const data: HubSpotResponse = await response.json();

    // Filter contacts by date and build summary
    const summary: ConversionSummary = {
      total: 0,
      paid: 0,
      organic: 0,
      direct: 0,
      referral: 0,
      email: 0,
      social: 0,
      unknown: 0,
      byFunnel: {},
      byDate: {},
      recentContacts: [],
    };

    for (const contact of data.results) {
      const createdAt = new Date(contact.properties.createdate || contact.createdAt);

      // Skip contacts older than the filter
      if (createdAt.getTime() < fromTimestamp) {
        continue;
      }

      summary.total++;

      // Categorize source
      const { category, isPaid, sourceDetail } = categorizeSource(contact);
      summary[category]++;

      // Track by funnel
      const funnel = extractFunnel(contact);
      if (funnel) {
        summary.byFunnel[funnel] = (summary.byFunnel[funnel] || 0) + 1;
      }

      // Track by date
      const dateKey = createdAt.toISOString().split('T')[0];
      if (!summary.byDate[dateKey]) {
        summary.byDate[dateKey] = { total: 0, paid: 0, organic: 0 };
      }
      summary.byDate[dateKey].total++;
      if (isPaid) {
        summary.byDate[dateKey].paid++;
      } else {
        summary.byDate[dateKey].organic++;
      }

      // Add to recent contacts (limit to 10)
      if (summary.recentContacts.length < 10) {
        const firstName = contact.properties.firstname || '';
        const lastName = contact.properties.lastname || '';

        summary.recentContacts.push({
          id: contact.id,
          name: `${firstName} ${lastName}`.trim() || 'Sin nombre',
          email: contact.properties.email,
          source: category,
          sourceDetail,
          funnel,
          createdAt: createdAt.toISOString(),
          isPaid,
        });
      }
    }

    return NextResponse.json({
      summary,
      configured: true,
      fetchedAt: new Date().toISOString(),
    });

  } catch (error) {
    console.error('[HubSpot Contacts Error]', error);
    return NextResponse.json(
      { error: 'Failed to fetch HubSpot contacts', details: String(error) },
      { status: 500 }
    );
  }
}
