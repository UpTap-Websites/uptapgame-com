import { useEffect } from "react";
import { ADSENSE_ID, MODE } from "../lib/constants";
import Script from "next/script";

const Banner = ({
  className,
  style,
  layout,
  format,
  client = ADSENSE_ID,
  slot,
  responsive,
  layoutKey,
  auto,
}) => {
  // useEffect(() => {
  //   // try {
  //   //   (window.adsbygoogle || []).adsbygoogle.push({});
  //   // } catch (e) {
  //   //   console.error(e.message);
  //   // }
  // }, []);

  const devMode = `${process.env.NODE_ENV}` === `development`;

  return auto ? (
    <div className={`${className ? className : ``}`}>
      <div className="text-center text-xs text-gray-300">ADVERTISEMENT</div>
      <ins
        className={`adsbygoogle`}
        style={
          style
            ? style
            : {
                display: `flex`,
                justifyContent: `center`,
                margin: `0 auto`,
              }
        }
        data-ad-layout={layout}
        data-ad-format={`auto`}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-layout-key={layoutKey}
        data-full-width-responsive={`true`}
        {...(devMode || MODE == "dev" ? { "data-adtest": "on" } : null)}
      />
      <Script
        id={slot}
        dangerouslySetInnerHTML={{
          __html: `
        try {
          (adsbygoogle = window.adsbygoogle || []).push({})
        } catch(e) { console.log(e) }
      `,
        }}
      />
    </div>
  ) : (
    <div
      className={`${
        className ? className : ``
      } AdContainer relative z-0 mx-auto mb-2 flex flex-col items-center overflow-hidden bg-black/5`}
    >
      <div className="text-center text-xs text-gray-300">ADVERTISEMENT</div>
      <ins
        className={`adsbygoogle`}
        style={
          style
            ? style
            : {
                display: `flex`,
                justifyContent: `center`,
                width: `100%`,
                height: `100%`,
              }
        }
        data-ad-layout={layout}
        data-ad-format={format}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-layout-key={layoutKey}
        data-full-width-responsive={responsive}
        {...(devMode || MODE == "dev" ? { "data-adtest": "on" } : null)}
      />
      <Script
        id={Math.random()}
        dangerouslySetInnerHTML={{
          __html: `
          try {
            (adsbygoogle = window.adsbygoogle || []).push({})
          } catch(e) { console.log(e) }
      `,
        }}
      />
    </div>
  );
};

export default Banner;
