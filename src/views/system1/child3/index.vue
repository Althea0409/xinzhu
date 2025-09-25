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
    title: '《观沧海》诗歌鉴赏教学方案',
    school: '北京师范大学附属中学',
    rating: 4.9,
    downloads: 342,
    subjects: [
      {
        id: '1',
        title: '诗歌意境分析',
        description: '通过朗读感受诗歌韵律，理解曹操豪迈壮志的情感表达'
      }
    ]
  },
  {
    id: '2',
    title: '《次北固山下》古诗文教学设计',
    school: '上海市实验学校',
    rating: 4.7,
    downloads: 289,
    subjects: [
      {
        id: '2',
        title: '写景抒情手法',
        description: '学习借景抒情的表现手法，体会诗人思乡之情'
      }
    ]
  },
  {
    id: '3',
    title: '《钱塘湖春行》赏析课教案',
    school: '杭州市第二中学',
    rating: 4.8,
    downloads: 315,
    subjects: [
      {
        id: '3',
        title: '春景描写技巧',
        description: '掌握动静结合的写景方法，感受西湖春天的美丽'
      }
    ]
  },
  {
    id: '4',
    title: '《天净沙·秋思》情感主题教学',
    school: '成都市第七中学',
    rating: 4.6,
    downloads: 267,
    subjects: [
      {
        id: '4',
        title: '散曲艺术特色',
        description: '理解元曲的艺术特点，体会游子的思乡愁绪'
      }
    ]
  },
  {
    id: '5',
    title: '《济南的冬天》散文阅读指导',
    school: '济南市历城第二中学',
    rating: 4.8,
    downloads: 298,
    subjects: [
      {
        id: '5',
        title: '散文语言特色',
        description: '品味老舍先生优美的语言，学习写景散文的表达技巧'
      }
    ]
  },
  {
    id: '6',
    title: '《春》朱自清散文教学设计',
    school: '南京师范大学附属中学',
    rating: 4.9,
    downloads: 356,
    subjects: [
      {
        id: '6',
        title: '修辞手法运用',
        description: '学习比喻、拟人等修辞手法，感受春天的生机与活力'
      }
    ]
  },
  {
    id: '7',
    title: '《论语》十二章文言文教学',
    school: '清华大学附属中学',
    rating: 4.7,
    downloads: 278,
    subjects: [
      {
        id: '7',
        title: '文言文阅读理解',
        description: '掌握重点文言词汇和句式，理解孔子的教育思想和人生智慧'
      }
    ]
  },
  {
    id: '8',
    title: '《世说新语》两则品读课',
    school: '华东师范大学第二附属中学',
    rating: 4.5,
    downloads: 234,
    subjects: [
      {
        id: '8',
        title: '古代小说特色',
        description: '了解魏晋风度，学习通过对话和细节刻画人物性格的方法'
      }
    ]
  }
]);

// 模拟协作项目数据
const collaborationProjects = ref([
  {
    id: '1',
    title: '七年级语文古诗文教学研究项目',
    schools: [
      { id: '1', name: '北京师范大学附属中学' },
      { id: '2', name: '上海市实验学校' }
    ]
  },
  {
    id: '2',
    title: '现代散文阅读教学创新实践',
    schools: [
      { id: '1', name: '成都市第七中学' },
      { id: '2', name: '济南市历城第二中学' }
    ]
  },
  {
    id: '3',
    title: '初中语文写作能力培养联合研究',
    schools: [
      { id: '1', name: '华东师范大学第二附属中学' },
      { id: '2', name: '西安市铁一中学' }
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
                  <span class="text-sm text-indigo-700 font-medium">3,247 份</span>
                </div>

                <div class="flex items-center justify-between">
                  <span class="text-xs text-gray-600">二次创作数量</span>
                  <span class="text-sm text-indigo-700 font-medium">6,891 次</span>
                </div>

                <div class="flex items-center justify-between">
                  <span class="text-xs text-gray-600">参与教师数量</span>
                  <span class="text-sm text-indigo-700 font-medium">2,156 位</span>
                </div>

                <div class="flex items-center justify-between">
                  <span class="text-xs text-gray-600">覆盖学校</span>
                  <span class="text-sm text-indigo-700 font-medium">428 所</span>
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
