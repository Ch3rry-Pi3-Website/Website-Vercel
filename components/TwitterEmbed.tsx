"use client";

import { useEffect } from "react";

type TwitterEmbedProps = {
  html: string;
  className?: string;
};

const twitterScriptId = "twitter-wjs";

export default function TwitterEmbed({ html, className = "" }: TwitterEmbedProps) {
  useEffect(() => {
    const loadEmbeds = () => {
      const twttr = (window as typeof window & {
        twttr?: { widgets?: { load: () => void } };
      }).twttr;
      twttr?.widgets?.load();
    };

    if (document.getElementById(twitterScriptId)) {
      loadEmbeds();
      return;
    }

    const script = document.createElement("script");
    script.id = twitterScriptId;
    script.src = "https://platform.twitter.com/widgets.js";
    script.async = true;
    script.onload = loadEmbeds;
    document.body.appendChild(script);
  }, []);

  return (
    <div className={className} dangerouslySetInnerHTML={{ __html: html }} />
  );
}
