<script setup lang="ts">
import { $t } from '@/locales';

defineOptions({
  name: 'GlobalLogo'
});

interface Props {
  /** Whether to show the title */
  showTitle?: boolean;
}

withDefaults(defineProps<Props>(), {
  showTitle: true
});
</script>

<template>
  <RouterLink to="/" class="w-full flex-center nowrap-hidden">
    <SystemLogo class="text-32px text-primary" />
    <h2 v-show="showTitle" class="pl-8px text-16px text-primary font-bold transition duration-300 ease-in-out">
      {{ $t('system.title') }}
    </h2>
  </RouterLink>
</template>

<style scoped>
h2 {
  /* padding-left: 6px; 调整左侧间距 */
  letter-spacing: 0.8px; /* 调整字间距 */
}
</style>
