import { redirect } from "next/navigation";
import { AdminLogin } from "@/components/admin-login";
import { studioConfigured, requireAdmin } from "@/lib/studio-server";
export default async function Login() {
  let signedIn = false;
  try { await requireAdmin(); signedIn = true; } catch { /* Show password or setup screen. */ }
  if (signedIn) redirect("/studio");
  return <AdminLogin configured={studioConfigured()} />;
}
