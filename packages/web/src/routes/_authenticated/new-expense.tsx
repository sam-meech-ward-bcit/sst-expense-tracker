import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { Calendar } from "@/components/ui/calendar";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

import { useNavigate } from "@tanstack/react-router";

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/new-expense")({
  component: NewExpensePage,
});

type Expense = {
  title: string;
  amount: string;
  date: string;
};

function NewExpensePage() {
  const navigate = useNavigate({ from: "/new-expense" });

  const mutation = useMutation({
    mutationFn: async ({ data }: { data: Expense }) => {
      const res = await fetch(import.meta.env.VITE_APP_API_URL + "/expenses", {
        method: "POST",
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("An error occurred while creating the expense");
      }
      const json = await res.json();
      return json.expense;
    },
  });

  const form = useForm({
    defaultValues: {
      title: "",
      amount: "",
      date: new Date(),
      image: undefined as undefined | File,
    },
    onSubmit: async ({ value }) => {
      const data = {
        amount: value.amount,
        title: value.title,
        date: value.date.toISOString().split("T")[0],
      };
      await mutation.mutateAsync({ data });
      console.log("done");
      navigate({ to: "/all-expenses" });
    },
    validatorAdapter: zodValidator,
  });

  return (
    <>
      <h1 className="text-2xl">New Expense</h1>
      {mutation.isError && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error!</AlertTitle>
          <AlertDescription>{mutation.error.message}</AlertDescription>
        </Alert>
      )}
      <form.Provider>
        <form
          className="flex flex-col gap-y-10"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            void form.handleSubmit();
          }}
        >
          <div>
            <form.Field
              name="title"
              children={(field) => (
                <Label>
                  Title
                  <Input
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {field.state.meta.errors && (
                    <em role="alert">{field.state.meta.errors.join(", ")}</em>
                  )}
                </Label>
              )}
            />
          </div>
          <div>
            <form.Field
              name="amount"
              children={(field) => (
                <Label>
                  Amount
                  <Input
                    type="number"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {field.state.meta.errors && (
                    <em role="alert">{field.state.meta.errors.join(", ")}</em>
                  )}
                </Label>
              )}
            />
          </div>

          <div className="self-center">
            <form.Field
              name="date"
              children={(field) => (
                <Calendar
                  mode="single"
                  selected={field.state.value}
                  onSelect={(date) => field.handleChange(date || new Date())}
                  className="rounded-md border"
                />
              )}
            />
          </div>

          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <Button type="submit" disabled={!canSubmit || isSubmitting}>
                {isSubmitting ? "..." : "Submit"}
              </Button>
            )}
          ></form.Subscribe>
        </form>
      </form.Provider>
    </>
  );
}
