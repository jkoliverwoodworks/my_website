import { AdminDashboard } from "@/components/admin-dashboard";
import committed from "@/content/site.json";
import { siteSchema } from "@/lib/studio-git";
export default function StudioPreview() {
  const snapshot = siteSchema.parse(committed);
  return <AdminDashboard email="Read-only design preview" previewSnapshot={{ ...snapshot, designs: snapshot.designs.filter(row => row.status === "published") }} />;
}
