<script setup lang="ts">
import { computed } from 'vue';
import { useAppStore } from './store/modules/app';
import { useThemeStore } from './store/modules/theme';
import { naiveDateLocales, naiveLocales } from './locales/naive';

defineOptions({
  name: 'App'
});

const appStore = useAppStore();
const themeStore = useThemeStore();

// 使用对象代替darkTheme
const naiveDarkTheme = computed(() => (themeStore.darkMode ? { name: 'dark' } : undefined));

const naiveLocale = computed(() => {
  return naiveLocales[appStore.locale];
});

const naiveDateLocale = computed(() => {
  return naiveDateLocales[appStore.locale];
});

// 使用类型接口
interface WatermarkOptions {
  content: string;
  cross: boolean;
  fullscreen: boolean;
  fontSize: number;
  lineHeight: number;
  width: number;
  height: number;
  xOffset: number;
  yOffset: number;
  rotate: number;
  zIndex: number;
}

const watermarkProps = computed<WatermarkOptions>(() => {
  return {
    content: themeStore.watermark.text,
    cross: true,
    fullscreen: true,
    fontSize: 16,
    lineHeight: 16,
    width: 384,
    height: 384,
    xOffset: 12,
    yOffset: 60,
    rotate: -15,
    zIndex: 9999
  };
});
</script>

<template>
  <NConfigProvider
    :theme="naiveDarkTheme"
    :theme-overrides="themeStore.naiveTheme"
    :locale="naiveLocale"
    :date-locale="naiveDateLocale"
    class="h-full"
  >
    <AppProvider>
      <RouterView class="bg-layout" />
      <NWatermark v-if="themeStore.watermark.visible" v-bind="watermarkProps" />
    </AppProvider>
  </NConfigProvider>
</template>

<style scoped></style>
