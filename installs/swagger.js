import {
  LATEST_SUPPORT_SWAGGER_JSDOC_DEV_VERSION,
  LATEST_SUPPORT_SWAGGER_JSDOC_VERSION,
  LATEST_SUPPORT_SWAGGER_UI_DEV_VERSION,
  LATEST_SUPPORT_SWAGGER_UI_VERSION,
} from "../templates/dependencies/swagger/version.js";
import fsExtra from "fs-extra";
import path from "path";

const { copySync } = fsExtra;

const jsDocVersion = LATEST_SUPPORT_SWAGGER_JSDOC_VERSION;
const jsDocDevVersion = LATEST_SUPPORT_SWAGGER_JSDOC_DEV_VERSION;
const uiVersion = LATEST_SUPPORT_SWAGGER_UI_VERSION;
const uiDevVersion = LATEST_SUPPORT_SWAGGER_UI_DEV_VERSION;

async function installSwagger(targetPath, templatePath, packageJson) {
  // Update package.json
  packageJson.dependencies["swagger-ui-express"] = uiVersion;
  packageJson.dependencies["swagger-jsdoc"] = jsDocDevVersion;
  packageJson.devDependencies["@types/swagger-jsdoc"] = jsDocDevVersion;
  packageJson.devDependencies["@types/swagger-ui-express"] = uiDevVersion;

  // Add Utils
  await fsExtra.ensureDir(path.join(targetPath, "src", "utils"));
  copySync(
    path.join(templatePath, "dependencies", "swagger", "swagger.ts"),
    path.join(targetPath, "src", "utils", "swagger.ts")
  );

  // Add to index
  const indexFilePath = path.join(targetPath, "src", "index.ts");
  const indexFile = await fsExtra.readFile(indexFilePath, "utf-8");

  let updatedFile = indexFile.replace(
    /^(import .+;[\n\r]*)+/m, // Match the first block of imports
    `import swaggerUi from "swagger-ui-express";\nimport { swaggerSpec } from "./utils/swagger";\n$&`
  );

  // Add Middleware before  '// Routes' commonet
  updatedFile = updatedFile.replace(
    "// Routes",
    `app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));\n\n// Routes\n`
  );

  await fsExtra.writeFile(indexFilePath, updatedFile);
}

export { installSwagger };
