#!/usr/bin/env node
/**
 * Entry point for the Coherence Prototyper MCP server.
 * Supports stdio transport (for Claude Desktop / VS Code)
 * and streamable HTTP transport (for Claude.ai / remote use).
 */

import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { createServer } from "./server.js";

const server = createServer();
const transport = new StdioServerTransport();
await server.connect(transport);
