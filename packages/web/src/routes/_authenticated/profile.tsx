import { Button } from "@/components/ui/button";

import { createFileRoute } from "@tanstack/react-router";

import { useKindeAuth } from "@kinde-oss/kinde-auth-react";

export const Route = createFileRoute("/_authenticated/profile")({
  component: ProfilePage,
});

function ProfilePage() {
  const { logout, user } = useKindeAuth();
  return (
    <div className="flex flex-col gap-y-4 items-center">
      <h1 className="text-4xl font-bold">Hi {user?.given_name}</h1>
      <div className="text-2xl font-bold">{user?.email}</div>
      <Button onClick={() => logout()}>Logout</Button>
    </div>
  );
}
