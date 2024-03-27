import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/")({
  component: HomePage,
});

function HomePage() {
  const { getToken } = useKindeAuth();
  async function getTotalExpense() {
    const token = await getToken();
    if (!token) {
      throw new Error("No token found");
    }
    const res = await fetch(
      import.meta.env.VITE_APP_API_URL + "/expenses/total-amount",
      {
        headers: {
          Authorization: token,
        },
      }
    );

    if (!res.ok) {
      throw new Error("Something went wrong");
    }
    return (await res.json()) as { total: number };
  }

  const { isPending, error, data } = useQuery({
    queryKey: ["getTotalSpent"],
    queryFn: getTotalExpense,
  });

  const totalSpent = formatCurrency(data?.total ?? 0);

  return (
    <>
      <Card className="w-fit mx-auto">
        <CardHeader>
          <CardTitle className="text-sm">Total Spent:</CardTitle>
        </CardHeader>
        <CardContent>
          {error ? "An error has occurred: " + error.message : null}
          <div className="text-2xl font-bold">
            {isPending ? "..." : totalSpent}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
