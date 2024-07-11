import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { WithdrawalStatus } from "@/types";
import { Button } from "../ui/button";

type Withdrawal = {
  status: WithdrawalStatus;
  amount: number;
  username: string;
  id: number;
  accName: string;
  accNumber: string;
  bank: string;
};

const withdrawals: Withdrawal[] = [
  {
    accName: "Jamal Boolean",
    accNumber: "7460081232321212",
    amount: 121431,
    bank: "JAGO",
    id: 1,
    status: "PENDING",
    username: "jamlbool123",
  },
  {
    accName: "Jamal Native",
    accNumber: "7460081232321243",
    amount: 73000,
    bank: "JAGO",
    id: 2,
    status: "SUCCESS",
    username: "jamlntv123",
  },
  {
    accName: "Jamal Native",
    accNumber: "45123456723122",
    amount: 80100,
    bank: "BSI - Syariah",
    id: 3,
    status: "SUCCESS",
    username: "jamlntv1234",
  },
  {
    accName: "Jamal Native",
    accNumber: "4512345678176",
    amount: 120100,
    bank: "BRI",
    id: 4,
    status: "SUCCESS",
    username: "jamlntv1235",
  },
];

export function WithdrawalTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Name</TableHead>
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
            <TableCell>{witdrawal.status}</TableCell>
            <TableCell className="font-semibold">{witdrawal.bank}</TableCell>
            <TableCell>Rp.{witdrawal.amount}</TableCell>
            <TableCell className="text-right">
              <Button className="mr-2" variant="destructive">
                Reject
              </Button>
              <Button>Accept</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={4}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
