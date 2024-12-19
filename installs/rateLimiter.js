import { LATEST_SUPPORT_RATE_LIMIT_VERSION } from "../templates/dependencies/rateLimit/version.js";
import fsExtra from "fs-extra";
import path from "path";

const { copySync } = fsExtra;

const version = LATEST_SUPPORT_RATE_LIMIT_VERSION;

async function installRateLimiter(targetPath, templatePath, packageJson) {
  // Update package.json
  packageJson.dependencies["express-rate-limit"] = version;

  // Add to middleware folder
  const middlewarePath = path.join(targetPath, "src", "middlewares");
  await fsExtra.ensureDir(middlewarePath);
  const rateLimiterPath = path.join(
    templatePath,
    "dependencies",
    "rateLimit",
    "rateLimiter.ts"
  );
  copySync(rateLimiterPath, path.join(middlewarePath, "rateLimiter.ts"));

  // Add import
  const indexFilePath = path.join(targetPath, "src", "index.ts");
  const indexFile = await fsExtra.readFile(indexFilePath, "utf-8");

  let updatedFile = indexFile.replace(
    /^(import .+;[\n\r]*)+/m, // Match the first block of imports
    `import rateLimiter from "./middlewares/rateLimiter";\n$&`
  );

  // Add middleware
  const finalFile = updatedFile.replace(
    `app.use(helmet());`,
    `app.use(helmet());\napp.use(rateLimiter);`
  );

  await fsExtra.writeFile(indexFilePath, finalFile);
}

export { installRateLimiter };
