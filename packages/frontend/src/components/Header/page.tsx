"use client";

import { AuthActions } from "@/components/AuthActions";
import { useEffect, useState } from "react";

type User = {
  avatar: string;
};

export default function HeardPage() {
  const [user, setUser] = useState<User | null>(null);
  const isAuthenticated = !!user;

  useEffect(() => {
    async function fetchUser() {
      const res = await fetch("/api/user", { credentials: "include" });

      if (res.ok) {
        const data = await res.json();
        setUser(data);
      }
    }

    fetchUser();
  }, []);

  return (
    <main>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">daisyUI</a>
        </div>

        <div className="flex gap-3 items-center">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-24 md:w-auto"
          />

          <AuthActions
            isAuthenticated={isAuthenticated}
            avatarUrl={user?.avatar}
          />
        </div>
      </div>
    </main>
  );
}
