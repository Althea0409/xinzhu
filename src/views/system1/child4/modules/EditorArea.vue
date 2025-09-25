<script setup lang="ts">
import { computed, ref } from 'vue';
import { NButton, NDropdown, NTag } from 'naive-ui';

defineOptions({
  name: 'EditorArea'
});

// 视图模式
const viewMode = ref('edit');

// 导出选项
const exportOptions = [
  { label: '导出为 Word', key: 'word', icon: null },
  { label: '导出为 PDF', key: 'pdf', icon: null },
  { label: '导出为 Markdown', key: 'markdown', icon: null }
];

// 协作用户状态
const collaborators = ref([
  {
    id: '1',
    name: '张老师',
    school: '北京师范大学附属中学',
    status: 'editing',
    color: '#10b981',
    avatar: '👩‍🏫',
    cursor: { line: 15, column: 20 }
  },
  {
    id: '2',
    name: '李老师',
    school: '上海市实验学校',
    status: 'viewing',
    color: '#3b82f6',
    avatar: '👨‍🏫',
    cursor: { line: 8, column: 10 }
  },
  {
    id: '3',
    name: '王老师',
    school: '成都市第七中学',
    status: 'commenting',
    color: '#f59e0b',
    avatar: '👩‍💼',
    cursor: { line: 25, column: 5 }
  }
]);

// 教案内容 - 《观沧海》主题
const editorContent = ref(`# 《观沧海》教学设计

## 教学目标
1. 知识与技能：理解诗歌内容，掌握重点字词
2. 过程与方法：通过朗读感受诗歌韵律，分析诗歌意境
3. 情感态度：体会曹操的雄心壮志和豪迈气概

## 教学重点
- 理解诗歌表达的思想感情
- 学习借景抒情的表现手法  
- 感受诗歌的音韵美

## 教学过程

### 一、导入新课（5分钟）
播放《三国演义》主题曲，引出曹操这一历史人物，激发学生学习兴趣。
（张老师建议：可以先让学生说说对曹操的印象，再播放音乐）

### 二、初读课文（10分钟）
1. 教师范读，学生注意字音和节奏
2. 学生自由朗读，初步感知诗歌内容
3. 重点字词解释：
   - 临：登上，到达
   - 何：多么  
   - 若：好像
   
（李老师补充：这里"临"字还可以理解为"面对"，学生容易理解错）

### 三、深入分析（20分钟）
1. 分析诗歌结构：
   - 前四句：实写登山观海所见
   - 后四句：虚写想象中的壮丽景象
   
（王老师：这里是不是应该分成三个层次？实写、虚写、抒情？）
（张老师：对，我觉得可以这样分：1-2句登山望海，3-6句描绘海景，7-8句想象奇景，最后抒发志向）

2. 重点句子赏析：
   "日月之行，若出其中；星汉灿烂，若出其里。"
   - 运用夸张手法，表现大海的壮阔
   - 体现诗人博大的胸怀和雄心壮志

### 四、朗读指导（8分钟）
指导学生有感情地朗读，注意：
- 语调要雄浑有力
- 节奏要舒缓从容
- 情感要饱满激昂

（李老师：是不是可以让学生分组朗读，比较不同的理解？）

### 五、课堂小结（2分钟）
总结诗歌主题思想和艺术特色

## 板书设计
观沧海
├── 实写：水何澹澹，山岛竦峙
└── 虚写：日月星汉，若出其中

（王老师：板书是不是太简单了？可以加上情感主线）

## 作业布置
1. 背诵全诗
2. 仿写一首描写自然景物的小诗

（张老师：第二个作业会不会太难？改成搜集曹操其他诗作怎么样？）`);

// 格式化内容用于预览
const formattedContent = computed(() => {
  return editorContent.value
    .replace(/^# (.*$)/gm, '<h1 class="text-2xl font-bold mb-4">$1</h1>')
    .replace(/^## (.*$)/gm, '<h2 class="text-xl font-semibold mb-3">$1</h2>')
    .replace(/^### (.*$)/gm, '<h3 class="text-lg font-medium mb-2">$1</h3>')
    .replace(/^- (.*$)/gm, '<li class="ml-4">• $1</li>')
    .replace(/^\d+\. (.*$)/gm, '<li class="ml-4">$1</li>')
    .replace(/\n\n/g, '<br><br>');
});

// 工具栏功能方法
const formatText = () => {
  // 格式化文本逻辑
  // 实现格式化文本功能
};

const insertTemplate = () => {
  const template = `
## 新章节标题

### 教学目标
1. 

### 教学重点
- 

### 教学过程
1. 
`;
  editorContent.value += template;
};

const insertSection = () => {
  const section = `
### 新章节（时间）
内容描述...

`;
  editorContent.value += section;
};

const handleExport = (key: string) => {
  switch (key) {
    case 'word':
      // 实现 Word 导出功能
      break;
    case 'pdf':
      // 实现 PDF 导出功能
      break;
    case 'markdown':
      // 实现 Markdown 导出功能
      break;
    default:
      // 其他导出类型占位
      break;
  }
};

// 获取状态文本和颜色
const getStatusInfo = (status: string) => {
  switch (status) {
    case 'editing':
      return { text: '编辑中', color: 'success' };
    case 'viewing':
      return { text: '查看中', color: 'info' };
    case 'commenting':
      return { text: '批注中', color: 'warning' };
    default:
      return { text: '离线', color: 'default' };
  }
};
</script>

<template>
  <div class="editor-area border border-gray-100 rounded-lg bg-white">
    <!-- 协作状态栏 -->
    <div class="border-b border-gray-200 px-5 py-3">
      <div class="mb-2 flex items-center justify-between">
        <h3 class="text-sm text-gray-700 font-medium">《观沧海》教学设计协作</h3>
        <div class="flex items-center space-x-2">
          <span class="text-xs text-gray-500">实时协作中</span>
          <div class="h-2 w-2 animate-pulse rounded-full bg-green-400"></div>
        </div>
      </div>

      <!-- 协作者列表 -->
      <div class="flex items-center space-x-3">
        <span class="text-xs text-gray-500">协作教师：</span>
        <div class="flex items-center space-x-2">
          <div
            v-for="collaborator in collaborators"
            :key="collaborator.id"
            class="flex cursor-pointer items-center rounded px-2 py-1 space-x-1 hover:bg-gray-50"
            :title="`${collaborator.name} - ${collaborator.school} - ${getStatusInfo(collaborator.status).text}`"
          >
            <div class="text-sm">{{ collaborator.avatar }}</div>
            <NTag
              :type="getStatusInfo(collaborator.status).color"
              size="small"
              :style="{ borderColor: collaborator.color }"
            >
              {{ collaborator.name }}
            </NTag>
          </div>
        </div>
      </div>
    </div>

    <!-- 编辑工具栏 -->
    <div class="border-b border-gray-200 px-5 py-2">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <!-- 格式化工具 -->
          <div class="flex items-center space-x-2">
            <NButton size="small" quaternary @click="formatText">
              <template #icon>
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 6h16M4 12h16M4 18h7"
                  ></path>
                </svg>
              </template>
              格式化
            </NButton>
            <NButton size="small" quaternary @click="insertTemplate">
              <template #icon>
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  ></path>
                </svg>
              </template>
              模板
            </NButton>
            <NButton size="small" quaternary @click="insertSection">
              <template #icon>
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  ></path>
                </svg>
              </template>
              添加章节
            </NButton>
          </div>
        </div>

        <div class="flex items-center space-x-2">
          <!-- 查看模式切换 -->
          <div class="flex overflow-hidden border border-gray-300 rounded">
            <NButton
              :type="viewMode === 'edit' ? 'primary' : 'default'"
              size="small"
              class="border-0 rounded-none"
              @click="viewMode = 'edit'"
            >
              编辑
            </NButton>
            <NButton
              :type="viewMode === 'preview' ? 'primary' : 'default'"
              size="small"
              class="border-0 border-l border-gray-300 rounded-none"
              @click="viewMode = 'preview'"
            >
              预览
            </NButton>
          </div>

          <!-- 导出功能 -->
          <NDropdown :options="exportOptions" @select="handleExport">
            <NButton size="small" quaternary>
              <template #icon>
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  ></path>
                </svg>
              </template>
              导出
            </NButton>
          </NDropdown>
        </div>
      </div>
    </div>

    <!-- 编辑区域 -->
    <div class="relative p-6">
      <!-- 协作光标指示器 -->
      <div class="absolute right-6 top-6 z-10">
        <div class="space-y-1">
          <div
            v-for="collaborator in collaborators.filter(c => c.status === 'editing')"
            :key="collaborator.id"
            class="flex items-center rounded bg-white px-2 py-1 text-xs shadow-sm space-x-1"
            :style="{ borderLeft: `3px solid ${collaborator.color}` }"
          >
            <span>{{ collaborator.avatar }}</span>
            <span>{{ collaborator.name }} 正在编辑第{{ collaborator.cursor.line }}行</span>
          </div>
        </div>
      </div>

      <!-- 编辑模式 -->
      <div v-if="viewMode === 'edit'">
        <textarea
          v-model="editorContent"
          placeholder="在此输入教案内容..."
          class="min-h-[1144px] w-full resize-none text-sm text-gray-800 leading-relaxed font-mono outline-none"
        ></textarea>
      </div>

      <!-- 预览模式 -->
      <div v-else class="prose prose-sm h-[1144px] max-w-none overflow-y-auto">
        <div class="prose prose-sm max-w-none whitespace-pre-wrap p-4" v-html="formattedContent"></div>
      </div>
    </div>

    <!-- 底部状态栏 -->
    <div class="border-t border-gray-200 px-5 py-3">
      <div class="flex items-center justify-between text-xs text-gray-500">
        <div class="flex items-center space-x-4">
          <span>字数：{{ editorContent.length }}</span>
          <span>行数：{{ editorContent.split('\n').length }}</span>
          <span>最后保存：刚刚</span>
          <span v-if="viewMode === 'edit'">模式：编辑</span>
          <span v-else>模式：预览</span>
        </div>
        <div class="flex items-center space-x-4">
          <div class="flex items-center space-x-2">
            <span>自动保存</span>
            <div class="h-1.5 w-1.5 rounded-full bg-green-400"></div>
          </div>
          <div class="flex items-center space-x-2">
            <span>协作状态：活跃</span>
            <div class="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-400"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.editor-area {
  min-height: 946px;
}

textarea::placeholder {
  color: #9ca3af;
}
</style>
