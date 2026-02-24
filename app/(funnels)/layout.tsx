// Funnel layout - No navigation header, minimal footer
// This keeps funnel pages distraction-free for conversions

import "./funnel.css";
import { FunnelFooter } from "@/components/funnel-footer";
import { TrackingScripts } from "@/components/tracking-scripts";

export default function FunnelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <TrackingScripts strategy="lazyOnload" includeHubspot={false} />
      {children}
      <FunnelFooter />
    </>
  );
}
