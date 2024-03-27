import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

import { useKindeAuth } from "@kinde-oss/kinde-auth-react";

export function Login() {
  const { login, register } = useKindeAuth();
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl font-bold">Welcome to Expense Tracker</h1>
      <p className="text-xl">Please login to continue</p>
      <div className="mt-8 flex flex-col gap-y-4">
        <Button onClick={() => login()}>Login</Button>
        <Button onClick={() => register()}>Register</Button>
      </div>
    </div>
  );
}

const Component = () => {
  const { isAuthenticated } = useKindeAuth();
  if (!isAuthenticated) {
    return <Login />;
  }
  return <Outlet />;
};

export const Route = createFileRoute("/_authenticated")({
  component: Component,
});
