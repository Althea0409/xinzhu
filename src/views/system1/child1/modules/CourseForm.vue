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
  title: '小学数学一年级100以内加减法教学设计',
  objectives: [
    '熟悉并掌握100以内的加减法计算方法，能够准确进行两位数加减法。',
    '理解加法与减法之间的互逆关系，学会用加法验证减法和用减法验证加法。',
    '通过实际练习，提高学生的心算能力和加减法的实际应用能力，能够解决日常生活中的简单计算问题。',
    '培养学生的加减计算正确性和效率，能够在规定时间内完成指定数量的计算题。',
    '培养学生的逻辑思维能力和数学思考习惯，形成良好的解题思路。'
  ],
  focusPoints: [
    {
      title: '教学重点',
      points: [
        '100以内加减法相关计算策略及算理的理解。',
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
    '数字卡片与计数棒：便于学生直观操作和理解数量关系',
    '磁性白板与数字磁贴：用于展示计算过程和师生互动',
    '计算练习卡：不同难度的加减法练习题（基础型、提高型、挑战型）',
    '情境图片与实物道具：商店购物场景、钱币模型等生活化教具',
    '电子计时器：控制活动时间，培养学生的时间观念'
  ],
  lessonFlow: [
    {
      title: '热身活动',
      content:
        '组织"数字接龙"游戏，全班分成四组，每组学生依次说出一个数，下一位学生需要给这个数加5或减3，并解释计算过程。教师可使用计时器控制节奏，增加游戏的紧张感与参与度。',
      duration: '5分钟',
      interaction: '全班分组参与的"数字接龙"游戏，学生需要快速反应并解释计算方法',
      expectedOutcome: '激发学生学习兴趣，预热加减法计算，了解学生的基础计算能力',
      materials: '计时器、记分板'
    },
    {
      title: '情境导入',
      content:
        '播放动画视频，呈现"小兔子超市购物"的生活场景：兔妈妈给了小兔子50元钱去超市，小兔子买了一本12元的画册、一盒8元的彩笔和一个15元的文具盒，请问小兔子还剩多少钱？通过这个引人入胜的故事，导入加减法的实际应用。',
      duration: '7分钟',
      interaction: '师生互动问答，学生自主思考购物过程中的计算步骤',
      expectedOutcome: '学生理解加减法在生活中的应用场景，提高学习兴趣和参与度',
      materials: '多媒体课件、动画视频'
    },
    {
      title: '知识讲解',
      content:
        '讲解100以内加减法的计算方法，重点介绍：(1)直接计算法；(2)凑十法：如26+7=(26+4)+3=30+3=33；(3)数字分解法：如47-9=47-7-2=40-2=38。教师在白板上展示计算过程，使用不同颜色标记关键步骤，帮助学生理解计算原理。',
      duration: '10分钟',
      interaction: '',
      expectedOutcome: '学生掌握基本的加减法计算方法和策略，理解算理',
      materials: '磁性白板、彩色记号笔、数字卡片'
    },
    {
      title: '互动探究一：数学侦探',
      content:
        '开展"数学侦探"小组活动。每组获得一系列相关的加减法算式和答案卡片，但部分数字被隐藏，学生需要通过已知条件推理出被隐藏的数字。如：□+24=61，37-□=19。每组配备一名"小组长"负责组织讨论，教师巡视指导并适时给予提示。活动结束后，各组派代表展示解题思路。',
      duration: '12分钟',
      interaction: '小组合作解决问题，学生间相互讨论、推理，小组展示与交流',
      expectedOutcome: '学生能够运用加减法的互逆关系解决问题，培养逻辑思维和推理能力',
      materials: '数学侦探任务卡、小白板、记号笔'
    },
    {
      title: '巩固练习',
      content:
        '进行"计算冲关"个人练习，设置三个难度级别的计算题：基础版（如23+45）、进阶版（如46+38）和挑战版（如83-47）。学生根据自己的能力选择适合的难度进行练习。教师记录学生的完成情况，及时发现并解决学生的计算困难。',
      duration: '8分钟',
      interaction: '',
      expectedOutcome: '学生通过针对性练习巩固加减法计算技能，提高计算速度和准确性',
      materials: '分层练习卡、计时器'
    },
    {
      title: '互动探究二：智慧超市',
      content:
        '组织"智慧超市"情境模拟活动。教室前方布置成超市场景，各类"商品"标有价格（均为两位数）。学生分成"顾客"和"收银员"，顾客挑选2-3件商品，收银员需计算总价并找零（模拟使用100元）。其他学生作为"监督员"，验证计算是否正确。三个角色轮换进行，确保每位学生都有机会体验不同角色。',
      duration: '15分钟',
      interaction: '角色扮演、情境模拟、计算验证、小组协作',
      expectedOutcome: '学生在真实情境中应用加减法，提高实践能力和计算的灵活性',
      materials: '超市商品道具、价格标签、模拟钱币、收银单'
    },
    {
      title: '互动探究三：计算策略大比拼',
      content:
        '开展"计算策略大比拼"活动。教师出示一道计算题（如68+24），让学生使用不同的计算方法解题，然后分享自己的解题策略。针对同一道题，可能有直接计算、凑十法、分解法等多种解法。学生通过相互学习，拓展思维，掌握多样化的计算策略。',
      duration: '10分钟',
      interaction: '学生展示不同计算方法，全班讨论最优策略，教师引导分析各种方法的优缺点',
      expectedOutcome: '学生能够掌握并灵活运用多种计算策略，提高计算效率',
      materials: '大屏幕展示、小黑板'
    },
    {
      title: '成果分享',
      content:
        '组织"今日数学之星"评选活动。根据学生在课堂上的表现（包括计算准确性、策略创新性、参与积极性等），评选出若干"计算能手"、"策略大师"和"合作之星"。获选学生分享自己的学习心得和技巧，教师进行表扬和鼓励。',
      duration: '5分钟',
      interaction: '学生成果展示与分享，同伴互评，教师点评',
      expectedOutcome: '增强学生学习成就感，促进同伴学习，总结有效的计算方法',
      materials: '奖状、小礼品'
    },
    {
      title: '课堂小结与拓展',
      content:
        '教师引导学生总结本节课所学内容，梳理100以内加减法的计算方法和技巧。布置生活化的作业：记录一天内在家庭生活中遇到的加减法应用情境，如购物、分享点心等，写出具体的计算过程。鼓励学生与家人一起设计简单的加减法游戏。',
      duration: '8分钟',
      interaction: '学生自主总结，教师引导补充',
      expectedOutcome: '学生能够系统化所学知识，将数学与生活相联系',
      materials: '作业单、学习单'
    }
  ],
  evaluation: {
    formative: [
      '课堂观察：记录学生参与度、回答问题的准确性、小组合作情况，使用观察量表进行评估',
      '练习表现：评价计算题的正确率、解题速度、解题思路的合理性，设置进步指标',
      '互动表现：在游戏和活动中的表现、对问题的理解和解决能力、沟通协作能力',
      '自我评价：让学生用"笑脸评价表"对自己的学习状况进行评价，培养自我反思能力'
    ],
    summative: [
      '课后作业：完成15道100以内的加减法应用题，评价标准包括计算正确率、解题思路和书写整洁度',
      '单元测试：包含基础计算题和应用题，评估学生对加减法计算的掌握程度',
      '学习档案：建立"数学成长档案"，记录学生在本单元的进步和成长，包括作业、测验和活动记录',
      '项目评价：完成"我的小账本"项目，记录一周内的"收入"和"支出"，应用加减法进行实际计算'
    ]
  },
  reflection: [
    '教学效果：分析课堂教学活动的有效性，学生是否达到了预期的学习目标，哪些环节效果最好',
    '教学方法：评估各种教学方法的适用性，特别是游戏化和情境化教学对一年级学生学习效果的影响',
    '学生反馈：收集学生对课程的喜好和建议，了解他们在学习过程中的困难和需求',
    '差异教学：反思如何更好地照顾不同学习水平的学生，调整教学策略以满足个性化学习需求',
    '家校合作：探讨如何引导家长参与到孩子的数学学习中，形成家校合力'
  ],
  homeworkAndReflection: [
    '思考题：加法和减法之间有什么关系？如何利用这种关系检验计算结果？',
    '基础练习：完成10道100以内的加减法计算题，要求写出计算过程。',
    '应用练习：设计一张"家庭购物清单"，列出5-8件物品及价格，计算总价和找零。',
    '创意活动：制作一个简易的"计算翻翻卡"，一面是算式，另一面是答案。',
    '家长配合：请家长在日常生活中创造使用加减法的场景，如购物、分享零食等，引导孩子应用所学知识。',
    '拓展挑战：尝试解决一道有趣的数学谜题："小明有50元钱，买了一些同样价格的笔记本后还剩8元，每本笔记本可能的价格有哪些？"'
  ],
  detailedPlan: {
    title: '小学数学一年级100以内加减法教案',
    teachingDate: '2023年X月X日',
    grade: '一年级二班',
    studentCount: '45人',
    teachingUnit: '第三单元 100以内的加减法',
    lessonTopic: '两位数加减整十数',
    timeAllocation: '1课时（40分钟）',
    teachingMaterials: '人教版义务教育教科书《数学》一年级下册',
    teachingTools: [
      '多媒体课件、电子白板',
      '数字卡片、计数棒、小算盘',
      '学生用书、练习纸',
      '情境图片、模拟钱币',
      '计时器、小组记分表'
    ],
    priorKnowledge: [
      '学生已经学习了20以内的加减法计算',
      '学生初步了解十进制计数法和数位的概念',
      '学生能够识别和表示100以内的数'
    ],
    teachingProcedure: [
      {
        stage: '课前准备',
        activities: [
          '检查多媒体设备是否工作正常',
          '准备好学具和教具',
          '在黑板上写好课题',
          '布置教室，为小组活动做准备'
        ],
        time: '课前5分钟'
      },
      {
        stage: '组织教学',
        activities: ['师生问好', '清点学生人数', '检查学习用具', '布置座位，确保每个小组成员之间能够顺畅交流'],
        time: '2分钟'
      },
      {
        stage: '激发兴趣',
        activities: [
          '播放动画《小兔子去购物》导入新课',
          '提问：小兔子拿了50元去商店，买了12元的画册、8元的彩笔和15元的文具盒，请问还剩多少钱？',
          '引导学生思考解决问题的方法'
        ],
        time: '5分钟',
        designIntent: '通过生活化的情境故事激发学生学习兴趣，帮助学生理解加减法在日常生活中的应用。'
      },
      {
        stage: '新知讲解',
        activities: [
          '展示计算过程：50-(12+8+15)=50-(20+15)=50-35=15',
          '讲解两位数加减法的计算方法：直接计算、凑十法、数位分解法',
          '教师示范：26+7的计算过程 (凑十法：26+4+3=30+3=33)',
          '教师示范：43-8的计算过程 (分解法：43-3-5=40-5=35)'
        ],
        time: '8分钟',
        designIntent: '通过直观展示和详细讲解，帮助学生理解不同的计算策略，为后续的应用打下基础。'
      },
      {
        stage: '例题分析',
        activities: [
          '例题1：34+20=?（整十数加法）',
          '例题2：57-30=?（整十数减法）',
          '例题3：46+7=?（跨十加法）',
          '例题4：52-8=?（跨十减法）',
          '针对每道例题，教师先引导学生思考，然后讲解解题思路和步骤'
        ],
        time: '10分钟',
        designIntent: '通过典型例题的分析，帮助学生掌握不同类型的加减法计算方法。'
      },
      {
        stage: '互动练习',
        activities: [
          '小组活动："数学接力赛"——每组得到一张练习卡，组内成员轮流完成一道题，计时比赛',
          '全班活动："真假大挑战"——教师展示一些计算题及答案，学生判断对错并纠正错误',
          '个人挑战："计算小能手"——学生在规定时间内独立完成一定数量的计算题',
          '教师巡视指导，及时发现并纠正错误'
        ],
        time: '12分钟',
        designIntent: '通过多样化的练习形式，提高学生的参与度，巩固所学知识，培养计算能力。'
      },
      {
        stage: '拓展应用',
        activities: [
          '情境应用题：学校为班级购买了42本图书，借出了25本，请问班级还有多少本图书？',
          '开放性问题：如果你有50元钱，想买一本故事书(32元)和一盒彩笔，彩笔的价格最高是多少？',
          '创造性思维：想一想，生活中还有哪些地方会用到100以内的加减法？'
        ],
        time: '8分钟',
        designIntent: '通过应用题和开放性问题，引导学生将加减法知识应用到实际情境中，提高解决问题的能力。'
      },
      {
        stage: '总结反思',
        activities: [
          '学生总结：今天学习了哪些计算方法？哪种方法你认为最实用？',
          '教师总结：强调不同计算方法的特点和应用场景',
          '学习反思：学生完成"今日学习小反思"，写出自己的收获和还存在的疑问',
          '表扬在课堂上表现积极的学生'
        ],
        time: '3分钟',
        designIntent: '通过总结和反思，帮助学生系统化所学知识，培养反思能力。'
      },
      {
        stage: '作业布置',
        activities: [
          '基础作业：课本第X页习题1-10',
          '实践作业：记录家庭一天的"收入"和"支出"，尝试进行计算',
          '拓展作业（选做）：设计一个加减法游戏，下节课与同学分享'
        ],
        time: '2分钟',
        designIntent: '通过分层作业，满足不同学生的学习需求，将课堂知识延伸到课外实践中。'
      }
    ],
    assessmentMethods: [
      '课堂观察：记录学生参与度、反应速度、回答问题的准确性',
      '作业评价：评估学生计算的正确性、解题思路的合理性',
      '学生自评：引导学生对自己的学习状况进行评价',
      '数学日记：学生记录学习过程中的心得体会和困惑'
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
