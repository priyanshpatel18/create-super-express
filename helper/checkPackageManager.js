import { log } from "@clack/prompts";
import { execSync } from "child_process";

const checkPackageManager = (workspace) => {
  try {
    execSync(`${workspace} --version`, { stdio: "ignore" });
    return true;
  } catch (error) {
    let installCommand = "";

    if (workspace === "yarn") {
      installCommand = "npm install -g yarn";
    } else if (workspace === "pnpm") {
      installCommand = "npm install -g pnpm";
    } else {
      installCommand = "npm install -g npm";
    }

    log.error(`The package manager "${workspace}" is not installed.`);
    log.info(
      `To resolve this, try running the following command to install ${workspace} globally:\n${installCommand}\nAfter installation, you can re-run the command to proceed with project setup.`
    );

    return false;
  }
};

export { checkPackageManager };
