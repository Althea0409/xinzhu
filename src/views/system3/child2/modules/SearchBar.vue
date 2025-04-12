<script setup lang="ts">
import { ref } from 'vue';
import { Icon } from '@iconify/vue';

defineOptions({
  name: 'SearchBar'
});

const searchQuery = ref('');

function handleSearch() {
  // 实现搜索逻辑
}
</script>

<template>
  <div class="search-bar-container w-full">
    <div class="relative">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="搜索问题..."
        class="h-11 w-full border border-gray-200 rounded-full bg-white pl-12 pr-16 text-sm shadow-sm outline-none transition-all focus:border-[#2B46FE33] focus:shadow-md"
        @keyup.enter="handleSearch"
      />
      <div class="pointer-events-none absolute left-4 top-1/2 flex items-center -translate-y-1/2">
        <Icon icon="carbon:search" class="text-lg text-gray-400" />
      </div>
      <button
        class="absolute right-1.5 top-1/2 h-8 w-8 flex items-center justify-center rounded-full bg-[#2B46FE] text-white shadow-sm transition-all -translate-y-1/2 hover:bg-[#233dd3] hover:shadow-md"
        @click="handleSearch"
      >
        <Icon icon="carbon:arrow-right" class="text-base" />
      </button>
    </div>
  </div>
</template>

<style scoped>
.search-bar-container {
  max-width: 430px;
}

input::placeholder {
  color: #9ca3af;
  opacity: 0.8;
}

input:focus::placeholder {
  opacity: 0.6;
}
</style>
