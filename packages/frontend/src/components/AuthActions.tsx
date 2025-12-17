import Link from "next/link";
import { Avatar } from "./Avata/page";

type AuthActionsProps = {
  isAuthenticated: boolean;
  avatarUrl?: string;
};

export function AuthActions({ isAuthenticated, avatarUrl }: AuthActionsProps) {
  if (!isAuthenticated) {
    return (
      <div className="flex gap-2">
        <Link href="/login" className="btn btn-ghost">
          Login
        </Link>

        <Link href="/register" className="btn btn-primary">
          Cadastro
        </Link>
      </div>
    );
  }

  return <Avatar imageUrl={avatarUrl} />;
}
