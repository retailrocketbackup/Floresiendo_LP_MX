// Funnel layout - No navigation header, minimal footer
// This keeps funnel pages distraction-free for conversions

import { FunnelFooter } from "@/components/funnel-footer";

export default function FunnelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <FunnelFooter />
    </>
  );
}
