<script setup lang="ts">
import { reactive, ref } from 'vue';
import { NIcon, NModal, NSpin, useMessage } from 'naive-ui';
import type { FormInst } from 'naive-ui';
import { ArrowLeft, Document, Edit, Image, TextAlignLeft, Time } from '@vicons/carbon';

const message = useMessage();
const formRef = ref<FormInst | null>(null);
const showGeneratedContent = ref(false);
const isGenerating = ref(false);
const showDetailedPlan = ref(false);
const showDetailedPlanModal = ref(false);

// 表单数据
const formValue = reactive({
  educationStage: '',
  grade: '',
  subject: '',
  textbook: '',
  objective: '',
  additionalStandard: '',
  alignmentSetting: null
});

// 教学设计内容
const generatedDesign = reactive({
  title: '小学语文一年级下册《静夜思》详细教案',
  objectives: [
    '认识并理解《静夜思》这首诗的内容，感受诗人思乡的情感。',
    '掌握"床、前、明、月、光、疑、是、地、上、霜"等生字的读音和书写。',
    '能够正确、流利、有感情地朗读和背诵《静夜思》。',
    '通过想象和联想，体会诗人望月思乡的意境。',
    '培养学生对古诗的兴趣，激发学习传统文化的热情。'
  ],
  focusPoints: [
    {
      title: '教学重点',
      points: [
        '理解《静夜思》的内容和意境，感受诗人思乡的情感。',
        '掌握生字的读音和书写，正确朗读和背诵诗歌。',
        '通过想象和联想，体会诗歌的意境美。'
      ]
    },
    {
      title: '教学难点',
      points: ['理解"疑是地上霜"的比喻手法。', '体会诗人望月思乡的复杂情感。', '感受诗歌的意境美，培养审美情趣。']
    }
  ],
  teachingMethods: [
    '情境教学法：创设月夜思乡的情境，帮助学生理解诗歌意境。',
    '朗读教学法：通过多种形式的朗读，感受诗歌的韵律美。',
    '想象教学法：引导学生展开想象，体会诗歌的意境。',
    '游戏教学法：通过识字游戏、背诵比赛等活动，激发学习兴趣。',
    '多媒体教学法：运用图片、音频等多媒体手段，增强教学效果。'
  ],
  materials: [
    '多媒体课件：包含诗歌内容、配图、朗读音频等',
    '生字卡片：包含本课生字的读音、笔顺、组词等',
    '情境图片：月夜、思乡等主题的图片',
    '练习纸：包含生字书写、诗歌填空等练习',
    '教学挂图：展示诗歌内容和意境',
    '录音设备：用于录制和播放朗读音频'
  ],
  lessonFlow: [
    {
      title: '导入新课',
      content:
        '播放《静夜思》配乐朗诵，展示月夜图片，引导学生进入诗歌情境。提问："同学们，你们见过月亮吗？在月夜下，你们会想些什么呢？"',
      duration: '5分钟',
      interaction: '师生互动问答，学生分享月夜经历和感受',
      expectedOutcome: '激发学生学习兴趣，为理解诗歌内容做铺垫',
      materials: '多媒体课件、配乐朗诵'
    },
    {
      title: '初读感知',
      content: '教师范读《静夜思》，学生跟读。讲解诗歌大意，重点解释"疑是地上霜"的比喻手法。',
      duration: '10分钟',
      interaction: '师生互动朗读，教师讲解，学生提问',
      expectedOutcome: '学生初步理解诗歌内容，掌握基本读音',
      materials: '教学挂图、生字卡片'
    },
    {
      title: '识字教学',
      content: '学习"床、前、明、月、光、疑、是、地、上、霜"等生字，通过游戏、组词等方式巩固记忆。',
      duration: '15分钟',
      interaction: '识字游戏、组词比赛、书写练习',
      expectedOutcome: '掌握生字的读音和书写',
      materials: '生字卡片、练习纸'
    },
    {
      title: '品读感悟',
      content: '引导学生想象诗歌描绘的画面，体会诗人思乡的情感。通过提问、讨论等方式深入理解诗歌意境。',
      duration: '15分钟',
      interaction: '小组讨论、想象分享、情感交流',
      expectedOutcome: '深入理解诗歌意境，感受思乡情感',
      materials: '情境图片、多媒体课件'
    },
    {
      title: '朗读背诵',
      content: '指导学生有感情地朗读诗歌，注意停顿和语气。通过多种形式练习背诵。',
      duration: '10分钟',
      interaction: '个人朗读、小组朗读、全班齐读',
      expectedOutcome: '能够正确、流利、有感情地朗读和背诵诗歌',
      materials: '录音设备、配乐'
    },
    {
      title: '拓展延伸',
      content: '介绍李白其他思乡诗作，如《望庐山瀑布》《早发白帝城》等，拓展学生的诗歌视野。',
      duration: '10分钟',
      interaction: '诗歌欣赏、知识拓展',
      expectedOutcome: '拓展诗歌知识，激发学习兴趣',
      materials: '拓展诗歌资料'
    },
    {
      title: '课堂小结',
      content: '总结本课学习内容，强调重点难点。布置课后作业。',
      duration: '5分钟',
      interaction: '师生共同总结',
      expectedOutcome: '巩固所学知识，明确课后任务',
      materials: '作业单'
    }
  ],
  evaluation: {
    formative: [
      '课堂观察：记录学生参与度、朗读表现、理解程度',
      '练习评价：评价生字书写、诗歌填空等练习完成情况',
      '互动表现：评价学生在讨论、游戏等活动中的表现',
      '自我评价：学生填写学习反馈表，评价自己的学习情况'
    ],
    summative: [
      '课后作业：完成生字书写、诗歌填空等练习',
      '单元测试：包含生字认读、诗歌默写等内容',
      '学习档案：记录学生在本单元的学习成果',
      '项目评价：完成"我的古诗集"项目，收集和创作古诗'
    ]
  },
  reflection: [
    '教学效果：分析课堂教学活动的有效性，评估学生是否达到预期学习目标',
    '教学方法：评估各种教学方法的适用性，特别是情境教学和朗读教学的效果',
    '学生反馈：收集学生对课程的喜好和建议，了解学习过程中的困难',
    '差异教学：反思如何更好地照顾不同学习水平的学生',
    '改进建议：总结教学经验，提出改进措施'
  ],
  homeworkAndReflection: [
    '基础作业：抄写生字，每个字写三遍，并组词。',
    '背诵作业：背诵《静夜思》，录制朗读音频。',
    '拓展作业：收集其他描写月亮的古诗，与同学分享。',
    '实践作业：观察月亮，记录自己的感受，写一段话。',
    '创意作业：为《静夜思》配一幅画，表达诗歌意境。',
    '家长配合：请家长与孩子一起朗读古诗，分享思乡经历。'
  ],
  detailedPlan: {
    title: '小学语文一年级下册《静夜思》详细设计',
    teachingDate: '2025年5月24日',
    grade: '一年级二班',
    studentCount: '45人',
    teachingUnit: '第二单元 古诗欣赏',
    lessonTopic: '《静夜思》',
    timeAllocation: '1课时（40分钟）',
    teachingMaterials: '人教版义务教育教科书《语文》一年级下册',
    teachingTools: ['多媒体课件、配乐朗诵', '生字卡片、教学挂图', '情境图片、练习纸', '录音设备、配乐', '拓展诗歌资料'],
    priorKnowledge: [
      '学生已经学习过一些简单的古诗',
      '学生具备基本的识字和朗读能力',
      '学生对月亮、思乡等主题有初步认识'
    ],
    teachingProcedure: [
      {
        stage: '课前准备',
        activities: [
          '检查多媒体设备是否工作正常',
          '准备好教学用具和材料',
          '在黑板上写好课题',
          '布置教室，营造月夜氛围'
        ],
        time: '课前5分钟'
      },
      {
        stage: '导入新课',
        activities: [
          '播放《静夜思》配乐朗诵',
          '展示月夜图片，创设情境',
          '提问："同学们，你们见过月亮吗？在月夜下，你们会想些什么呢？"',
          '引导学生进入诗歌情境'
        ],
        time: '5分钟',
        designIntent: '通过情境导入，激发学生学习兴趣，为理解诗歌内容做铺垫。'
      },
      {
        stage: '初读感知',
        activities: [
          '教师范读《静夜思》',
          '学生跟读，注意读音和停顿',
          '讲解诗歌大意',
          '重点解释"疑是地上霜"的比喻手法'
        ],
        time: '10分钟',
        designIntent: '通过朗读和讲解，帮助学生初步理解诗歌内容。'
      },
      {
        stage: '识字教学',
        activities: [
          '学习生字：床、前、明、月、光、疑、是、地、上、霜',
          '通过游戏巩固生字读音',
          '练习生字书写',
          '组词造句练习'
        ],
        time: '15分钟',
        designIntent: '通过多种方式学习生字，提高识字效率。'
      },
      {
        stage: '品读感悟',
        activities: ['引导学生想象诗歌描绘的画面', '体会诗人思乡的情感', '小组讨论诗歌意境', '分享个人感受'],
        time: '15分钟',
        designIntent: '通过想象和讨论，深入理解诗歌意境。'
      },
      {
        stage: '朗读背诵',
        activities: ['指导有感情地朗读', '练习诗歌背诵', '进行朗读比赛', '录制朗读音频'],
        time: '10分钟',
        designIntent: '通过多种形式的朗读，提高朗读和背诵能力。'
      },
      {
        stage: '拓展延伸',
        activities: ['介绍李白其他思乡诗作', '欣赏相关诗歌', '拓展诗歌知识', '激发学习兴趣'],
        time: '10分钟',
        designIntent: '拓展学生的诗歌视野，培养学习兴趣。'
      },
      {
        stage: '课堂小结',
        activities: ['总结本课学习内容', '强调重点难点', '布置课后作业', '提出学习建议'],
        time: '5分钟',
        designIntent: '巩固所学知识，明确课后任务。'
      }
    ],
    assessmentMethods: [
      '课堂观察：记录学生参与度、朗读表现、理解程度',
      '练习评价：评价生字书写、诗歌填空等练习完成情况',
      '互动表现：评价学生在讨论、游戏等活动中的表现',
      '自我评价：学生填写学习反馈表，评价自己的学习情况'
    ],
    afterClassReflection: {
      successPoints: '待填写（课后填写）',
      challengesEncountered: '待填写（课后填写）',
      improvementSuggestions: '待填写（课后填写）',
      nextLessonFocus: '待填写（课后填写）'
    }
  }
});

// 表单验证规则
const rules = {
  educationStage: {
    required: true,
    message: '请选择教育阶段',
    trigger: 'blur'
  },
  grade: {
    required: true,
    message: '请选择年级',
    trigger: 'blur'
  },
  subject: {
    required: true,
    message: '请选择学科',
    trigger: 'blur'
  },
  textbook: {
    required: true,
    message: '请选择教材',
    trigger: 'blur'
  }
};

// 下拉选项
const educationStageOptions = [
  { label: '学前教育', value: '学前教育' },
  { label: '小学', value: '小学' },
  { label: '初中', value: '初中' },
  { label: '高中', value: '高中' },
  { label: '大学', value: '大学' }
];

const gradeOptions = [
  { label: '一年级', value: '一年级' },
  { label: '二年级', value: '二年级' },
  { label: '三年级', value: '三年级' },
  { label: '四年级', value: '四年级' },
  { label: '五年级', value: '五年级' },
  { label: '六年级', value: '六年级' }
];

const subjectOptions = [
  { label: '语文', value: '语文' },
  { label: '数学', value: '数学' },
  { label: '英语', value: '英语' },
  { label: '科学', value: '科学' },
  { label: '社会', value: '社会' }
];

const textbookOptions = [
  { label: '小学浙教版一年级上册', value: '小学浙教版一年级上册' },
  { label: '小学浙教版一年级下册', value: '小学浙教版一年级下册' },
  { label: '小学人教版一年级上册', value: '小学人教版一年级上册' },
  { label: '小学人教版一年级下册', value: '小学人教版一年级下册' },
  { label: '小学北师大版一年级上册', value: '小学北师大版一年级上册' },
  { label: '小学北师大版一年级下册', value: '小学北师大版一年级下册' }
];

const alignmentOptions = [
  { label: '国家课程标准', value: '国家课程标准' },
  { label: '地方课程标准', value: '地方课程标准' },
  { label: '校本课程标准', value: '校本课程标准' }
];

// 提交表单
function handleSubmit() {
  formRef.value?.validate((errors: any) => {
    if (!errors) {
      // 设置生成中状态
      isGenerating.value = true;
      message.success('正在生成教学设计，请稍候...');

      // 模拟生成过程，延迟显示结果
      setTimeout(() => {
        isGenerating.value = false;
        showGeneratedContent.value = true;
        message.success('生成成功');
        // 这里可以添加API调用逻辑
      }, 6000); // 2.5秒的延迟，可根据实际需求调整
    } else {
      message.error('请完善表单信息');
    }
  });
}

// 返回表单
function backToForm() {
  showGeneratedContent.value = false;
  showDetailedPlan.value = false;
}

// 关闭详细教案弹窗
function closeDetailedPlanModal() {
  showDetailedPlanModal.value = false;
}

// 暴露给父组件的数据
defineExpose({
  formValue,
  generatedDesign,
  showDetailedPlanModal
});
</script>

<template>
  <div class="course-plan-container">
    <!-- 表单部分 -->
    <div v-if="!showGeneratedContent">
      <div class="mb-4 flex items-center justify-between">
        <h1 class="text-2xl font-bold">课程计划</h1>
      </div>

      <p class="mb-4 text-sm text-gray-500 dark:text-gray-400">为您教授的主题或期望达成的教学目标量身定制课程计划</p>

      <NForm ref="formRef" :model="formValue" :rules="rules" label-placement="top" require-mark-placement="left">
        <!-- 教育阶段 -->
        <NFormItem label="教育阶段：" path="educationStage" :rule="rules.educationStage">
          <NSelect
            v-model:value="formValue.educationStage"
            placeholder="请选择教育阶段"
            :options="educationStageOptions"
            clearable
            class="w-full"
          />
        </NFormItem>

        <!-- 学段 -->
        <NFormItem label="学段：" path="grade" :rule="rules.grade">
          <NSelect
            v-model:value="formValue.grade"
            placeholder="请选择年级"
            :options="gradeOptions"
            clearable
            class="w-full"
          />
        </NFormItem>

        <!-- 学科 -->
        <NFormItem label="学科：" path="subject" :rule="rules.subject">
          <NSelect
            v-model:value="formValue.subject"
            placeholder="请选择学科"
            :options="subjectOptions"
            clearable
            class="w-full"
          />
        </NFormItem>

        <!-- 教材 -->
        <NFormItem label="教材：" path="textbook" :rule="rules.textbook">
          <NSelect
            v-model:value="formValue.textbook"
            placeholder="请选择教材"
            :options="textbookOptions"
            clearable
            class="w-full"
          />
        </NFormItem>

        <!-- 主题、标准或目标 -->
        <NFormItem label="主题、标准或目标：" path="objective">
          <NInput
            v-model:value="formValue.objective"
            type="textarea"
            placeholder="    主题、标准或更长的说明所教授的内容"
            :autosize="{ minRows: 5, maxRows: 10 }"
            show-count
            :maxlength="1000"
          />
        </NFormItem>

        <!-- 附加标准 -->
        <div class="mb-4">
          <div class="mb-2 text-base">附加标准：</div>
          <div class="mb-2 flex gap-2">
            <NButton size="small" secondary class="bg-gray-100 px-3 py-1 text-sm dark:bg-gray-700">
              <template #icon>
                <NIcon><TextAlignLeft /></NIcon>
              </template>
              文本
            </NButton>
            <NButton size="small" secondary class="px-3 py-1 text-sm">
              <template #icon>
                <NIcon><Document /></NIcon>
              </template>
              文件
            </NButton>
            <NButton size="small" secondary class="px-3 py-1 text-sm">
              <template #icon>
                <NIcon><Image /></NIcon>
              </template>
              知识库
            </NButton>
          </div>
          <NInput
            v-model:value="formValue.additionalStandard"
            type="textarea"
            placeholder="    示例：学生们正在学习一个关于世界区域的单元，上一节课是关于美国地理的课程，需要包括小组合作的内容"
            :autosize="{ minRows: 5, maxRows: 10 }"
            show-count
            :maxlength="1000"
          />
        </div>

        <!-- 对齐标准设置 -->
        <NFormItem label="对齐标准设置：" path="alignmentSetting">
          <NSelect
            v-model:value="formValue.alignmentSetting"
            placeholder="&nbsp;&nbsp;请选择"
            :options="alignmentOptions"
            clearable
            class="w-full"
          />
        </NFormItem>

        <!-- 提交按钮 -->
        <div class="mt-8 flex justify-center">
          <NButton
            type="primary"
            class="w-40 rounded-full"
            :loading="isGenerating"
            :disabled="isGenerating"
            @click="handleSubmit"
          >
            <span class="mx-auto">{{ isGenerating ? '生成中...' : '生 成' }}</span>
          </NButton>
        </div>
      </NForm>
    </div>

    <!-- 生成中状态 -->
    <div v-else-if="isGenerating" class="h-full w-full flex flex-col items-center justify-center py-20">
      <NSpin size="large" />
      <p class="mt-4 text-lg text-gray-600">正在生成教学设计，请稍候...</p>
    </div>

    <!-- 生成的教学设计部分 -->
    <Transition name="fade">
      <div v-show="showGeneratedContent && !isGenerating" class="generated-content">
        <div class="mb-6 flex items-start justify-between">
          <div>
            <h1 class="text-2xl text-primary font-bold">{{ generatedDesign.title }}</h1>
            <p class="mt-2 text-sm text-gray-500">基于{{ formValue.textbook }}生成，预计授课时长：45分钟</p>
          </div>
          <NButton tertiary type="info" size="small" @click="backToForm">
            <template #icon>
              <NIcon><ArrowLeft /></NIcon>
            </template>
            返回编辑
          </NButton>
        </div>

        <!-- 教学目标 -->
        <div class="mb-8 rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
          <h2 class="mb-3 flex items-center text-xl text-primary font-bold">
            <div class="mr-2 h-7 w-7 flex items-center justify-center rounded-full bg-primary text-white">一</div>
            教学目标
          </h2>
          <ul class="list-decimal pl-8">
            <li
              v-for="(objective, index) in generatedDesign.objectives"
              :key="index"
              class="mb-2 text-gray-700 dark:text-gray-300"
            >
              {{ objective }}
            </li>
          </ul>
        </div>

        <!-- 教学重点与难点 -->
        <div class="mb-8 rounded-lg bg-orange-50 p-4 dark:bg-orange-900/20">
          <h2 class="mb-3 flex items-center text-xl text-primary font-bold">
            <div class="mr-2 h-7 w-7 flex items-center justify-center rounded-full bg-primary text-white">二</div>
            教学重点与难点
          </h2>
          <div v-for="(section, sIndex) in generatedDesign.focusPoints" :key="sIndex" class="mb-4">
            <h3 class="mb-2 text-lg text-gray-800 font-medium dark:text-gray-200">{{ section.title }}：</h3>
            <ul class="list-disc pl-8">
              <li v-for="(point, pIndex) in section.points" :key="pIndex" class="mb-1 text-gray-700 dark:text-gray-300">
                {{ point }}
              </li>
            </ul>
          </div>
        </div>

        <!-- 教学方法 -->
        <div class="mb-8 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
          <h2 class="mb-3 flex items-center text-xl text-primary font-bold">
            <div class="mr-2 h-7 w-7 flex items-center justify-center rounded-full bg-primary text-white">三</div>
            教学方法
          </h2>
          <ul class="list-decimal pl-8">
            <li
              v-for="(method, index) in generatedDesign.teachingMethods"
              :key="index"
              class="mb-2 text-gray-700 dark:text-gray-300"
            >
              {{ method }}
            </li>
          </ul>
        </div>

        <!-- 教学准备 -->
        <div class="mb-8 rounded-lg bg-purple-50 p-4 dark:bg-purple-900/20">
          <h2 class="mb-3 flex items-center text-xl text-primary font-bold">
            <div class="mr-2 h-7 w-7 flex items-center justify-center rounded-full bg-primary text-white">四</div>
            教学准备
          </h2>
          <ul class="list-disc pl-8">
            <li
              v-for="(material, index) in generatedDesign.materials"
              :key="index"
              class="mb-2 text-gray-700 dark:text-gray-300"
            >
              {{ material }}
            </li>
          </ul>
        </div>

        <!-- 课堂流程 -->
        <div class="mb-8 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
          <h2 class="mb-3 flex items-center text-xl text-primary font-bold">
            <div class="mr-2 h-7 w-7 flex items-center justify-center rounded-full bg-primary text-white">五</div>
            课堂流程
          </h2>
          <div class="mt-4">
            <div class="relative">
              <div v-for="(step, index) in generatedDesign.lessonFlow" :key="index" class="relative mb-6 pl-10">
                <div
                  class="absolute left-2 top-0 h-8 w-8 flex items-center justify-center rounded-full bg-primary text-sm text-white -translate-x-1/2"
                >
                  {{ index + 1 }}
                </div>
                <div
                  class="border border-gray-200 rounded-lg bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800"
                >
                  <div class="mb-2 flex items-center justify-between">
                    <h3 class="text-lg text-primary font-semibold">{{ step.title }}</h3>
                    <div class="flex items-center text-gray-500">
                      <NIcon class="mr-1" size="18">
                        <Time />
                      </NIcon>
                      <span class="text-sm">{{ step.duration }}</span>
                    </div>
                  </div>
                  <p class="mb-3 text-gray-700 dark:text-gray-300">{{ step.content }}</p>

                  <div v-if="step.interaction" class="mb-2">
                    <div class="mb-1 text-sm text-blue-600 font-medium dark:text-blue-400">互动环节：</div>
                    <div
                      class="rounded-md bg-blue-50 px-3 py-2 text-sm text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                    >
                      {{ step.interaction }}
                    </div>
                  </div>

                  <div v-if="step.expectedOutcome">
                    <div class="mb-1 text-sm text-green-600 font-medium dark:text-green-400">预期成果：</div>
                    <div
                      class="rounded-md bg-green-50 px-3 py-2 text-sm text-green-700 dark:bg-green-900/30 dark:text-green-300"
                    >
                      {{ step.expectedOutcome }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 评价方式 -->
        <div class="mb-8 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
          <h2 class="mb-3 flex items-center text-xl text-primary font-bold">
            <div class="mr-2 h-7 w-7 flex items-center justify-center rounded-full bg-primary text-white">六</div>
            评价方式
          </h2>
          <div class="mb-4">
            <h3 class="mb-2 text-lg text-gray-800 font-medium dark:text-gray-200">过程性评价：</h3>
            <ul class="list-disc pl-8">
              <li
                v-for="(item, index) in generatedDesign.evaluation.formative"
                :key="index"
                class="mb-1 text-gray-700 dark:text-gray-300"
              >
                {{ item }}
              </li>
            </ul>
          </div>
          <div>
            <h3 class="mb-2 text-lg text-gray-800 font-medium dark:text-gray-200">总结性评价：</h3>
            <ul class="list-disc pl-8">
              <li
                v-for="(item, index) in generatedDesign.evaluation.summative"
                :key="index"
                class="mb-1 text-gray-700 dark:text-gray-300"
              >
                {{ item }}
              </li>
            </ul>
          </div>
        </div>

        <!-- 教学反思 -->
        <div class="mb-8 rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
          <h2 class="mb-3 flex items-center text-xl text-primary font-bold">
            <div class="mr-2 h-7 w-7 flex items-center justify-center rounded-full bg-primary text-white">七</div>
            教学反思
          </h2>
          <ul class="list-disc pl-8">
            <li
              v-for="(item, index) in generatedDesign.reflection"
              :key="index"
              class="mb-2 text-gray-700 dark:text-gray-300"
            >
              {{ item }}
            </li>
          </ul>
        </div>

        <!-- 课后作业 -->
        <div class="mb-8 rounded-lg bg-indigo-50 p-4 dark:bg-indigo-900/20">
          <h2 class="mb-3 flex items-center text-xl text-primary font-bold">
            <div class="mr-2 h-7 w-7 flex items-center justify-center rounded-full bg-primary text-white">八</div>
            课后作业和延伸
          </h2>
          <ul class="list-disc pl-8">
            <li
              v-for="(item, index) in generatedDesign.homeworkAndReflection"
              :key="index"
              class="mb-2 text-gray-700 dark:text-gray-300"
            >
              {{ item }}
            </li>
          </ul>
        </div>

        <!-- 操作按钮 -->
        <div class="mt-10 flex justify-center gap-4">
          <NButton type="primary" size="large" class="w-40">
            <template #icon>
              <NIcon><Document /></NIcon>
            </template>
            导出文档
          </NButton>
          <NButton type="info" ghost size="large" class="w-40" @click="backToForm">
            <template #icon>
              <NIcon><Edit /></NIcon>
            </template>
            修改内容
          </NButton>
        </div>
      </div>
    </Transition>

    <!-- 详细教案弹窗 -->
    <NModal
      v-model:show="showDetailedPlanModal"
      class="detailed-plan-modal"
      preset="card"
      title="详细教案"
      size="huge"
      :bordered="false"
      :segmented="{
        content: true,
        footer: 'soft'
      }"
    >
      <div class="detailed-plan-container">
        <div class="mb-6">
          <h1 class="text-2xl text-primary font-bold">{{ generatedDesign.detailedPlan.title }}</h1>
          <p class="mt-2 text-sm text-gray-500">基于{{ formValue.textbook }}生成，预计授课时长：45分钟</p>
        </div>

        <!-- 教学目标 -->
        <div class="mb-8 rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
          <h2 class="mb-3 flex items-center text-xl text-primary font-bold">
            <div class="mr-2 h-7 w-7 flex items-center justify-center rounded-full bg-primary text-white">一</div>
            教学目标
          </h2>
          <ul class="list-decimal pl-8">
            <li
              v-for="(objective, index) in generatedDesign.detailedPlan.priorKnowledge"
              :key="index"
              class="mb-2 text-gray-700 dark:text-gray-300"
            >
              {{ objective }}
            </li>
          </ul>
        </div>

        <!-- 教学重点与难点 -->
        <div class="mb-8 rounded-lg bg-orange-50 p-4 dark:bg-orange-900/20">
          <h2 class="mb-3 flex items-center text-xl text-primary font-bold">
            <div class="mr-2 h-7 w-7 flex items-center justify-center rounded-full bg-primary text-white">二</div>
            教学重点与难点
          </h2>
          <div v-for="(section, sIndex) in generatedDesign.focusPoints" :key="sIndex" class="mb-4">
            <h3 class="mb-2 text-lg text-gray-800 font-medium dark:text-gray-200">{{ section.title }}：</h3>
            <ul class="list-disc pl-8">
              <li v-for="(point, pIndex) in section.points" :key="pIndex" class="mb-1 text-gray-700 dark:text-gray-300">
                {{ point }}
              </li>
            </ul>
          </div>
        </div>

        <!-- 教学方法 -->
        <div class="mb-8 rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
          <h2 class="mb-3 flex items-center text-xl text-primary font-bold">
            <div class="mr-2 h-7 w-7 flex items-center justify-center rounded-full bg-primary text-white">三</div>
            教学方法
          </h2>
          <ul class="list-decimal pl-8">
            <li
              v-for="(method, index) in generatedDesign.teachingMethods"
              :key="index"
              class="mb-2 text-gray-700 dark:text-gray-300"
            >
              {{ method }}
            </li>
          </ul>
        </div>

        <!-- 教学准备 -->
        <div class="mb-8 rounded-lg bg-purple-50 p-4 dark:bg-purple-900/20">
          <h2 class="mb-3 flex items-center text-xl text-primary font-bold">
            <div class="mr-2 h-7 w-7 flex items-center justify-center rounded-full bg-primary text-white">四</div>
            教学准备
          </h2>
          <ul class="list-disc pl-8">
            <li
              v-for="(material, index) in generatedDesign.detailedPlan.teachingTools"
              :key="index"
              class="mb-2 text-gray-700 dark:text-gray-300"
            >
              {{ material }}
            </li>
          </ul>
        </div>

        <!-- 课堂流程 -->
        <div class="mb-8 rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
          <h2 class="mb-3 flex items-center text-xl text-primary font-bold">
            <div class="mr-2 h-7 w-7 flex items-center justify-center rounded-full bg-primary text-white">五</div>
            课堂流程
          </h2>
          <div class="mt-4">
            <div class="relative">
              <div
                v-for="(step, index) in generatedDesign.detailedPlan.teachingProcedure"
                :key="index"
                class="relative mb-6 pl-10"
              >
                <div
                  class="absolute left-2 top-0 h-8 w-8 flex items-center justify-center rounded-full bg-primary text-sm text-white -translate-x-1/2"
                >
                  {{ index + 1 }}
                </div>
                <div
                  class="border border-gray-200 rounded-lg bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800"
                >
                  <div class="mb-2 flex items-center justify-between">
                    <h3 class="text-lg text-primary font-semibold">{{ step.stage }}</h3>
                    <div class="flex items-center text-gray-500">
                      <NIcon class="mr-1" size="18">
                        <Time />
                      </NIcon>
                      <span class="text-sm">{{ step.time }}</span>
                    </div>
                  </div>
                  <p class="mb-3 text-gray-700 dark:text-gray-300">{{ step.activities.join('，') }}</p>

                  <div v-if="step.designIntent" class="mb-2">
                    <div class="mb-1 text-sm text-blue-600 font-medium dark:text-blue-400">设计意图：</div>
                    <div
                      class="rounded-md bg-blue-50 px-3 py-2 text-sm text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                    >
                      {{ step.designIntent }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 评价方式 -->
        <div class="mb-8 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
          <h2 class="mb-3 flex items-center text-xl text-primary font-bold">
            <div class="mr-2 h-7 w-7 flex items-center justify-center rounded-full bg-primary text-white">六</div>
            评价方式
          </h2>
          <div class="mb-4">
            <h3 class="mb-2 text-lg text-gray-800 font-medium dark:text-gray-200">过程性评价：</h3>
            <ul class="list-disc pl-8">
              <li
                v-for="(item, index) in generatedDesign.detailedPlan.assessmentMethods"
                :key="index"
                class="mb-1 text-gray-700 dark:text-gray-300"
              >
                {{ item }}
              </li>
            </ul>
          </div>
        </div>

        <!-- 教学反思 -->
        <div class="mb-8 rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
          <h2 class="mb-3 flex items-center text-xl text-primary font-bold">
            <div class="mr-2 h-7 w-7 flex items-center justify-center rounded-full bg-primary text-white">七</div>
            教学反思
          </h2>
          <ul class="list-disc pl-8">
            <li
              v-for="(item, index) in generatedDesign.reflection"
              :key="index"
              class="mb-2 text-gray-700 dark:text-gray-300"
            >
              {{ item }}
            </li>
          </ul>
        </div>

        <!-- 课后作业 -->
        <div class="mb-8 rounded-lg bg-indigo-50 p-4 dark:bg-indigo-900/20">
          <h2 class="mb-3 flex items-center text-xl text-primary font-bold">
            <div class="mr-2 h-7 w-7 flex items-center justify-center rounded-full bg-primary text-white">八</div>
            课后作业和延伸
          </h2>
          <ul class="list-disc pl-8">
            <li
              v-for="(item, index) in generatedDesign.homeworkAndReflection"
              :key="index"
              class="mb-2 text-gray-700 dark:text-gray-300"
            >
              {{ item }}
            </li>
          </ul>
        </div>
      </div>
      <template #footer>
        <div class="flex justify-center gap-4">
          <NButton type="primary" size="large" class="w-40">
            <template #icon>
              <NIcon><Document /></NIcon>
            </template>
            导出文档
          </NButton>
          <NButton type="info" ghost size="large" class="w-40" @click="closeDetailedPlanModal">
            <template #icon>
              <NIcon><Edit /></NIcon>
            </template>
            关闭
          </NButton>
        </div>
      </template>
    </NModal>
  </div>
</template>

<style scoped>
.course-plan-container {
  max-width: 800px;
  margin: 0 auto;
}

.generated-content {
  background-color: white;
  border-radius: 12px;
  padding: 32px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.detailed-plan-container {
  max-height: 70vh;
  overflow-y: auto;
  padding-right: 12px;
}

:deep(.n-button) {
  font-weight: 500;
}

.text-primary {
  color: #2b46fe;
}

/* 暗模式适配 */
:deep(.dark) .generated-content {
  background-color: #1a1a1a;
  color: #e0e0e0;
}

:deep(.dark) .text-primary {
  color: #5b76ff;
}

:deep(.n-form-item) {
  margin-bottom: 16px;
}

:deep(.n-form-item-label) {
  font-size: 14px;
  font-weight: 500;
  padding-bottom: 4px;
}

:deep(.n-form-item-required-mark) {
  color: #f56c6c;
}

:deep(.n-form-item-feedback-wrapper) {
  min-height: 0;
  margin-top: 2px;
}

:deep(.n-input) {
  border-radius: 4px;
  background-color: #fff;
}

:deep(.n-input-wrapper) {
  padding: 0;
}

:deep(.n-input__textarea-el) {
  padding: 8px 12px !important;
}

:deep(.n-input__placeholder) {
  color: #999;
  font-size: 14px;
  padding: 0 4px;
}

:deep(.n-base-selection) {
  border-radius: 4px;
  background-color: #fff;
}

:deep(.n-base-selection-input) {
  padding: 0 8px;
}

:deep(.n-base-selection-placeholder) {
  color: #999;
  font-size: 14px;
  padding: 0 4px;
}

/* 过渡动画 */
.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.5s ease,
    transform 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.detailed-plan-modal {
  width: 90%;
  max-width: 800px;
}
</style>
