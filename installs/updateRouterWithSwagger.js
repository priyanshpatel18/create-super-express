import fsExtra from "fs-extra";
import path from "path";

const { copySync } = fsExtra;

async function updateRouterWithSwagger(targetPath, templatePath, withZod) {
  if (withZod) {
    copySync(
      path.join(templatePath, "dependencies", "swagger", "swaggerRouterWithZod.ts"),
      path.join(targetPath, "src", "routers", "authRouter.ts")
    );
  } else {
    copySync(
      path.join(templatePath, "dependencies", "swagger", "swaggerRouterWithoutZod.ts"),
      path.join(targetPath, "src", "routers", "authRouter.ts")
    );
  }
}

export { updateRouterWithSwagger };
