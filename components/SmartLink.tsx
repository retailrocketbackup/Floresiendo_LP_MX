// components/SmartLink.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getFbp, getFbclid } from "@/lib/meta-tracking";

interface SmartLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  passHref?: boolean;
}

export function SmartLink({ href, children, className, passHref = false }: SmartLinkProps) {
  const [finalUrl, setFinalUrl] = useState(href);

  useEffect(() => {
    const fbp = getFbp();
    const fbclid = getFbclid();
    const url = new URL(href, window.location.origin);

    if (fbp) url.searchParams.set('fbp', fbp);
    if (fbclid) url.searchParams.set('fbclid', fbclid);

    setFinalUrl(url.pathname + url.search);
  }, [href]);

  return (
    <Link href={finalUrl} className={className} passHref={passHref}>
      {children}
    </Link>
  );
}