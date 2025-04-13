<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { Icon } from '@iconify/vue';
import { useMessage } from 'naive-ui';

defineOptions({
  name: 'ResourcePreviewPanel'
});

const message = useMessage();

// 资源类型选项卡
const tabValue = ref('image');

// 生成状态
type GenerationState = 'empty' | 'generating' | 'display' | 'failed';

const generationStates = {
  EMPTY: 'empty' as GenerationState, // 未生成任何资源
  GENERATING: 'generating' as GenerationState, // 正在生成资源
  DISPLAY: 'display' as GenerationState, // 显示已生成的资源
  FAILED: 'failed' as GenerationState // 生成失败
};
const currentState = ref<GenerationState>(generationStates.EMPTY);

// 定义props接口
interface Props {
  isGenerating?: boolean;
}

// 使用类型化的props定义
const props = withDefaults(defineProps<Props>(), {
  isGenerating: false
});

// 定义事件
const emit = defineEmits<{
  (e: 'generationStateChange', state: GenerationState): void;
  (e: 'restart'): void;
  (e: 'adjustParameters'): void;
}>();

// 监视isGenerating变化
watch(
  () => props.isGenerating,
  newValue => {
    if (newValue) {
      currentState.value = generationStates.GENERATING;
    }
  },
  { immediate: true }
);

// 模拟生成资源
const resources = ref([
  {
    id: 1,
    type: 'image',
    preview: 'https://picsum.photos/600/400?random=1',
    title: '小学数学二年级加法概念示意图',
    tags: ['小学数学', '加法', '概念图'],
    description: '适用于二年级数学教学的加法概念示意图，使用简洁明了的视觉元素展示加法原理。',
    createTime: new Date().toLocaleString()
  },
  {
    id: 2,
    type: 'image',
    preview: 'https://picsum.photos/600/400?random=2',
    title: '小学语文汉字结构图解',
    tags: ['小学语文', '汉字结构', '教学图示'],
    description: '展示常见汉字的结构组成，适合低年级语文教学使用。',
    createTime: new Date().toLocaleString()
  },
  {
    id: 3,
    type: 'image',
    preview: 'https://picsum.photos/600/400?random=3',
    title: '初中物理电路图示例',
    tags: ['初中物理', '电路', '教学图示'],
    description: '初中物理电路基础知识图示，包含串联和并联电路的示意图。',
    createTime: new Date().toLocaleString()
  },
  {
    id: 4,
    type: 'image',
    preview: 'https://picsum.photos/600/400?random=4',
    title: '高中生物细胞结构图',
    tags: ['高中生物', '细胞结构', '教学图示'],
    description: '详细展示真核细胞结构组成的彩色插图，适合高中生物教学使用。',
    createTime: new Date().toLocaleString()
  }
]);

// 分页
const pagination = ref({
  page: 1,
  pageSize: 2,
  itemCount: 4
});

// 计算当前页的资源
const currentPageResources = computed(() => {
  const start = (pagination.value.page - 1) * pagination.value.pageSize;
  const end = start + pagination.value.pageSize;
  return resources.value.slice(start, end);
});

// 处理页码变化
function handlePageChange(page: number) {
  pagination.value.page = page;
}

// 重新生成
function regenerateResource() {
  currentState.value = generationStates.GENERATING;
  // 模拟生成过程
  setTimeout(() => {
    currentState.value = generationStates.DISPLAY;
    message.success('资源已重新生成');
    emit('generationStateChange', currentState.value);
  }, 2000);
}

// 保存到我的资源
function saveToMyResources() {
  message.success('已保存到我的资源');
}

// 下载资源
function downloadResource() {
  message.success('资源下载中...');
}

// 设置初始状态为空
currentState.value = generationStates.EMPTY;

// 模拟生成的资源，实际开发中应该从props接收
setTimeout(() => {
  if (!props.isGenerating) {
    currentState.value = generationStates.DISPLAY;
  }
}, 1000);
</script>

<template>
  <div class="resource-preview-panel">
    <NCard title="资源预览" class="preview-card">
      <!-- 资源类型选项卡 -->
      <NTabs v-model:value="tabValue" type="line" animated>
        <NTabPane name="image" tab="图片">
          <!-- 图片资源内容 -->
        </NTabPane>
        <NTabPane name="video" tab="视频">
          <!-- 视频资源内容 -->
        </NTabPane>
        <NTabPane name="animation" tab="动画">
          <!-- 动画资源内容 -->
        </NTabPane>
        <NTabPane name="interactive" tab="交互课件">
          <!-- 交互课件内容 -->
        </NTabPane>
      </NTabs>

      <!-- 空状态 -->
      <div v-if="currentState === generationStates.EMPTY" class="empty-state">
        <NEmpty description="尚未生成任何资源">
          <template #extra>
            <p class="mb-4 text-sm text-gray-500">请在左侧设置面板中填写必要信息并点击"开始生成"</p>
          </template>
        </NEmpty>
      </div>

      <!-- 生成中状态 -->
      <div v-else-if="currentState === generationStates.GENERATING" class="generating-state">
        <NSpin size="large">
          <template #description>
            <p class="mt-4">正在生成教学资源，请稍候...</p>
          </template>
        </NSpin>
      </div>

      <!-- 生成失败状态 -->
      <div v-else-if="currentState === generationStates.FAILED" class="failed-state">
        <NResult status="error" title="生成失败" description="资源生成过程中遇到了问题，请检查输入后重试">
          <template #footer>
            <NButton @click="regenerateResource">重新生成</NButton>
          </template>
        </NResult>
      </div>

      <!-- 资源展示状态 -->
      <div v-else-if="currentState === generationStates.DISPLAY" class="display-state">
        <!-- 资源数量和分页 -->
        <div class="mb-4 flex items-center justify-between">
          <div class="text-sm text-gray-600">共 {{ pagination.itemCount }} 个资源</div>
          <NPagination
            v-model:page="pagination.page"
            :page-count="Math.ceil(pagination.itemCount / pagination.pageSize)"
            :page-size="pagination.pageSize"
            @update:page="handlePageChange"
          />
        </div>

        <!-- 资源预览列表 -->
        <div class="resource-list">
          <div v-for="resource in currentPageResources" :key="resource.id" class="resource-item">
            <div class="resource-preview">
              <NImage :src="resource.preview" object-fit="cover" preview-disabled class="preview-image" />
            </div>
            <div class="resource-info">
              <h3 class="resource-title">{{ resource.title }}</h3>

              <div class="resource-tags mb-2">
                <NTag v-for="tag in resource.tags" :key="tag" size="small" class="mr-1">
                  {{ tag }}
                </NTag>
              </div>

              <p class="resource-description">{{ resource.description }}</p>

              <div class="mt-2 text-xs text-gray-500">创建时间: {{ resource.createTime }}</div>

              <div class="resource-actions mt-4">
                <NSpace>
                  <NTooltip>
                    <template #trigger>
                      <NButton secondary circle @click="regenerateResource">
                        <template #icon>
                          <Icon icon="carbon:renew" />
                        </template>
                      </NButton>
                    </template>
                    重新生成
                  </NTooltip>

                  <NTooltip>
                    <template #trigger>
                      <NButton secondary circle @click="saveToMyResources">
                        <template #icon>
                          <Icon icon="carbon:save" />
                        </template>
                      </NButton>
                    </template>
                    保存到我的资源
                  </NTooltip>

                  <NTooltip>
                    <template #trigger>
                      <NButton secondary circle @click="downloadResource">
                        <template #icon>
                          <Icon icon="carbon:download" />
                        </template>
                      </NButton>
                    </template>
                    下载资源
                  </NTooltip>
                </NSpace>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 底部按钮区域 - 位于内容区域内 -->
      <div class="bottom-actions">
        <button class="back-button" @click="$emit('restart')">
          <Icon icon="carbon:reset" class="mr-1" />
          <span>重新开始</span>
        </button>
        <button class="preview-button" @click="$emit('adjustParameters')">
          <Icon icon="carbon:settings-adjust" class="mr-1" />
          <span>调整参数</span>
        </button>
      </div>
    </NCard>
  </div>
</template>

<style scoped>
.resource-preview-panel {
  height: 100%;
}

.preview-card {
  height: 100%;
  display: flex;
  flex-direction: column;
}

:deep(.n-card__content) {
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

.empty-state,
.generating-state,
.failed-state {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
}

.resource-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.resource-item {
  border: 1px solid #eee;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.resource-preview {
  width: 220px;
  min-width: 220px;
  height: 160px;
  background-color: #f9f9f9;
  overflow: hidden;
}

.preview-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.resource-info {
  padding: 1rem;
  flex: 1;
}

.resource-title {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #333;
}

.resource-description {
  font-size: 0.875rem;
  color: #666;
  margin-bottom: 0.5rem;
  line-height: 1.4;
}

@media (max-width: 768px) {
  .resource-item {
    flex-direction: column;
  }

  .resource-preview {
    width: 100%;
    height: 180px;
  }
}

.bottom-actions {
  margin-top: auto;
  padding-top: 20px;
  display: flex;
  justify-content: space-between;
}

.back-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  color: #333;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
}

.back-button:hover {
  background-color: #f5f5f5;
  border-color: #d0d0d0;
}

.preview-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  background-color: #2b46fe;
  border-radius: 8px;
  color: white;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.preview-button:hover {
  background-color: #1a33db;
}
</style>
