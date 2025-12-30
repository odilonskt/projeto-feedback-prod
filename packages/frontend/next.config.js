/** @type {import('next').NextConfig} */
const nextConfig = {
  // React Compiler
  experimental: {
    reactCompiler: process.env.NODE_ENV === "production",
  },

  // Configurações de desenvolvimento com Turbopack
  // O Turbopack agora é ativado via flag, não no next.config.js

  // Transpile pacotes do monorepo
  transpilePackages: ["@shared"],

  // Configurações de build
  reactStrictMode: true,
  swcMinify: true,

  // Webpack config para aliases
  // webpack: (config, { isServer }) => {
  //   const path = require("path");

  //   config.resolve.alias = {
  //     ...config.resolve.alias,
  //     // Aliases locais
  //     "@": path.resolve(__dirname, "."),
  //     "@/*": path.resolve(__dirname, "./*"),
  //     "@components": path.resolve(__dirname, "components"),
  //     "@components/*": path.resolve(__dirname, "components/*"),
  //     "@lib": path.resolve(__dirname, "lib"),
  //     "@lib/*": path.resolve(__dirname, "lib/*"),
  //     "@utils": path.resolve(__dirname, "utils"),
  //     "@utils/*": path.resolve(__dirname, "utils/*"),
  //     "@styles": path.resolve(__dirname, "styles"),
  //     "@styles/*": path.resolve(__dirname, "styles/*"),
  //     "@types": path.resolve(__dirname, "types"),
  //     "@types/*": path.resolve(__dirname, "types/*"),
  //     "@hooks": path.resolve(__dirname, "hooks"),
  //     "@hooks/*": path.resolve(__dirname, "hooks/*"),
  //     "@services": path.resolve(__dirname, "services"),
  //     "@services/*": path.resolve(__dirname, "services/*"),
  //     // Aliases para pacotes do monorepo
  //     "@shared": path.resolve(__dirname, "../shared"),
  //     "@shared/*": path.resolve(__dirname, "../shared/*"),
  //   };

  //   return config;
  // },

  // ESLint
  eslint: {
    ignoreDuringBuilds: true,
  },

  // TypeScript
  typescript: {
    ignoreBuildErrors: false,
  },
};

module.exports = nextConfig; // Use module.exports em vez de export default
