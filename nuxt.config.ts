export default defineNuxtConfig({
  css: ['~/assets/css/main.css'],
  devtools: { enabled: false },
  modules: ["@prisma/nuxt"],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  prisma: {
    autoSetupPrisma: true,
  },

  compatibilityDate: "2024-07-17",
})