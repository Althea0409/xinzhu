<script setup lang="ts">
import { computed, ref } from 'vue';
import { NCard, NInput } from 'naive-ui';
import { Icon } from '@iconify/vue';

defineOptions({
  name: 'PptPreviewPanel'
});

const title = ref('PPT预览');
const currentTab = ref('all');

// 模拟PPT预览列表
const pptTemplates = ref([
  {
    id: 1,
    title: '蓝色简约风AI PPT模板_人工智能时代的商业战略规划',
    image: new URL('@/assets/images/ppt01.png', import.meta.url).href,
    active: true,
    category: 'tech'
  },
  {
    id: 2,
    title: '蓝色系组织绩效管理述职报告PPT模板',
    image: new URL('@/assets/images/ppt02.png', import.meta.url).href,
    active: false,
    category: 'tech'
  },
  {
    id: 3,
    title: '棕色简约业务连续性述职报告PPT模板',
    image: new URL('@/assets/images/ppt03.png', import.meta.url).href,
    active: false,
    category: 'business'
  },
  {
    id: 4,
    title: '绿色商务企业决策系统述职报告PPT模板',
    image: new URL('@/assets/images/ppt04.png', import.meta.url).href,
    active: false,
    category: 'business'
  },
  {
    id: 5,
    title: '黄色立体风反洗钱政策与实施措施计划PPT',
    image: new URL('@/assets/images/ppt05.png', import.meta.url).href,
    active: false,
    category: 'cartoon'
  },
  {
    id: 6,
    title: '棕色系组织变革管理述职报告PPT模板',
    image: new URL('@/assets/images/ppt06.png', import.meta.url).href,
    active: false,
    category: 'business'
  }
]);

const filteredTemplates = computed(() => {
  if (currentTab.value === 'all') {
    return pptTemplates.value;
  }

  return pptTemplates.value.filter(template => template.category === currentTab.value);
});

function selectTemplate(id: number) {
  pptTemplates.value.forEach(template => {
    template.active = template.id === id;
  });
}
</script>

<template>
  <NCard class="ppt-preview-panel h-full rounded-xl" :bordered="false">
    <!-- 顶部标题栏 -->
    <div class="panel-header mb-4 flex items-center justify-between">
      <h2 class="text-xl font-medium">
        {{ title }}
      </h2>

      <!-- 搜索框 -->
      <div class="search-box w-64">
        <NInput placeholder="搜索模板" size="small" round>
          <template #prefix>
            <Icon icon="carbon:search" class="text-gray-400" />
          </template>
        </NInput>
      </div>
    </div>

    <!-- 分类标签 -->
    <div class="category-tabs mb-4 flex justify-center border-b pb-2 space-x-3">
      <div
        v-for="(tabName, index) in ['全部', '科技', '卡通', '活泼', '学术', '商务']"
        :key="index"
        class="category-tab cursor-pointer px-4 py-1 text-sm transition-all"
        :class="[
          currentTab === (index === 0 ? 'all' : ['tech', 'cartoon', 'lively', 'academic', 'business'][index - 1])
            ? 'text-blue-600 font-medium border border-gray-200 rounded-md bg-white'
            : 'text-gray-600 hover:text-gray-800 bg-gray-100 rounded-md'
        ]"
        @click="currentTab = index === 0 ? 'all' : ['tech', 'cartoon', 'lively', 'academic', 'business'][index - 1]"
      >
        {{ tabName }}
      </div>
    </div>

    <!-- 模板列表区域 -->
    <div class="template-list grid grid-cols-2 mt-4 gap-4 overflow-y-auto">
      <NCard
        v-for="template in filteredTemplates"
        :key="template.id"
        class="template-card cursor-pointer hover:shadow-lg"
        :class="{
          'template-card-active': template.active
        }"
        :bordered="true"
        size="small"
        :radius="16"
        @click="selectTemplate(template.id)"
      >
        <div class="template-img overflow-hidden rounded-t-lg">
          <img :src="template.image" class="h-full w-full object-cover" alt="PPT模板" />
        </div>
        <div class="template-title rounded-b-lg p-2">
          <p class="text-xs text-gray-700 leading-normal">{{ template.title }}</p>
        </div>
      </NCard>
    </div>
  </NCard>
</template>

<style scoped>
.ppt-preview-panel {
  display: flex;
  flex-direction: column;
  height: 100%;
  border-radius: 0 12px 12px 0;
}

.template-card {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid #e5e7eb;
  overflow: hidden;
  border-radius: 16px !important;
}

.template-card:hover {
  transform: translateY(-4px);
  box-shadow:
    0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.template-card-active {
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #2b46fe;
}

.template-img {
  height: 144px;
  border-bottom: 1px solid #f3f4f6;
}

.template-title {
  min-height: 40px;
  background-color: #ffffff;
}

.category-tab {
  transition: all 0.3s ease;
}

.category-tab:hover {
  transform: translateY(-2px);
}

:deep(.n-input) {
  border-radius: 20px !important;
}

:deep(.n-input-wrapper) {
  padding-left: 12px;
  padding-right: 12px;
}

:deep(.n-card) {
  background-color: #ffffff;
  border-radius: 16px !important;
}
</style>
