import FirstChart from "@/components/dashboard/charts/FirstChart";
import SecondChart from "@/components/dashboard/charts/second-chart";

export default async function Dashboard() {
  return (
    <div className="space-y-4">
      <FirstChart />
      <SecondChart />
    </div>
  );
}
