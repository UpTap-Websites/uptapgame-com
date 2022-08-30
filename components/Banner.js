import { useEffect } from "react";
import { ADSENSE_ID } from "../lib/constants";

export default function Banner({
  className,
  style,
  slot,
  client = `${ADSENSE_ID}`,
  format,
  responsive,
  layout,
  layoutKey,
}) {
  useEffect(() => {
    try {
      (window.adsbygoogle || []).push({});
    } catch (e) {
      console.error(`Adsense Error: `, e.message);
    }
  }, []);

  return (
    <div className={className ? `banner ${className}` : `banner`}>
      <div className="text-center text-xs">ADVERTISEMENT</div>
      <ins
        className="adsbygoogle"
        style={
          style ? style : { display: `block`, backgroundColor: `#00000015` }
        }
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format={format ? format : `auto`}
        data-full-width-responsive={responsive ? responsive : `true`}
        data-ad-layout={layout}
        data-ad-layout-key={layoutKey}
        // {...(`${process.env.NODE_ENV}` === `development`
        //   ? { "data-adtest": "on" }
        //   : null)}
        data-adtest="on"
      ></ins>
    </div>
  );
}
