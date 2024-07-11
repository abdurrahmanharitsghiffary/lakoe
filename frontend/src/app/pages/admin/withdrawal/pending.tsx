import { Card } from "@/components/ui/card";
import PageLayout from "../layout/page-layout";
import { WithdrawalTable } from "@/components/tables/withdrawal";

export default function PendingWithdrawalPage() {
  return (
    <PageLayout title="Pending Withdrawal (10)">
      <Card>
        <WithdrawalTable />
      </Card>
    </PageLayout>
  );
}
