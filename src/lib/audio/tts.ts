"use client";

/** Browser text-to-speech for Kannada, with graceful fallbacks. */

let voicesCache: SpeechSynthesisVoice[] | null = null;

function loadVoices(): Promise<SpeechSynthesisVoice[]> {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return Promise.resolve([]);
  if (voicesCache?.length) return Promise.resolve(voicesCache);
  return new Promise((resolve) => {
    const got = () => {
      voicesCache = window.speechSynthesis.getVoices();
      resolve(voicesCache);
    };
    const v = window.speechSynthesis.getVoices();
    if (v.length) { voicesCache = v; resolve(v); return; }
    window.speechSynthesis.addEventListener("voiceschanged", got, { once: true });
    setTimeout(got, 1200);
  });
}

export type VoiceKind = "kannada" | "indian" | "default" | "none";

export async function voiceInfo(): Promise<{ kind: VoiceKind; name?: string }> {
  const voices = await loadVoices();
  if (!voices.length) return { kind: "none" };
  const kn = voices.find((v) => v.lang.toLowerCase().startsWith("kn"));
  if (kn) return { kind: "kannada", name: kn.name };
  const indian = voices.find((v) => /-(IN)$/i.test(v.lang) && /^(hi|ta|te|ml|en)/i.test(v.lang));
  if (indian) return { kind: "indian", name: indian.name };
  return { kind: "default", name: voices[0]?.name };
}

export function ttsSupported(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

/**
 * Speak Kannada. Prefers a kn-IN voice reading the Kannada script; otherwise
 * an Indian voice reading the romanisation (which sounds far closer than a
 * US voice attempting Kannada script).
 */
export async function speak(kn: string, roman: string, rate = 0.9): Promise<void> {
  if (!ttsSupported()) return;
  const synth = window.speechSynthesis;
  synth.cancel();
  const voices = await loadVoices();
  const knVoice = voices.find((v) => v.lang.toLowerCase().startsWith("kn"));
  const fallback =
    voices.find((v) => /^hi-IN$/i.test(v.lang)) ??
    voices.find((v) => /^en-IN$/i.test(v.lang)) ??
    voices.find((v) => /-(IN)$/i.test(v.lang));
  const u = new SpeechSynthesisUtterance(knVoice ? kn : roman.replace(/-/g, ""));
  if (knVoice) { u.voice = knVoice; u.lang = knVoice.lang; }
  else if (fallback) { u.voice = fallback; u.lang = fallback.lang; }
  else u.lang = "kn-IN";
  u.rate = rate;
  u.pitch = 1;
  return new Promise((resolve) => {
    u.onend = () => resolve();
    u.onerror = () => resolve();
    synth.speak(u);
  });
}

export function stopSpeaking() {
  if (ttsSupported()) window.speechSynthesis.cancel();
}
