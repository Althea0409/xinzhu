<!-- eslint-disable vue/no-static-inline-styles -->
<!-- eslint-disable vue/no-static-inline-styles -->
<!-- eslint-disable vue/no-static-inline-styles -->
<!-- eslint-disable no-console -->
<script setup lang="ts">
import { ref } from 'vue';
import { NButton } from 'naive-ui';
import { Icon } from '@iconify/vue';
import SearchBar from './modules/SearchBar.vue';
import TeachingPlanCard from './modules/TeachingPlanCard.vue';
import CollaborationProject from './modules/CollaborationProject.vue';
import FileUploader from './modules/FileUploader.vue';

// 模拟教案数据
const teachingPlans = ref([
  {
    id: '1',
    title: '初中数学概率教学方案',
    school: '北京四中',
    rating: 4.8,
    downloads: 238,
    subjects: [
      {
        id: '1',
        title: '概率基础',
        description: '掌握基础概率计算方法，理解随机事件的特性'
      }
    ]
  },
  {
    id: '2',
    title: '初中数学概率教学方案',
    school: '北京四中',
    rating: 4.8,
    downloads: 236,
    subjects: [
      {
        id: '2',
        title: '概率进阶',
        description: '掌握基础概率计算方法，学习条件概率应用'
      }
    ]
  },
  {
    id: '3',
    title: '初中数学概率教学方案',
    school: '北京四中',
    rating: 4.8,
    downloads: 238,
    subjects: [
      {
        id: '3',
        title: '概率高级',
        description: '掌握基础概率计算方法，深入理解随机变量'
      }
    ]
  },
  {
    id: '4',
    title: '初中数学概率教学方案',
    school: '北京四中',
    rating: 4.8,
    downloads: 238,
    subjects: [
      {
        id: '4',
        title: '概率综合',
        description: '掌握基础概率计算方法，应用于实际问题解决'
      }
    ]
  }
]);

// 模拟协作项目数据
const collaborationProjects = ref([
  {
    id: '1',
    title: '初中物理实验教学联合项目',
    schools: [
      { id: '1', name: '北京四中' },
      { id: '2', name: '上海中学' },
      { id: '3', name: '广州实验中学' }
    ]
  },
  {
    id: '2',
    title: '初中物理实验教学联合项目',
    schools: [
      { id: '1', name: '北京四中' },
      { id: '2', name: '上海中学' },
      { id: '3', name: '广州实验中学' }
    ]
  },
  {
    id: '3',
    title: '初中物理实验教学联合项目',
    schools: [
      { id: '1', name: '北京四中' },
      { id: '2', name: '上海中学' },
      { id: '3', name: '广州实验中学' }
    ]
  }
]);

// 处理搜索事件
function handleSearch(query: string) {
  console.log('搜索查询:', query);
  // 这里添加实际搜索逻辑
}

// 处理查看教案事件
function handleViewPlan(id: string) {
  console.log('查看教案:', id);
  // 这里添加教案详情查看逻辑
}

// 处理教案二次创作事件
function handleClonePlan(id: string) {
  console.log('二次创作教案:', id);
  // 这里添加教案克隆逻辑
}

// 处理加入项目事件
function handleJoinProject(id: string) {
  console.log('加入项目:', id);
  // 这里添加加入项目逻辑
}

// 处理文件上传事件
function handleFileUpload(file: File) {
  console.log('上传文件:', file.name);
  // 这里添加文件上传逻辑
}
</script>

<template>
  <div class="min-h-screen">
    <!-- 顶部栏 -->
    <div class="relative mx-8 overflow-hidden rounded-2xl bg-[#4659FD] text-white">
      <div class="mx-auto px-8 py-8 container">
        <h1 class="mb-4 text-4xl font-bold tracking-tight">跨校教学资源共享平台</h1>
        <p class="mb-8 text-sm text-blue-100/80 tracking-wide">连接全国教师的教学智慧</p>
      </div>
      <!-- 波浪形状装饰 -->
      <!-- <div class="wave-shape absolute bottom-0 h-16 w-full bg-gray-50"></div> -->
    </div>

    <!-- 内容区域 -->
    <div class="relative mx-auto px-8 pb-16 container">
      <!-- 搜索区域 -->
      <div class="mb-14 border border-gray-100 rounded-2xl bg-white p-6 shadow-md -mt-12">
        <SearchBar @search="handleSearch" />
      </div>

      <!-- 教案卡片区域 -->
      <div class="mb-16 rounded-2xl bg-white px-8 py-8">
        <div class="mb-8 flex items-center">
          <div class="mr-3 h-6 w-1.5 rounded from-[#4659FD] to-[#6173FF] bg-gradient-to-b"></div>
          <h2 class="text-2xl text-gray-800 font-bold">精选教案</h2>
          <div class="ml-auto flex space-x-3">
            <NButton quaternary size="small" class="flex items-center justify-center rounded-full px-3">
              <template #icon>
                <Icon icon="carbon:filter" class="mr-1" />
              </template>
              筛选
            </NButton>
            <NButton quaternary size="small" class="flex items-center justify-center rounded-full px-3">
              <template #icon>
                <Icon icon="carbon:view-mode-2" class="mr-1" />
              </template>
              切换视图
            </NButton>
          </div>
        </div>
        <div class="grid grid-cols-1 gap-8 lg:grid-cols-4 sm:grid-cols-2">
          <TeachingPlanCard
            v-for="plan in teachingPlans"
            :key="plan.id"
            :plan="plan"
            class="transition duration-300 hover:translate-y-[-4px]"
            @view="handleViewPlan"
            @clone="handleClonePlan"
          />
        </div>
      </div>

      <!-- 跨校协作区域 -->
      <div class="relative mb-16 overflow-hidden rounded-xl from-indigo-50 to-blue-50 bg-gradient-to-br p-8">
        <div
          class="absolute right-0 top-0 h-64 w-64 translate-x-1/2 rounded-full bg-indigo-100 opacity-20 -translate-y-1/2"
        ></div>
        <div
          class="absolute bottom-0 left-0 h-48 w-48 translate-y-1/2 rounded-full bg-blue-100 opacity-20 -translate-x-1/2"
        ></div>

        <div class="relative">
          <div class="mb-8 flex items-center">
            <div class="mr-3 h-10 w-10 flex items-center justify-center rounded-full bg-indigo-100">
              <Icon icon="carbon:collaboration" class="text-2xl text-indigo-600" />
            </div>
            <h2 class="text-2xl text-gray-800 font-bold">跨校协作项目</h2>
            <NButton class="ml-auto flex items-center justify-center" size="small" type="primary" ghost rounded>
              <template #icon>
                <Icon icon="carbon:add" class="mr-1" />
              </template>
              创建新项目
            </NButton>
          </div>

          <div class="grid grid-cols-1 gap-8 lg:grid-cols-3 md:grid-cols-2">
            <div
              v-for="project in collaborationProjects"
              :key="project.id"
              class="rounded-xl bg-white p-6 shadow-sm transition-all duration-300 hover:translate-y-[-2px] hover:shadow-md"
            >
              <CollaborationProject :project="project" @join="handleJoinProject" />
            </div>
          </div>
        </div>
      </div>

      <!-- 文件上传区域 -->
      <div class="border border-gray-100 rounded-xl bg-white p-8 shadow-sm">
        <div class="grid grid-cols-1 gap-8 lg:grid-cols-5">
          <div class="flex items-center lg:col-span-3">
            <div class="w-full">
              <FileUploader @upload="handleFileUpload" />
            </div>
          </div>

          <div class="border-l border-gray-100 pl-8 lg:col-span-2">
            <h3 class="mb-5 flex items-center text-lg text-gray-800 font-bold">
              <Icon icon="carbon:information" class="mr-2 text-blue-500" />
              教案分享指南
            </h3>

            <div class="mb-6 space-y-4">
              <div class="flex items-start">
                <div class="mr-3 h-6 w-6 flex flex-shrink-0 items-center justify-center rounded-full bg-blue-100">
                  <span class="text-xs text-blue-600 font-medium">1</span>
                </div>
                <p class="text-sm text-gray-600">
                  上传文件需为
                  <span class="text-blue-600 font-medium">Word 或 PDF 格式</span>
                  ，大小不超过 20MB
                </p>
              </div>

              <div class="flex items-start">
                <div class="mr-3 h-6 w-6 flex flex-shrink-0 items-center justify-center rounded-full bg-blue-100">
                  <span class="text-xs text-blue-600 font-medium">2</span>
                </div>
                <p class="text-sm text-gray-600">
                  请确保教案内容包含
                  <span class="text-blue-600 font-medium">教学目标、教学过程、知识点</span>
                  等关键信息
                </p>
              </div>

              <div class="flex items-start">
                <div class="mr-3 h-6 w-6 flex flex-shrink-0 items-center justify-center rounded-full bg-blue-100">
                  <span class="text-xs text-blue-600 font-medium">3</span>
                </div>
                <p class="text-sm text-gray-600">上传成功后，系统将自动提取关键信息并组织标签，您可在后续步骤中确认</p>
              </div>
            </div>

            <div class="rounded-lg bg-indigo-50 p-4">
              <h4 class="mb-3 text-sm text-indigo-700 font-medium">平台数据统计</h4>

              <div class="space-y-3">
                <div class="flex items-center justify-between">
                  <span class="text-xs text-gray-600">已分享教案</span>
                  <span class="text-sm text-indigo-700 font-medium">2,583 份</span>
                </div>

                <div class="flex items-center justify-between">
                  <span class="text-xs text-gray-600">二次创作数量</span>
                  <span class="text-sm text-indigo-700 font-medium">5,217 次</span>
                </div>

                <div class="flex items-center justify-between">
                  <span class="text-xs text-gray-600">参与教师数量</span>
                  <span class="text-sm text-indigo-700 font-medium">1,832 位</span>
                </div>

                <div class="flex items-center justify-between">
                  <span class="text-xs text-gray-600">覆盖学校</span>
                  <span class="text-sm text-indigo-700 font-medium">312 所</span>
                </div>
              </div>

              <div class="mt-4 text-center">
                <NButton size="small" type="primary" text>查看详细报告</NButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.wave-shape {
  border-radius: 50% 50% 0 0 / 100% 100% 0 0;
}
</style>
