import { useEffect, useRef } from 'react';

interface GoogleAdProps {
  client: string;
  slot: string;
  format?: string;
  responsive?: boolean;
}

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export const GoogleAd = ({ 
  client, 
  slot, 
}: GoogleAdProps) => {
  const adRequested = useRef(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-${client}`;
    script.async = true;
    script.crossOrigin = "anonymous";
    document.head.appendChild(script);
    if (adRequested.current) return;
    adRequested.current = true;
    try {
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
    } catch (error) {
      console.error("VectorSigma AdSense Error:", (error as Error).message);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block", width: "100%", height: "69px !important" }}
      data-ad-client={client}
      data-ad-slot={slot}
    />
  );
};