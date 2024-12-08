import { Card } from "@/components/ui/card";
import { PageLayout } from "../layout/page-layout";
import { WithdrawalTable } from "@/components/tables/withdrawal";
import { dummyWithdrawals } from "@/data/dummy-withdrawals";
import { Helmet } from "react-helmet-async";

const onProcessWithdrawals = dummyWithdrawals.filter(
  (w) => w.status === "ON_PROCESS"
);

export function OnProcessWithdrawalPage() {
  return (
    <PageLayout
      title={`${onProcessWithdrawals.length} Withdrawal${
        onProcessWithdrawals?.length > 1 && "s"
      } in progress`}
    >
      <Helmet>
        <title>On Process Withdrawal</title>
        <meta content="withdrawal on processed" name="description" />
      </Helmet>
      <Card>
        <WithdrawalTable withdrawals={onProcessWithdrawals} />
      </Card>
    </PageLayout>
  );
}
