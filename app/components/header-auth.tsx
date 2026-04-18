import { getSession } from "@/lib/auth";
import AuthNav from "./auth-nav";

export default async function HeaderAuth() {
  const session = await getSession();
  const user = session ? { username: session.username } : null;
  return <AuthNav user={user} />;
}
