import { motion } from "framer-motion";
import { Link } from "react-router";

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

export default function MarkCard({
  acid,
  reg,
  subName,
  subCode,
  type,
  cperiod,
  assess1,
  assess2,
  endsem,
  l,
  t,
  p,
  c,
  batchName,
  semester,
}) {
  const bgColor = getRandomHSLColor();

  return (
    <Link
      to={`/faculty/marks/splitup/${subCode}/${acid}/${batchName}`}
      className="flex justify-center items-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0, animationDuration: "0.5s" }}
        whileHover={{ scale: 1.05, boxShadow: "0 12px 24px rgba(0,0,0,0.3)" }}
        whileTap={{ scale: 0.1, boxShadow: "0 4px 8px rgba(0,0,0,0.2)" }}
        transition={{ type: "tween", stiffness: 250, damping: 18 }}
        style={{ backgroundColor: bgColor }}
        className="grid grid-rows-12 min-h-[150px] min-w-48 max-h-[160px] max-w-[300px] rounded-lg shadow-md p-4 overflow-hidden transition-all duration-300 text-white"
      >
        {/* Top content section */}
        <div className="row-span-9 grid grid-cols-12 gap-2">
          <div className="col-span-10 flex flex-col justify-center items-start">
            <p className="font-semibold text-lg leading-none">{subCode}</p>
            <p className="font-bold text-xl leading-tight">{subName}</p>
            <div className="w-full flex justify-between items-center m-2">
              <p className="text-xs font-medium bg-white/20 px-2 py-0.5 rounded text-white">
                {batchName}
              </p>
              <p className="text-xs font-medium bg-white/20 px-2 py-0.5 rounded text-white">
                Semester {semester}
              </p>
              <p className="text-xs font-medium bg-white/20 px-2 py-0.5 rounded text-white">
                {reg}
              </p>
            </div>
          </div>
          <div className="col-span-2 flex flex-col items-end justify-start font-bold tracking-widest">
            <p className="text-xs leading-tight">LTPC</p>
            <p className="text-sm">
              {l}
              {t}
              {p}
              {c}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="row-span-3 grid grid-cols-4 items-center justify-center font-semibold text-xs">
          <div className="col-span-2 flex flex-col items-start">
            <p className="opacity-80">Type</p>
            <p className="text-sm capitalize">{type}</p>
          </div>
          <div className="col-span-1 flex flex-col items-start">
            <p className="opacity-80">Hours</p>
            <p className="text-sm">{cperiod}</p>
          </div>
          <div className="col-span-1 flex flex-col items-start">
            <p className="opacity-80">Split</p>
            <p className="text-sm">
              {endsem}-{Number(assess1) + Number(assess2)}
            </p>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
