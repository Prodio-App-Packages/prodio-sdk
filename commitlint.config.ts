import type { UserConfig } from "@commitlint/types";

const Configuration: UserConfig = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "scope-enum": [2, "always", ["js"]],
  },
  ignores: [(message) => message.startsWith("@insihts/")],
};

export default Configuration;
