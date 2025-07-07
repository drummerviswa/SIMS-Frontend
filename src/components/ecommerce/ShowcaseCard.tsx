import React from "react";

type sCardTypes = {
  icon?: React.ReactNode;
  title?: string;
  count?: number;
};

export default function ShowcaseCard({ icon= <span>📊</span>, title="Dashboard Metric", count=0 }: sCardTypes) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6 transition-all duration-200 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-700">
      <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
        {icon}
      </div>

      <div className="flex items-end justify-between mt-5">
        <div>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {title}
          </span>
          <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
            {count.toLocaleString()} {/* Added toLocaleString for number formatting */}
          </h4>
        </div>
      </div>
    </div>
  );
}