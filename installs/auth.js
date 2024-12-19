import fsExtra from "fs-extra";
import path from "path";
import {
  LATEST_SUPPORT_ARGON_VERSION,
  LATEST_SUPPORT_JOSE_VERSION,
} from "../templates/dependencies/auth/version.js";

const { copySync } = fsExtra;

const joseVersion = LATEST_SUPPORT_JOSE_VERSION;
const argonVersion = LATEST_SUPPORT_ARGON_VERSION;

async function installAuth(templatePath, targetPath, packageJson) {
  // Update package.json
  packageJson.dependencies["argon2"] = argonVersion;
  packageJson.dependencies["jose"] = joseVersion;

  // Create authRouter
  await fsExtra.ensureDir(path.join(targetPath, "src", "routers"));

  const authRouterPath = path.join(
    templatePath,
    "dependencies",
    "auth",
    "authRouter.ts"
  );
  copySync(
    authRouterPath,
    path.join(targetPath, "src", "routers", "authRouter.ts")
  );

  // Add utils for token
  await fsExtra.ensureDir(path.join(targetPath, "src", "utils"));
  const tokenUtilsPath = path.join(
    templatePath,
    "dependencies",
    "auth",
    "tokenUtils.ts"
  );
  copySync(
    tokenUtilsPath,
    path.join(targetPath, "src", "utils", "tokenUtils.ts")
  );

  // Create authController
  await fsExtra.ensureDir(path.join(targetPath, "src", "controllers"));
  const authControllerPath = path.join(
    templatePath,
    "dependencies",
    "auth",
    "authController.ts"
  );
  copySync(
    authControllerPath,
    path.join(targetPath, "src", "controllers", "authController.ts")
  );

  // Create authenticate middleware
  await fsExtra.ensureDir(path.join(targetPath, "src", "middlewares"));
  const authenticatePath = path.join(
    templatePath,
    "dependencies",
    "auth",
    "authenticate.ts"
  );
  copySync(
    authenticatePath,
    path.join(targetPath, "src", "middlewares", "authenticate.ts")
  );

  // Create types for user
  copySync(
    path.join(templatePath, "dependencies", "auth", "types.d.ts"),
    path.join(targetPath, "src", "types.d.ts")
  );

  // Add routes to index.ts
  const indexFilePath = path.join(targetPath, "src", "index.ts");
  const indexFile = await fsExtra.readFile(indexFilePath, "utf-8");

  let updatedFile = indexFile.replace(
    /^(import .+;[\n\r]*)+/m,
    `import { authRouter } from "./routers/authRouter";\n$&`
  );

  const finalFile = updatedFile.replace(
    `// Routes`,
    `// Routes\napp.use("/api/v1/auth", authRouter);\n`
  );

  await fsExtra.writeFile(indexFilePath, finalFile);

  // Update .env
  const envPath = path.join(targetPath, ".env");
  await fsExtra.appendFile(envPath, `\nSECRET_KEY_ACCESS=\nSECRET_KEY_ACCESS=`);
}

export { installAuth };
