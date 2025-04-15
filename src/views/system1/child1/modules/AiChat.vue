<script setup lang="ts">
import { nextTick, reactive, ref, watch } from 'vue';
import { NButton, NIcon, NInput, NSpin } from 'naive-ui';
import { Send } from '@vicons/carbon';
import { BulbOutline, OpenOutline, TimeOutline } from '@vicons/ionicons5';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

const userInput = ref('');
const isLoading = ref(false);
const chatContainer = ref<HTMLElement | null>(null);

// 聊天消息列表
const chatMessages = reactive<ChatMessage[]>([
  {
    role: 'assistant',
    content: '您好！我是您的智能助手，可以帮您优化课程计划或回答教学相关问题。请问有什么可以帮助您的？'
  }
]);

// 发送消息
async function sendMessage() {
  if (!userInput.value.trim() || isLoading.value) return;

  // 添加用户消息
  chatMessages.push({
    role: 'user',
    content: userInput.value
  });

  // 清空输入框
  //   const userMessage = userInput.value;
  userInput.value = '';

  // 滚动到底部
  await nextTick();
  scrollToBottom();

  // 模拟AI回复
  isLoading.value = true;
  setTimeout(() => {
    chatMessages.push({
      role: 'assistant',
      content: `好的。我将基于已有的课程设计，以“小学数学浙教版一年级上册生成”为主题，生成一份更加详细的教案。`
    });
    isLoading.value = false;

    // 滚动到底部
    nextTick(() => {
      scrollToBottom();
    });
  }, 1500);
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

defineExpose({
  userInput,
  isLoading,
  chatMessages,
  sendMessage
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
      <div v-for="(message, index) in chatMessages" :key="index" class="mb-4">
        <div v-if="message.role === 'assistant'" class="max-w-[85%] rounded-lg bg-#2b46fe p-4 shadow-sm">
          <div class="text-sm text-white">{{ message.content }}</div>
        </div>
        <div v-else class="flex justify-end">
          <div class="max-w-[85%] rounded-lg bg-white p-4 text-gray-800 shadow-sm">
            <div class="text-sm">{{ message.content }}</div>
          </div>
        </div>
      </div>

      <!-- 加载状态 -->
      <div v-if="isLoading" class="flex items-center justify-center py-4">
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
          placeholder="   修改教案..."
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
</style>
