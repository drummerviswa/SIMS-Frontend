import React, { useEffect, useState } from "react";
import { Link } from "react-router";

export default function RegulationCard({ regName }: { regName: string }) {
  function getRandomHSLColor() {
    let hsl, rgb, luminance;

    do {
      let hue = Math.floor(Math.random() * 360);
      const allowedHueRanges = [
        [0, 40],
        [160, 250],
        [290, 360],
      ];

      const range =
        allowedHueRanges[Math.floor(Math.random() * allowedHueRanges.length)];
      hue = Math.floor(Math.random() * (range[1] - range[0])) + range[0];

      const saturation = 60 + Math.random() * 20;
      const lightness = 55 + Math.random() * 10;

      hsl = { hue, saturation, lightness };
      rgb = hslToRgb(hue, saturation, lightness);
      luminance = getRelativeLuminance(rgb.r, rgb.g, rgb.b);
    } while (luminance > 0.85);

    return `hsl(${hsl.hue}, ${hsl.saturation}%, ${hsl.lightness}%)`;
  }

  function hslToRgb(h, s, l) {
    s /= 100;
    l /= 100;
    const k = (n) => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = (n) =>
      l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    return {
      r: Math.round(f(0) * 255),
      g: Math.round(f(8) * 255),
      b: Math.round(f(4) * 255),
    };
  }

  function getRelativeLuminance(r, g, b) {
    const toLinear = (c) => {
      const channel = c / 255;
      return channel <= 0.03928
        ? channel / 12.92
        : Math.pow((channel + 0.055) / 1.055, 2.4);
    };
    const R = toLinear(r);
    const G = toLinear(g);
    const B = toLinear(b);
    return 0.2126 * R + 0.7152 * G + 0.0722 * B;
  }

  const [bgColor, setBgColor] = useState("#F5F5F5");

  useEffect(() => {
    setBgColor(getRandomHSLColor());
  }, []);

  return (
    <Link to={`/faculty/marks/regulation/${regName}`} className="no-underline">
      <div className="relative group h-32 w-64 sm:h-36 sm:w-72 md:h-40 md:w-80 rounded-2xl bg-gray-300 overflow-hidden p-2 shadow-md hover:shadow-xl transform transition duration-300 ease-in-out">
        <div
          className="absolute top-1/2 left-1/2 h-[200%] w-[200%] -translate-x-1/2 -translate-y-1/2 scale-0 group-hover:scale-100 transition-transform duration-700 ease-out rounded-full z-0"
          style={{ backgroundColor: bgColor }}
        />
        <h1 className="relative z-10 flex items-center justify-center h-full w-full font-bold text-lg sm:text-xl text-black group-hover:text-white transition-all duration-300 ease-in-out">
          {regName}
        </h1>
      </div>
    </Link>
  );
}
