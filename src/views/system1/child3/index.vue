<script setup lang="ts">
import SidePanel from './modules/SidePanel.vue';
import PptPreviewPanel from './modules/AiSuggestionPanel.vue';
</script>

<template>
  <div class="ai-ppt-editor-page mx-16 my-6 h-screen flex overflow-hidden border border-gray-200 rounded-xl shadow-lg">
    <!-- 左侧大纲导航 -->
    <div class="left-sider w-1/2 border-r border-gray-200 rounded-l-xl">
      <SidePanel />
    </div>

    <!-- 右侧PPT预览区域 -->
    <div class="right-content w-1/2 rounded-r-xl bg-gray-50">
      <PptPreviewPanel />
    </div>
  </div>
</template>

<style scoped>
.ai-ppt-editor-page {
  overflow: hidden;
  max-width: 95%;
  background-color: white;
}
</style>
