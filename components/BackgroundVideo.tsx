"use client";

import { useEffect, useRef } from "react";

export default function BackgroundVideo({
  src,
  poster,
  objectPosition = "50% 50%",
  className = "",
}: {
  src: string;
  poster?: string;
  objectPosition?: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    // Some mobile browsers ignore the JSX `muted` attribute on first paint —
    // setting it imperatively (and re-calling play()) guarantees autoplay
    // without a tap-to-play prompt on iOS/Android.
    v.muted = true;
    v.defaultMuted = true;
    const tryPlay = () => v.play().catch(() => {});
    tryPlay();
    document.addEventListener("visibilitychange", tryPlay);
    return () => document.removeEventListener("visibilitychange", tryPlay);
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      // @ts-expect-error legacy iOS attribute, not in React's video typings
      webkit-playsinline="true"
      preload="auto"
      disablePictureInPicture
      className={className}
      style={{ objectPosition, transform: "scale(1.03)" }}
    />
  );
}
