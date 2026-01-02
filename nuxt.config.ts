// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  modules: ["@nuxtjs/tailwindcss"],

  tailwindcss: {
    cssPath: "~/assets/css/tailwind.css",
    configPath: "tailwind.config.ts",
  },

  app: {
    head: {
      title: "Nuxt Builder",
      meta: [
        {
          name: "description",
          content: "Drag and drop site builder with hooks system",
        },
      ],
    },
  },
})
