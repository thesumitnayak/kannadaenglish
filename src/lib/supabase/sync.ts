"use client";

import { useEffect } from "react";
import { useStore } from "@/lib/store";
import { getSupabase, deviceId } from "./client";

/**
 * Debounced cloud sync of the whole learner state. No-op without Supabase env vars.
 * On mount: pull the remote copy if it's newer than local. On change: push (debounced).
 */
export function useCloudSync() {
  useEffect(() => {
    const sb = getSupabase();
    if (!sb) return;
    const id = deviceId();
    let timer: ReturnType<typeof setTimeout> | null = null;
    let lastPushed = 0;

    (async () => {
      const { data } = await sb.from("learner_state").select("state, updated_at").eq("device_id", id).maybeSingle();
      if (data?.state && typeof data.state === "object") {
        const remoteAt = new Date(data.updated_at as string).getTime();
        const localAt = Number(localStorage.getItem("kannada30-synced-at") ?? 0);
        if (remoteAt > localAt) {
          const { hydrated, toasts, ...rest } = data.state as Record<string, unknown>;
          void hydrated; void toasts;
          useStore.setState({ ...(rest as object), hydrated: true, toasts: [] });
          localStorage.setItem("kannada30-synced-at", String(remoteAt));
        }
      }
    })();

    const unsub = useStore.subscribe((s) => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(async () => {
        const now = Date.now();
        if (now - lastPushed < 2000) return;
        lastPushed = now;
        const { hydrated, toasts, ...rest } = s;
        void hydrated; void toasts;
        await sb.from("learner_state").upsert({ device_id: id, name: s.profile.name, state: rest, updated_at: new Date(now).toISOString() });
        localStorage.setItem("kannada30-synced-at", String(now));
      }, 4000);
    });
    return () => { unsub(); if (timer) clearTimeout(timer); };
  }, []);
}
