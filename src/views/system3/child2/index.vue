<script setup lang="ts">
import { ref } from 'vue';
import SearchBar from './modules/SearchBar.vue';
import FilterBar from './modules/FilterBar.vue';
import ProblemEditor from './modules/ProblemEditor.vue';
import ProblemItem from './modules/ProblemItem.vue';
import DiscussionPanel from './modules/DiscussionPanel.vue';
import AbilityRadar from './modules/AbilityRadar.vue';
import IntelligentFeedback from './modules/IntelligentFeedback.vue';

const problemList = ref([
  { id: '1', title: '初三函数课堂冷场如何处理', solutionCount: 3 },
  { id: '2', title: '初三数学课堂中如何引导学生理解抽象概念', solutionCount: 5 }
]);
</script>

<template>
  <div class="question-discussion-page min-h-screen">
    <!-- 顶部导航栏 -->
    <header class="mx-10 border-b border-gray-200 rounded-lg bg-white shadow-sm">
      <div class="mx-auto h-16 flex items-center justify-between px-4 container">
        <div class="flex items-center">
          <h1 class="text-lg text-gray-800 font-medium">教学问题研讨</h1>
        </div>
        <div class="w-96">
          <SearchBar />
        </div>
      </div>
    </header>

    <main class="px-10 py-6 container">
      <div class="grid grid-cols-12 gap-6">
        <!-- 左侧主要内容区域 -->
        <div class="col-span-12 lg:col-span-8">
          <div class="rounded-lg bg-white p-6 shadow-sm">
            <!-- 筛选栏 -->
            <FilterBar class="mb-6" />

            <!-- 分隔线 -->
            <div class="mb-6 border-b border-gray-100"></div>

            <!-- 问题编辑器 -->
            <ProblemEditor />
          </div>

          <!-- 问题列表标题 -->
          <div class="mb-5 mt-8 flex items-center justify-between">
            <h2 class="text-lg text-gray-800 font-medium">热门问题</h2>
            <div class="cursor-pointer text-sm text-[#2B46FE] hover:underline">查看全部</div>
          </div>

          <!-- 问题列表 -->
          <div>
            <ProblemItem
              v-for="problem in problemList"
              :key="problem.id"
              :title="problem.title"
              :solution-count="problem.solutionCount"
            />
          </div>
        </div>

        <!-- 右侧边栏 -->
        <div class="col-span-12 lg:col-span-4">
          <DiscussionPanel />
          <AbilityRadar />
          <IntelligentFeedback />
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped></style>
