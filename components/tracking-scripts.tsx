import Script from "next/script";

interface TrackingScriptsProps {
  strategy: "afterInteractive" | "lazyOnload";
  includeHubspot?: boolean;
}

export function TrackingScripts({ strategy, includeHubspot = true }: TrackingScriptsProps) {
  return (
    <>
      {/* Preconnects — only useful when scripts load early */}
      {strategy === "afterInteractive" && (
        <>
          <link rel="preconnect" href="https://connect.facebook.net" />
          <link rel="preconnect" href="https://www.googletagmanager.com" />
        </>
      )}

      {/* -- Píxel de Meta -- */}
      <Script id="meta-pixel" strategy={strategy}>
        {`
          !function (f, b, e, v, n, t, s) {
            if (f.fbq) return;
            n = f.fbq = function () {
              n.callMethod ?
                n.callMethod.apply(n, arguments) : n.queue.push(arguments)
            };
            if (!f._fbq) f._fbq = n;
            n.push = n;
            n.loaded = !0;
            n.version = '2.0';
            n.queue = [];
            t = b.createElement(e);
            t.async = !0;
            t.src = v;
            s = b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t, s)
          }(window, document, 'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${process.env.NEXT_PUBLIC_META_PIXEL_ID}');
            fbq('track', 'PageView');
          `}
      </Script>

      {/* -- Google Analytics 4 + Google Ads -- */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID}`}
        strategy={strategy}
      />
      <Script id="google-analytics" strategy={strategy}>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID}');
          gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ADS_ID}');
        `}
      </Script>

      {/* -- HubSpot/Hotjar — only on site pages, not funnels -- */}
      {includeHubspot && (
        <Script id="hubspot-tracking" strategy="lazyOnload">
          {`
            (function(h,u,b,s,p,o,t){
              h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
              h._hjSettings={hjid:6538146,hjsv:6};
              o=u.createElement(b);o.async=1;
              o.src=s+h._hjSettings.hjid+t+h._hjSettings.hjsv;
              p=u.getElementsByTagName(b)[0];
              p.parentNode.insertBefore(o,p);
            })(window,document,'script','https://static.hotjar.com/c/hotjar-','.js?sv=');

            var _hsq = _hsq || [];
            _hsq.push(['setPortalId', 50499487]);
            (function(d,s,i,r) {
              if (d.getElementById(i)){return;}
              var n = d.createElement(s),e = d.getElementsByTagName(s)[0];
              n.id=i;n.src='//js.hs-analytics.net/analytics/'+(Math.ceil(new Date()/r)*r)+'/50499487.js';
              e.parentNode.insertBefore(n, e);
            })(document, "script", "hs-analytics", 300000);
          `}
        </Script>
      )}
    </>
  );
}
