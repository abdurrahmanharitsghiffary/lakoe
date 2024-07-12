import { Card } from "@/components/ui/card";
import PageLayout from "../layout/page-layout";
import { WithdrawalTable } from "@/components/tables/withdrawal";
import { dummyWithdrawals } from "@/data/dummy-withdrawals";
import { Helmet } from "react-helmet-async";

const rejectedWithdrawals = dummyWithdrawals.filter(
  (w) => w.status === "REJECTED"
);

export default function RejectedWithdrawalPage() {
  return (
    <PageLayout
      title={`Rejected Withdrawal${rejectedWithdrawals?.length > 1 && "s"} (${
        rejectedWithdrawals.length
      })`}
    >
      <Helmet>
        <title>Rejected Withdrawal</title>
        <meta content="Rejected withdrawal" name="description" />
      </Helmet>
      <Card>
        <WithdrawalTable withdrawals={rejectedWithdrawals} />
      </Card>
    </PageLayout>
  );
}
