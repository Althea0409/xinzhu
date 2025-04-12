<script setup lang="ts">
import { ref } from 'vue';
import { NButton } from 'naive-ui';
import { Icon } from '@iconify/vue';

defineOptions({
  name: 'TabNavigation'
});

type TabType = '王' | '李' | '月' | '彭';

const activeTab = ref<TabType>('王');

function setActiveTab(tab: TabType) {
  activeTab.value = tab;
}
</script>

<template>
  <div class="tab-navigation w-full flex items-center justify-between">
    <div class="flex items-center">
      <div class="tab-group flex space-x-2">
        <button
          v-for="tab in ['王', '李', '月', '彭']"
          :key="tab"
          class="tab-button h-10 w-10 flex items-center justify-center rounded-full transition-colors focus:outline-none"
          :class="activeTab === tab ? 'bg-[#2B46FE] text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'"
          @click="setActiveTab(tab as TabType)"
        >
          {{ tab }}
        </button>
        <div class="ml-2 h-10 w-1 rounded bg-[#6E2BFE]"></div>
      </div>
    </div>

    <div class="flex items-center">
      <NButton class="ml-2 flex items-center" quaternary tag="div">
        <Icon icon="carbon:play" class="mr-1 text-[#2B46FE]" />
        <span class="text-sm">预览</span>
      </NButton>

      <div class="ml-4 flex items-center">
        <NButton class="save-btn border-0 bg-blue-50 px-4 text-[#2B46FE] font-medium" round>保存版本</NButton>

        <NButton type="primary" class="ml-2 border-0 px-4" round>新建教案</NButton>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tab-button {
  font-weight: 500;
}

.save-btn:hover {
  background-color: #ebf5ff !important;
}
</style>
