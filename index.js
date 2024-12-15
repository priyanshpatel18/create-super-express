#!/usr/bin/env node

import { execSync } from "child_process";
import fsExtra from "fs-extra";
import inquirer from "inquirer";
import * as emoji from "node-emoji";
import path from "path";
import { fileURLToPath } from "url";
import yargs from "yargs";

const { copySync } = fsExtra;

// Convert import.meta.url to a file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Parse command-line arguments
const argv = yargs(process.argv.slice(2)).option("yes", {
  alias: "y",
  type: "boolean",
  description: "Use default environment settings",
  default: false,
}).argv;

(async () => {
  console.log(
    `${emoji.get("star")} Welcome to ${emoji.get(
      "rocket"
    )} Create-Super-Express!`
  );
  console.log(`${emoji.get("sparkles")} Let's build a scalable Express app!`);

  const projectNameArg = argv._[0];

  // Check if pnpm is installed
  try {
    execSync("pnpm --version", { stdio: "ignore" });
  } catch (error) {
    console.error(
      `${emoji.get(
        "x"
      )} Error: pnpm is not installed. Please install pnpm and try again.`
    );
    process.exit(1);
  }

  // If no project name is passed, prompt the user
  const answers = projectNameArg
    ? { projectName: projectNameArg }
    : await inquirer.prompt([
        {
          type: "input",
          name: "projectName",
          message: `${emoji.get(
            "bulb"
          )} What would you like to name your project?`,
          default: "my-express-app",
          validate: (input) => {
            if (!input.trim()) {
              return "Project name cannot be empty!";
            }
            return true;
          },
        },
      ]);

  const projectDir = answers.projectName;
  const templatePath = path.join(__dirname, "template");
  const targetPath = path.resolve(process.cwd(), projectDir);

  // Define default environment variables
  const defaultEnvVars = {
    PORT: "5000",
    ORIGIN: "*",
    NODE_ENV: "development",
    SECRET_KEY: "mysecretkey",
    DATABASE_URL:
      "postgresql://postgres:postgres@localhost:5432/mydb?schema=public",
  };

  // If the -y flag is provided, use default environment variables
  let envVars;
  if (argv.yes) {
    console.log(`${emoji.get("lock")} Using default environment settings.`);
    envVars = defaultEnvVars;
  } else {
    // Prompt for environment variables
    envVars = await inquirer.prompt([
      {
        type: "input",
        name: "PORT",
        message: `${emoji.get(
          "gear"
        )} Enter the port for your application (default: 5000):`,
        default: defaultEnvVars.PORT,
        validate: (input) => {
          const port = parseInt(input, 10);
          if (isNaN(port) || port <= 0 || port > 65535) {
            return "Please enter a valid port number (1-65535)";
          }
          return true;
        },
      },
      {
        type: "input",
        name: "ORIGIN",
        message: `${emoji.get(
          "gear"
        )} Enter the allowed origin for CORS (default: *):`,
        default: defaultEnvVars.ORIGIN,
      },
      {
        type: "input",
        name: "NODE_ENV",
        message: `${emoji.get(
          "gear"
        )} Enter the environment (development/production):`,
        default: defaultEnvVars.NODE_ENV,
      },
      {
        type: "input",
        name: "SECRET_KEY",
        message: `${emoji.get(
          "lock"
        )} Enter a secret key for your application:`,
        default: defaultEnvVars.SECRET_KEY,
      },
      {
        type: "input",
        name: "DATABASE_URL",
        message: `${emoji.get("package")} Enter the database connection URL:`,
        default: defaultEnvVars.DATABASE_URL,
      },
    ]);
  }

  const { PORT, ORIGIN, NODE_ENV, SECRET_KEY, DATABASE_URL } = envVars;

  // Create the .env file content
  const envContent = `
PORT=${PORT}
ORIGIN=${ORIGIN}
NODE_ENV=${NODE_ENV}
SECRET_KEY=${SECRET_KEY}
DATABASE_URL=${DATABASE_URL}
`;

  try {
    console.log(
      `${emoji.get(
        "hourglass_flowing_sand"
      )} Initializing your Express application...`
    );

    // Check if the target directory already exists
    if (fsExtra.existsSync(targetPath)) {
      console.error(
        `${emoji.get("x")} Error: Directory "${projectDir}" already exists.`
      );
      process.exit(1);
    }

    console.log(
      `${emoji.get("file_folder")} Creating project at ${targetPath}`
    );
    // Copy the template files
    copySync(templatePath, targetPath);

    // Write the .env file with user-provided environment variables
    const envFilePath = path.join(targetPath, ".env");
    fsExtra.writeFileSync(envFilePath, envContent.trim());

    console.log(
      `${emoji.get("file_folder")} .env file created at ${envFilePath}`
    );

    console.log(`${emoji.get("gear")} Installing dependencies...`);
    // Install dependencies in the new project
    execSync("pnpm install", { cwd: targetPath, stdio: "inherit" });

    console.log(
      `\n${emoji.get(
        "tada"
      )} Success! Your Express app is ready at "${projectDir}"`
    );
    console.log(`\n${emoji.get("arrow_forward")} To get started:`);
    console.log(`  ${emoji.get("small_blue_diamond")} cd ${projectDir}`);
    console.log(`  ${emoji.get("small_blue_diamond")} pnpm dev`);
  } catch (error) {
    console.error(
      `${emoji.get("x")} Error creating the project: ${error.message}`
    );
    process.exit(1);
  }
})();
