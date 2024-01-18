import { defineConfig } from 'vite'
import unocss from 'unocss/vite'
import solid from 'vite-plugin-solid'
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [solid(), unocss(), tsconfigPaths()],
})
