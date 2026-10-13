import { redirect } from "next/navigation";
import { AdminDashboard } from "@/components/admin-dashboard";
import { CmsError, requireAdmin } from "@/lib/studio-server";
export default async function Studio() {
  let user;
  try { user = await requireAdmin(); }
  catch (error) {
    if (error instanceof CmsError && error.status === 401) redirect("/studio/login");
    redirect("/studio/login");
  }
  return <AdminDashboard email={user.email} />;
}
