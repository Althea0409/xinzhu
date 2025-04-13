<script setup lang="ts">
import { reactive, ref } from 'vue';
import { NIcon, NSpin, useMessage } from 'naive-ui';
import type { FormInst } from 'naive-ui';
import { ArrowLeft, Document, Edit, Image, TextAlignLeft, Time } from '@vicons/carbon';

const message = useMessage();
const formRef = ref<FormInst | null>(null);
const showGeneratedContent = ref(false);
const isGenerating = ref(false);

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
  title: '小学数学一年级加减计算教案',
  objectives: [
    '熟悉并掌握小于100的加减法计算方法，能够准确进行两位数加减法。',
    '理解加法与减法之间的互逆关系，学会用加法验证减法和用减法验证加法。',
    '通过实际练习，提高孩子们的心算能力和加减法的实际应用能力，能够解决日常生活中的简单计算问题。',
    '培养学生的加减计算正确性和效率，能够在规定时间内完成指定数量的计算题。',
    '培养学生的逻辑思维能力和数学思考习惯，形成良好的解题思路。'
  ],
  focusPoints: [
    {
      title: '教学重点',
      points: [
        '小于100的加减法相关计算策略及算理的理解。',
        '数字分解与重组计算法，灵活运用凑十法进行计算。',
        '通过试算学会快速计算，提高计算速度与准确性。',
        '两位数加减法的竖式计算方法与横式计算方法。'
      ]
    },
    {
      title: '教学难点',
      points: [
        '基于数的分解进行计算，特别是数字跨十的情况处理。',
        '包含过十加法和过十减法的正确处理方法及位置关系理解。',
        '加减混合运算中的运算顺序理解与应用。',
        '实际应用题中数学信息的提取与运算方法的选择。'
      ]
    }
  ],
  teachingMethods: [
    '直观教学法：通过数学教具、图片和动画等直观演示加减法计算过程，帮助学生建立直观认识。',
    '情境教学法：设计生活化的数学情境，引导学生在真实场景中理解和应用加减法。',
    '游戏教学法：通过数学游戏激发学生学习兴趣，在轻松愉快的氛围中掌握加减法。',
    '小组合作法：组织学生进行小组合作学习，培养合作意识和交流能力。',
    '探究教学法：引导学生探索不同的计算方法，发现计算规律，提高解决问题的能力。'
  ],
  materials: [
    '课件：包含加减法计算示例、动画演示和练习题',
    '计数器或计数棒：辅助学生进行具体操作',
    '数字卡片：用于数字分解和组合的演示',
    '计算练习卡：不同难度的加减法练习题',
    '情境图片：与生活相关的应用场景图片'
  ],
  lessonFlow: [
    {
      title: '热身导入',
      content:
        '通过"数字接龙"游戏激发学习兴趣。学生按顺序说出一个数，下一位学生需要给这个数加5或减3，快速反应。教师观察学生计算反应速度，为后续教学做准备。',
      duration: '5分钟',
      interaction: '全班参与的数字接龙游戏',
      expectedOutcome: '激发学生学习兴趣，初步了解学生的计算能力水平'
    },
    {
      title: '知识展示',
      content:
        '教师展示生活中的购物场景：小明有50元，买了一本12元的笔记本和一支8元的钢笔，请问他还剩多少钱？通过这个例子，引导学生理解生活中加减法的应用，并展示计算过程。重点讲解数字分解法和凑十法在计算中的应用。',
      duration: '10分钟',
      interaction: '',
      expectedOutcome: '学生理解加减法在生活中的应用，掌握基本的计算方法原理'
    },
    {
      title: '互动探究',
      content:
        '学生分组进行"数学小侦探"活动。每组获得一系列计算题和答案，但部分数字被隐藏，需要通过已知条件推理出被隐藏的数字。教师巡视指导，针对学生遇到的困难给予适当提示。',
      duration: '15分钟',
      interaction: '小组合作的"数学小侦探"推理活动',
      expectedOutcome: '学生能够运用加减法的互逆关系解决问题，培养逻辑思维能力'
    },
    {
      title: '技能训练',
      content:
        '学生进行"计算冲关"练习，分为三个难度级别的计算题。学生先独立完成基础题，然后选择适合自己水平的提高题和挑战题。教师对学生的练习情况进行记录和评价。',
      duration: '10分钟',
      interaction: '',
      expectedOutcome: '学生掌握加减法的计算技能，提高计算速度和准确性'
    },
    {
      title: '游戏实践',
      content:
        '开展"超市购物"游戏。教室布置成超市场景，物品标有价格，学生分组进行模拟购物并计算消费金额和找零。每组派代表汇报购物清单和计算过程，其他学生验证计算结果是否正确。',
      duration: '12分钟',
      interaction: '情景模拟的"超市购物"游戏',
      expectedOutcome: '学生能够在实际情境中应用加减法，培养实践能力和团队协作精神'
    },
    {
      title: '成果交流',
      content:
        '学生分享本节课的收获和感悟，教师引导学生总结不同的计算方法和技巧。展示几位学生的优秀作业和表现，进行鼓励和表扬。',
      duration: '5分钟',
      interaction: '学生分享与交流',
      expectedOutcome: '学生能够总结归纳所学知识，建立知识体系'
    },
    {
      title: '拓展延伸',
      content:
        '教师引导学生思考生活中还有哪些地方需要用到加减法，如何利用所学知识解决实际问题。布置生活化的作业，鼓励学生在日常生活中发现和应用数学。',
      duration: '3分钟',
      interaction: '',
      expectedOutcome: '学生能够将所学知识与生活实际相联系，提高应用意识'
    }
  ],
  evaluation: {
    formative: [
      '课堂观察：学生参与度、回答问题的准确性、小组合作情况',
      '练习表现：计算题的正确率、解题速度、解题思路的合理性',
      '互动表现：游戏和活动中的表现、对问题的理解和解决能力'
    ],
    summative: [
      '课后作业：完成10道小于100的加减法应用题，评价标准包括计算正确率和解题思路',
      '单元测试：包含基础计算题和应用题，评估学生对加减法计算的掌握程度',
      '学习档案：记录学生在本单元的进步和成长，包括计算能力的提升情况'
    ]
  },
  reflection: [
    '教学效果：通过教学活动，学生是否达到了预期的学习目标',
    '教学方法：所采用的教学方法是否有效，是否需要调整和改进',
    '学生反馈：学生对课程的反馈和建议，为后续教学提供参考',
    '差异教学：针对不同学习水平的学生，如何进行有针对性的指导和帮助'
  ],
  homeworkAndReflection: [
    '思考题：减法和加法的关系是什么？你能用不同的方法做相同的加减计算吗？哪些方法更高效？',
    '基础练习：完成10道小于100的加减法计算题，要求写出计算过程。',
    '应用练习：记录一天内你使用加减法的3个生活场景，并写出具体的计算过程。',
    '拓展活动：设计一个简单的加减法数学游戏，与家人一起玩并记录体会。',
    '家长配合：请家长在日常生活中有意识地创造使用加减法的机会，如购物、烹饪等。'
  ]
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
  { label: '小学数学浙教版一年级上册', value: '小学数学浙教版一年级上册' },
  { label: '小学数学浙教版一年级下册', value: '小学数学浙教版一年级下册' },
  { label: '小学数学人教版一年级上册', value: '小学数学人教版一年级上册' },
  { label: '小学数学人教版一年级下册', value: '小学数学人教版一年级下册' },
  { label: '小学数学北师大版一年级上册', value: '小学数学北师大版一年级上册' },
  { label: '小学数学北师大版一年级下册', value: '小学数学北师大版一年级下册' }
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
      }, 2500); // 2.5秒的延迟，可根据实际需求调整
    } else {
      message.error('请完善表单信息');
    }
  });
}

// 返回表单
function backToForm() {
  showGeneratedContent.value = false;
}
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
            <p class="mt-2 text-sm text-gray-500">基于{{ formValue.textbook }}生成，预计授课时长：60分钟</p>
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
</style>
