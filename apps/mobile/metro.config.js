// Learn more: https://docs.expo.dev/guides/customizing-metro
// Monorepo guide: https://docs.expo.dev/guides/monorepos
const path = require("path");
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, "../..");

const config = getDefaultConfig(projectRoot);

// Watch the workspace root in addition to whatever Expo already watches,
// so changes in packages/shared trigger Metro reloads.
config.watchFolders = [...(config.watchFolders ?? []), workspaceRoot];

// Look in the local node_modules first (for Expo's hoisted deps), then in
// the workspace root. This keeps duplicate-resolution sane in a monorepo.
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, "node_modules"),
  path.resolve(workspaceRoot, "node_modules"),
];

module.exports = withNativeWind(config, { input: "./global.css" });
