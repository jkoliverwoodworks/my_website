// Recreate the scroll-controlled room journey from the existing project photograph.
// Run: node scripts/render-hero.mjs /absolute/path/to/ffmpeg
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const encoder = process.argv[2] || "ffmpeg";
const projectRoot = fileURLToPath(new URL("../", import.meta.url));
execFileSync(encoder, [
  "-y", "-i", "public/heritage-table.jpg",
  "-vf", "scale=2200:-1,crop=2200:1238,zoompan=z='1.12+0.4*sin(on*PI/191)-0.12*on/191':x='iw/2-iw/zoom/2':y='ih/2-ih/zoom/2':d=192:s=1600x900:fps=24",
  "-frames:v", "192", "-c:v", "libx264", "-preset", "slow", "-crf", "23", "-g", "6", "-keyint_min", "6", "-sc_threshold", "0", "-bf", "0",
  "-pix_fmt", "yuv420p", "-movflags", "+faststart", "-an", "public/woodworks-hero.mp4",
], { cwd: projectRoot, stdio: "inherit" });
