import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  site: 'https://estrato.lumux.demo',
  compressHTML: true,
  devToolbar: { enabled: false },
  build: {
    format: 'directory'
  }
});
