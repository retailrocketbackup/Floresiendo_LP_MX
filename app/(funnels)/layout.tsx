// Funnel layout - No navigation header, just footer
// This keeps funnel pages distraction-free for conversions

import { Footer } from "@/components/footer";

export default function FunnelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <Footer />
    </>
  );
}
