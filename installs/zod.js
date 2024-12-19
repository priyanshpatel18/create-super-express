import fsExtra from "fs-extra";
import { LATEST_SUPPORT_ZOD_VERSION } from "../templates/dependencies/zod/version.js";
import path from "path";

const { copySync } = fsExtra;

const version = LATEST_SUPPORT_ZOD_VERSION;

async function installZod(targetPath, templatePath, packageJson) {
  // Update package.json
  packageJson.dependencies["zod"] = version;

  // Add to middleware folder
  const middlewarePath = path.join(targetPath, "src", "middlewares");
  await fsExtra.ensureDir(middlewarePath);
  const validateSchemaPath = path.join(
    templatePath,
    "dependencies",
    "zod",
    "validateSchema.ts"
  );
  copySync(validateSchemaPath, path.join(middlewarePath, "validateSchema.ts"));

  // Add schemas folder
  const schemasPath = path.join(targetPath, "src", "schemas");
  await fsExtra.ensureDir(schemasPath);
  const schemas = path.join(
    templatePath,
    "dependencies",
    "zod",
    "schemas"
  );
  copySync(schemas, path.join(schemasPath));
}

export { installZod };
