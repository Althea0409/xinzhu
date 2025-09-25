<script setup lang="ts">
import { nextTick, ref, watch } from 'vue';
import { NButton, NIcon, NInput, NSpin } from 'naive-ui';
import { Send } from '@vicons/carbon';
import { BulbOutline, OpenOutline, TimeOutline } from '@vicons/ionicons5';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  id: number;
}

// 类型化的Emits声明
type Emits = {
  showDetailedPlan: [];
};

const emit = defineEmits<Emits>();

const userInput = ref('');
const isLoading = ref(false);
const isGeneratingDetailedPlan = ref(false); // 是否正在生成详细教案
const chatContainer = ref<HTMLElement | null>(null);

// 聊天消息列表
const chatMessages = ref<ChatMessage[]>([
  {
    id: 1,
    role: 'assistant',
    content: '您好！我是您的智能助手，可以帮您优化课程计划或回答教学相关问题。请问有什么可以帮助您的？'
  }
]);

// 检查内容是否包含预览链接
function hasPreviewLink(content: string): boolean {
  return content.includes('点击此处预览');
}

// 处理消息显示内容
function processMessageContent(content: string): string {
  // 移除HTML标签，只保留纯文本
  return content.replace(/<span.*?>点击此处预览<\/span>/g, '');
}

// 处理预览链接点击
function handlePreviewClick() {
  emit('showDetailedPlan');
}

// 发送消息
async function sendMessage() {
  if (!userInput.value.trim() || isLoading.value) return;

  const userMessage = userInput.value;

  // 添加用户消息
  chatMessages.value.push({
    id: Date.now(),
    role: 'user',
    content: userInput.value
  });

  // 清空输入框
  userInput.value = '';

  // 滚动到底部
  await nextTick();
  scrollToBottom();

  // 检查是否请求详细教案
  if (userMessage.includes('详细教案') || userMessage.includes('详细的教案')) {
    // 处理生成详细教案的请求
    isLoading.value = true;

    // 第一条回复
    setTimeout(() => {
      chatMessages.value.push({
        id: Date.now(),
        role: 'assistant',
        content: `好的。我将基于已有的课程设计，以"初中语文人教版七年级上册《观沧海》教学设计生成"为主题，生成一份更加详细的教案。`
      });

      scrollToBottom();

      // 显示生成中状态
      isGeneratingDetailedPlan.value = true;

      // 第二条回复（延迟显示）
      setTimeout(() => {
        isGeneratingDetailedPlan.value = false;
        isLoading.value = false;

        chatMessages.value.push({
          id: Date.now(),
          role: 'assistant',
          content: '已为您生成更加详细的教案，点击此处预览'
        });

        scrollToBottom();

        // 添加点击事件（在下一个事件循环中，确保DOM已更新）
        nextTick(() => {
          const messageElements = document.querySelectorAll('.preview-trigger');
          messageElements.forEach(element => {
            element.addEventListener('click', handlePreviewClick);
          });
        });
      }, 3000); // 3秒后显示结果
    }, 1000);
  } else {
    // 处理普通问题
    isLoading.value = true;

    // 第一条回复
    setTimeout(() => {
      chatMessages.value.push({
        id: Date.now(),
        role: 'assistant',
        content: '感谢您的问题。我正在分析课程设计内容，稍后会提供相关建议。'
      });

      scrollToBottom();

      // 显示思考中状态
      isGeneratingDetailedPlan.value = true;

      // 第二条回复（延迟显示）
      setTimeout(() => {
        isGeneratingDetailedPlan.value = false;
        isLoading.value = false;

        chatMessages.value.push({
          id: Date.now(),
          role: 'assistant',
          content: '为您分析完毕。根据您的课程设计内容，我有以下几点建议...'
        });

        scrollToBottom();
      }, 2000); // 2秒后显示结果
    }, 1000);
  }
}

// 滚动到底部
function scrollToBottom() {
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
  }
}

// 监听消息变化，自动滚动到底部
watch(chatMessages, () => {
  nextTick(() => {
    scrollToBottom();
  });
});
</script>

<template>
  <div class="h-full flex flex-col bg-[#F4F7FC]">
    <!-- 顶部操作区域 -->
    <div class="flex items-center justify-end bg-[#F4F7FC] p-2">
      <NButton circle class="mr-2" text>
        <template #icon>
          <NIcon><TimeOutline /></NIcon>
        </template>
      </NButton>
      <NButton circle text>
        <template #icon>
          <NIcon><OpenOutline /></NIcon>
        </template>
      </NButton>
    </div>

    <!-- 聊天内容区域 -->
    <div ref="chatContainer" class="flex-1 overflow-auto p-4">
      <div v-for="message in chatMessages" :key="message.id" class="mb-4">
        <div v-if="message.role === 'assistant'" class="max-w-[85%] rounded-lg bg-#2b46fe p-4 shadow-sm">
          <div
            class="assistant-message text-sm text-white"
            :class="{ 'preview-trigger': hasPreviewLink(message.content) }"
          >
            {{ processMessageContent(message.content) }}
            <div v-if="hasPreviewLink(message.content)" class="preview-link-text mt-1">→ 详细教案</div>
          </div>
        </div>
        <div v-else class="flex justify-end">
          <div class="max-w-[85%] rounded-lg bg-white p-4 text-gray-800 shadow-sm">
            <div class="text-sm">{{ message.content }}</div>
          </div>
        </div>
      </div>

      <!-- 生成详细教案中状态 -->
      <div v-if="isGeneratingDetailedPlan" class="mb-4">
        <div class="max-w-[85%] rounded-lg bg-#2b46fe p-4 shadow-sm">
          <div class="flex items-center text-sm text-white">
            <span>正在生成详细教案</span>
            <span class="loading-dots ml-2">
              <i></i>
              <i></i>
              <i></i>
            </span>
          </div>
        </div>
      </div>

      <!-- 加载状态 -->
      <div v-if="isLoading && !isGeneratingDetailedPlan" class="flex items-center justify-center py-4">
        <NSpin size="small" />
        <span class="ml-2 text-sm text-gray-500">思考中...</span>
      </div>
    </div>

    <!-- 输入区域和底部操作区域 -->
    <div class="px-5 py-5">
      <div class="relative">
        <NInput
          v-model:value="userInput"
          bg-white
          type="textarea"
          :autosize="{ minRows: 4, maxRows: 6 }"
          placeholder="   请输入您的问题..."
          class="chat-input"
          @keypress.enter.prevent="sendMessage"
        />
        <div class="absolute right-3 top-2.5">
          <NButton circle class="idea-btn">
            <template #icon>
              <NIcon><BulbOutline /></NIcon>
            </template>
          </NButton>
        </div>
        <div class="absolute bottom-2.5 right-3">
          <NButton circle class="send-btn" @click="sendMessage">
            <template #icon>
              <NIcon><Send /></NIcon>
            </template>
          </NButton>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 聊天输入框样式 */
.chat-input {
  width: 100%;
}

:deep(.n-input) {
  border-radius: 24px;
  background-color: #ffffff;
}

:deep(.n-input__textarea) {
  padding: 4px 12px;
}

:deep(.n-input__textarea-el) {
  padding: 4px 8px !important;
}

:deep(.n-input__placeholder) {
  color: #666;
  font-size: 14px;
  padding: 0 4px;
}

/* 发送按钮样式 */
.send-btn {
  background-color: #2b46fe !important;
  border: none !important;
  color: white !important;
  font-size: 18px;
  width: 32px;
  height: 32px;
  flex-shrink: 0;
}

/* 灯泡按钮样式 */
.idea-btn {
  background-color: white !important;
  border: 1px solid #2b46fe !important;
  color: #2b46fe !important;
  width: 32px;
  height: 32px;
  flex-shrink: 0;
}

/* 调整聊天容器背景和边距 */
.chat-container {
  background-color: #f5f5f5;
}

/* 预览链接样式 */
.preview-trigger {
  cursor: pointer;
}

.preview-link-text {
  color: #ffffff;
  text-decoration: underline;
  font-weight: 500;
  display: inline-block;
}

/* 加载动画 */
.loading-dots {
  display: inline-flex;
  align-items: center;
}

.loading-dots i {
  width: 5px;
  height: 5px;
  margin: 0 2px;
  background-color: #ffffff;
  border-radius: 50%;
  display: inline-block;
  animation: loading-dots 1.4s infinite ease-in-out both;
}

.loading-dots i:nth-child(1) {
  animation-delay: -0.32s;
}

.loading-dots i:nth-child(2) {
  animation-delay: -0.16s;
}

@keyframes loading-dots {
  0%,
  80%,
  100% {
    transform: scale(0.5);
    opacity: 0.5;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
