# Meta Pixel + CAPI Setup Guide

## 🚀 Implementation Complete!

Your Meta Pixel and Conversions API (CAPI) tracking is now implemented. Here's what was added:

### ✅ What's Working

1. **Meta Pixel** - Installed in `app/layout.tsx` with your pixel ID `307.....946`
2. **Funnel Tracking** - All components now accept `funnel` prop for attribution
3. **Event Tracking** - Automatically tracks:
   - `PageView` (automatic)
   - `ViewContent` (video/testimonial plays)
   - `Lead` (form submissions)
   - `Schedule` (Calendly bookings)
4. **CAPI Integration** - Server-side tracking for iOS 14.5+ recovery

### 📊 Events Being Tracked

| Event | Trigger | Data Sent |
|-------|---------|-----------|
| `PageView` | Page load | Funnel info |
| `ViewContent` | Video play | `content_type: video/testimonial`, funnel |
| `Lead` | HubSpot form submit | `content_type: lead_form`, funnel |
| `Schedule` | Calendly booking | `content_type: appointment`, funnel |

### 🔧 Setup Required

#### 1. Get Your Meta CAPI Access Token

1. Go to [Meta Business Manager](https://business.facebook.com/)
2. Navigate to **Events Manager** → **Your Pixel** → **Settings**
3. Scroll to **Conversions API** section
4. Click **Generate Access Token**
5. Copy the token

#### 2. Configure Environment Variables

Create `.env.local` file:

\`\`\`bash
# Required for CAPI
META_CAPI_ACCESS_TOKEN=your_token_here

# Optional: For testing
META_CAPI_TEST_EVENT_CODE=TEST12345
\`\`\`

#### 3. Deploy to Vercel

Add the environment variable in Vercel dashboard:
- Go to your project settings
- Add `META_CAPI_ACCESS_TOKEN` in Environment Variables

### 🧪 Testing Your Setup

#### Test in Facebook Events Manager

1. Go to **Events Manager** → **Test Events**
2. Enter test event code (if using)
3. Navigate your website:
   - Visit different funnel pages
   - Play videos
   - Submit forms
   - Book appointments

#### What You Should See

**In Browser Console:**
\`\`\`
Pixel event tracked: ViewContent {funnel: "video", content_type: "video"}
CAPI event tracked: ViewContent {...}
\`\`\`

**In Facebook Events Manager:**
- Events appearing in real-time
- Both **Browser** and **Server** sources
- Custom parameters showing funnel data

### 📈 Marketing Benefits

#### Audience Building
- **Custom Audiences**: Retarget video viewers who didn't convert
- **Lookalike Audiences**: Find people similar to your converters
- **Funnel Audiences**: Target by funnel stage

#### Campaign Optimization
- **Funnel Analysis**: See drop-off points between video → form → booking
- **A/B Testing**: Compare video vs testimonials funnel performance
- **Attribution**: Track which funnel drives more bookings

#### Targeting Examples
1. **Retarget Video Viewers**: People who watched video but didn't submit form
2. **Lookalike of Bookers**: Find people similar to those who scheduled calls
3. **Funnel Specific**: Target video funnel visitors vs testimonials funnel

### 🔍 Troubleshooting

#### No Events in Facebook
1. Check browser console for errors
2. Verify environment variables are set
3. Test with Meta Pixel Helper browser extension

#### CAPI Not Working
1. Verify access token is correct
2. Check API route logs in Vercel
3. Ensure proper CORS and headers

#### Data Discrepancies
- Pixel data may be 20-30% lower due to iOS 14.5+ blocking
- CAPI should capture the missing events
- Total events = Pixel + CAPI (with deduplication)

### 📝 Next Steps

1. **Set Environment Variables** (required for CAPI)
2. **Test All Funnel Paths**
3. **Verify Events in Facebook Events Manager**
4. **Create Custom Audiences** based on funnel stages
5. **Set Up Conversion Campaigns** targeting your audiences

Your tracking is now enterprise-grade! 🎯
