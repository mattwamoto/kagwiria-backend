#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const projectRoot = path.resolve(__dirname, "..");
const localNextBinary = `${projectRoot}/node_modules/.bin/next`;

function listRunningNextProcesses() {
  let procEntries = [];

  try {
    procEntries = fs.readdirSync("/proc", { withFileTypes: true });
  } catch (_) {
    return [];
  }

  return procEntries
    .filter((entry) => entry.isDirectory() && /^\d+$/.test(entry.name))
    .map((entry) => Number(entry.name))
    .filter((pid) => Number.isFinite(pid) && pid !== process.pid)
    .map((pid) => {
      const cmdlinePath = `/proc/${pid}/cmdline`;
      try {
        const cmdline = fs.readFileSync(cmdlinePath, "utf8");
        const parts = cmdline.split("\u0000").filter(Boolean);
        if (!parts.length) return null;

        return { pid, args: parts.join(" ") };
      } catch (_) {
        return null;
      }
    })
    .filter(Boolean)
    .filter((processInfo) => processInfo.args.includes(localNextBinary));
}

const conflicts = listRunningNextProcesses();

if (conflicts.length > 0) {
  console.error("");
  console.error("Cannot run `npm run build` while Next.js is already running for this app.");
  console.error("This can create stale chunk/manifest paths and cause blank pages.");
  console.error("");
  console.error("Running processes:");
  conflicts.forEach((processInfo) => {
    console.error(`- PID ${processInfo.pid}: ${processInfo.args}`);
  });
  console.error("");
  console.error("Stop those processes first, then rebuild:");
  console.error(`pkill -f "${localNextBinary}"`);
  console.error("npm run build:clean");
  console.error("");
  process.exit(1);
}
