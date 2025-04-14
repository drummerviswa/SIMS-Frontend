import { Link, useParams } from "react-router";

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

export default function WeightageCard({ data }) {
  const bgColor = getRandomHSLColor();
  const { subCode, batchName, tenure } = useParams();
  const msid = 6;
  return (
    <Link
      to={`/faculty/marks/upload/${subCode}/${batchName}/${tenure}/${msid}`}
    >
      <div
        style={{ backgroundColor: bgColor }}
        className="w-[320px] rounded-lg flex flex-col justify-center hover:shadow-lg hover:scale-105 duration-700 min-h-[180px] dark:text-white items-start relative group"
      >
        <div className="m-5">
          <div className="mt-4 text-left w-full mb-3">
            <h2 className="text-2xl roboto-mono-500 text-gray-25 dark:text-white">
              {data.criteriaName} - <span>{data.mainWeightage} marks</span>
            </h2>

            {/* Weightage */}
            <p className="text-gray-50 dark:text-gray-25 text-sm">
              Overall contribution:{" "}
              {(Number(data.mainWeightage) / Number(data.assess1)) * 100}%
            </p>

            {/* SubSplitups */}
            <div className="flex flex-col gap-2 mt-2">
              {data.subsplitups.map((item, index) =>
                item.subsplitid !== null ? (
                  <div className="flex items-center gap-2" key={index}>
                    <input
                      type="checkbox"
                      className="accent-blue-500"
                      disabled
                    />
                    <label className="text-gray-25 dark:text-gray-300">
                      {item.subCriteria} - {Number(item.subWeightage)}marks -{" "}
                      {(Number(item.subWeightage) /
                        Number(data.mainWeightage)) *
                        100}
                      %
                    </label>
                  </div>
                ) : (
                  <div className="flex items-center gap-2" key={index}>
                    <h1 className="text-gray-25">No splitups</h1>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
