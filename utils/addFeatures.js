import fsExtra from "fs-extra";
import path from "path";
import { installAuth } from "../installs/auth.js";
import { installErrorHandler } from "../installs/errorHandler.js";
import { installMorgan } from "../installs/morgan.js";
import { installPrisma } from "../installs/prisma.js";
import { installRateLimiter } from "../installs/rateLimiter.js";
import { installSwagger } from "../installs/swagger.js";
import { updateRouterWithSwagger } from "../installs/updateRouterWithSwagger.js";
import { installZod } from "../installs/zod.js";

export async function addFeatures(targetPath, templatePath, features) {
  // package.json
  const packageJsonPath = path.join(targetPath, "package.json");
  const packageJson = await fsExtra.readJson(packageJsonPath);

  // Handle Feature Level Issues
  if (features.includes("all")) {
    features.push("auth");
    features.push("orm");
    features.push("swagger");
    features.push("logging");
    features.push("zod");
    features.push("errorHandler");
    features.push("rateLimit");
  }
  if (features.includes("auth") && !features.includes("orm")) {
    log.message(
      "Auth feature requires orm feature so it will be added automatically"
    );
    features.push("orm");
  }

  // Handle Authentication
  if (features.includes("auth")) {
    await installAuth(templatePath, targetPath, packageJson);
  }

  // Handle ORM
  if (features.includes("orm")) {
    await installPrisma(templatePath, targetPath, projectName, packageJson);
  }

  // Handle Swagger
  if (features.includes("swagger")) {
    // Configure Swagger
    await installSwagger(targetPath, templatePath, packageJson);

    if (features.includes("auth")) {
      if (features.includes("zod")) {
        await updateRouterWithSwagger(targetPath, templatePath, true);
      } else {
        await updateRouterWithSwagger(targetPath, templatePath, false);
      }
    }
  }

  // Handle Morgan
  if (features.includes("logging")) {
    await installMorgan(templatePath, targetPath, packageJson);
  }

  // Handle Zod
  if (features.includes("zod")) {
    await installZod(templatePath, targetPath, packageJson);
  }

  // Handle Error Handler
  if (features.includes("errorHandler")) {
    await installErrorHandler(templatePath, targetPath, packageJson);
  }

  // Handle Rate Limit
  if (features.includes("rateLimit")) {
    await installRateLimiter(templatePath, targetPath, packageJson);
  }

  // Update package.json
  await fsExtra.writeJson(packageJsonPath, packageJson);
}
