"use client";

import dynamic from "next/dynamic";

const Scene = dynamic(() => import("./KannadaScene").then((m) => m.KannadaScene), {
  ssr: false,
  loading: () => <div className="flex h-full w-full items-center justify-center"><span className="kn animate-float text-6xl font-extrabold text-marigold">ಕನ್ನಡ</span></div>,
});

export function Hero3D({ word, className }: { word?: string; className?: string }) {
  return <Scene word={word} className={className} />;
}
