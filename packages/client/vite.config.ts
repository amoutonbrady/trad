import { UserConfig } from "vite";
import { resolve } from "path";

const config: UserConfig = {
  alias: {
    "/@components/": resolve(__dirname, "src/components"),
    "/@pages/": resolve(__dirname, "src/pages"),
    "/@assets/": resolve(__dirname, "src/assets"),
  },
};

export default config;
