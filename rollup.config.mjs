import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
import postcss from "rollup-plugin-postcss";
import terser from "@rollup/plugin-terser";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  input: "./components/Game.tsx",
  output: {
    file: "./bundle/bundle.js",
    format: "esm",
    sourcemap: true,
  },
  plugins: [
    resolve(),
    typescript({ tsconfig: "./tsconfig.build.json" }),
    postcss(),
    terser(),
  ],
  external: ["react", "react-dom", "framer-motion"],
};
