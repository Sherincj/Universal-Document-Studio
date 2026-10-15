import eslintConfigNext from "eslint-config-next/core-web-vitals";
import eslintConfigPrettier from "eslint-config-prettier";

/** Combines framework accessibility rules with Prettier compatibility rules. */
const eslintConfiguration = [...eslintConfigNext, eslintConfigPrettier];

export default eslintConfiguration;
