<script setup lang="ts">
import SearchBar from './modules/SearchBar.vue';
import TabNavigation from './modules/TabNavigation.vue';
import CourseFlow from './modules/CourseFlow.vue';
import EditorArea from './modules/EditorArea.vue';
import AiAssistant from './modules/AiAssistant.vue';
import MeetingPanel from './modules/MeetingPanel.vue';
// import VersionHistory from './modules/VersionHistory.vue';
</script>

<template>
  <div class="online-collaboration-page min-h-screen">
    <div class="mx-auto px-6 py-5 container">
      <!-- 顶部搜索和标签导航 -->
      <div class="mb-5 flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0">
        <div class="max-w-md w-full sm:w-2/5">
          <SearchBar />
        </div>
        <div class="w-full sm:ml-122 sm:w-3/5">
          <TabNavigation />
        </div>
      </div>

      <!-- 主内容区域 -->
      <div class="grid grid-cols-12 gap-4">
        <!-- 左侧课程流程 -->
        <div class="col-span-2">
          <CourseFlow />
        </div>

        <!-- 中间编辑区域 -->
        <div class="col-span-7">
          <EditorArea />
        </div>

        <!-- 右侧助手和历史 -->
        <div class="col-span-3 flex flex-col space-y-4">
          <div class="flex-1">
            <MeetingPanel />
          </div>

          <div class="flex-shrink-0">
            <AiAssistant />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.online-collaboration-page {
  min-height: 100vh;
}
</style>
