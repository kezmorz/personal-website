const { withContentlayer } = require("next-contentlayer");

module.exports = withContentlayer({
  reactStrictMode: true,
  i18n: {
    locales: ["en", "cy"],
    defaultLocale: "en",
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
  eslint: {
    dirs: [
      "src/components",
      "src/hooks",
      "src/icons",
      "src/lib",
      "src/modules",
      "src/pages",
      "src/services",
      "src/theme",
      "src/utils",
    ],
  },
  experimental: {
    modularizeImports: {
      "@mui/material": {
        transform: "@mui/material/{{member}}",
      },
      "@mui/icons-material": {
        transform: "@mui/icons-material/{{member}}",
      },
    },
  },
});
