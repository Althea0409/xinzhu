import process from 'node:process';
import path from 'node:path';
import unocss from '@unocss/vite';
import presetIcons from '@unocss/preset-icons';
import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders';
import type { Plugin } from 'vite';

export function setupUnocss(viteEnv: Env.ImportMeta): Plugin {
  const { VITE_ICON_PREFIX, VITE_ICON_LOCAL_PREFIX } = viteEnv;

  const localIconPath = path.join(process.cwd(), 'src/assets/svg-icon');

  /** The name of the local icon collection */
  const collectionName = VITE_ICON_LOCAL_PREFIX.replace(`${VITE_ICON_PREFIX}-`, '');

  const unocssPlugin = unocss({
    safelist: ['w-[*]', 'i-carbon-*'],
    content: {
      pipeline: {
        exclude: ['node_modules', '.git', 'dist']
      }
    },
    configDeps: ['./uno.config.ts'],
    presets: [
      presetIcons({
        prefix: `${VITE_ICON_PREFIX}-`,
        scale: 1,
        extraProperties: {
          display: 'inline-block'
        },
        collections: {
          [collectionName]: FileSystemIconLoader(localIconPath, svg =>
            svg.replace(/^<svg\s/, '<svg width="1em" height="1em" ')
          ),
          carbon: () => import('@iconify-json/carbon/icons.json').then(i => i.default)
        },
        warn: true
      })
    ]
  });

  return unocssPlugin;
}
