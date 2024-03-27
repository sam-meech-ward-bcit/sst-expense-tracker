import { Hono } from "hono";
import { handle } from "hono/aws-lambda";

import { expenses as expensesTable } from "@my-expenses-app/core/db/schema/expenses";
import { db } from "@my-expenses-app/core/db";
import { sum, eq, desc } from "drizzle-orm";

import { authMiddleware } from "@my-expenses-app/core/auth";

const app = new Hono();

app.get("/expenses/total-amount", authMiddleware, async (c) => {
  const userId = c.var.userId;

  console.log(userId);
  const result = await db
    .select({ total: sum(expensesTable.amount) })
    .from(expensesTable)
    .where(eq(expensesTable.userId, userId))
    .then((res) => res[0]);
  return c.json(result);
});

app.get("/expenses", authMiddleware, async (c) => {
  const userId = c.var.userId;
  const expenses = await db
    .select()
    .from(expensesTable)
    .where(eq(expensesTable.userId, userId))
    .orderBy(desc(expensesTable.date));
  return c.json({ expenses });
});

app.post("/expenses", authMiddleware, async (c) => {
  const userId = c.var.userId;
  const body = await c.req.json();
  const expense = {
    ...body.expense,
    userId,
  };
  const newExpense = await db.insert(expensesTable).values(expense).returning();
  return c.json({ expenses: newExpense });
});

export const handler = handle(app);
