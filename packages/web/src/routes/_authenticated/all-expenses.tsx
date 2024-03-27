import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

import { formatCurrency } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";

import { createFileRoute } from "@tanstack/react-router";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";

export const Route = createFileRoute("/_authenticated/all-expenses")({
  component: AllExpenses,
});

type Expense = {
  id: number;
  title: string;
  amount: number;
  date: string;
  imageUrl?: string;
};

function AllExpenses() {
  const { getToken } = useKindeAuth();

  async function getAllExpenses() {
    const token = await getToken();
    if (!token) {
      throw new Error("No token found");
    }
    const res = await fetch(import.meta.env.VITE_APP_API_URL + "/expenses", {
      headers: {
        Authorization: token,
      },
    });
    if (!res.ok) {
      throw new Error("Something went wrong");
    }
    return (await res.json()) as { expenses: Expense[] };
  }

  const { isPending, error, data } = useQuery({
    queryKey: ["getAllExpenses"],
    queryFn: getAllExpenses,
  });

  console.log(data);

  return (
    <>
      <h1 className="text-2xl">All Expenses</h1>
      {error ? (
        "An error has occurred: " + error.message
      ) : (
        <Table>
          <TableCaption>A list of your recent expenses.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Invoice</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isPending ? (
              <TableRow>
                <TableCell className="font-medium">
                  <Skeleton className="h-4 w-full"></Skeleton>
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-full"></Skeleton>
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-full"></Skeleton>
                </TableCell>
                <TableCell className="text-right">
                  <Skeleton className="h-4 w-full"></Skeleton>
                </TableCell>
              </TableRow>
            ) : (
              data.expenses.map((expense) => (
                <TableRow key={expense.id}>
                  <TableCell className="font-medium">{expense.title}</TableCell>
                  <TableCell>{expense.date.split("T")[0]}</TableCell>
                  <TableCell>
                    {expense.imageUrl && <img className="max-w-12" src={expense.imageUrl} />}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(expense.amount)}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      )}
    </>
  );
}
