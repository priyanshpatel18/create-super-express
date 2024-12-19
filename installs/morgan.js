import fsExtra from "fs-extra";
import {
  LATEST_SUPPORT_MORGAN_DEV_VERSION,
  LATEST_SUPPORT_MORGAN_VERSION,
} from "../templates/dependencies/morgan/version.js";
import path from "path";

const version = LATEST_SUPPORT_MORGAN_VERSION;
const devVersion = LATEST_SUPPORT_MORGAN_DEV_VERSION;

async function installMorgan(targetPath, packageJson) {
  // Update package.json
  packageJson.dependencies["morgan"] = version;
  packageJson.devDependencies["@types/morgan"] = devVersion;

  const indexFilePath = path.join(targetPath, "src", "index.ts");
  const indexFile = await fsExtra.readFile(indexFilePath, "utf-8");

  // Update index.ts
  let updatedFile = indexFile.replace(
    /^(import .+;[\n\r]*)+/m, // Match the first block of imports
    `import morgan from "morgan";\n$&`
  );

  // Add middleware
  const finalFile = updatedFile.replace(
    `app.use(helmet());`,
    `app.use(helmet());\napp.use(morgan("combined"));`
  );

  // Write index.ts
  await fsExtra.writeFile(indexFilePath, finalFile);
}

export { installMorgan };
