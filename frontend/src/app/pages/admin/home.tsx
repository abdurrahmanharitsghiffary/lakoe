import { BarChart } from "@/components/charts/bar-chart";
import PageLayout from "./layout/page-layout";
import { VisitorChart } from "@/components/charts/visitor-chart";
import { Card } from "@/components/ui/card";
import { LuUsers } from "react-icons/lu";

export function AdminHomePage() {
  return (
    <PageLayout title="Dashboard">
      <div className="flex gap-4 w-full">
        <VisitorChart />
        <BarChart />
      </div>
      <h2 className="text-xl font-bold">Withdrawal</h2>
      <div className="flex gap-4 w-full h-44">
        <Card className="flex-1 flex flex-col p-4 bg-slate-50 rounded-2xl">
          <h3 className="text-base font-semibold flex justify-between items-center">
            Pending Withdrawal
            <span className="flex gap-1 items-center">
              2<LuUsers size={16} />
            </span>
          </h3>
          <p className="text-3xl font-bold">Rp.128.321.00</p>
        </Card>
        <Card className="flex-1 flex flex-col p-4 bg-yellow-300 rounded-2xl">
          <h3 className="text-base font-semibold flex justify-between items-center">
            In Process
            <span className="flex gap-1 items-center">
              6<LuUsers size={16} />
            </span>
          </h3>
          <p className="text-3xl font-bold">Rp.88.321.00</p>
        </Card>
        <Card className="flex-1 flex flex-col p-4 bg-green-300 rounded-2xl">
          <h3 className="text-base font-semibold flex justify-between items-center">
            Success Withdrawal
            <span className="flex gap-1 items-center">
              3<LuUsers size={16} />
            </span>
          </h3>
          <p className="text-3xl font-bold">Rp.21.381.00</p>
        </Card>
        <Card className="flex-1 flex flex-col p-4 bg-red-300 rounded-2xl">
          <h3 className="text-base font-semibold flex justify-between items-center">
            Rejected Withdrawal
            <span className="flex gap-1 items-center">
              4<LuUsers size={16} />
            </span>
          </h3>
          <p className="text-3xl font-bold">Rp.21.888.00</p>
        </Card>
      </div>
    </PageLayout>
  );
}
