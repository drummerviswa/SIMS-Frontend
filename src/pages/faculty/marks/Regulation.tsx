import RegulationCard from "../../../components/common/RegulationCard";

export default function Regulation() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[34rem] gap-8 px-4 py-8">
      <h1 className="text-2xl sm:text-3xl mb-4 font-semibold text-gray-800 dark:text-gray-25 text-center">
        Select Regulation
      </h1>
      <div className="flex flex-wrap gap-6 justify-center items-center">
        <RegulationCard regName="R2019" />
        <RegulationCard regName="R2023" />
      </div>
    </div>
  );
}
