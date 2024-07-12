import { Card } from "@/components/ui/card";
import PageLayout from "../layout/page-layout";
import { WithdrawalTable } from "@/components/tables/withdrawal";
import { dummyWithdrawals } from "@/data/dummy-withdrawals";

const pendingWithdrawals = dummyWithdrawals.filter(
  (w) => w.status === "PENDING"
);

export default function PendingWithdrawalPage() {
  return (
    <PageLayout
      title={`Pending Withdrawal${pendingWithdrawals?.length > 1 && "s"} (${
        pendingWithdrawals.length
      })`}
    >
      <Card>
        <WithdrawalTable withdrawals={pendingWithdrawals} />
      </Card>
    </PageLayout>
  );
}
