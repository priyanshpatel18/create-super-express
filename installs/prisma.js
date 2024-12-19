import { LATEST_SUPPORT_PRISMA_VERSION } from "../templates/dependencies/prisma/version.js";
import path from "path";
import fsExtra from "fs-extra";

const { copySync, ensureDirSync } = fsExtra;

// Get Version
const version = LATEST_SUPPORT_PRISMA_VERSION;

async function installPrisma(
  templatePath,
  targetPath,
  projectName,
  packageJson
) {
  // Update package.json
  packageJson.name = projectName;

  packageJson.dependencies["@prisma/client"] = version;
  packageJson.devDependencies["prisma"] = version;

  packageJson.scripts = {
    ...packageJson.scripts,
    postinstall: "npx prisma generate",
    generate: "npx prisma generate",
    migrate: "npx prisma migrate deploy",
  };

  // Paths for copying Prisma schema and DB
  const dependencyPath = path.join(templatePath, "dependencies", "prisma");
  const schemaPath = path.join(dependencyPath, "prisma");

  // Ensure the 'prisma' folder exists and copy schema
  ensureDirSync(path.join(targetPath, "prisma"));
  copySync(schemaPath, path.join(targetPath, "prisma"));

  // Ensure the 'db' folder exists and copy
  const dbDependencyPath = path.join(dependencyPath, "db");
  if (fsExtra.existsSync(dbDependencyPath)) {
    ensureDirSync(path.join(targetPath, "src", "db"));
    copySync(dbDependencyPath, path.join(targetPath, "src", "db"));
  }

  // Update .env
  const envPath = path.join(targetPath, ".env");

  await fsExtra.appendFile(
    envPath,
    `\nDATABASE_URL="postgresql://postgres:postgres@localhost:5432/${projectName}?schema=public"`
  );
}

export { installPrisma };
