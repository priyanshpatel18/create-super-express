#!/usr/bin/env node

import { log, spinner } from "@clack/prompts";
import { execSync } from "child_process";
import fsExtra from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";
import { addFeatures } from "./utils/addFeatures.js";
import { createBaseProject } from "./utils/createBaseProject.js";
import { cli, promptFeatures } from "./utils/prompts.js";
import { renderTitle } from "./utils/renderTitle.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  renderTitle("create-super-express");
  const s = spinner();

  const { projectName, workspace } = await cli();

  const templatePath = path.join(__dirname, "templates");
  const targetPath = path.resolve(process.cwd(), projectName);

  try {
    // Check if project already exists
    const exists = await fsExtra.pathExists(targetPath);
    if (exists) {
      log.error(`${projectName} already exists!`);
      process.exit(1);
    }

    const { features } = await promptFeatures();

    // Initialize Base Project
    await createBaseProject(targetPath, templatePath, projectName);

    // Add Features
    await addFeatures(targetPath, templatePath, features);

    s.start("Installing dependencies...");
    // Install Dependencies
    if (workspace === "yarn") {
      execSync("yarn", { cwd: targetPath, stdio: "inherit" });
    } else if (workspace === "pnpm") {
      execSync("pnpm install", { cwd: targetPath, stdio: "inherit" });
    } else {
      execSync("npm install", { cwd: targetPath, stdio: "inherit" });
    }

    s.stop("Dependencies installed successfully!");

    log.success(`${projectName} created successfully !!!`);
    log.info(
      `\nNext steps:\n\n  cd ${projectName}\n  ${
        workspace === "yarn"
          ? "yarn dev"
          : workspace === "pnpm"
          ? "pnpm dev"
          : "npm run dev"
      }\n`
    );
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

main();
