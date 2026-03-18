// Funnel layout - No navigation header, minimal footer
// This keeps funnel pages distraction-free for conversions

import "./funnel.css";
import { FunnelFooter } from "@/components/funnel-footer";
import { TrackingScripts } from "@/components/tracking-scripts";
import { NextIntlClientProvider } from "next-intl";
import messages from "@/messages/es.json";

export default function FunnelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NextIntlClientProvider locale="es" messages={messages}>
      <TrackingScripts strategy="lazyOnload" includeHubspot={false} />
      {children}
      <FunnelFooter />
    </NextIntlClientProvider>
  );
}
