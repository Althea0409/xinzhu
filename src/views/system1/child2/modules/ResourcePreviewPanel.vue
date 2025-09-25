<script setup lang="ts">
import { ref, watch } from 'vue';
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
    preview: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=400&h=300&fit=crop',
    title: '《观沧海》诗歌意境图',
    tags: ['初中语文', '古诗词', '意境表达'],
    description: '展现曹操登临碣石山观海的壮阔场景，体现诗人胸怀天下的雄心壮志和豪迈气概。',
    createTime: new Date().toLocaleString()
  },
  {
    id: 2,
    type: 'image',
    preview: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=400&h=300&fit=crop',
    title: '东汉末年历史背景图',
    tags: ['初中语文', '历史背景', '时代特色'],
    description: '展现东汉末年的历史背景，帮助学生理解曹操创作《观沧海》时的时代环境和心境。',
    createTime: new Date().toLocaleString()
  },
  {
    id: 3,
    type: 'image',
    preview: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop',
    title: '《观沧海》书法作品',
    tags: ['初中语文', '书法艺术', '文字美感'],
    description: '以楷书形式展现《观沧海》全诗，体现汉字的书法美感，增强学生对古诗词的审美体验。',
    createTime: new Date().toLocaleString()
  },
  {
    id: 4,
    type: 'video',
    preview: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=400&h=300&fit=crop',
    title: '《观沧海》朗诵视频',
    tags: ['初中语文', '诗歌朗诵', '情感表达'],
    description: '专业配音员朗诵《观沧海》，配合意境画面，展现诗歌的韵律美和情感内涵。',
    duration: '3:25',
    format: 'MP4',
    resolution: '1080p',
    size: '45MB',
    voiceType: '专业男声',
    background: '古典音乐',
    scenes: ['诗歌背景介绍', '逐句朗诵解析', '整体情感表达'],
    createTime: new Date().toLocaleString()
  },
  {
    id: 5,
    type: 'video',
    preview: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop',
    title: '曹操生平与创作背景',
    tags: ['初中语文', '作者介绍', '历史人物'],
    description: '介绍曹操的生平事迹和《观沧海》的创作背景，帮助学生深入理解诗歌内涵。',
    duration: '5:15',
    format: 'MP4',
    resolution: '720p',
    size: '58MB',
    content: ['曹操生平简介', '东汉末年历史背景', '诗歌创作缘由', '文学地位分析'],
    createTime: new Date().toLocaleString()
  },
  {
    id: 6,
    type: 'animation',
    preview: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=300&fit=crop',
    title: '《观沧海》诗句动画解析',
    tags: ['初中语文', '诗句解析', '动画教学'],
    description: '逐句动画展示《观沧海》的诗句含义，通过视觉效果帮助学生理解诗歌的深层内涵。',
    duration: '4:30',
    format: 'HTML5',
    frames: 148,
    frameRate: '30fps',
    style: '中国风动画',
    interactions: ['暂停/播放控制', '逐句解析', '重点词汇标注'],
    createTime: new Date().toLocaleString()
  },
  {
    id: 7,
    type: 'animation',
    preview: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
    title: '古诗词写作手法动画演示',
    tags: ['初中语文', '写作手法', '借景抒情'],
    description: '通过动画展示《观沧海》中借景抒情、虚实结合等写作手法，提升学生的文学鉴赏能力。',
    duration: '3:58',
    format: 'HTML5',
    frames: 132,
    frameRate: '30fps',
    style: '教学动画',
    interactions: ['分步演示', '手法标注', '实时解析'],
    createTime: new Date().toLocaleString()
  },
  {
    id: 8,
    type: 'audio',
    preview: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop',
    title: '《观沧海》标准朗诵音频',
    tags: ['初中语文', '诗歌朗诵', '语音示范'],
    description: '专业播音员标准朗诵《观沧海》，展现古诗词的韵律美和节奏感，供学生模仿学习。',
    duration: '2:15',
    format: 'MP3',
    bitrate: '320kbps',
    size: '4.2MB',
    voiceType: '专业男声',
    language: '中文',
    background: '古典音乐伴奏',
    tracks: [
      { name: '诗歌背景介绍', time: '0:00-0:30' },
      { name: '完整朗诵示范', time: '0:31-1:15' },
      { name: '重点句式强调', time: '1:16-2:15' }
    ],
    createTime: new Date().toLocaleString()
  },
  {
    id: 9,
    type: 'audio',
    preview: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=400&h=300&fit=crop',
    title: '《观沧海》文学赏析讲解',
    tags: ['初中语文', '文学赏析', '深度解读'],
    description: '语文教师深度解析《观沧海》的文学价值、艺术特色和思想内涵，提升学生的文学素养。',
    duration: '4:25',
    format: 'MP3',
    bitrate: '320kbps',
    size: '7.8MB',
    voiceType: '专业教师',
    language: '中文',
    background: '无背景音乐',
    tracks: [
      { name: '诗歌创作背景分析', time: '0:00-1:15' },
      { name: '艺术手法解析', time: '1:16-2:40' },
      { name: '思想情感探讨', time: '2:41-4:25' }
    ],
    createTime: new Date().toLocaleString()
  },
  {
    id: 10,
    type: 'interactive',
    preview: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop',
    title: '《观沧海》诗词填空游戏',
    tags: ['初中语文', '互动练习', '记忆训练'],
    description: '基于《观沧海》设计的互动填空游戏，学生需要根据提示填入正确的诗句，加深对诗歌的记忆。',
    format: 'H5',
    platform: '网页/平板',
    interactive: true,
    fileSize: '12MB',
    scenes: 5,
    difficulty: ['初级', '中级', '高级'],
    features: ['随机题目生成', '提示功能', '成绩记录', '错误分析', '学习进度跟踪'],
    supportedDevices: ['电脑', '平板', '手机'],
    minPlayTime: '15分钟',
    createTime: new Date().toLocaleString()
  },
  {
    id: 11,
    type: 'interactive',
    preview: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
    title: '古诗词赏析互动课件',
    tags: ['初中语文', '诗词赏析', '互动教学'],
    description: '《观沧海》赏析互动课件，包含诗句解析、写作背景、艺术手法等多个模块的深度学习内容。',
    format: 'H5',
    platform: '网页/平板/手机',
    interactive: true,
    fileSize: '15MB',
    scenes: 6,
    difficulty: ['基础理解', '深度赏析', '拓展思考'],
    features: ['多媒体展示', '互动问答', '知识点标注', '学习笔记', '测试评估'],
    supportedDevices: ['电脑', '平板', '手机'],
    minPlayTime: '25分钟',
    createTime: new Date().toLocaleString()
  },
  {
    id: 12,
    type: 'interactive',
    preview: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=400&h=300&fit=crop',
    title: '虚拟古诗词世界探索',
    tags: ['初中语文', '沉浸体验', '文化探索'],
    description: '虚拟现实环境中的《观沧海》文化探索，学生可以"穿越"到东汉末年，体验曹操创作时的历史情境。',
    format: 'H5',
    platform: '网页/平板',
    interactive: true,
    fileSize: '24MB',
    scenes: 4,
    difficulty: ['历史了解', '文化体验'],
    features: ['3D历史场景', '角色扮演', '历史对话', '文化知识问答', '沉浸式学习'],
    supportedDevices: ['电脑', '平板'],
    minPlayTime: '30分钟',
    createTime: new Date().toLocaleString()
  }
]);

// 分页
const pagination = ref({
  page: 1,
  pageSize: 4,
  itemCount: 12
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

// 下载资源
function downloadResource() {
  message.success('资源下载中...');
}

// 设置初始状态为空
currentState.value = generationStates.GENERATING;

// 模拟生成的资源，实际开发中应该从props接收
setTimeout(() => {
  if (!props.isGenerating) {
    currentState.value = generationStates.DISPLAY;
  }
}, 2000);
</script>

<template>
  <div class="resource-preview-panel h-full">
    <NCard title="资源预览" class="preview-card">
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
        <!-- 主题信息展示 -->
        <div class="theme-info mb-4 rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
          <h2 class="mb-2 text-lg text-primary font-bold">《观沧海》- 多媒体教学资源</h2>
          <p class="text-sm text-gray-700 dark:text-gray-300">
            这组教学资源专为初中语文七年级学生设计，围绕曹操的经典诗作《观沧海》，
            帮助学生深入理解古诗词的意境美、艺术手法和思想情感。资源包括诗歌意境图、朗诵视频、动画解析和互动课件等多种形式。
          </p>
          <div class="mt-2 flex flex-wrap gap-2">
            <NTag type="success" size="small">适合初中七年级</NTag>
            <NTag type="info" size="small">包含12个教学资源</NTag>
            <NTag type="warning" size="small">人教版语文教材配套</NTag>
          </div>
        </div>

        <!-- 资源类型选项卡 -->
        <NTabs v-model:value="tabValue" type="line" animated>
          <NTabPane name="image" tab="图片">
            <!-- 图片资源内容 -->
            <div class="resource-content">
              <div class="resource-grid">
                <div
                  v-for="resource in resources.filter(r => r.type === 'image')"
                  :key="resource.id"
                  class="resource-card"
                >
                  <div class="resource-preview">
                    <div class="resource-type-badge">图片</div>
                    <NImage
                      :src="resource.preview"
                      object-fit="cover"
                      preview-disabled
                      class="preview-image"
                      :img-props="{
                        style: 'width: 100%; height: 140px; object-fit: cover;'
                      }"
                    />
                  </div>

                  <div class="resource-info p-4">
                    <h3 class="mb-2 text-lg font-bold">{{ resource.title }}</h3>

                    <div class="mb-2 flex flex-wrap gap-1">
                      <NTag v-for="tag in resource.tags" :key="tag" size="small">
                        {{ tag }}
                      </NTag>
                    </div>

                    <p class="text-sm text-gray-600 dark:text-gray-300">{{ resource.description }}</p>

                    <div class="card-footer mt-4">
                      <div class="flex items-center justify-between">
                        <div class="text-xs text-gray-500">{{ resource.createTime }}</div>

                        <div class="resource-actions flex gap-2">
                          <NButton size="small" secondary>
                            <template #icon>
                              <Icon icon="carbon:view" />
                            </template>
                            预览
                          </NButton>

                          <NButton size="small" type="primary" ghost>
                            <template #icon>
                              <Icon icon="carbon:download" />
                            </template>
                            下载
                          </NButton>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </NTabPane>

          <NTabPane name="video" tab="视频">
            <!-- 视频资源内容 -->
            <div class="resource-content">
              <div class="resource-grid">
                <div
                  v-for="resource in resources.filter(r => r.type === 'video')"
                  :key="resource.id"
                  class="resource-card"
                >
                  <div class="resource-preview">
                    <div class="resource-type-badge">视频</div>
                    <NImage
                      :src="resource.preview"
                      object-fit="cover"
                      preview-disabled
                      class="preview-image"
                      :img-props="{
                        style: 'width: 100%; height: 140px; object-fit: cover;'
                      }"
                    />
                    <div class="duration-badge">
                      {{ resource.duration }}
                    </div>
                  </div>

                  <div class="resource-info p-4">
                    <h3 class="mb-2 text-lg font-bold">{{ resource.title }}</h3>

                    <div class="mb-2 flex flex-wrap gap-1">
                      <NTag v-for="tag in resource.tags" :key="tag" size="small">
                        {{ tag }}
                      </NTag>
                    </div>

                    <p class="text-sm text-gray-600 dark:text-gray-300">{{ resource.description }}</p>

                    <!-- 视频资源特有信息 -->
                    <div class="grid grid-cols-2 mt-3 gap-2 text-xs text-gray-500">
                      <div>
                        <span class="font-medium">格式:</span>
                        {{ resource.format }}
                      </div>
                      <div>
                        <span class="font-medium">分辨率:</span>
                        {{ resource.resolution }}
                      </div>
                      <div>
                        <span class="font-medium">大小:</span>
                        {{ resource.size }}
                      </div>
                      <div>
                        <span class="font-medium">时长:</span>
                        {{ resource.duration }}
                      </div>
                    </div>

                    <div class="card-footer mt-4">
                      <div class="flex items-center justify-between">
                        <div class="text-xs text-gray-500">{{ resource.createTime }}</div>

                        <div class="resource-actions flex gap-2">
                          <NButton size="small" secondary>
                            <template #icon>
                              <Icon icon="carbon:view" />
                            </template>
                            预览
                          </NButton>

                          <NButton size="small" type="primary" ghost>
                            <template #icon>
                              <Icon icon="carbon:download" />
                            </template>
                            下载
                          </NButton>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </NTabPane>

          <NTabPane name="animation" tab="动画">
            <!-- 动画资源内容 -->
            <div class="resource-content">
              <div class="resource-grid">
                <div
                  v-for="resource in resources.filter(r => r.type === 'animation')"
                  :key="resource.id"
                  class="resource-card"
                >
                  <div class="resource-preview">
                    <div class="resource-type-badge">动画</div>
                    <NImage
                      :src="resource.preview"
                      object-fit="cover"
                      preview-disabled
                      class="preview-image"
                      :img-props="{
                        style: 'width: 100%; height: 140px; object-fit: cover;'
                      }"
                    />
                    <div class="duration-badge">
                      {{ resource.duration }}
                    </div>
                  </div>

                  <div class="resource-info p-4">
                    <h3 class="mb-2 text-lg font-bold">{{ resource.title }}</h3>

                    <div class="mb-2 flex flex-wrap gap-1">
                      <NTag v-for="tag in resource.tags" :key="tag" size="small">
                        {{ tag }}
                      </NTag>
                    </div>

                    <p class="text-sm text-gray-600 dark:text-gray-300">{{ resource.description }}</p>

                    <!-- 动画资源特有信息 -->
                    <div class="grid grid-cols-2 mt-3 gap-2 text-xs text-gray-500">
                      <div>
                        <span class="font-medium">格式:</span>
                        {{ resource.format }}
                      </div>
                      <div>
                        <span class="font-medium">帧数:</span>
                        {{ resource.frames }} ({{ resource.frameRate }})
                      </div>
                      <div>
                        <span class="font-medium">风格:</span>
                        {{ resource.style }}
                      </div>
                      <div>
                        <span class="font-medium">交互:</span>
                        {{ resource.interactions ? resource.interactions[0] + '等' : '无' }}
                      </div>
                    </div>

                    <div class="card-footer mt-4">
                      <div class="flex items-center justify-between">
                        <div class="text-xs text-gray-500">{{ resource.createTime }}</div>

                        <div class="resource-actions flex gap-2">
                          <NButton size="small" secondary>
                            <template #icon>
                              <Icon icon="carbon:view" />
                            </template>
                            预览
                          </NButton>

                          <NButton size="small" type="primary" ghost>
                            <template #icon>
                              <Icon icon="carbon:download" />
                            </template>
                            下载
                          </NButton>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </NTabPane>

          <NTabPane name="audio" tab="音频">
            <!-- 音频资源内容 -->
            <div class="resource-content">
              <div class="resource-grid">
                <div
                  v-for="resource in resources.filter(r => r.type === 'audio')"
                  :key="resource.id"
                  class="resource-card"
                >
                  <div class="resource-preview">
                    <div class="resource-type-badge">音频</div>

                    <div class="audio-preview flex-center">
                      <Icon icon="carbon:music" class="text-4xl text-primary" />
                    </div>

                    <div class="duration-badge">
                      {{ resource.duration }}
                    </div>
                  </div>

                  <div class="resource-info p-4">
                    <h3 class="mb-2 text-lg font-bold">{{ resource.title }}</h3>

                    <div class="mb-2 flex flex-wrap gap-1">
                      <NTag v-for="tag in resource.tags" :key="tag" size="small">
                        {{ tag }}
                      </NTag>
                    </div>

                    <p class="text-sm text-gray-600 dark:text-gray-300">{{ resource.description }}</p>

                    <!-- 音频资源特有信息 -->
                    <div class="grid grid-cols-2 mt-3 gap-2 text-xs text-gray-500">
                      <div>
                        <span class="font-medium">格式:</span>
                        {{ resource.format }}
                      </div>
                      <div>
                        <span class="font-medium">比特率:</span>
                        {{ resource.bitrate }}
                      </div>
                      <div>
                        <span class="font-medium">配音:</span>
                        {{ resource.voiceType }}
                      </div>
                      <div>
                        <span class="font-medium">音轨:</span>
                        {{ resource.tracks ? resource.tracks.length + '个章节' : '单轨' }}
                      </div>
                    </div>

                    <div class="card-footer mt-4">
                      <div class="flex items-center justify-between">
                        <div class="text-xs text-gray-500">{{ resource.createTime }}</div>

                        <div class="resource-actions flex gap-2">
                          <NButton size="small" secondary>
                            <template #icon>
                              <Icon icon="carbon:view" />
                            </template>
                            预览
                          </NButton>

                          <NButton size="small" type="primary" ghost>
                            <template #icon>
                              <Icon icon="carbon:download" />
                            </template>
                            下载
                          </NButton>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </NTabPane>

          <NTabPane name="interactive" tab="交互课件">
            <!-- 交互课件资源内容 -->
            <div class="resource-content">
              <div class="resource-grid">
                <div
                  v-for="resource in resources.filter(r => r.type === 'interactive')"
                  :key="resource.id"
                  class="resource-card"
                >
                  <div class="resource-preview">
                    <div class="resource-type-badge">交互课件</div>
                    <NImage
                      :src="resource.preview"
                      object-fit="cover"
                      preview-disabled
                      class="preview-image"
                      :img-props="{
                        style: 'width: 100%; height: 140px; object-fit: cover;'
                      }"
                    />
                  </div>

                  <div class="resource-info p-4">
                    <h3 class="mb-2 text-lg font-bold">{{ resource.title }}</h3>

                    <div class="mb-2 flex flex-wrap gap-1">
                      <NTag v-for="tag in resource.tags" :key="tag" size="small">
                        {{ tag }}
                      </NTag>
                    </div>

                    <p class="text-sm text-gray-600 dark:text-gray-300">{{ resource.description }}</p>

                    <!-- 交互课件资源特有信息 -->
                    <div class="grid grid-cols-2 mt-3 gap-2 text-xs text-gray-500">
                      <div>
                        <span class="font-medium">格式:</span>
                        {{ resource.format }}
                      </div>
                      <div>
                        <span class="font-medium">设备:</span>
                        {{
                          resource.supportedDevices && resource.supportedDevices.length
                            ? resource.supportedDevices.join('/')
                            : '未指定'
                        }}
                      </div>
                      <div>
                        <span class="font-medium">场景:</span>
                        {{ resource.scenes }}个
                      </div>
                      <div>
                        <span class="font-medium">难度:</span>
                        {{ Array.isArray(resource.difficulty) ? resource.difficulty.join('/') : resource.difficulty }}
                      </div>
                    </div>

                    <div class="card-footer mt-4">
                      <div class="flex items-center justify-between">
                        <div class="text-xs text-gray-500">{{ resource.createTime }}</div>

                        <div class="resource-actions flex gap-2">
                          <NButton size="small" secondary>
                            <template #icon>
                              <Icon icon="carbon:view" />
                            </template>
                            预览
                          </NButton>

                          <NButton size="small" type="primary" ghost>
                            <template #icon>
                              <Icon icon="carbon:download" />
                            </template>
                            下载
                          </NButton>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </NTabPane>
        </NTabs>

        <!-- 底部固定区域 -->
        <div class="fixed-bottom">
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

          <!-- 底部操作区 -->
          <div class="flex justify-between">
            <div class="flex gap-2">
              <NButton @click="$emit('restart')">
                <template #icon>
                  <Icon icon="carbon:reset" />
                </template>
                重新开始
              </NButton>

              <NButton @click="$emit('adjustParameters')">
                <template #icon>
                  <Icon icon="carbon:settings-adjust" />
                </template>
                调整参数
              </NButton>
            </div>

            <NButton type="primary" @click="downloadResource">
              <template #icon>
                <Icon icon="carbon:download" />
              </template>
              批量下载
            </NButton>
          </div>
        </div>
      </div>
    </NCard>
  </div>
</template>

<style scoped>
.resource-preview-panel {
  height: calc(100vh - 120px);
  display: flex;
  flex-direction: column;
}

.preview-card {
  height: 100%;
  display: flex;
  flex-direction: column;
}

:deep(.n-card__content) {
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
}

.display-state {
  display: flex;
  flex-direction: column;
  height: 100%;
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

.resource-content {
  flex: 1;
  overflow-y: auto;
  padding-bottom: 120px; /* 留出底部固定区域的空间 */
}

.fixed-bottom {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  padding: 16px;
  z-index: 10;
}

:deep(.dark) .fixed-bottom {
  background: #121212;
}

.resource-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 16px;
  margin-bottom: 20px;
}

.resource-card {
  border-radius: 8px;
  overflow: hidden;
  background: white;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.resource-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.resource-preview {
  position: relative;
  height: 140px;
  overflow: hidden;
  background-color: #f5f7fa;
}

.preview-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.resource-type-badge {
  position: absolute;
  top: 8px;
  left: 8px;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
}

.duration-badge {
  position: absolute;
  bottom: 8px;
  right: 8px;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 1px 6px;
  border-radius: 4px;
  font-size: 12px;
}

.resource-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
}

.card-footer {
  margin-top: auto;
  padding-top: 8px;
}

.theme-info {
  border-left: 4px solid #2b46fe;
  padding: 12px; /* 减小padding */
  margin-bottom: 12px; /* 减小margin */
}

.text-primary {
  color: #2b46fe;
}

/* 暗黑模式 */
:deep(.dark) .resource-card {
  background: #1a1a1a;
}

:deep(.dark) .resource-preview {
  background-color: #2c2c2c;
}

.audio-preview {
  width: 100%;
  height: 100%;
  background-color: #e8f4ff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.resource-info p {
  line-height: 1.4;
  margin-bottom: 0.5rem;
}
</style>
