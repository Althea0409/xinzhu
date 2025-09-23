<script setup lang="ts">
import { ref } from 'vue';
import { NButton } from 'naive-ui';
import { Icon } from '@iconify/vue';

defineOptions({
  name: 'FileUploader'
});

const isFileSelected = ref(false);
const fileName = ref('');
const isDragging = ref(false);
const errorMessage = ref<string | null>(null);
const isUploading = ref(false);
const uploadProgress = ref(0);

const emit = defineEmits<{
  (e: 'upload', file: File): void;
}>();

function handleFileChange(event: Event) {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    const file = input.files[0];
    handleFile(file);
  }
}

function triggerFileInput() {
  const fileInput = document.getElementById('file-upload') as HTMLInputElement;
  fileInput.click();
}

function handleDragOver(event: DragEvent) {
  event.preventDefault();
  isDragging.value = true;
}

function handleDragLeave() {
  isDragging.value = false;
}

function handleDrop(event: DragEvent) {
  event.preventDefault();
  isDragging.value = false;
  errorMessage.value = null;

  if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
    const file = event.dataTransfer.files[0];
    // 检查文件类型是否是 doc/docx/pdf
    const validTypes = [
      '.doc',
      '.docx',
      '.pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/pdf'
    ];
    const fileType = file.type;
    const currentFileName = file.name;
    const fileExt = currentFileName.substring(currentFileName.lastIndexOf('.')).toLowerCase();

    if (validTypes.includes(fileType) || validTypes.includes(fileExt)) {
      handleFile(file);
    } else {
      errorMessage.value = '请上传Word或PDF格式的文件';
    }
  }
}

function handleFile(file: File) {
  fileName.value = file.name;
  isFileSelected.value = true;
  emit('upload', file);
  startUpload();
}

function startUpload() {
  if (!isFileSelected.value) return;

  isUploading.value = true;
  uploadProgress.value = 0;

  const interval = setInterval(() => {
    uploadProgress.value += 5;

    if (uploadProgress.value >= 100) {
      clearInterval(interval);
      setTimeout(() => {
        isUploading.value = false;
      }, 500);
    }
  }, 200);
}

// 获取文件图标
function getFileIcon(name: string): string {
  const ext = name.substring(name.lastIndexOf('.')).toLowerCase();
  if (ext === '.pdf') {
    return 'carbon:document-pdf';
  } else if (ext === '.doc' || ext === '.docx') {
    return 'carbon:document-word';
  }
  return 'carbon:document';
}
</script>

<template>
  <div class="w-full">
    <div class="mb-6 flex items-center justify-between">
      <h3 class="flex items-center text-xl text-gray-800 font-bold">
        <Icon icon="carbon:share-knowledge" class="mr-3 text-2xl text-indigo-600" />
        分享我的教案
      </h3>
    </div>

    <div
      class="upload-area mb-6 flex flex-col items-center justify-center border-2 rounded-lg border-dashed py-12 transition-all"
      :class="[
        isDragging
          ? 'border-indigo-500 bg-indigo-50 scale-[1.01]'
          : 'border-gray-300 bg-gray-50 hover:border-indigo-300 hover:bg-indigo-50/50'
      ]"
      @dragover="handleDragOver"
      @dragleave="handleDragLeave"
      @drop="handleDrop"
    >
      <Icon
        icon="carbon:cloud-upload"
        class="mb-4 text-5xl"
        :class="isDragging ? 'text-indigo-500' : 'text-gray-400'"
      />
      <p class="mb-4 text-sm" :class="isDragging ? 'text-indigo-700' : 'text-gray-600'">
        {{ isDragging ? '释放以上传文件' : '拖拽文件到这里，或者' }}
      </p>
      <div class="mb-4">
        <NButton
          type="primary"
          secondary
          class="flex items-center justify-center rounded-full px-6"
          @click="triggerFileInput"
        >
          <template #icon>
            <Icon icon="carbon:document" class="mr-1" />
          </template>
          选择文件
        </NButton>
      </div>
      <p class="text-xs text-gray-500">支持 Word 和 PDF 格式，最大 20MB</p>
    </div>

    <div v-if="errorMessage" class="mb-4 flex items-center rounded-lg bg-red-50 p-3 text-sm text-red-600">
      <Icon icon="carbon:warning-filled" class="mr-2" />
      {{ errorMessage }}
    </div>

    <div
      v-if="isFileSelected"
      class="border border-gray-200 rounded-lg bg-white p-4 text-sm shadow-sm transition-all hover:shadow"
    >
      <div v-if="!isUploading" class="flex items-center">
        <Icon :icon="getFileIcon(fileName)" class="mr-3 text-2xl text-indigo-600" />
        <div class="flex-1">
          <div class="mb-1 font-medium">{{ fileName }}</div>
          <div class="text-xs text-gray-500">准备就绪，点击右侧按钮开始上传</div>
        </div>
        <NButton type="primary" class="flex items-center justify-center rounded-full" @click="startUpload">
          <template #icon>
            <Icon icon="carbon:upload" class="mr-1" />
          </template>
          上传文件
        </NButton>
      </div>

      <div v-else>
        <div class="mb-2 flex items-center">
          <Icon :icon="getFileIcon(fileName)" class="mr-3 text-xl text-indigo-600" />
          <div class="font-medium">{{ fileName }}</div>
        </div>
        <div class="mt-3">
          <div class="mb-1 flex items-center justify-between text-xs">
            <span>上传进度</span>
            <span>{{ uploadProgress }}%</span>
          </div>
          <div class="h-2 w-full rounded-full bg-gray-100">
            <div class="progress-bar" :class="uploadProgress >= 100 ? 'bg-green-500' : 'bg-indigo-600'"></div>
          </div>
          <div class="mt-2 text-center text-xs" :class="uploadProgress >= 100 ? 'text-green-600' : 'text-gray-500'">
            {{ uploadProgress >= 100 ? '上传成功！' : '上传中，请稍候...' }}
          </div>
        </div>
      </div>
    </div>

    <input id="file-upload" type="file" class="hidden" accept=".doc,.docx,.pdf" @change="handleFileChange" />
  </div>
</template>

<style scoped>
.progress-bar {
  height: 100%;
  width: v-bind('uploadProgress + "%"');
  border-radius: 9999px;
  transition: all 0.3s ease;
}

.upload-area {
  min-height: 250px;
}
</style>
