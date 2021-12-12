import { defineConfig } from 'vite';
import path from 'path';
import vue from '@vitejs/plugin-vue';
import WindiCSS from 'vite-plugin-windicss';
import Components from 'unplugin-vue-components/vite';
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers';
import PurgeIcons from 'vite-plugin-purge-icons';
import ViteFonts from 'vite-plugin-fonts';
import svgLoader from 'vite-svg-loader';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 4000,
    cors: true,
    proxy: {
      '/v2': {
        target: 'https://api.soundon.fm',
        secure: false,
        changeOrigin: true,
      },
    },
  },
  resolve: {
    alias: {
      '/@': path.resolve(__dirname, './src'),
    },
  },
  plugins: [
    vue(),
    // https://github.com/jpkleemans/vite-svg-loader
    svgLoader(),
    // https://github.com/antfu/unplugin-vue-components
    Components({
      resolvers: [NaiveUiResolver()],
      dts: true,
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      dirs: ['src/components', 'src/pages/common'],
      extensions: ['vue'],
    }),
    // https://github.com/stafyniaksacha/vite-plugin-fonts#readme
    ViteFonts({
      google: {
        families: ['Noto Sans TC', 'Open Sans', 'Montserrat', 'Fira Sans'],
      },
    }),

    // https://github.com/antfu/vite-plugin-windicss
    WindiCSS({}),

    // https://github.com/antfu/purge-icons/tree/main/packages/vite-plugin-purge-icons
    PurgeIcons({
      /* PurgeIcons Options */
    }),
  ],
});
