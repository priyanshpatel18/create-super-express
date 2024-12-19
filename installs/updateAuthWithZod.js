import fsExtra from "fs-extra";
import path from "path";

const { copySync } = fsExtra;

async function updateAuthWithZod(targetPath, templatePath) {
  // Update Router
  copySync(
    path.join(templatePath, "dependencies", "zod", "authRouterWithZod.ts"),
    path.join(targetPath, "src", "routers", "authRouter.ts")
  );

  // Update Controller
  const authControllerPath = path.join(
    templatePath,
    "dependencies",
    "zod",
    "authControllerWithZod.ts"
  );
  copySync(
    authControllerPath,
    path.join(targetPath, "src", "controllers", "authController.ts")
  );
}

export { updateAuthWithZod };
