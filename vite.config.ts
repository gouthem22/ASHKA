import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  const isGitHubPages = process.env.GITHUB_PAGES === 'true';

  return {
    // Use /ASHKA/ base on GitHub Pages, ./ for local/Vercel
    base: isGitHubPages ? '/ASHKA/' : './',
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': import.meta.dirname,
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
    build: {
      rollupOptions: {
        output: {
          // Vite 8 (Rolldown) requires manualChunks to be a function, not an object
          manualChunks(id) {
            if (id.includes('node_modules/gsap')) return 'vendor-gsap';
            if (id.includes('node_modules/motion')) return 'vendor-motion';
            if (id.includes('node_modules/react-dom') || id.includes('node_modules/react/')) return 'vendor-react';
          },
        },
      },
    },
  };
});
