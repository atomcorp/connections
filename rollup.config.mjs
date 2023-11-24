import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
import postcss from "rollup-plugin-postcss";
import terser from "@rollup/plugin-terser";
import dts from "rollup-plugin-dts";

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  {
    input: "./components/Game.tsx",
    output: {
      file: "./bundle/index.js",
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
  },
  // {
  //   input: "./bundle/dts/Game.d.ts",
  //   output: [{ file: "bundle/index.d.ts", format: "es" }],
  //   plugins: [dts()],
  // },
];
