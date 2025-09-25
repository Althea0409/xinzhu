<script setup lang="ts">
import { ref } from 'vue';
import { NButton, NCard, NIcon, NTag } from 'naive-ui';
import { BulbOutline, DocumentTextOutline, MicOutline } from '@vicons/ionicons5';

defineOptions({
  name: 'AiAssistant'
});

// AI建议和分析
const aiSuggestions = ref([
  {
    id: '1',
    type: 'teaching_method',
    title: '朗读指导建议',
    content: '根据刚才的讨论，可以设计三个朗读层次：初读正音、再读理解、三读感情',
    confidence: 85
  },
  {
    id: '2',
    type: 'content_optimization',
    title: '词汇教学补充',
    content: '李老师提到的"临"字解释很重要，建议对比"临时、临近、临场"等词帮助理解',
    confidence: 92
  },
  {
    id: '3',
    type: 'classroom_activity',
    title: '课堂活动设计',
    content: '张老师的分组朗读想法不错，可以让不同组读出不同的情感色彩',
    confidence: 78
  }
]);

// 会议记录摘要
const meetingInsights = ref([
  {
    id: '1',
    timestamp: '14:32',
    insight: '检测到关键教学点：诗歌意境分析',
    speakers: ['张老师', '李老师']
  },
  {
    id: '2',
    timestamp: '14:35',
    insight: '建议增加朗读指导环节',
    speakers: ['王老师']
  },
  {
    id: '3',
    timestamp: '14:38',
    insight: '讨论重点：如何引导学生理解曹操的雄心壮志',
    speakers: ['陈老师', '张老师']
  }
]);

// 智能分析状态
const isAnalyzing = ref(false);
const analysisProgress = ref(0);

// 开始智能分析
const startAnalysis = () => {
  isAnalyzing.value = true;
  analysisProgress.value = 0;

  const timer = setInterval(() => {
    analysisProgress.value += 10;
    if (analysisProgress.value >= 100) {
      clearInterval(timer);
      isAnalyzing.value = false;
      // 模拟生成新建议
      aiSuggestions.value.unshift({
        id: Date.now().toString(),
        type: 'new_suggestion',
        title: '基于会议讨论的新建议',
        content: '根据刚才的教研讨论，建议在教学设计中加入"曹操生平简介"环节，帮助学生更好地理解诗歌背景。',
        confidence: 94
      });
    }
  }, 200);
};

// 获取建议类型的图标和颜色
const getSuggestionStyle = (type: string): { icon: any; color: string; bgColor: string; borderColor: string } => {
  switch (type) {
    case 'teaching_method':
      return { icon: BulbOutline, color: 'warning', bgColor: 'bg-yellow-50', borderColor: 'border-yellow-200' };
    case 'interaction':
      return { icon: DocumentTextOutline, color: 'info', bgColor: 'bg-blue-50', borderColor: 'border-blue-200' };
    case 'assessment':
      return { icon: MicOutline, color: 'success', bgColor: 'bg-green-50', borderColor: 'border-green-200' };
    default:
      return { icon: BulbOutline, color: 'primary', bgColor: 'bg-purple-50', borderColor: 'border-purple-200' };
  }
};
</script>

<template>
  <div class="space-y-4">
    <!-- AI教学助手卡片 -->
    <NCard class="ai-assistant">
      <div class="mb-4 flex items-center justify-between">
        <div class="flex items-center">
          <div
            class="mr-3 h-8 w-8 flex items-center justify-center rounded-full from-blue-500 to-purple-600 bg-gradient-to-r"
          >
            <NIcon size="16" color="white">
              <BulbOutline />
            </NIcon>
          </div>
          <div>
            <h3 class="text-gray-800 font-medium">AI教学助手</h3>
            <p class="text-xs text-gray-500">《观沧海》智能分析</p>
          </div>
        </div>
        <NTag type="success" size="small">在线</NTag>
      </div>

      <!-- 智能分析进度 -->
      <div v-if="isAnalyzing" class="mb-4">
        <div class="mb-2 flex items-center justify-between">
          <span class="text-sm text-gray-600">正在分析教学内容...</span>
          <span class="text-sm text-gray-500">{{ analysisProgress }}%</span>
        </div>
        <div class="h-2 w-full rounded-full bg-gray-200">
          <div
            class="h-2 rounded-full bg-blue-500 transition-all duration-300"
            :style="{ width: `${analysisProgress}%` }"
          ></div>
        </div>
      </div>

      <!-- AI建议列表 -->
      <div class="mb-4 space-y-3">
        <div
          v-for="suggestion in aiSuggestions.slice(0, 3)"
          :key="suggestion.id"
          class="border rounded-lg p-3"
          :class="[getSuggestionStyle(suggestion.type).bgColor, getSuggestionStyle(suggestion.type).borderColor]"
        >
          <div class="mb-2 flex items-center justify-between">
            <div class="flex items-center">
              <NIcon size="14" class="mr-2">
                <component :is="getSuggestionStyle(suggestion.type).icon" />
              </NIcon>
              <span class="text-sm text-gray-700 font-medium">{{ suggestion.title }}</span>
            </div>
            <NTag :type="getSuggestionStyle(suggestion.type).color" size="small">{{ suggestion.confidence }}%</NTag>
          </div>
          <p class="text-sm text-gray-600 leading-relaxed">{{ suggestion.content }}</p>
        </div>
      </div>

      <!-- 操作按钮 -->
      <div class="space-y-2">
        <NButton class="w-full" type="primary" :loading="isAnalyzing" @click="startAnalysis">
          {{ isAnalyzing ? '分析中...' : '智能优化教案' }}
        </NButton>
        <NButton class="w-full" quaternary>生成课堂活动</NButton>
      </div>
    </NCard>

    <!-- 会议记录摘要卡片 -->
    <NCard class="meeting-insights">
      <div class="mb-4 flex items-center">
        <div class="mr-3 h-8 w-8 flex items-center justify-center rounded-full bg-green-100">
          <NIcon size="16" color="#10b981">
            <MicOutline />
          </NIcon>
        </div>
        <div>
          <h3 class="text-gray-800 font-medium">会议记录摘要</h3>
          <p class="text-xs text-gray-500">AI自动提取重点</p>
        </div>
      </div>

      <div class="space-y-3">
        <div v-for="insight in meetingInsights" :key="insight.id" class="rounded-lg bg-gray-50 p-3">
          <div class="mb-1 flex items-center justify-between">
            <span class="text-xs text-gray-500">{{ insight.timestamp }}</span>
            <div class="flex space-x-1">
              <NTag v-for="speaker in insight.speakers" :key="speaker" size="small" type="info">
                {{ speaker }}
              </NTag>
            </div>
          </div>
          <p class="text-sm text-gray-700">{{ insight.insight }}</p>
        </div>
      </div>

      <NButton class="mt-3 w-full" quaternary>查看完整记录</NButton>
    </NCard>
  </div>
</template>

<style scoped>
.ai-assistant {
  min-height: 350px;
}
</style>
