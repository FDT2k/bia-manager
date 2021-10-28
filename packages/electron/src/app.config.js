export default {
    platform: process.platform,
    port: process.env.PORT ? process.env.PORT : 3000,
    title: 'BIA Manager',
    languages: ['fr', 'en'],
    fallbackLng: 'fr',
    namespace: 'translation'
  };