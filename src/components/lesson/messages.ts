import type { Bilingual } from "@/content/types";

export const PRAISE: Bilingual[] = [
  { en: "Nice! You're getting this.", hi: "बढ़िया! आप समझ रहे हैं।" },
  { en: "Your Kannada is improving.", hi: "आपकी कन्नड़ बेहतर हो रही है।" },
  { en: "Sakkath! 🔥", hi: "Sakkath! 🔥" },
  { en: "Correct! Bengaluru would be proud.", hi: "सही! बेंगलुरु को गर्व होगा।" },
  { en: "You're starting to sound like a Bengaluru local 😎", hi: "आप बेंगलुरु लोकल जैसे लगने लगे हैं 😎" },
  { en: "Perfect. Keep the rhythm going.", hi: "बिल्कुल सही। ऐसे ही चलते रहिए।" },
  { en: "Super! That one's sticking.", hi: "सुपर! यह याद हो रहा है।" },
];

export const ALMOST: Bilingual[] = [
  { en: "Almost! 😊", hi: "लगभग! 😊" },
  { en: "So close! 😊", hi: "बहुत करीब! 😊" },
  { en: "Almost there! 😊", hi: "बस थोड़ा सा! 😊" },
];

export const pick = <T,>(a: T[]) => a[Math.floor(Math.random() * a.length)];
