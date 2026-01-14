"use client";

import { useEffect, useRef } from "react";
import { trackEvent } from "@/lib/meta-tracking";

interface PaymentSuccessTrackingProps {
  chargeId: string;
  productId: string;
  productName: string;
}

export function PaymentSuccessTracking({
  chargeId,
  productId,
  productName,
}: PaymentSuccessTrackingProps) {
  const hasTracked = useRef(false);

  useEffect(() => {
    if (hasTracked.current) return;
    hasTracked.current = true;

    // Track ViewContent for success page view
    trackEvent(
      "ViewContent",
      {
        funnel: "pago_exitoso",
        content_type: "payment_confirmation",
        content_name: `success_${productId || "unknown"}`,
        value: getProductValue(productId),
        currency: "MXN",
      },
      { enableCAPI: true }
    );

    console.log("💳 PAYMENT SUCCESS: ViewContent tracked", {
      chargeId,
      productId,
      productName,
    });
  }, [chargeId, productId, productName]);

  return null;
}

function getProductValue(productId: string): number {
  const productValues: Record<string, number> = {
    DEPOSIT: 5000,
    TWO_NIGHTS_EARLY: 12000,
    TWO_NIGHTS_REGULAR: 15000,
    THREE_NIGHTS_EARLY: 15000,
    THREE_NIGHTS_REGULAR: 18000,
  };
  return productValues[productId] || 15000;
}
