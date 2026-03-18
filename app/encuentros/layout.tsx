import { NextIntlClientProvider } from "next-intl";
import messages from "@/messages/es.json";

export default function EncuentrosStandaloneLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NextIntlClientProvider locale="es" messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
