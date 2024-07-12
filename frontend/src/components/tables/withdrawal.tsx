import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { WithdrawalStatus } from "@/types";
import { Button } from "../ui/button";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

export type Withdrawal = {
  status: WithdrawalStatus;
  amount: number;
  username: string;
  id: number;
  accName: string;
  accNumber: string;
  bank: string;
};

const withdrawalTagVariants = cva("rounded-sm px-2 py-1 font-semibold", {
  variants: {
    variant: {
      SUCCESS: "bg-green-300",
      PENDING: "bg-green-100",
      ON_PROCESS: "bg-yellow-300",
      REJECTED: "bg-red-300",
    },
  },
});

export function WithdrawalTable({
  withdrawals,
}: {
  withdrawals: Withdrawal[];
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[250px]">Name</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Bank</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {withdrawals.map((witdrawal) => (
          <TableRow key={witdrawal.id}>
            <TableCell className="font-medium">{witdrawal.accName}</TableCell>
            <TableCell>
              <span
                className={cn(
                  withdrawalTagVariants({ variant: witdrawal.status })
                )}
              >
                {witdrawal.status}
              </span>
            </TableCell>
            <TableCell className="font-semibold">{witdrawal.bank}</TableCell>
            <TableCell className="font-semibold">
              Rp.{witdrawal.amount}
            </TableCell>
            <TableCell className="text-right">
              {witdrawal.status === "ON_PROCESS" && (
                <Button className="mr-2" variant="destructive">
                  Reject
                </Button>
              )}
              {witdrawal.status === "PENDING" && (
                <>
                  <Button className="mr-2" variant="destructive">
                    Reject
                  </Button>
                  <Button>Accept</Button>
                </>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={4}>Total</TableCell>
          <TableCell className="text-right">Rp.2.500.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
