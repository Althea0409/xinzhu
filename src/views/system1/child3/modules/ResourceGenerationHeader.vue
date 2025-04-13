<script setup lang="ts">
import { ref } from 'vue';
import { NButton, NSpace, NTag } from 'naive-ui';
import { Icon } from '@iconify/vue';

defineOptions({
  name: 'ResourceGenerationHeader'
});

interface HeaderProps {
  title?: string;
  subtitle?: string;
}

const props = withDefaults(defineProps<HeaderProps>(), {
  title: '多媒体教学资源生成',
  subtitle: '基于StyleGAN3的智能教学资源生成系统'
});

const hasNewFeatures = ref(true);
</script>

<template>
  <div class="resource-header w-full border-b border-gray-200 pb-4">
    <div class="page-header">
      <div class="flex items-center">
        <div
          class="mr-4 h-12 w-12 flex items-center justify-center rounded-full from-blue-400 to-indigo-600 bg-gradient-to-br text-white"
        >
          <Icon icon="carbon:ai-status" class="text-2xl" />
        </div>
        <div>
          <div class="flex items-center">
            <span class="text-xl font-medium">{{ props.title }}</span>
            <NTag v-if="hasNewFeatures" class="ml-2" type="success" size="small">新特性</NTag>
          </div>
          <div class="text-sm text-gray-500">{{ props.subtitle }}</div>
        </div>
      </div>

      <div class="mt-4">
        <div class="text-sm text-gray-500">
          结合跨模态注意力机制与自适应风格迁移技术，自动生成教学相关的图片、视频等多媒体资源
        </div>
      </div>

      <div class="mt-4 flex justify-end">
        <NSpace>
          <NButton
            circle
            secondary
            @click="
              () => {
                /* 帮助 */
              }
            "
          >
            <template #icon>
              <Icon icon="carbon:help" class="text-lg" />
            </template>
          </NButton>
          <NButton type="primary" class="from-blue-500 to-indigo-600 bg-gradient-to-r">
            <template #icon>
              <Icon icon="carbon:add" class="text-lg" />
            </template>
            创建资源
          </NButton>
        </NSpace>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page-header {
  padding: 16px 0;
}
</style>
