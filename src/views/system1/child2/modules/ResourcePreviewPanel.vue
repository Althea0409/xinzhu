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
    preview: 'https://img.freepik.com/free-vector/kids-learning-numbers-concept-illustration_114360-8198.jpg',
    title: '小学一年级加减法数字认知基础',
    tags: ['小学数学', '一年级', '加减法', '数字认知'],
    description: '展示1-10数字及对应实物的直观图示，帮助建立数量概念，作为加减法运算的基础。',
    createTime: new Date().toLocaleString()
  },
  {
    id: 2,
    type: 'image',
    preview: 'https://img.freepik.com/free-vector/addition-concept-illustration_114360-1684.jpg',
    title: '小学一年级加法数学视觉化教具',
    tags: ['小学数学', '加法', '教学图示', '视觉化'],
    description: '利用水果、积木等实物图片展示加法过程，特别关注"凑十法"和数字分解组合的应用。',
    createTime: new Date().toLocaleString()
  },
  {
    id: 3,
    type: 'image',
    preview: 'https://img.freepik.com/free-vector/learning-concept-illustration_114360-6186.jpg',
    title: '小学一年级减法概念图解',
    tags: ['小学数学', '减法', '概念图解'],
    description: '通过生活情境图解展示减法概念，重点展示过十减法的处理方法和减法计算过程。',
    createTime: new Date().toLocaleString()
  },
  {
    id: 4,
    type: 'video',
    preview: 'https://img.freepik.com/free-vector/children-playing-number-game-illustration_74855-5293.jpg',
    title: '小学一年级数字接龙游戏教学视频',
    tags: ['一年级数学', '加减法', '教学游戏', '数字接龙'],
    description: '展示"数字接龙"游戏的教学视频，学生按顺序说出一个数，下一位给这个数加5或减3，培养计算能力。',
    duration: '3:42',
    format: 'MP4',
    resolution: '1080p',
    size: '42MB',
    createTime: new Date().toLocaleString()
  },
  {
    id: 5,
    type: 'video',
    preview: 'https://img.freepik.com/free-vector/cash-register-flat-illustration_23-2149140765.jpg',
    title: '小学一年级超市购物情境教学',
    tags: ['一年级数学', '情境教学', '实际应用'],
    description: '模拟超市购物场景视频，展示小明有50元买12元笔记本和8元钢笔后的找零计算，生动展示生活中的应用。',
    duration: '5:15',
    format: 'MP4',
    resolution: '720p',
    size: '58MB',
    createTime: new Date().toLocaleString()
  },
  {
    id: 6,
    type: 'animation',
    preview: 'https://img.freepik.com/free-vector/math-concept-illustration_114360-3972.jpg',
    title: '加减法互逆关系动画演示',
    tags: ['一年级数学', '加减关系', '互逆运算'],
    description: '动画形式展示加减法的互逆关系，演示如何用加法验证减法和用减法验证加法的方法。',
    duration: '4:30',
    format: 'HTML5',
    frames: 148,
    frameRate: '30fps',
    style: '2D卡通',
    interactions: ['暂停/播放控制', '步骤重放', '速度调节'],
    createTime: new Date().toLocaleString()
  },
  {
    id: 7,
    type: 'animation',
    preview: 'https://img.freepik.com/free-vector/flat-hand-drawn-school-math-concept_52683-9179.jpg',
    title: '数字分解与重组动画教程',
    tags: ['一年级数学', '加减法', '数字分解'],
    description: '通过动画展示数字分解与重组的计算法，特别是数字跨十情况的处理方法，灵活运用凑十法。',
    duration: '3:58',
    format: 'HTML5',
    frames: 132,
    frameRate: '30fps',
    style: '手绘风格',
    interactions: ['分步演示', '互动练习', '实时反馈'],
    createTime: new Date().toLocaleString()
  },
  {
    id: 8,
    type: 'audio',
    preview: 'https://img.freepik.com/free-vector/cute-children-singing-song-white-background_1308-76193.jpg',
    title: '小学一年级加减法口诀',
    tags: ['一年级数学', '加减法', '口诀记忆'],
    description: '朗朗上口的加减法口诀音频，帮助学生记忆基本加减法算式，提高计算速度。',
    duration: '2:15',
    format: 'MP3',
    bitrate: '320kbps',
    size: '4.2MB',
    voiceType: '儿童配音',
    language: '中文',
    background: '轻音乐伴奏',
    tracks: [
      { name: '1-5数字加减法口诀', time: '0:00-0:45' },
      { name: '6-10数字加减法口诀', time: '0:46-1:30' },
      { name: '过十加减法口诀', time: '1:31-2:15' }
    ],
    createTime: new Date().toLocaleString()
  },
  {
    id: 9,
    type: 'audio',
    preview: 'https://img.freepik.com/free-vector/mathematics-concept-illustration_114360-3972.jpg',
    title: '加减法应用题讲解',
    tags: ['一年级数学', '应用题', '问题解析'],
    description: '教师讲解加减法应用题的音频，包含提取关键信息、选择运算方法和验证答案的完整思路。',
    duration: '4:25',
    format: 'MP3',
    bitrate: '320kbps',
    size: '7.8MB',
    voiceType: '专业教师',
    language: '中文',
    background: '无背景音乐',
    tracks: [
      { name: '应用题解题步骤讲解', time: '0:00-1:15' },
      { name: '购物找零类题目示例', time: '1:16-2:40' },
      { name: '比较大小类题目示例', time: '2:41-4:25' }
    ],
    createTime: new Date().toLocaleString()
  },
  {
    id: 10,
    type: 'interactive',
    preview:
      'https://cdn.wanx.aliyuncs.com/wanx/1741499227271127126/text_to_image_v2/89f41ffa337d460fa4fb3b0f26b28ed6_2.png?x-oss-process=image/resize,w_500/watermark,image_aW1nL3dhdGVyMjAyNDExMjkwLnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSxtX2ZpeGVkLHdfMTQ1LGhfMjU=,t_80,g_se,x_10,y_10/format,webp',
    title: '数学小侦探互动游戏',
    tags: ['一年级数学', '互动课件', '推理能力'],
    description: '基于"数学小侦探"活动设计的互动课件，学生需要通过已知条件推理出被隐藏的数字，培养逻辑思维。',
    format: 'H5',
    platform: '网页/平板',
    interactive: true,
    fileSize: '12MB',
    scenes: 5,
    difficulty: ['初级', '中级', '高级'],
    features: ['动态生成题目', '实时反馈', '进度记录', '成绩统计', '适应性难度调整'],
    supportedDevices: ['电脑', '平板', '手机'],
    minPlayTime: '15分钟',
    createTime: new Date().toLocaleString()
  },
  {
    id: 11,
    type: 'interactive',
    preview: 'https://img.freepik.com/free-vector/calculator-concept-illustration_114360-2686.jpg',
    title: '计算冲关互动练习',
    tags: ['一年级数学', '互动练习', '计算训练'],
    description: '分为三个难度级别的加减法计算互动练习，学生可以根据自己水平选择适合的题目进行练习。',
    format: 'H5',
    platform: '网页/平板/手机',
    interactive: true,
    fileSize: '15MB',
    scenes: 3,
    difficulty: ['基础', '提高', '挑战'],
    features: ['计时模式', '错题重做', '奖励机制', '学习进度跟踪', '家长查看报告'],
    supportedDevices: ['电脑', '平板', '手机'],
    minPlayTime: '10分钟',
    createTime: new Date().toLocaleString()
  },
  {
    id: 12,
    type: 'interactive',
    preview:
      'https://hunyuan-prod-1258344703.cos.ap-guangzhou.myqcloud.com/text2img/856df1d997c24b4600ac1e7e1d73b6fc/20250414034654h0_654c8191fb09697772ddc1c320aa382257b.png?q-sign-algorithm=sha1&q-ak=AKIDRl074nOsGdJ9zjMsCRWP3ShmgS3VtX4S&q-sign-time=1744573614;1776109614&q-key-time=1744573614;1776109614&q-header-list=host&q-url-param-list=&q-signature=1c5dd3b19ac634c4c4ece0c06bf5f27e62efa093',
    title: '虚拟超市购物模拟',
    tags: ['一年级数学', '情境模拟', '实践应用'],
    description: '虚拟超市环境中的互动购物游戏，学生需要计算购物总额和找零，将加减法应用于实际场景。',
    format: 'H5',
    platform: '网页/平板',
    interactive: true,
    fileSize: '24MB',
    scenes: 4,
    difficulty: ['初级', '中级'],
    features: ['3D超市场景', '拖拽商品到购物车', '虚拟钱币支付', '计算找零', '多种结账方式'],
    supportedDevices: ['电脑', '平板'],
    minPlayTime: '20分钟',
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
          <h2 class="mb-2 text-lg text-primary font-bold">小学一年级加减法 - 多媒体教学资源</h2>
          <p class="text-sm text-gray-700 dark:text-gray-300">
            这组教学资源专为小学一年级学生设计，重点帮助学生理解加减法概念、掌握计算技巧，
            并在实际情境中应用所学知识。资源包括视觉教具、互动练习、动画演示和音频讲解等多种形式。
          </p>
          <div class="mt-2 flex flex-wrap gap-2">
            <NTag type="success" size="small">适合小学一年级</NTag>
            <NTag type="info" size="small">包含12个教学资源</NTag>
            <NTag type="warning" size="small">设计遵循国家课程标准</NTag>
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
