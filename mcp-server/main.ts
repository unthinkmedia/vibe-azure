#!/usr/bin/env node
/**
 * Entry point for the Coherence Prototyper MCP server.
 *
 * CLI modes:
 *   npx @unthinkmedia/coherence-prototyper-mcp              → start MCP server (stdio)
 *   npx @unthinkmedia/coherence-prototyper-mcp init [dir]   → scaffold a new workspace
 */

export {};

const [subcommand, ...rest] = process.argv.slice(2);

if (subcommand === "init") {
  const targetDir = rest[0] || ".";
  const { initWorkspace } = await import("./init.js");
  await initWorkspace(targetDir);
} else {
  const { StdioServerTransport } = await import(
    "@modelcontextprotocol/sdk/server/stdio.js"
  );
  const { createServer } = await import("./server.js");
  const server = createServer();
  const transport = new StdioServerTransport();
  await server.connect(transport);
}
