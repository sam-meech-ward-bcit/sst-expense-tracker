import { Hono } from "hono";
import { handle } from "hono/aws-lambda";

import { expenses as expensesTable } from "@my-expenses-app/core/db/schema/expenses";
import { db } from "@my-expenses-app/core/db";
import { sum } from "drizzle-orm";

const app = new Hono();

app.get("/expenses/total-amount", async (c) => {
  const result = await db
    .select({ total: sum(expensesTable.amount) })
    .from(expensesTable)
    .then((res) => res[0]);
  return c.json(result);
});

app.get("/expenses", async (c) => {
  const expenses = await db.select().from(expensesTable);
  return c.json({ expenses });
});

app.post("/expenses", async (c) => {
  const body = await c.req.json();
  const expense = body.expense;
  const newExpense = await db.insert(expensesTable).values(expense).returning()
  return c.json({ expenses: newExpense });
});

export const handler = handle(app);
