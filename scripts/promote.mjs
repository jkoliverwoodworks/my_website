// Moves code/content between the staging and production repositories.
//
//   node scripts/promote.mjs production   staging -> production
//   node scripts/promote.mjs staging      production -> staging
//
// Works from a checkout of either repository and never touches the current
// working tree. Never force-pushes: production -> staging merges, and
// staging -> production refuses unless production's history (including CMS
// commits made on the live studio) is already contained in staging.
import { spawnSync } from "node:child_process";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const STAGING = {
  name: "staging",
  url: process.env.PROMOTE_STAGING_REPO ?? "git@github.com:Moil-Landingpages/jk-oliver-woodworks.git",
  branch: process.env.PROMOTE_STAGING_BRANCH ?? "main",
};
const PRODUCTION = {
  name: "production",
  url: process.env.PROMOTE_PRODUCTION_REPO ?? "git@github.com:jkoliverwoodworks/my_website.git",
  branch: process.env.PROMOTE_PRODUCTION_BRANCH ?? "main",
};

const [target, ...flags] = process.argv.slice(2);
const dryRun = flags.includes("--dry-run");
if (!["production", "staging"].includes(target)) {
  console.error("Usage: node scripts/promote.mjs <production|staging> [--dry-run]");
  console.error("  production  promote staging -> production");
  console.error("  staging     sync production -> staging");
  process.exit(1);
}

function git(args, { cwd, allowFail = false } = {}) {
  const result = spawnSync("git", args, { cwd, encoding: "utf8" });
  if (result.error) throw result.error;
  if (result.status !== 0 && !allowFail) {
    throw new Error(`git ${args.join(" ")} failed:\n${result.stderr || result.stdout}`);
  }
  return { ok: result.status === 0, out: result.stdout.trim() };
}

const trackingRef = (repo) => `refs/promote/${repo.name}`;

function fetchRepo(repo) {
  console.log(`Fetching ${repo.name} (${repo.url} ${repo.branch})`);
  if (!git(["ls-remote", "--exit-code", "--heads", repo.url, repo.branch], { allowFail: true }).ok) {
    if (repo !== PRODUCTION || target !== "production") throw new Error(`${repo.name} has no branch ${repo.branch}.`);
    console.log(`${repo.name} has no ${repo.branch} branch yet; it will be created.`);
    return null;
  }
  git(["fetch", "--quiet", repo.url, `+refs/heads/${repo.branch}:${trackingRef(repo)}`]);
  return git(["rev-parse", trackingRef(repo)]).out;
}

function isAncestor(a, b) {
  return git(["merge-base", "--is-ancestor", a, b], { allowFail: true }).ok;
}

function push(repo, sha) {
  const args = ["push", repo.url, `${sha}:refs/heads/${repo.branch}`];
  if (dryRun) {
    console.log(`[dry run] would run: git ${args.join(" ")}`);
    return;
  }
  git(args);
  console.log(`Pushed ${sha.slice(0, 7)} to ${repo.name}/${repo.branch}`);
}

function summarize(from, to) {
  const log = git(["log", "--oneline", `${to}..${from}`]).out;
  console.log(log ? `Commits to move:\n${log}` : "No new commits.");
  return Boolean(log);
}

const stagingSha = fetchRepo(STAGING);
const productionSha = fetchRepo(PRODUCTION);

if (target === "production") {
  if (!productionSha) {
    push(PRODUCTION, stagingSha);
  } else if (!isAncestor(productionSha, stagingSha)) {
    console.error(
      "Production has commits staging does not (likely live CMS edits).\n" +
      "Run `node scripts/promote.mjs staging` first, review staging, then promote again.",
    );
    process.exit(1);
  } else if (summarize(stagingSha, productionSha)) {
    push(PRODUCTION, stagingSha);
  }
} else {
  if (!summarize(productionSha, stagingSha)) process.exit(0);
  if (isAncestor(stagingSha, productionSha)) {
    push(STAGING, productionSha);
  } else {
    // Both sides moved: merge production into staging in a throwaway worktree.
    const dir = mkdtempSync(join(tmpdir(), "promote-"));
    try {
      git(["worktree", "add", "--quiet", "--detach", dir, stagingSha]);
      const merge = git(
        ["merge", "--no-edit", "-m", `Sync production into staging`, productionSha],
        { cwd: dir, allowFail: true },
      );
      if (!merge.ok) {
        git(["merge", "--abort"], { cwd: dir, allowFail: true });
        console.error("Merge conflict between production and staging; resolve it manually:");
        console.error(`  git checkout ${STAGING.branch} && git pull ${PRODUCTION.url} ${PRODUCTION.branch}`);
        process.exit(1);
      }
      push(STAGING, git(["rev-parse", "HEAD"], { cwd: dir }).out);
    } finally {
      git(["worktree", "remove", "--force", dir], { allowFail: true });
      rmSync(dir, { recursive: true, force: true });
    }
  }
}
