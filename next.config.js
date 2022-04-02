module.exports = {
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
      "src/pages",
      "src/services",
      "src/theme",
      "src/utils",
    ],
  },
};
