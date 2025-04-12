<script setup lang="ts">
import { ref } from 'vue';
import { Icon } from '@iconify/vue';

defineOptions({
  name: 'SearchBar'
});

const searchQuery = ref('');

function handleSearch() {
  // 实现搜索逻辑
  // 暂时注释掉控制台日志以解决linter警告
  // console.log('搜索:', searchQuery.value);
}
</script>

<template>
  <div class="search-container">
    <div class="flex items-center rounded-full bg-white p-1 shadow-sm transition-shadow duration-300 hover:shadow">
      <div class="relative flex-1">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="搜索教学资源..."
          class="h-9 w-full border-0 bg-transparent pl-9 pr-2 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none"
          @keyup.enter="handleSearch"
        />
        <div class="absolute left-3 top-1/2 transform -translate-y-1/2">
          <Icon icon="carbon:search" class="text-gray-400" />
        </div>
      </div>
      <button
        class="h-9 w-9 flex transform items-center justify-center rounded-full bg-blue-600 text-white transition-transform duration-300 hover:scale-105 hover:bg-blue-700"
        @click="handleSearch"
      >
        <Icon icon="majesticons:arrow-right" class="text-lg" />
      </button>
    </div>
  </div>
</template>

<style scoped>
.search-container {
  width: 100%;
}

input::placeholder {
  opacity: 0.7;
}
</style>
