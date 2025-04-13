<script setup lang="ts">
import { computed, ref } from 'vue';
import { Icon } from '@iconify/vue';
import { useMessage } from 'naive-ui';

defineOptions({
  name: 'TextInputPanel'
});

const message = useMessage();

// 教学学科列表
const subjectList = [
  { label: '语文', value: 'chinese', color: '#f5222d' },
  { label: '数学', value: 'math', color: '#1890ff' },
  { label: '英语', value: 'english', color: '#52c41a' },
  { label: '物理', value: 'physics', color: '#722ed1' },
  { label: '化学', value: 'chemistry', color: '#fa8c16' },
  { label: '生物', value: 'biology', color: '#13c2c2' },
  { label: '历史', value: 'history', color: '#eb2f96' },
  { label: '地理', value: 'geography', color: '#faad14' },
  { label: '政治', value: 'politics', color: '#2f54eb' },
  { label: '体育', value: 'pe', color: '#fa541c' },
  { label: '音乐', value: 'music', color: '#a0d911' },
  { label: '美术', value: 'art', color: '#eb2f96' }
];

// 学生年龄段列表
const ageRangeList = [
  { label: '幼儿园', value: 'kindergarten' },
  { label: '小学低年级', value: 'primary-lower' },
  { label: '小学高年级', value: 'primary-higher' },
  { label: '初中', value: 'junior-high' },
  { label: '高中', value: 'senior-high' },
  { label: '大学', value: 'college' }
];

type SubjectKey =
  | 'math'
  | 'chinese'
  | 'english'
  | 'physics'
  | 'chemistry'
  | 'biology'
  | 'history'
  | 'geography'
  | 'politics'
  | 'pe'
  | 'music'
  | 'art';

// 用户选择
const userInputData = ref({
  subject: 'math' as SubjectKey,
  ageRange: 'primary-lower',
  description: '',
  keywords: [] as string[]
});

// 建议关键词映射
const keywordMap: Record<SubjectKey, string[]> = {
  math: ['加法', '减法', '乘法', '除法', '分数', '几何', '代数', '方程式', '统计', '概率'],
  chinese: ['阅读理解', '写作', '古诗词', '文言文', '标点符号', '修辞手法', '文学常识', '成语'],
  english: ['字母', '单词', '句型', '语法', '阅读', '听力', '口语', '写作', '时态'],
  physics: ['力学', '电学', '热学', '光学', '声学', '磁学', '运动', '能量'],
  chemistry: ['元素', '化合物', '化学反应', '酸碱盐', '氧化还原', '原子结构'],
  biology: ['植物', '动物', '细胞', '人体', '生态系统', '遗传', '进化'],
  history: ['古代史', '近代史', '现代史', '世界史', '中国史', '历史事件', '历史人物'],
  geography: ['地形', '气候', '水文', '地图', '自然资源', '人文地理', '环境保护'],
  politics: ['政治制度', '法律常识', '道德规范', '时事政治', '国情', '国际关系'],
  pe: ['体能训练', '球类运动', '田径', '体操', '健康知识', '运动技巧'],
  music: ['乐理', '乐器', '声乐', '音乐欣赏', '民族音乐', '西方音乐'],
  art: ['绘画', '手工', '雕塑', '设计', '色彩', '美术史', '艺术欣赏']
};

// 建议关键词
const suggestedKeywords = computed(() => {
  return keywordMap[userInputData.value.subject] || [];
});

// 添加关键词
function addKeyword(keyword: string) {
  if (!userInputData.value.keywords.includes(keyword)) {
    userInputData.value.keywords.push(keyword);
  }
}

// 删除关键词
function removeKeyword(index: number) {
  userInputData.value.keywords.splice(index, 1);
}

// 生成资源时发送事件给父组件
const emit = defineEmits<{
  (
    e: 'generate',
    data: {
      description: string;
      subject: SubjectKey;
      ageRange: string;
      keywords: string[];
    }
  ): void;
}>();

// 生成描述
function generateDescription() {
  // 如果没有输入描述和关键词，显示警告
  if (!userInputData.value.description && userInputData.value.keywords.length === 0) {
    message.warning('请输入描述或选择关键词');
    return;
  }

  // 获取所选学科和年龄段的文本
  const subject = subjectList.find(item => item.value === userInputData.value.subject)?.label || '';
  const ageRange = ageRangeList.find(item => item.value === userInputData.value.ageRange)?.label || '';

  // 构建完整描述
  const description = `创建一份关于${subject}的教学资源${userInputData.value.description ? `，主题是${userInputData.value.description}` : ''}${userInputData.value.keywords.length > 0 ? `，包含以下关键概念：${userInputData.value.keywords.join('、')}` : ''}，适合${ageRange}学生使用。`;

  // 提示用户
  message.success('已生成教学资源描述');

  // 发送事件给父组件
  emit('generate', {
    description,
    subject: userInputData.value.subject,
    ageRange: userInputData.value.ageRange,
    keywords: userInputData.value.keywords
  });
}
</script>

<template>
  <div class="text-input-panel">
    <NCard class="h-full">
      <template #header>
        <div class="flex items-center">
          <Icon icon="carbon:document-add" class="mr-2 text-xl" />
          <span>文本描述输入</span>
        </div>
      </template>

      <div class="flex flex-col gap-4">
        <!-- 学科选择 -->
        <div>
          <div class="mb-2 text-sm font-medium">教学学科</div>
          <NSelect v-model:value="userInputData.subject" :options="subjectList" />
        </div>

        <!-- 年龄段选择 -->
        <div>
          <div class="mb-2 text-sm font-medium">学生年龄段</div>
          <NSelect v-model:value="userInputData.ageRange" :options="ageRangeList" />
        </div>

        <!-- 描述输入 -->
        <div>
          <div class="mb-2 text-sm font-medium">教学主题描述</div>
          <NInput
            v-model:value="userInputData.description"
            type="textarea"
            placeholder="请描述您想要生成的教学资源主题..."
            :autosize="{ minRows: 3, maxRows: 5 }"
          />
        </div>

        <!-- 关键词选择 -->
        <div>
          <div class="mb-2 flex items-center justify-between">
            <span class="text-sm font-medium">关键概念</span>
            <NButton text size="small" @click="userInputData.keywords = []">清空</NButton>
          </div>

          <!-- 已选关键词展示 -->
          <div v-if="userInputData.keywords.length > 0" class="mb-3 flex flex-wrap gap-2">
            <NTag
              v-for="(keyword, index) in userInputData.keywords"
              :key="keyword"
              closable
              size="medium"
              @close="removeKeyword(index)"
            >
              {{ keyword }}
            </NTag>
          </div>

          <!-- 建议关键词 -->
          <div class="mb-2 flex flex-wrap gap-2">
            <NButton
              v-for="keyword in suggestedKeywords"
              :key="keyword"
              text
              size="small"
              :disabled="userInputData.keywords.includes(keyword)"
              @click="addKeyword(keyword)"
            >
              {{ keyword }}
            </NButton>
          </div>
        </div>

        <!-- 生成按钮 -->
        <div class="mx-145 mt-2">
          <NButton
            type="primary"
            block
            :disabled="!userInputData.description && userInputData.keywords.length === 0"
            @click="generateDescription"
          >
            <template #icon>
              <Icon icon="carbon:text-link-analysis" />
            </template>
            生成多媒体教学资源
          </NButton>
        </div>
      </div>
    </NCard>
  </div>
</template>

<style scoped>
.text-input-panel {
  height: 100%;
}
</style>
