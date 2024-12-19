import fsExtra from "fs-extra";
import path from "path";

export async function createBaseProject(targetPath, templatePath, projectName) {
  await fsExtra.ensureDir(targetPath);

  // Copy Base Template
  const { copySync } = fsExtra;

  const baseTemplatePath = path.join(templatePath, "base");
  copySync(baseTemplatePath, targetPath);

  const packageJson = path.join(targetPath, "package.json");
  const packageJsonContent = await fsExtra.readJson(packageJson);
  packageJsonContent.name = projectName;
  await fsExtra.writeJson(packageJson, packageJsonContent);
}
