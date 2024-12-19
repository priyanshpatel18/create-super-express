import fsExtra from "fs-extra";
import path from "path";

const { copySync } = fsExtra;

async function installErrorHandler(targetPath, templatePath) {
  // Middleware Template Path
  const errorHandler = path.join(
    templatePath,
    "dependencies",
    "errorHandler",
    "errorHandler.ts"
  );

  // Add Middleware to middlewares folder -> errorHandler.ts
  const middlewaresDir = path.join(targetPath, "src", "middlewares");
  await fsExtra.ensureDir(middlewaresDir);

  const middlewarePath = path.join(middlewaresDir, "errorHandler.ts");
  copySync(errorHandler, middlewarePath);

  // Read index.ts file
  const indexPath = path.join(targetPath, "src", "index.ts");

  const indexFile = await fsExtra.readFile(indexPath, "utf-8");

  // Check for app.listen() existence
  if (!indexFile.includes("app.listen(")) {
    console.warn("No app.listen() found in index.ts. Please verify manually.");
    return;
  }

  // Add the import for the middleware
  let updatedFile = indexFile.replace(
    /^(import .+;[\n\r]*)+/m, // Match the first block of imports
    `import { handleError } from "./middlewares/errorHandler";\n$&`
  );

  // Ensure error-handling middleware is added before app.listen()
  const appListenIndex = updatedFile.indexOf("app.listen(");
  const beforeAppListen = updatedFile.substring(0, appListenIndex);
  const afterAppListen = updatedFile.substring(appListenIndex);

  // Add the error-handling middleware
  updatedFile = `${beforeAppListen}// Error handling\napp.use((err: any, req: Request, res: Response, next: NextFunction) => {\n  handleError(err, req, res, next);\n});\n\n${afterAppListen}`;

  // Write the updated content back to index.ts
  await fsExtra.writeFile(indexPath, updatedFile, "utf-8");
}

export { installErrorHandler };
