"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

function getVisitorId() {
  const storageKey = "livora_visitor_id";
  const storedValue = window.localStorage.getItem(storageKey);

  if (storedValue) {
    return storedValue;
  }

  const visitorId = window.crypto.randomUUID();
  window.localStorage.setItem(storageKey, visitorId);

  return visitorId;
}

export default function TrafficLogger() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) {
      return;
    }

    const visitorId = getVisitorId();
    const payload = JSON.stringify({ visitorId, path: pathname });
    const endpoint = "/api/traffic";

    if (navigator.sendBeacon) {
      const blob = new Blob([payload], { type: "application/json" });
      navigator.sendBeacon(endpoint, blob);
      return;
    }

    void fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: payload,
      keepalive: true,
    });
  }, [pathname]);

  return null;
}
