import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export function Login() {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl font-bold">Welcome to Expense Tracker</h1>
      <p className="text-xl">Please login to continue</p>
      <div className="mt-8 flex flex-col gap-y-4">
        <Button>Login</Button>
        <Button>Register</Button>
      </div>
    </div>
  );
}

const Component = () => {
  const isAuthenticated = true;
  if (!isAuthenticated) {
    return <Login />;
  }
  return <Outlet />;
};

export const Route = createFileRoute("/_authenticated")({
  component: Component,
});
