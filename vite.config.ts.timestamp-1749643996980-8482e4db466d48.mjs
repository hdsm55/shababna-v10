// vite.config.ts
import { defineConfig, loadEnv } from "file:///home/project/node_modules/vite/dist/node/index.js";
import react from "file:///home/project/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { ViteImageOptimizer } from "file:///home/project/node_modules/vite-plugin-image-optimizer/dist/index.mjs";
import { imagetools } from "file:///home/project/node_modules/vite-imagetools/dist/index.js";
import path from "path";
var __vite_injected_original_dirname = "/home/project";
var vite_config_default = defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [
      react(),
      imagetools({
        defaultDirectives: new URLSearchParams([
          ["format", "webp"],
          ["quality", "70"]
        ])
      }),
      ViteImageOptimizer({
        test: /\.(jpe?g|png|gif|webp|svg)$/i,
        includePublic: true,
        logStats: true,
        ansiColors: true,
        svg: {
          multipass: true,
          plugins: [
            {
              name: "preset-default",
              params: {
                overrides: {
                  cleanupNumericValues: false,
                  removeViewBox: false
                }
              }
            }
          ]
        },
        png: {
          quality: 80
        },
        jpeg: {
          quality: 80
        },
        jpg: {
          quality: 80
        },
        webp: {
          lossless: true
        }
      })
    ],
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            "react-vendor": ["react", "react-dom"],
            "i18n-vendor": ["i18next", "react-i18next"],
            "ui-vendor": ["lucide-react", "react-toastify", "framer-motion"],
            "form-vendor": ["react-hook-form", "@stripe/react-stripe-js"]
          }
        }
      },
      cssCodeSplit: true,
      sourcemap: true,
      target: "esnext",
      assetsInlineLimit: 4096
    },
    optimizeDeps: {
      include: ["react", "react-dom", "react-router-dom"]
    },
    resolve: {
      alias: {
        "@": path.resolve(__vite_injected_original_dirname, "src")
      }
    },
    server: {
      port: 3001,
      strictPort: true,
      host: true,
      open: true
    },
    preview: {
      port: 3001,
      strictPort: true,
      host: true
    },
    define: {
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || "development"),
      "import.meta.env.VITE_SUPABASE_URL": JSON.stringify(env.VITE_SUPABASE_URL),
      "import.meta.env.VITE_SUPABASE_KEY": JSON.stringify(env.VITE_SUPABASE_KEY)
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9wcm9qZWN0XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9wcm9qZWN0L3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL3Byb2plY3Qvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcsIGxvYWRFbnYgfSBmcm9tICd2aXRlJztcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XG5pbXBvcnQgeyBWaXRlSW1hZ2VPcHRpbWl6ZXIgfSBmcm9tICd2aXRlLXBsdWdpbi1pbWFnZS1vcHRpbWl6ZXInO1xuaW1wb3J0IHsgaW1hZ2V0b29scyB9IGZyb20gJ3ZpdGUtaW1hZ2V0b29scyc7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCh7IG1vZGUgfSkgPT4ge1xuICBjb25zdCBlbnYgPSBsb2FkRW52KG1vZGUsIHByb2Nlc3MuY3dkKCksICcnKTtcbiAgcmV0dXJuIHtcbiAgICBwbHVnaW5zOiBbXG4gICAgICByZWFjdCgpLFxuICAgICAgaW1hZ2V0b29scyh7XG4gICAgICAgIGRlZmF1bHREaXJlY3RpdmVzOiBuZXcgVVJMU2VhcmNoUGFyYW1zKFtcbiAgICAgICAgICBbJ2Zvcm1hdCcsICd3ZWJwJ10sXG4gICAgICAgICAgWydxdWFsaXR5JywgJzcwJ10sXG4gICAgICAgIF0pLFxuICAgICAgfSksXG4gICAgICBWaXRlSW1hZ2VPcHRpbWl6ZXIoe1xuICAgICAgICB0ZXN0OiAvXFwuKGpwZT9nfHBuZ3xnaWZ8d2VicHxzdmcpJC9pLFxuICAgICAgICBpbmNsdWRlUHVibGljOiB0cnVlLFxuICAgICAgICBsb2dTdGF0czogdHJ1ZSxcbiAgICAgICAgYW5zaUNvbG9yczogdHJ1ZSxcbiAgICAgICAgc3ZnOiB7XG4gICAgICAgICAgbXVsdGlwYXNzOiB0cnVlLFxuICAgICAgICAgIHBsdWdpbnM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgbmFtZTogJ3ByZXNldC1kZWZhdWx0JyxcbiAgICAgICAgICAgICAgcGFyYW1zOiB7XG4gICAgICAgICAgICAgICAgb3ZlcnJpZGVzOiB7XG4gICAgICAgICAgICAgICAgICBjbGVhbnVwTnVtZXJpY1ZhbHVlczogZmFsc2UsXG4gICAgICAgICAgICAgICAgICByZW1vdmVWaWV3Qm94OiBmYWxzZSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICBdLFxuICAgICAgICB9LFxuICAgICAgICBwbmc6IHtcbiAgICAgICAgICBxdWFsaXR5OiA4MCxcbiAgICAgICAgfSxcbiAgICAgICAganBlZzoge1xuICAgICAgICAgIHF1YWxpdHk6IDgwLFxuICAgICAgICB9LFxuICAgICAgICBqcGc6IHtcbiAgICAgICAgICBxdWFsaXR5OiA4MCxcbiAgICAgICAgfSxcbiAgICAgICAgd2VicDoge1xuICAgICAgICAgIGxvc3NsZXNzOiB0cnVlLFxuICAgICAgICB9LFxuICAgICAgfSksXG4gICAgXSxcbiAgICBidWlsZDoge1xuICAgICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgICBvdXRwdXQ6IHtcbiAgICAgICAgICBtYW51YWxDaHVua3M6IHtcbiAgICAgICAgICAgICdyZWFjdC12ZW5kb3InOiBbJ3JlYWN0JywgJ3JlYWN0LWRvbSddLFxuICAgICAgICAgICAgJ2kxOG4tdmVuZG9yJzogWydpMThuZXh0JywgJ3JlYWN0LWkxOG5leHQnXSxcbiAgICAgICAgICAgICd1aS12ZW5kb3InOiBbJ2x1Y2lkZS1yZWFjdCcsICdyZWFjdC10b2FzdGlmeScsICdmcmFtZXItbW90aW9uJ10sXG4gICAgICAgICAgICAnZm9ybS12ZW5kb3InOiBbJ3JlYWN0LWhvb2stZm9ybScsICdAc3RyaXBlL3JlYWN0LXN0cmlwZS1qcyddLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgY3NzQ29kZVNwbGl0OiB0cnVlLFxuICAgICAgc291cmNlbWFwOiB0cnVlLFxuICAgICAgdGFyZ2V0OiAnZXNuZXh0JyxcbiAgICAgIGFzc2V0c0lubGluZUxpbWl0OiA0MDk2LFxuICAgIH0sXG4gICAgb3B0aW1pemVEZXBzOiB7XG4gICAgICBpbmNsdWRlOiBbJ3JlYWN0JywgJ3JlYWN0LWRvbScsICdyZWFjdC1yb3V0ZXItZG9tJ10sXG4gICAgfSxcbiAgICByZXNvbHZlOiB7XG4gICAgICBhbGlhczoge1xuICAgICAgICAnQCc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMnKSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBzZXJ2ZXI6IHtcbiAgICAgIHBvcnQ6IDMwMDEsXG4gICAgICBzdHJpY3RQb3J0OiB0cnVlLFxuICAgICAgaG9zdDogdHJ1ZSxcbiAgICAgIG9wZW46IHRydWUsXG4gICAgfSxcbiAgICBwcmV2aWV3OiB7XG4gICAgICBwb3J0OiAzMDAxLFxuICAgICAgc3RyaWN0UG9ydDogdHJ1ZSxcbiAgICAgIGhvc3Q6IHRydWUsXG4gICAgfSxcbiAgICBkZWZpbmU6IHtcbiAgICAgICdwcm9jZXNzLmVudi5OT0RFX0VOVic6IEpTT04uc3RyaW5naWZ5KHByb2Nlc3MuZW52Lk5PREVfRU5WIHx8ICdkZXZlbG9wbWVudCcpLFxuICAgICAgJ2ltcG9ydC5tZXRhLmVudi5WSVRFX1NVUEFCQVNFX1VSTCc6IEpTT04uc3RyaW5naWZ5KGVudi5WSVRFX1NVUEFCQVNFX1VSTCksXG4gICAgICAnaW1wb3J0Lm1ldGEuZW52LlZJVEVfU1VQQUJBU0VfS0VZJzogSlNPTi5zdHJpbmdpZnkoZW52LlZJVEVfU1VQQUJBU0VfS0VZKSxc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
