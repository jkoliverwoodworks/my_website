import "server-only";
import { cache } from "react";
import committedContent from "@/content/site.json";
import { siteSchema } from "./studio-git";
import { publicPiece } from "./cms-model";

// Public pages read their deployed snapshot: no visitor requests to GitHub or a database.
const snapshot = siteSchema.parse(committedContent);
export const getDesigns = cache(async () => snapshot.designs
  .filter(row => row.status === "published")
  .sort((a, b) => a.position - b.position || a.slug.localeCompare(b.slug))
  .map(row => publicPiece({ ...row.data, id: row.id, updated_at: row.updated_at })));
export const getSiteContent = cache(async () => snapshot.content.data);
