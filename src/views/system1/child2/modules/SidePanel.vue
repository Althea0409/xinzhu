<script setup lang="ts">
import { ref } from 'vue';
import { NButton, NInput } from 'naive-ui';

defineOptions({
  name: 'SidePanel'
});

// 顶部标题
const title = ref('小学数学一年级上册《加减计算》');
const subtitle = ref('PPT大纲（浙教版）');

interface MenuItem {
  id: string;
  title: string;
  selected: boolean;
  indentLevel: number;
  type?: string;
  tag?: string;
}

// 定义左侧导航菜单项目
const menuItems = ref<MenuItem[]>([
  { id: 'main', title: '小学加减法计算', selected: false, indentLevel: 0, type: 'main', tag: '主题' },
  { id: 'toc', title: '目录', selected: true, indentLevel: 0, type: 'toc', tag: '目录' },
  { id: 'ch1', title: '1.加法基础', selected: false, indentLevel: 0 },
  { id: 'ch2', title: '2.减法基础', selected: false, indentLevel: 0 },
  { id: 'ch3', title: '3.加减法混合运算', selected: false, indentLevel: 0 },
  { id: 'ch4', title: '4.加减法运算练习', selected: false, indentLevel: 0 },
  { id: 'ch5', title: '5.加减法运算教学', selected: false, indentLevel: 0 },
  { id: 'ch6', title: '6.加减法运算拓展', selected: false, indentLevel: 0 },
  { id: 'ch1_section', title: '1.加法基础', selected: false, indentLevel: 0, type: 'section', tag: '章节' },
  { id: 'ch1_1', title: '1.1加法概念', selected: false, indentLevel: 1 },
  { id: 'ch1_1_1', title: '1.1.1加法定义', selected: false, indentLevel: 2 },
  { id: 'ch1_1_2', title: '1.1.2加法符号', selected: false, indentLevel: 2 },
  { id: 'ch1_1_3', title: '1.1.3加法运算规则', selected: false, indentLevel: 2 },
  { id: 'ch1_1_4', title: '1.1.4加法运算实例', selected: false, indentLevel: 2 },
  { id: 'ch1_2', title: '1.2加法运算技巧', selected: false, indentLevel: 1 },
  { id: 'ch1_2_1', title: '1.2.1进位加法', selected: false, indentLevel: 2 },
  { id: 'ch1_inner', title: '1.2', selected: false, indentLevel: 0, type: 'inner', tag: '内页' }
]);

function selectMenuItem(item: MenuItem) {
  menuItems.value.forEach(m => (m.selected = false));
  item.selected = true;
}

// 顶部按钮
const topButtons = [
  { id: 1, text: '内容大纲', active: true },
  { id: 2, text: '生成演讲稿', active: false }
];

// 切换顶部按钮
function toggleTopButton(id: number) {
  topButtons.forEach(button => {
    button.active = button.id === id;
  });
}
</script>

<template>
  <div class="side-panel h-full flex flex-col rounded-l-xl bg-white">
    <!-- 顶部标题区 -->
    <div class="title-area px-6 py-6">
      <h1 class="text-2xl font-bold leading-tight">{{ title }}</h1>
      <h2 class="mt-2 text-xl">{{ subtitle }}</h2>
    </div>
    <!-- 顶部切换按钮 -->
    <div class="button-group ml-104 flex pl-6 pt-2">
      <div
        v-for="button in topButtons"
        :key="button.id"
        class="mr-4 cursor-pointer border rounded-lg px-4 py-2 text-sm"
        :class="button.active ? 'bg-white text-gray-800 border-gray-300' : 'bg-gray-100 text-gray-600 border-gray-200'"
        @click="toggleTopButton(button.id)"
      >
        {{ button.text }}
      </div>
    </div>

    <!-- 内容线条 -->
    <div class="content-line-container relative mt-2 flex-1 overflow-y-auto px-6">
      <!-- 菜单项 -->
      <div class="menu-items relative z-10 flex-1">
        <div
          v-for="item in menuItems"
          :key="item.id"
          class="menu-item relative mb-5 flex items-center rounded-xl py-1 pl-6 hover:bg-gray-50"
          @click="selectMenuItem(item)"
        >
          <!-- 标签 -->
          <div
            v-if="item.type"
            class="tag-label mr-2 rounded-lg px-2 py-0.5 text-xs text-white"
            :style="{
              backgroundColor:
                item.type === 'main'
                  ? '#2B46FE'
                  : item.type === 'toc'
                    ? '#6b7280'
                    : item.type === 'section'
                      ? '#8b5cf6'
                      : item.type === 'inner'
                        ? '#6b7280'
                        : '#6b7280'
            }"
          >
            {{ item.tag }}
          </div>

          <!-- 文本内容 -->
          <div class="content" :class="{ 'ml-0': item.type }">
            <span
              class="text-sm"
              :class="{
                'text-#2B46FE font-medium': item.type === 'main',
                'text-gray-600': item.type === 'toc',
                'text-purple-700 font-medium': item.type === 'section',
                'text-indigo-600': item.id.startsWith('1.'),
                'text-gray-700': !item.type && !item.id.startsWith('1.')
              }"
            >
              {{ item.title }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- 底部输入区域 -->
    <div class="input-area relative border-t border-gray-200 px-6 py-4">
      <NInput type="textarea" placeholder=" 输入主题或修改指令" class="rounded-xl" />
      <div class="absolute bottom-6 right-9">
        <NButton type="primary" size="small" round class="submit-btn h-8 w-16">
          <span class="flex items-center justify-center text-xs">
            <span>提 交</span>
          </span>
        </NButton>
      </div>
    </div>
  </div>
</template>

<style scoped>
.title-area {
  border-bottom: 1px solid #f3f4f6;
}

.content-line-container {
  height: calc(100vh - 250px);
}

.menu-item {
  cursor: pointer;
  transition: all 0.2s ease;
}

.menu-item:hover {
  transform: translateX(2px);
}

:deep(.n-button) {
  background-color: #3329f0 !important;
  border-radius: 24px !important;
}

.submit-btn {
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.1);
}

:deep(.n-input) {
  border-radius: 12px !important;
}
</style>
