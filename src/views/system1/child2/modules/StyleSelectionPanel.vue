<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue';
import { NButton, NCard, NTag } from 'naive-ui';
import { Icon } from '@iconify/vue';

defineOptions({
  name: 'StyleSelectionPanel'
});

// 风格类别
const styleCategories = [
  { id: 'all', name: '全部', icon: 'carbon:view-filled' },
  { id: 'simple', name: '简约', icon: 'carbon:clean' },
  { id: 'cartoon', name: '卡通', icon: 'carbon:face-satisfied' },
  { id: 'realistic', name: '写实', icon: 'carbon:photo' },
  { id: 'retro', name: '复古', icon: 'carbon:time' },
  { id: 'future', name: '未来', icon: 'carbon:rocket' },
  { id: 'hand', name: '手绘', icon: 'carbon:pen' }
];

// 当前选中的类别
const currentCategory = ref('all');

// 风格选择数组
const styleItems = reactive([
  {
    id: 1,
    name: '简约清新',
    category: 'simple',
    preview: 'https://picsum.photos/100/80?random=1',
    selected: false
  },
  {
    id: 2,
    name: '手绘风格',
    category: 'hand',
    preview: 'https://picsum.photos/100/80?random=2',
    selected: false
  },
  {
    id: 3,
    name: '卡通人物',
    category: 'cartoon',
    preview: 'https://picsum.photos/100/80?random=3',
    selected: false
  },
  {
    id: 4,
    name: '科技未来',
    category: 'future',
    preview: 'https://picsum.photos/100/80?random=4',
    selected: false
  },
  {
    id: 5,
    name: '复古怀旧',
    category: 'retro',
    preview: 'https://picsum.photos/100/80?random=5',
    selected: false
  },
  {
    id: 6,
    name: '写实教学',
    category: 'realistic',
    preview: 'https://picsum.photos/100/80?random=6',
    selected: false
  },
  {
    id: 7,
    name: '线条简约',
    category: 'simple',
    preview: 'https://picsum.photos/100/80?random=7',
    selected: false
  },
  {
    id: 8,
    name: '卡通场景',
    category: 'cartoon',
    preview: 'https://picsum.photos/100/80?random=8',
    selected: false
  },
  {
    id: 9,
    name: '抽象几何',
    category: 'future',
    preview: 'https://picsum.photos/100/80?random=9',
    selected: false
  },
  {
    id: 10,
    name: '素描手绘',
    category: 'hand',
    preview: 'https://picsum.photos/100/80?random=10',
    selected: false
  },
  {
    id: 11,
    name: '80年代风',
    category: 'retro',
    preview: 'https://picsum.photos/100/80?random=11',
    selected: false
  },
  {
    id: 12,
    name: '自然写实',
    category: 'realistic',
    preview: 'https://picsum.photos/100/80?random=12',
    selected: false
  }
]);

// 根据当前类别过滤风格
const filteredStyles = computed(() => {
  if (currentCategory.value === 'all') {
    return styleItems;
  }
  return styleItems.filter(item => item.category === currentCategory.value);
});

// 已选择的风格
const selectedStyles = computed(() => {
  return styleItems.filter(item => item.selected);
});

// 选择风格
function toggleStyleSelection(styleId: number) {
  const style = styleItems.find(item => item.id === styleId);
  if (style) {
    style.selected = !style.selected;
  }
}

// 清除所有选择
function clearSelection() {
  styleItems.forEach(item => {
    item.selected = false;
  });
}

// 发出选择变更事件
const emit = defineEmits<{
  (e: 'update:selectedStyles', styles: Array<{ id: number; name: string }>): void;
  //   (e: 'back'): void;
  (e: 'next'): void;
}>();

// 监听选择变化并发出事件
watch(
  selectedStyles,
  newSelectedStyles => {
    emit(
      'update:selectedStyles',
      newSelectedStyles.map(style => ({ id: style.id, name: style.name }))
    );
  },
  { deep: true }
);
</script>

<template>
  <div class="style-selection-panel h-full flex flex-col">
    <NCard title="风格选择" class="style-card">
      <!-- 风格分类标签 -->
      <div class="categories-container mb-2">
        <div class="categories-wrapper flex gap-1 overflow-x-auto py-1">
          <NTag
            v-for="category in styleCategories"
            :key="category.id"
            :type="currentCategory === category.id ? 'primary' : 'default'"
            round
            class="category-tag whitespace-nowrap"
            @click="currentCategory = category.id"
          >
            <div class="tag-content flex items-center">
              <Icon :icon="category.icon" class="mr-1" />
              {{ category.name }}
            </div>
          </NTag>
        </div>
      </div>

      <!-- 已选择的风格 -->
      <div v-if="selectedStyles.length > 0" class="selected-styles mb-2">
        <div class="mb-1 flex items-center justify-between">
          <div class="text-sm font-medium">已选风格</div>
          <NButton text size="small" @click="clearSelection">
            <template #icon>
              <Icon icon="carbon:close" />
            </template>
            清除
          </NButton>
        </div>
        <div class="selected-tags flex flex-wrap">
          <NTag
            v-for="style in selectedStyles"
            :key="style.id"
            type="success"
            closable
            class="mb-1 mr-1"
            @close="toggleStyleSelection(style.id)"
          >
            {{ style.name }}
          </NTag>
        </div>
      </div>

      <div class="my-2 border-t border-gray-200"></div>

      <!-- 风格网格 -->
      <div class="style-grid-container">
        <div v-if="filteredStyles.length === 0" class="empty-state flex items-center justify-center py-6">
          <div class="text-center text-gray-500">
            <div class="mb-1">
              <Icon icon="carbon:no-image" class="text-4xl" />
            </div>
            <p>当前分类下没有风格</p>
          </div>
        </div>
        <div v-else class="grid grid-cols-3 gap-2">
          <div
            v-for="style in filteredStyles"
            :key="style.id"
            class="style-item cursor-pointer border rounded p-1"
            :class="{ 'border-primary ring-2 ring-primary-100': style.selected, 'border-gray-200': !style.selected }"
            @click="toggleStyleSelection(style.id)"
          >
            <div class="preview-container relative mb-1">
              <img :src="style.preview" class="style-preview h-20 w-full rounded object-cover" />
              <div
                v-if="style.selected"
                class="checkbox-overlay absolute right-1 top-1 rounded-full bg-primary p-1 text-white"
              >
                <Icon icon="carbon:checkmark" />
              </div>
            </div>
            <div class="style-name truncate text-center text-xs">{{ style.name }}</div>
          </div>
        </div>
      </div>

      <!-- 底部按钮区域 -->
      <div class="bottom-actions pt-2">
        <div class="flex items-center justify-end">
          <NButton type="primary" @click="$emit('next')">
            <template #icon>
              <Icon icon="carbon:view" />
            </template>
            教学资源预览
          </NButton>
        </div>
      </div>
    </NCard>
  </div>
</template>

<style scoped>
.style-selection-panel {
  height: 100%;
  min-height: 650px;
  max-height: 100%;
}

.style-card {
  height: 100%;
  display: flex;
  flex-direction: column;
}

:deep(.n-card__content) {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 12px;
}

.style-grid-container {
  flex: 1;
  overflow-y: auto;
  padding-right: 4px;
  margin-bottom: 8px;
  min-height: 450px;
}

.style-grid-container::-webkit-scrollbar {
  width: 4px;
}

.style-grid-container::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.style-grid-container::-webkit-scrollbar-thumb {
  background: #ddd;
  border-radius: 10px;
}

.style-grid-container::-webkit-scrollbar-thumb:hover {
  background: #ccc;
}

.bottom-actions {
  margin-top: auto;
  padding-top: 8px;
}

.border-primary {
  border-color: var(--primary-color, #2080f0);
}

.ring-primary-100 {
  box-shadow: 0 0 0 2px rgba(var(--primary-color-rgb, 32, 128, 240), 0.2);
}

.bg-primary {
  background-color: var(--primary-color, #2080f0);
}
</style>
