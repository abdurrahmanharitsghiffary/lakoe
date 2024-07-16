import { Card } from "@/components/ui/card";
import { PageLayout } from "../layout/page-layout";
import { WithdrawalTable } from "@/components/tables/withdrawal";
import { dummyWithdrawals } from "@/data/dummy-withdrawals";
import { Helmet } from "react-helmet-async";

const pendingWithdrawals = dummyWithdrawals.filter(
  (w) => w.status === "PENDING"
);

export function PendingWithdrawalPage() {
  return (
    <PageLayout
      title={`Pending Withdrawal${pendingWithdrawals?.length > 1 && "s"} (${
        pendingWithdrawals.length
      })`}
    >
      <Helmet>
        <title>Pending Withdrawal</title>
        <meta content="Pending withdrawal" name="description" />
      </Helmet>
      <Card>
        <WithdrawalTable withdrawals={pendingWithdrawals} />
      </Card>
    </PageLayout>
  );
}
