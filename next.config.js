module.exports = {
  reactStrictMode: true,
  i18n: {
    locales: ["en", "cy"],
    defaultLocale: "en",
  },
  rewrites: async () => {
    return [
      {
        source: "/api/:route((?!v\\d+).*)",
        destination: "/api/v1/:route",
      },
    ];
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
