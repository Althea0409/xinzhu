<script setup lang="ts">
import { ref } from 'vue';
import { NButton, NCard, NIcon, NModal, NTag } from 'naive-ui';
import { MicOutline, RadioButtonOnOutline, StopOutline, VideocamOffOutline, VideocamOutline } from '@vicons/ionicons5';

defineOptions({
  name: 'MeetingPanel'
});

// 会议状态
const meetingStatus = ref<'idle' | 'connecting' | 'active' | 'recording'>('idle');
const showMeetingModal = ref(false);
const isRecording = ref(false);
const recordingTime = ref(0);

// 会议参与者
const participants = ref([
  { id: '1', name: '张老师', school: '北京师范大学附属中学', status: 'speaking', avatar: '👩‍🏫' },
  { id: '2', name: '李老师', school: '上海市实验学校', status: 'listening', avatar: '👨‍🏫' },
  { id: '3', name: '王老师', school: '成都市第七中学', status: 'muted', avatar: '👩‍💼' },
  { id: '4', name: '陈老师', school: '杭州市第二中学', status: 'listening', avatar: '👨‍💼' }
]);

// AI会议记录
const meetingNotes = ref([
  {
    id: 1,
    type: 'key_point',
    speaker: '张老师',
    time: '14:32',
    content: '导入环节建议先让学生谈对曹操的印象，这样更能激发兴趣'
  },
  {
    id: 2,
    type: 'suggestion',
    speaker: '李老师',
    time: '14:35',
    content: '"临"字的解释需要补充，学生容易理解成"临时"的意思'
  },
  {
    id: 3,
    type: 'key_point',
    speaker: '王老师',
    time: '14:38',
    content: '诗歌结构分析可以分三个层次：实写、虚写、抒情，这样更清晰'
  },
  {
    id: 4,
    type: 'suggestion',
    speaker: '张老师',
    time: '14:41',
    content: '朗读指导可以采用分组朗读的方式，让学生体会不同的理解'
  },
  {
    id: 5,
    type: 'ai_summary',
    speaker: 'AI助手',
    time: '14:43',
    content: '本次讨论重点：1.导入方式优化 2.重点词汇解释完善 3.诗歌结构分析层次化'
  }
]);

// 会议控制
const startMeeting = () => {
  meetingStatus.value = 'connecting';
  setTimeout(() => {
    meetingStatus.value = 'active';
    showMeetingModal.value = true;
  }, 2000);
};

const startRecording = () => {
  isRecording.value = true;
  meetingStatus.value = 'recording';
  // 模拟录制时间
  setInterval(() => {
    recordingTime.value += 1;
  }, 1000);
};

const stopRecording = () => {
  isRecording.value = false;
  meetingStatus.value = 'active';
  recordingTime.value = 0;
};

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

// 获取状态标签颜色
const getStatusColor = (status: string) => {
  switch (status) {
    case 'speaking':
      return 'success';
    case 'listening':
      return 'info';
    case 'muted':
      return 'warning';
    default:
      return 'default';
  }
};

// 获取状态文本
const getStatusText = (status: string) => {
  switch (status) {
    case 'speaking':
      return '发言中';
    case 'listening':
      return '在线';
    case 'muted':
      return '静音';
    default:
      return '离线';
  }
};
</script>

<template>
  <NCard class="meeting-panel">
    <div class="mb-4 flex items-center justify-between">
      <div class="flex items-center">
        <div class="mr-3 h-8 w-8 flex items-center justify-center rounded-full bg-green-100">
          <NIcon size="18" color="#10b981">
            <VideocamOutline />
          </NIcon>
        </div>
        <div>
          <h3 class="text-gray-800 font-medium">教研组会议</h3>
          <p class="text-xs text-gray-500">《观沧海》教学研讨</p>
        </div>
      </div>
      <NTag :type="meetingStatus === 'active' || meetingStatus === 'recording' ? 'success' : 'default'" size="small">
        {{
          meetingStatus === 'idle'
            ? '未开始'
            : meetingStatus === 'connecting'
              ? '连接中'
              : meetingStatus === 'recording'
                ? '录制中'
                : '进行中'
        }}
      </NTag>
    </div>

    <!-- 会议控制按钮 -->
    <div class="mb-4 flex space-x-2">
      <NButton v-if="meetingStatus === 'idle'" type="primary" size="small" @click="startMeeting">开始会议</NButton>

      <template v-if="meetingStatus === 'active' || meetingStatus === 'recording'">
        <NButton v-if="!isRecording" type="success" size="small" @click="startRecording">
          <template #icon>
            <NIcon><RadioButtonOnOutline /></NIcon>
          </template>
          开始录制
        </NButton>

        <NButton v-if="isRecording" type="error" size="small" @click="stopRecording">
          <template #icon>
            <NIcon><StopOutline /></NIcon>
          </template>
          停止录制 {{ formatTime(recordingTime) }}
        </NButton>
      </template>
    </div>

    <!-- 参与者列表 -->
    <div class="mb-4">
      <h4 class="mb-2 text-sm text-gray-600 font-medium">参与教师 ({{ participants.length }})</h4>
      <div class="space-y-2">
        <div
          v-for="participant in participants"
          :key="participant.id"
          class="flex items-center justify-between rounded-lg bg-gray-50 p-2"
        >
          <div class="flex items-center">
            <div class="mr-2 text-lg">{{ participant.avatar }}</div>
            <div>
              <div class="text-sm text-gray-800 font-medium">{{ participant.name }}</div>
              <div class="text-xs text-gray-500">{{ participant.school }}</div>
            </div>
          </div>
          <NTag :type="getStatusColor(participant.status)" size="small">
            {{ getStatusText(participant.status) }}
          </NTag>
        </div>
      </div>
    </div>

    <!-- AI会议记录 -->
    <div v-if="meetingStatus === 'active' || meetingStatus === 'recording'">
      <h4 class="mb-2 text-sm text-gray-600 font-medium">AI会议记录</h4>
      <div class="max-h-60 overflow-y-auto space-y-2">
        <div
          v-for="note in meetingNotes"
          :key="note.id"
          class="rounded-lg p-3"
          :class="{
            'bg-blue-50 border-l-2 border-blue-400': note.type === 'key_point',
            'bg-green-50 border-l-2 border-green-400': note.type === 'ai_summary',
            'bg-yellow-50 border-l-2 border-yellow-400': note.type === 'suggestion'
          }"
        >
          <div class="mb-1 flex items-center justify-between">
            <span class="text-xs text-gray-600 font-medium">{{ note.speaker }}</span>
            <span class="text-xs text-gray-400">{{ note.time }}</span>
          </div>
          <p class="text-sm text-gray-700">{{ note.content }}</p>
        </div>
      </div>
    </div>

    <!-- 腾讯会议模态框 -->
    <NModal v-model:show="showMeetingModal" preset="card" title="腾讯会议 - 《观沧海》教学研讨" class="w-[800px]">
      <div class="meeting-interface">
        <!-- 视频区域 -->
        <div class="grid grid-cols-2 mb-4 gap-4">
          <div
            v-for="participant in participants.slice(0, 4)"
            :key="participant.id"
            class="relative aspect-video flex items-center justify-center rounded-lg bg-gray-900"
          >
            <div class="text-4xl">{{ participant.avatar }}</div>
            <div class="absolute bottom-2 left-2 rounded bg-black bg-opacity-50 px-2 py-1">
              <span class="text-xs text-white">{{ participant.name }}</span>
            </div>
            <div
              v-if="participant.status === 'speaking'"
              class="absolute right-2 top-2 h-2 w-2 animate-pulse rounded-full bg-green-400"
            ></div>
          </div>
        </div>

        <!-- 会议控制栏 -->
        <div class="flex items-center justify-center rounded-lg bg-gray-100 p-4 space-x-4">
          <NButton circle>
            <template #icon>
              <NIcon><MicOutline /></NIcon>
            </template>
          </NButton>
          <NButton circle>
            <template #icon>
              <NIcon><VideocamOffOutline /></NIcon>
            </template>
          </NButton>
          <NButton circle type="error" @click="showMeetingModal = false">END</NButton>
        </div>
      </div>
    </NModal>
  </NCard>
</template>

<style scoped>
.meeting-panel {
  min-height: 350px;
}

.meeting-interface {
  min-height: 350px;
}
</style>
