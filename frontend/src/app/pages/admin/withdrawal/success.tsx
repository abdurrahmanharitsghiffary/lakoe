import { Card } from "@/components/ui/card";
import PageLayout from "../layout/page-layout";
import { WithdrawalTable } from "@/components/tables/withdrawal";
import { dummyWithdrawals } from "@/data/dummy-withdrawals";

const successWithdrawals = dummyWithdrawals.filter(
  (w) => w.status === "SUCCESS"
);

export default function SuccessWithdrawalPage() {
  return (
    <PageLayout
      title={`Success Withdrawal${successWithdrawals?.length > 1 && "s"} (${
        successWithdrawals.length
      })`}
    >
      <Card>
        <WithdrawalTable withdrawals={successWithdrawals} />
      </Card>
    </PageLayout>
  );
}
