import { Card } from "@/components/ui/card";
import PageLayout from "../layout/page-layout";
import { WithdrawalTable } from "@/components/tables/withdrawal";
import { dummyWithdrawals } from "@/data/dummy-withdrawals";

const onProcessWithdrawals = dummyWithdrawals.filter(
  (w) => w.status === "ON_PROCESS"
);

export default function OnProcessWithdrawalPage() {
  return (
    <PageLayout
      title={`${onProcessWithdrawals.length} Withdrawal${
        onProcessWithdrawals?.length > 1 && "s"
      } in progress`}
    >
      <Card>
        <WithdrawalTable withdrawals={onProcessWithdrawals} />
      </Card>
    </PageLayout>
  );
}
