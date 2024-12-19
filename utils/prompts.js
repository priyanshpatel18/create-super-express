import * as p from "@clack/prompts";
import { validateProjectName } from "../helper/validateProjectName.js";
import { checkPackageManager } from "../helper/checkPackageManager.js";

export const cli = async () => {
  return await p.group(
    {
      projectName: () =>
        p.text({
          message: "What would you like to name your project?",
          default: "my-express-app",
          placeholder: "my-express-app",
          validate: (input) => validateProjectName(input),
        }),
      workspace: async () => {
        const workspace = await p.select({
          message:
            "Which workspace would you like to use? (Use Up/Down Arrow Keys)",
          options: [
            {
              value: "npm",
              label: "npm workspace",
            },
            {
              value: "yarn",
              label: "yarn workspace",
            },
            {
              value: "pnpm",
              label: "pnpm workspace",
            },
          ],
          initialValue: "npm",
        });

        if (!checkPackageManager(workspace)) {
          process.exit(1);
        }

        return workspace;
      },
    },
    {
      onCancel: () => {
        p.cancel("Operation cancelled.");
        process.exit(0);
      },
    }
  );
};

export const promptFeatures = async () => {
  return await p.group({
    features: async () =>
      await p.multiselect({
        message: "Which features would you like to add?",
        options: [
          {
            value: "all (Recommended)",
            label: "All Features",
          },
          {
            value: "auth",
            label: "Authentication (Token Based)",
          },
          {
            value: "orm",
            label: "Prisma ORM Setup (Postgres)",
          },
          {
            value: "swagger",
            label: "Swagger API Documentation",
          },
          {
            value: "logging",
            label: "Logging (Morgan)",
          },
          {
            value: "zod",
            label: "Zod Schema Validation",
          },
          {
            value: "errorHandler",
            label: "Error Handler Middleware",
          },
          {
            value: "rateLimit",
            label: "Rate Limit Middleware",
          },
        ],
        required: false,
      }),
  });
};
