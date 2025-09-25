<script setup lang="ts">
import { ref } from 'vue';
import { NButton } from 'naive-ui';
import { Icon } from '@iconify/vue';

defineOptions({
  name: 'SearchBar'
});

const searchQuery = ref('');
const isInputFocused = ref(false);

const popularTags = [
  { id: '1', name: '语文' },
  { id: '2', name: '英语' },
  { id: '3', name: '物理' },
  { id: '4', name: '数学' },
  { id: '5', name: '试卷' }
];

const emit = defineEmits<{
  (e: 'search', query: string): void;
}>();

function handleSearch() {
  if (searchQuery.value.trim()) {
    emit('search', searchQuery.value);
  }
}

function addTagToSearch(tag: string) {
  searchQuery.value = tag;
  handleSearch();
}

function handleFocus() {
  isInputFocused.value = true;
}

function handleBlur() {
  // 延迟关闭，使点击标签有效
  setTimeout(() => {
    isInputFocused.value = false;
  }, 200);
}
</script>

<template>
  <div class="w-full">
    <div class="mb-2 flex items-center gap-4">
      <div class="relative flex-1">
        <div class="absolute left-3 top-1/2 -translate-y-1/2">
          <Icon icon="carbon:search" class="text-lg text-gray-400" />
        </div>
        <input
          v-model="searchQuery"
          type="text"
          class="w-full border border-gray-200 rounded-full bg-white py-3 pl-10 pr-4 text-sm outline-none transition-all focus:border-blue-400 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-100"
          placeholder="搜索教案（支持知识点、教学目标等）"
          @keyup.enter="handleSearch"
          @focus="handleFocus"
          @blur="handleBlur"
        />
      </div>
      <NButton
        type="primary"
        class="h-10 flex items-center justify-center rounded-full px-6 font-medium"
        @click="handleSearch"
      >
        <Icon icon="carbon:search" class="mr-1" />
        搜索
      </NButton>
    </div>

    <!-- 标签和历史记录 -->
    <div v-if="isInputFocused || searchQuery" class="flex flex-wrap items-center gap-2 pl-3 text-xs">
      <span class="text-gray-400">热门搜索:</span>
      <div
        v-for="tag in popularTags"
        :key="tag.id"
        class="cursor-pointer rounded-full bg-gray-100 px-2 py-1 text-gray-600 transition-colors hover:bg-indigo-100 hover:text-indigo-700"
        @click="addTagToSearch(tag.name)"
      >
        {{ tag.name }}
      </div>
    </div>
  </div>
</template>
