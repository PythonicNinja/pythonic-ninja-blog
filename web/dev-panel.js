// tools/dev-panel.js
import { spawn } from "node:child_process";
import os from "node:os";
import process from "node:process";

const DEV_URL = process.env.DEV_URL ?? "http://localhost:4321";
const PREVIEW_URL = process.env.PREVIEW_URL ?? DEV_URL;

function openUrl(url) {
  const platform = os.platform();
  const cmd = platform === "darwin" ? "open" : platform === "win32" ? "cmd" : "xdg-open";
  const args = platform === "win32" ? ["/c", "start", "", url] : [url];
  const child = spawn(cmd, args, { stdio: "ignore", detached: true });
  child.unref();
}

function renderPanel() {
  const width = process.stdout.columns ?? 80;
  const border = "─".repeat(Math.max(30, Math.min(width - 4, 70)));
  const pad = (s = "") => `│ ${s.padEnd(border.length - 2, " ")} │`;
  const nonTty = !process.stdin.isTTY;

  const lines = [
    `╭─ success ${border.slice(8)}╮`,
    pad(),
    pad("Open preview (p)"),
    pad(`• ${PREVIEW_URL}`),
    pad(),
    pad("Quit (q)"),
    `╰${"─".repeat(border.length)}╯`,
  ];

  process.stdout.write("\x1b[2J\x1b[H");
  for (const line of lines) process.stdout.write(line + "\n");
}

function enableKeys() {
  // Try raw mode even if not a TTY - it might work depending on how stdin is piped
  let rawModeSucceeded = false;
  try {
    if (process.stdin.setRawMode) {
      process.stdin.setRawMode(true);
      rawModeSucceeded = true;
    }
  } catch (e) {
    // Raw mode not available, will use line-buffered mode
  }

  process.stdin.resume();
  process.stdin.setEncoding("utf8");

  const handleInput = (data) => {
    const normalized = data.replace(/\r?\n/g, "").toLowerCase();
    for (const ch of normalized) {
      if (ch === "\u0003" || ch === "q") return cleanup();
      if (ch === "p") openUrl(PREVIEW_URL);
    }
    renderPanel();
  };

  process.stdin.on("data", handleInput);
  process.stdout.on("resize", renderPanel);

  const onSignal = () => cleanup();
  process.on("SIGINT", onSignal);
  process.on("SIGTERM", onSignal);

  if (!rawModeSucceeded && !process.stdin.isTTY) {
    console.warn("Stdin is not a TTY; key handling may require Enter.");
  }
}

function cleanup() {
  try { process.stdin.setRawMode(false); } catch {}
  process.stdin.pause();
  process.stdout.write("\n");
  process.exit(0);
}

renderPanel();
enableKeys();
