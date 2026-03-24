// app/(funnels)/layout.tsx — Funnel pages with Spanish-only i18n context

import "./funnel.css";
import { FunnelFooter } from "@/components/funnel-footer";
import { TrackingScripts } from "@/components/tracking-scripts";
import type React from "react";
import { NextIntlClientProvider } from "next-intl";
import esMessages from "@/messages/es.json";

export default function FunnelsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <NextIntlClientProvider messages={esMessages} locale="es">
      <TrackingScripts strategy="lazyOnload" includeHubspot={false} />
      {children}
      <FunnelFooter />
    </NextIntlClientProvider>
  );
}
