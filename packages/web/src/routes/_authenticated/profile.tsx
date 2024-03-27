import { Button } from "@/components/ui/button";

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/profile")({
  component: ProfilePage,
});

function ProfilePage() {
  return (
    <div className="flex flex-col gap-y-4 items-center">
      <h1 className="text-4xl font-bold">Hi</h1>
      <div className="text-2xl font-bold"></div>
      <Button>Logout</Button>
    </div>
  );
}
