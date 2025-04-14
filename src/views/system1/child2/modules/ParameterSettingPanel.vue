<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { Icon } from '@iconify/vue';
import { useMessage } from 'naive-ui';

defineOptions({
  name: 'ParameterSettingPanel'
});

const message = useMessage();

// 基本参数
const parameters = ref({
  // 输出尺寸
  outputSize: '16:9',
  width: 1920,
  height: 1080,
  // 美化参数
  style: 'auto',
  colorfulness: 70,
  contrast: 50,
  detailLevel: 60,
  // 教学参数
  ageGroup: 'primary',
  complexity: 50,
  focusOnKey: true,
  includeExamples: true,
  // 高级参数
  seed: Math.floor(Math.random() * 10000000),
  iterations: 30,
  guidanceScale: 7.5,
  negativePrompt: '',
  // 输出参数
  format: 'png',
  quality: 90,
  resolution: 72
});

// 预设尺寸选项
const sizePresets = [
  { label: '16:9', width: 1920, height: 1080 },
  { label: '4:3', width: 1600, height: 1200 },
  { label: '1:1', width: 1080, height: 1080 },
  { label: '9:16', width: 1080, height: 1920 },
  { label: '3:4', width: 1200, height: 1600 }
];

// 计算有效设置数
const effectiveSettingsCount = computed(() => {
  let count = 0;
  if (parameters.value.style !== 'auto') count += 1;
  if (parameters.value.colorfulness !== 50) count += 1;
  if (parameters.value.contrast !== 50) count += 1;
  if (parameters.value.detailLevel !== 50) count += 1;
  if (parameters.value.ageGroup !== 'auto') count += 1;
  if (parameters.value.complexity !== 50) count += 1;
  if (parameters.value.focusOnKey !== false) count += 1;
  if (parameters.value.includeExamples !== false) count += 1;
  return count;
});

// 格式选项
const formatOptions = [
  { label: 'PNG (透明背景)', value: 'png' },
  { label: 'JPEG (小文件)', value: 'jpeg' },
  { label: 'WebP (现代格式)', value: 'webp' },
  { label: 'SVG (矢量图)', value: 'svg' }
];

// 年龄段选项
const ageGroupOptions = [
  { label: '自动选择', value: 'auto' },
  { label: '幼儿园', value: 'kindergarten' },
  { label: '小学', value: 'primary' },
  { label: '初中', value: 'junior' },
  { label: '高中', value: 'senior' },
  { label: '大学', value: 'college' }
];

// 风格选项
const styleOptions = [
  { label: '自动选择', value: 'auto' },
  { label: '简约风格', value: 'minimal' },
  { label: '卡通风格', value: 'cartoon' },
  { label: '写实风格', value: 'realistic' },
  { label: '科技风格', value: 'tech' },
  { label: '手绘风格', value: 'sketch' }
];

// 处理尺寸预设选择
function handlePresetChange(preset: { label: string; width: number; height: number }) {
  parameters.value.outputSize = preset.label;
  parameters.value.width = preset.width;
  parameters.value.height = preset.height;
}

// 重置所有参数
function resetParameters() {
  parameters.value = {
    outputSize: '16:9',
    width: 1920,
    height: 1080,
    style: 'auto',
    colorfulness: 70,
    contrast: 50,
    detailLevel: 60,
    ageGroup: 'primary',
    complexity: 50,
    focusOnKey: true,
    includeExamples: true,
    seed: Math.floor(Math.random() * 10000000),
    iterations: 30,
    guidanceScale: 7.5,
    negativePrompt: '',
    format: 'png',
    quality: 90,
    resolution: 72
  };
  message.success('参数已重置为默认值');
}

// 通知父组件参数变化
const emit = defineEmits<{
  (e: 'parametersChange', params: typeof parameters.value): void;
  (e: 'back'): void;
}>();

// 监听参数变化
watch(
  parameters,
  newParams => {
    emit('parametersChange', newParams);
  },
  { deep: true }
);
</script>

<template>
  <div class="parameter-setting-panel">
    <NCard title="参数设置" class="h-full" content-class="parameter-content">
      <template #header-extra>
        <NSpace>
          <NTooltip placement="top">
            <template #trigger>
              <NButton size="small" quaternary circle @click="resetParameters">
                <template #icon>
                  <Icon icon="carbon:reset" />
                </template>
              </NButton>
            </template>
            重置参数
          </NTooltip>
          <NTag v-if="effectiveSettingsCount > 0" type="info" size="small">
            {{ effectiveSettingsCount }} 项自定义设置
          </NTag>
        </NSpace>
      </template>

      <NScrollbar>
        <NCollapse arrow-placement="right" default-expanded-names="output">
          <!-- 输出尺寸设置 -->
          <NCollapseItem title="输出尺寸" name="output">
            <div class="mb-4">
              <NSpace vertical>
                <div class="flex justify-between">
                  <div class="text-sm text-gray-500">预设尺寸：</div>
                  <div class="preset-buttons flex gap-2">
                    <NButton
                      v-for="preset in sizePresets"
                      :key="preset.label"
                      size="tiny"
                      :type="parameters.outputSize === preset.label ? 'primary' : 'default'"
                      :quaternary="parameters.outputSize !== preset.label"
                      class="aspect-ratio-button"
                      @click="handlePresetChange(preset)"
                    >
                      {{ preset.label }}
                    </NButton>
                  </div>
                </div>

                <div class="flex gap-4">
                  <NFormItem label="宽度" class="flex-1">
                    <NInputNumber v-model:value="parameters.width" :min="100" :max="4000" class="w-full" />
                  </NFormItem>
                  <div class="flex items-center text-gray-400">×</div>
                  <NFormItem label="高度" class="flex-1">
                    <NInputNumber v-model:value="parameters.height" :min="100" :max="4000" class="w-full" />
                  </NFormItem>
                </div>
              </NSpace>
            </div>
          </NCollapseItem>

          <!-- 美化参数 -->
          <NCollapseItem title="美化参数" name="visual">
            <div class="mb-4 flex flex-col gap-4">
              <!-- 风格选择 -->
              <NFormItem label="风格">
                <NSelect v-model:value="parameters.style" :options="styleOptions" class="w-full" />
              </NFormItem>

              <!-- 色彩饱和度 -->
              <div class="slider-control">
                <div class="mb-1 flex items-center justify-between">
                  <div class="text-sm">色彩饱和度</div>
                  <div class="text-xs text-gray-500">{{ parameters.colorfulness }}%</div>
                </div>
                <NSlider v-model:value="parameters.colorfulness" :min="0" :max="100" :step="5" class="w-full" />
                <div class="flex justify-between text-xs text-gray-400">
                  <div>低饱和</div>
                  <div>高饱和</div>
                </div>
              </div>

              <!-- 对比度 -->
              <div class="slider-control">
                <div class="mb-1 flex items-center justify-between">
                  <div class="text-sm">对比度</div>
                  <div class="text-xs text-gray-500">{{ parameters.contrast }}%</div>
                </div>
                <NSlider v-model:value="parameters.contrast" :min="0" :max="100" :step="5" class="w-full" />
                <div class="flex justify-between text-xs text-gray-400">
                  <div>低对比</div>
                  <div>高对比</div>
                </div>
              </div>

              <!-- 细节程度 -->
              <div class="slider-control">
                <div class="mb-1 flex items-center justify-between">
                  <div class="text-sm">细节程度</div>
                  <div class="text-xs text-gray-500">{{ parameters.detailLevel }}%</div>
                </div>
                <NSlider v-model:value="parameters.detailLevel" :min="0" :max="100" :step="5" class="w-full" />
                <div class="flex justify-between text-xs text-gray-400">
                  <div>简约</div>
                  <div>精细</div>
                </div>
              </div>
            </div>
          </NCollapseItem>

          <!-- 教学参数 -->
          <NCollapseItem title="教学参数" name="teaching">
            <div class="mb-4 flex flex-col gap-4">
              <!-- 年龄段 -->
              <NFormItem label="目标年龄段">
                <NSelect v-model:value="parameters.ageGroup" :options="ageGroupOptions" class="w-full" />
              </NFormItem>

              <!-- 复杂度 -->
              <div class="slider-control">
                <div class="mb-1 flex items-center justify-between">
                  <div class="text-sm">内容复杂度</div>
                  <div class="text-xs text-gray-500">{{ parameters.complexity }}%</div>
                </div>
                <NSlider v-model:value="parameters.complexity" :min="0" :max="100" :step="5" class="w-full" />
                <div class="flex justify-between text-xs text-gray-400">
                  <div>简单</div>
                  <div>复杂</div>
                </div>
              </div>

              <!-- 教学设置 -->
              <div class="flex flex-col gap-2">
                <NSwitch v-model:value="parameters.focusOnKey">
                  <template #checked>突出关键概念</template>
                  <template #unchecked>普通展示内容</template>
                </NSwitch>
                <NSwitch v-model:value="parameters.includeExamples">
                  <template #checked>包含教学示例</template>
                  <template #unchecked>仅展示概念</template>
                </NSwitch>
              </div>
            </div>
          </NCollapseItem>

          <!-- 高级参数 -->
          <NCollapseItem title="高级参数" name="advanced">
            <div class="mb-4 flex flex-col gap-4">
              <!-- 随机种子 -->
              <NFormItem label="随机种子">
                <div class="flex gap-2">
                  <NInputNumber v-model:value="parameters.seed" class="flex-1" />
                  <NButton quaternary @click="parameters.seed = Math.floor(Math.random() * 10000000)">
                    <template #icon>
                      <Icon icon="carbon:renew" />
                    </template>
                  </NButton>
                </div>
              </NFormItem>

              <!-- 迭代次数 -->
              <div class="slider-control">
                <div class="mb-1 flex items-center justify-between">
                  <div class="text-sm">迭代次数</div>
                  <div class="text-xs text-gray-500">{{ parameters.iterations }}次</div>
                </div>
                <NSlider v-model:value="parameters.iterations" :min="10" :max="50" :step="5" class="w-full" />
              </div>

              <!-- 引导系数 -->
              <div class="slider-control">
                <div class="mb-1 flex items-center justify-between">
                  <div class="text-sm">引导系数</div>
                  <div class="text-xs text-gray-500">{{ parameters.guidanceScale }}</div>
                </div>
                <NSlider v-model:value="parameters.guidanceScale" :min="1" :max="20" :step="0.5" class="w-full" />
              </div>

              <!-- 负面提示词 -->
              <NFormItem label="排除内容">
                <NInput
                  v-model:value="parameters.negativePrompt"
                  type="textarea"
                  placeholder="输入不希望在生成结果中出现的内容"
                  class="w-full"
                />
              </NFormItem>
            </div>
          </NCollapseItem>

          <!-- 输出参数 -->
          <NCollapseItem title="输出参数" name="export">
            <div class="mb-4 flex flex-col gap-4">
              <!-- 文件格式 -->
              <NFormItem label="文件格式">
                <NSelect v-model:value="parameters.format" :options="formatOptions" class="w-full" />
              </NFormItem>

              <!-- 图像质量 -->
              <div class="slider-control">
                <div class="mb-1 flex items-center justify-between">
                  <div class="text-sm">图像质量</div>
                  <div class="text-xs text-gray-500">{{ parameters.quality }}%</div>
                </div>
                <NSlider v-model:value="parameters.quality" :min="50" :max="100" :step="5" class="w-full" />
              </div>

              <!-- 分辨率 -->
              <NFormItem label="分辨率">
                <div class="flex items-center gap-2">
                  <NInputNumber v-model:value="parameters.resolution" :min="72" :max="300" class="flex-1" />
                  <span class="text-sm text-gray-500">DPI</span>
                </div>
              </NFormItem>
            </div>
          </NCollapseItem>
        </NCollapse>
      </NScrollbar>

      <!-- 底部按钮区域 -->
      <div class="bottom-actions">
        <div class="flex items-center justify-start">
          <NButton @click="$emit('back')">
            <template #icon>
              <Icon icon="carbon:arrow-left" />
            </template>
            返回输入内容
          </NButton>
        </div>
      </div>
    </NCard>
  </div>
</template>

<style scoped>
.parameter-setting-panel {
  height: 100%;
  min-height: 700px;
  max-height: 100%;
}

.parameter-content {
  padding: 0;
}

:deep(.n-card) {
  height: 100%;
  display: flex;
  flex-direction: column;
}

:deep(.n-card__content) {
  flex: 1;
  display: flex;
  flex-direction: column;
}

:deep(.n-scrollbar) {
  flex: 1;
  overflow-y: visible;
  min-height: 450px;
}

:deep(.n-scrollbar-container) {
  padding: 16px;
}

:deep(.n-collapse .n-collapse-item:last-child) {
  margin-bottom: 0;
}

.aspect-ratio-button {
  min-width: 40px;
}

.slider-control {
  width: 100%;
}

.bottom-actions {
  margin-top: auto;
  padding-top: 16px;
}
</style>
