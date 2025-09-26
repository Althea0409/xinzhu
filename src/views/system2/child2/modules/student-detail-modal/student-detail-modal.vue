<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import type { StudentInfo } from '../types';

interface Props {
  /** 是否显示弹窗 */
  show: boolean;
  /** 学生信息 */
  student: StudentInfo;
  /** 标题 */
  title?: string;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  /** 关闭弹窗事件 */
  (e: 'close'): void;
  /** 更新show状态事件 */
  (e: 'update:show', value: boolean): void;
}>();

/** 雷达图数据 */
interface RadarData {
  /** 能力指标名称 */
  name: string;
  /** 能力指标值 */
  value: number;
}

// 学生个人特点数据
interface StudentPersonality {
  learningStyle: string;
  strengths: string[];
  weaknesses: string[];
  interests: string[];
  preferredResources: string[];
}

// 学习轨迹数据
interface LearningTrajectory {
  date: string;
  event: string;
  score?: number;
  improvement?: string;
}

// 根据学生ID生成个性化的能力雷达图数据
const radarData = computed<RadarData[]>(() => {
  const studentId = props.student.id.toString();

  if (studentId.includes('01')) {
    // 学科知识扎实但思维探究能力有待提高的学生
    return [
      { name: '知识', value: 92 },
      { name: '思维', value: 75 },
      { name: '探究', value: 68 },
      { name: '表达', value: 83 }
    ];
  } else if (studentId.includes('02')) {
    // 思维活跃但基础知识有欠缺的学生
    return [
      { name: '知识', value: 72 },
      { name: '思维', value: 88 },
      { name: '探究', value: 85 },
      { name: '表达', value: 78 }
    ];
  } else if (studentId.includes('03')) {
    // 表达能力强但探究能力弱的学生
    return [
      { name: '知识', value: 82 },
      { name: '思维', value: 75 },
      { name: '探究', value: 65 },
      { name: '表达', value: 90 }
    ];
  }
  // 默认数据
  return [
    { name: '知识', value: 80 },
    { name: '思维', value: 75 },
    { name: '探究', value: 70 },
    { name: '表达', value: 75 }
  ];
});

// 根据学生ID生成个性化的学习行为数据
// eslint-disable-next-line no-underscore-dangle
const _learningBehaviors = computed(() => {
  const studentId = props.student.id.toString();

  if (studentId.includes('01')) {
    return [
      {
        name: '课堂参与度',
        value: 92,
        trend: '上升',
        detail: '课堂发言次数较多，善于提问，参与小组讨论积极'
      },
      {
        name: '作业完成率',
        value: 98,
        trend: '稳定',
        detail: '作业按时提交，质量高，很少有错误'
      },
      {
        name: '在线学习时长',
        value: 65,
        trend: '下降',
        detail: '本月在线学习时间较上月减少12%，需要关注'
      },
      {
        name: '知识掌握度',
        value: 88,
        trend: '上升',
        detail: '单元测试平均分提高5分，概念理解更加深入'
      }
    ];
  } else if (studentId.includes('02')) {
    return [
      {
        name: '课堂参与度',
        value: 75,
        trend: '波动',
        detail: '对感兴趣的话题参与度高，其他时候注意力容易分散'
      },
      {
        name: '作业完成率',
        value: 82,
        trend: '上升',
        detail: '作业完成情况有所改善，但仍有部分作业质量不高'
      },
      {
        name: '在线学习时长',
        value: 95,
        trend: '上升',
        detail: '在线学习时间明显增加，是班级前5%的学生'
      },
      {
        name: '知识掌握度',
        value: 76,
        trend: '波动',
        detail: '基础知识掌握不牢固，但对创新性问题有独到见解'
      }
    ];
  } else if (studentId.includes('03')) {
    return [
      {
        name: '课堂参与度',
        value: 85,
        trend: '上升',
        detail: '乐于展示和分享，但有时发言不够深入'
      },
      {
        name: '作业完成率',
        value: 90,
        trend: '稳定',
        detail: '作业完成情况良好，偶有拖延'
      },
      {
        name: '在线学习时长',
        value: 72,
        trend: '稳定',
        detail: '每周保持固定的在线学习时间，学习效率中等'
      },
      {
        name: '知识掌握度',
        value: 84,
        trend: '稳定',
        detail: '课堂内容掌握良好，但学习深度有待提高'
      }
    ];
  }
  return [
    { name: '课堂参与度', value: 85, trend: '稳定', detail: '课堂参与情况正常' },
    { name: '作业完成率', value: 92, trend: '稳定', detail: '按时完成作业' },
    { name: '在线学习时长', value: 78, trend: '稳定', detail: '在线学习时间达标' },
    { name: '知识掌握度', value: 80, trend: '稳定', detail: '知识掌握情况良好' }
  ];
});

// 根据学生ID生成个性化的学科表现数据
// const subjectPerformance = computed(() => {
//   const studentId = props.student.id.toString();

//   if (studentId.includes('01')) {
//     return {
//       math: {
//         score: 95,
//         rank: 2,
//         trend: '上升',
//         highlight: '计算能力强，数学思维清晰，对数学概念理解深入'
//       },
//       chinese: {
//         score: 86,
//         rank: 12,
//         trend: '稳定',
//         highlight: '阅读理解能力良好，但写作有待提高'
//       },
//       english: {
//         score: 88,
//         rank: 8,
//         trend: '上升',
//         highlight: '词汇量丰富，语法掌握扎实，但口语表达欠流畅'
//       },
//       science: {
//         score: 92,
//         rank: 5,
//         trend: '上升',
//         highlight: '对科学现象有浓厚兴趣，实验操作精确'
//       }
//     };
//   } else if (studentId.includes('02')) {
//     return {
//       math: {
//         score: 78,
//         rank: 18,
//         trend: '波动',
//         highlight: '创新性思维强，但基础计算有失误'
//       },
//       chinese: {
//         score: 92,
//         rank: 3,
//         trend: '上升',
//         highlight: '文学鉴赏能力突出，写作具有创意'
//       },
//       english: {
//         score: 75,
//         rank: 22,
//         trend: '下降',
//         highlight: '听力和口语较弱，需要加强基础训练'
//       },
//       science: {
//         score: 88,
//         rank: 9,
//         trend: '上升',
//         highlight: '探究精神强，但实验记录不够规范'
//       }
//     };
//   } else if (studentId.includes('03')) {
//     return {
//       math: {
//         score: 85,
//         rank: 12,
//         trend: '稳定',
//         highlight: '应用题解题能力强，但几何证明较弱'
//       },
//       chinese: {
//         score: 90,
//         rank: 6,
//         trend: '稳定',
//         highlight: '表达能力突出，能清晰组织语言'
//       },
//       english: {
//         score: 92,
//         rank: 4,
//         trend: '上升',
//         highlight: '口语流利，词汇运用准确'
//       },
//       science: {
//         score: 82,
//         rank: 15,
//         trend: '稳定',
//         highlight: '理论知识掌握好，动手能力有待提高'
//       }
//     };
//   }
//   return {
//     math: {
//       score: 92,
//       rank: 5,
//       trend: '稳定',
//       highlight: '数学表现良好'
//     },
//     chinese: {
//       score: 88,
//       rank: 10,
//       trend: '稳定',
//       highlight: '语文表现良好'
//     },
//     english: {
//       score: 85,
//       rank: 15,
//       trend: '稳定',
//       highlight: '英语表现良好'
//     },
//     science: {
//       score: 90,
//       rank: 7,
//       trend: '稳定',
//       highlight: '科学表现良好'
//     }
//   };
// });

// 根据学生ID生成个性化的学生特点
// eslint-disable-next-line no-underscore-dangle
const _studentPersonality = computed<StudentPersonality>(() => {
  const studentId = props.student.id.toString();

  if (studentId.includes('01')) {
    return {
      learningStyle: '视觉型学习者',
      strengths: ['记忆力强', '自律性好', '注重细节', '善于独立思考'],
      weaknesses: ['创新思维有限', '团队协作不足', '学习方法略显死板'],
      interests: ['数学', '编程', '棋类活动'],
      preferredResources: ['图表', '思维导图', '视频教程', '结构化笔记']
    };
  } else if (studentId.includes('02')) {
    return {
      learningStyle: '听觉型学习者',
      strengths: ['创新思维活跃', '发散性思考能力强', '探究精神浓厚', '语言表达生动'],
      weaknesses: ['注意力容易分散', '基础知识不扎实', '学习不够系统'],
      interests: ['文学', '艺术', '社会科学', '辩论'],
      preferredResources: ['音频讲解', '讨论式学习', '开放性问题', '辩论']
    };
  } else if (studentId.includes('03')) {
    return {
      learningStyle: '动觉型学习者',
      strengths: ['沟通能力强', '团队合作好', '实践能力突出', '适应性强'],
      weaknesses: ['理论学习耐心不足', '自律性有待提高', '深度思考不够'],
      interests: ['体育', '演讲', '社交活动', '外语'],
      preferredResources: ['情景教学', '角色扮演', '小组项目', '实地考察']
    };
  }
  return {
    learningStyle: '混合型学习者',
    strengths: ['全面发展', '学习适应性强', '基础知识扎实'],
    weaknesses: ['缺乏突出优势', '学习效率有提升空间'],
    interests: ['综合学科', '课外阅读'],
    preferredResources: ['多媒体教材', '综合性学习资源']
  };
});

// 根据学生ID生成个性化的学习轨迹
// eslint-disable-next-line no-underscore-dangle
const _learningTrajectory = computed<LearningTrajectory[]>(() => {
  const studentId = props.student.id.toString();
  const currentMonth = new Date().getMonth() + 1;

  if (studentId.includes('01')) {
    return [
      { date: `${currentMonth - 2}月15日`, event: '数学竞赛获得校级二等奖', score: 92 },
      { date: `${currentMonth - 1}月22日`, event: '完成高级数学思维训练课程', improvement: '抽象思维能力提升' },
      { date: `${currentMonth}月5日`, event: '月考数学成绩班级第二', score: 95 },
      { date: `${currentMonth}月12日`, event: '在线编程课程完成率100%', improvement: '逻辑思维能力增强' }
    ];
  } else if (studentId.includes('02')) {
    return [
      { date: `${currentMonth - 2}月8日`, event: '作文被评为区级优秀范文', score: 94 },
      { date: `${currentMonth - 1}月17日`, event: '参与科学探究小组项目', improvement: '团队协作能力提高' },
      { date: `${currentMonth}月3日`, event: '英语口语比赛获得进步奖', improvement: '表达能力显著提升' },
      { date: `${currentMonth}月20日`, event: '数学基础知识测验', score: 78, improvement: '基础知识有待加强' }
    ];
  } else if (studentId.includes('03')) {
    return [
      { date: `${currentMonth - 2}月23日`, event: '担任班级演讲比赛主持人', improvement: '公众表达能力提升' },
      { date: `${currentMonth - 1}月9日`, event: '英语听力测试优秀', score: 92 },
      { date: `${currentMonth}月1日`, event: '组织班级读书分享活动', improvement: '组织能力和领导力提高' },
      { date: `${currentMonth}月18日`, event: '科学实验操作评估', score: 82, improvement: '动手能力有提升空间' }
    ];
  }
  return [
    { date: `${currentMonth - 2}月10日`, event: '期中考试', score: 85 },
    { date: `${currentMonth - 1}月15日`, event: '综合能力评估', improvement: '表现稳定' },
    { date: `${currentMonth}月5日`, event: '月考', score: 87 },
    { date: `${currentMonth}月20日`, event: '课堂表现评估', improvement: '积极参与课堂活动' }
  ];
});

// 根据学生ID生成个性化的学习问题与改进建议
// eslint-disable-next-line no-underscore-dangle
const _learningIssues = computed(() => {
  const studentId = props.student.id.toString();

  if (studentId.includes('01')) {
    return [
      {
        issue: '探究能力有待提高，缺乏创新性思考',
        suggestion: '参与开放性问题讨论，尝试多角度分析问题，培养发散思维'
      },
      {
        issue: '在线学习时间减少，可能影响学习进度',
        suggestion: '合理规划学习时间，提高在线学习效率，制定明确的学习计划'
      },
      {
        issue: '团队协作能力不足，倾向于独立完成任务',
        suggestion: '积极参与小组活动，学习倾听和分享，体验团队协作的价值'
      }
    ];
  } else if (studentId.includes('02')) {
    return [
      {
        issue: '基础知识不扎实，影响学习深度和应用',
        suggestion: '系统梳理基础知识点，建立知识体系，定期复习巩固'
      },
      {
        issue: '注意力容易分散，学习效率不高',
        suggestion: '采用番茄工作法，设定明确的短期学习目标，减少干扰因素'
      },
      {
        issue: '学习方法不够系统，知识点掌握零散',
        suggestion: '学习思维导图等知识组织工具，建立知识间的联系'
      },
      {
        issue: '作业质量不稳定，完成情况波动',
        suggestion: '建立作业检查清单，提高自我审核意识，注重质量而非速度'
      }
    ];
  } else if (studentId.includes('03')) {
    return [
      {
        issue: '深度思考不足，学习停留在表面',
        suggestion: '培养提问习惯，多思考"为什么"，尝试解释所学知识给他人听'
      },
      {
        issue: '理论学习耐心不足，影响抽象概念理解',
        suggestion: '将抽象概念可视化，结合实际案例学习，建立理论与实践的联系'
      },
      {
        issue: '自律性有待提高，学习进度不稳定',
        suggestion: '制定详细的学习计划并严格执行，使用学习进度追踪工具'
      }
    ];
  }
  return [
    {
      issue: '数学应用能力有待提高',
      suggestion: '多做与实际生活相关的应用题，增强知识与实际问题的联系'
    },
    {
      issue: '抽象思维能力强但表达不够清晰',
      suggestion: '加强数学语言表达训练，学会用准确的语言描述解题思路'
    }
  ];
});

// 访问全局共享的主题和样式信息
type LearningResource = {
  id: string;
  title: string;
  type: string;
  tags: string[];
  difficulty: string;
  duration: string;
  matchScore: number;
  link: string;
  reason: string;
};

// 根据学生ID生成个性化的资源推荐
const recommendedResources = computed<LearningResource[]>(() => {
  const studentId = props.student.id.toString();

  if (studentId.includes('01')) {
    return [
      {
        id: 'res001',
        title: '现代文阅读理解技巧训练',
        type: '习题',
        tags: ['现代文阅读', '理解技巧', '答题方法'],
        difficulty: '挑战',
        duration: '45分钟',
        matchScore: 96,
        link: '#',
        reason: '针对该生现代文阅读理解能力不足的问题，提供系统性的阅读技巧训练'
      },
      {
        id: 'res002',
        title: '古诗词鉴赏方法与实践',
        type: '实验',
        tags: ['古诗词', '鉴赏能力', '文学素养'],
        difficulty: '提高',
        duration: '60分钟',
        matchScore: 94,
        link: '#',
        reason: '帮助提升古诗词鉴赏能力，培养文学审美思维'
      },
      {
        id: 'res003',
        title: '作文构思与表达技巧',
        type: '互动课件',
        tags: ['写作技巧', '构思方法', '表达能力'],
        difficulty: '基础',
        duration: '30分钟',
        matchScore: 92,
        link: '#',
        reason: '针对写作表达能力不足的情况，提供实用的写作技巧'
      },
      {
        id: 'res004',
        title: '语文学习方法指导',
        type: '文档',
        tags: ['学习方法', '语文素养', '自主学习'],
        difficulty: '基础',
        duration: '15分钟',
        matchScore: 90,
        link: '#',
        reason: '帮助建立科学的语文学习方法，提高学习效率'
      },
      {
        id: 'res013',
        title: 'AI个性化语文辅导',
        type: 'AI辅导',
        tags: ['语文', '一对一', '适应性学习'],
        difficulty: '提高',
        duration: '按需',
        matchScore: 97,
        link: '#',
        reason: '基于该生语文学习特点的智能辅导，针对性解决薄弱环节'
      },
      // 视频资源 - 保留
      {
        id: 'res101',
        title: '语文创新思维培养课程',
        type: '视频',
        tags: ['语文思维', '创新能力', '思维训练'],
        difficulty: '提高',
        duration: '35分钟',
        matchScore: 94,
        link: '#',
        reason: '通过视频讲解语文创新思维方法，帮助突破传统思维模式'
      },
      {
        id: 'res102',
        title: '文言文阅读方法与技巧',
        type: '视频',
        tags: ['文言文', '阅读方法', '翻译技巧'],
        difficulty: '提高',
        duration: '28分钟',
        matchScore: 92,
        link: '#',
        reason: '通过真实案例视频分析文言文阅读方法的应用'
      },
      // 习题资源 - 保留
      {
        id: 'res103',
        title: '语文综合能力测评练习',
        type: '习题',
        tags: ['综合能力', '测评练习', '能力提升'],
        difficulty: '基础',
        duration: '25分钟',
        matchScore: 93,
        link: '#',
        reason: '针对语文综合能力设计的测评练习，全面提升语文素养'
      },
      {
        id: 'res104',
        title: '语文学习习惯培养练习',
        type: '习题',
        tags: ['学习习惯', '语文素养', '自主学习'],
        difficulty: '提高',
        duration: '40分钟',
        matchScore: 95,
        link: '#',
        reason: '培养良好的语文学习习惯，提高语文学习的自主性'
      }
    ];
  } else if (studentId.includes('02')) {
    return [
      {
        id: 'res005',
        title: '语文基础知识强化训练',
        type: '视频',
        tags: ['语文基础', '字词句', '语法知识'],
        difficulty: '基础',
        duration: '40分钟',
        matchScore: 98,
        link: '#',
        reason: '针对语文基础知识不扎实的问题，系统梳理核心知识点'
      },
      {
        id: 'res006',
        title: '阅读专注力提升训练',
        type: '互动课件',
        tags: ['阅读技巧', '专注力', '理解能力'],
        difficulty: '基础',
        duration: '25分钟',
        matchScore: 95,
        link: '#',
        reason: '帮助提高阅读时的注意力集中度，解决阅读分心问题'
      },
      {
        id: 'res007',
        title: '语文知识体系构建指导',
        type: '文档',
        tags: ['知识体系', '语文框架', '思维导图'],
        difficulty: '提高',
        duration: '30分钟',
        matchScore: 94,
        link: '#',
        reason: '提供系统的语文知识体系构建方法，解决知识点零散问题'
      },
      {
        id: 'res008',
        title: '古文阅读理解强化训练',
        type: '习题',
        tags: ['古文阅读', '理解能力', '基础训练'],
        difficulty: '提高',
        matchScore: 92,
        duration: '35分钟',
        link: '#',
        reason: '针对古文阅读较弱的情况，提供有针对性的训练'
      },
      {
        id: 'res014',
        title: '语文学习习惯养成助手',
        type: 'AI辅导',
        tags: ['学习习惯', '时间管理', '语文素养'],
        difficulty: '基础',
        duration: '每天15分钟',
        matchScore: 96,
        link: '#',
        reason: '通过AI监测语文学习状态，适时提醒，培养良好学习习惯'
      },
      {
        id: 'res015',
        title: '作文质量自评工具',
        type: '互动课件',
        tags: ['写作能力', '自我评估', '质量提升'],
        difficulty: '基础',
        duration: '10分钟',
        matchScore: 91,
        link: '#',
        reason: '帮助建立作文自评习惯，提高写作质量和表达能力'
      },
      // 视频资源 - 保留
      {
        id: 'res105',
        title: '语文概念可视化解析',
        type: '视频',
        tags: ['语文概念', '可视化教学', '理解方法'],
        difficulty: '基础',
        duration: '32分钟',
        matchScore: 96,
        link: '#',
        reason: '通过动画和可视化方式讲解抽象语文概念，加深理解'
      },
      {
        id: 'res106',
        title: '如何构建语文知识体系',
        type: '视频',
        tags: ['知识体系', '语文框架', '学习方法'],
        difficulty: '提高',
        duration: '25分钟',
        matchScore: 93,
        link: '#',
        reason: '专业教师指导如何将零散的语文知识点构建成完整体系'
      },
      // 习题资源 - 保留
      {
        id: 'res107',
        title: '语文基础知识巩固练习',
        type: '习题',
        tags: ['语文基础', '知识巩固', '基础练习'],
        difficulty: '基础',
        duration: '30分钟',
        matchScore: 97,
        link: '#',
        reason: '针对语文基础知识不扎实设计的练习，强化核心概念掌握'
      },
      {
        id: 'res108',
        title: '语文阅读专注力训练',
        type: '习题',
        tags: ['阅读专注力', '思维训练', '注意力集中'],
        difficulty: '基础',
        duration: '20分钟',
        matchScore: 94,
        link: '#',
        reason: '通过特别设计的语文阅读习题训练专注力和持续注意力'
      }
    ];
  } else if (studentId.includes('03')) {
    return [
      {
        id: 'res009',
        title: '语文深度思考：从文本到内涵',
        type: '讨论',
        tags: ['批判性思维', '深度阅读', '文本分析'],
        difficulty: '提高',
        duration: '50分钟',
        matchScore: 95,
        link: '#',
        reason: '培养语文深度思考习惯，提升文本理解深度'
      },
      {
        id: 'res010',
        title: '语文抽象概念可视化学习',
        type: '互动课件',
        tags: ['语文理论', '可视化', '概念理解'],
        difficulty: '提高',
        matchScore: 94,
        duration: '35分钟',
        link: '#',
        reason: '通过可视化方式学习语文抽象概念，增强理解'
      },
      {
        id: 'res011',
        title: '语文实践技能提升',
        type: '实验',
        tags: ['语文实践', '应用能力', '表达技巧'],
        difficulty: '提高',
        duration: '60分钟',
        matchScore: 92,
        link: '#',
        reason: '提升语文实践应用能力，弥补表达能力不足'
      },
      {
        id: 'res012',
        title: '语文学习习惯养成与规划',
        type: '项目',
        tags: ['学习习惯', '时间管理', '目标设定'],
        difficulty: '基础',
        duration: '两周',
        matchScore: 90,
        link: '#',
        reason: '帮助建立良好的语文学习习惯，提高学习规律性'
      },
      {
        id: 'res016',
        title: '智能语文学习进度追踪',
        type: 'AI辅导',
        tags: ['学习管理', '进度管理', '目标达成'],
        difficulty: '基础',
        duration: '持续使用',
        matchScore: 93,
        link: '#',
        reason: '通过AI助手监控语文学习进度，提供及时反馈和调整建议'
      },
      {
        id: 'res017',
        title: '语文问题深度探究引导',
        type: 'AI辅导',
        tags: ['深度思考', '提问技巧', '探究学习'],
        difficulty: '提高',
        duration: '按需',
        matchScore: 96,
        link: '#',
        reason: '引导学生思考更深层次的语文问题，培养批判性思维能力'
      },
      // 视频资源 - 保留
      {
        id: 'res109',
        title: '语文批判性思维发展课程',
        type: '视频',
        tags: ['批判性思维', '深度思考', '文本分析'],
        difficulty: '提高',
        duration: '45分钟',
        matchScore: 94,
        link: '#',
        reason: '通过实例讲解语文批判性思维的方法和应用技巧'
      },
      {
        id: 'res110',
        title: '语文理论学习实用技巧',
        type: '视频',
        tags: ['语文理论', '学习方法', '抽象思维'],
        difficulty: '基础',
        duration: '30分钟',
        matchScore: 93,
        link: '#',
        reason: '讲解如何高效学习语文理论知识，提高学习耐心'
      },
      // 习题资源 - 保留
      {
        id: 'res111',
        title: '语文深度思考能力训练',
        type: '习题',
        tags: ['深度思考', '文本分析', '批判性思维'],
        difficulty: '提高',
        duration: '40分钟',
        matchScore: 95,
        link: '#',
        reason: '提供需要深度分析的语文问题，训练批判性思维能力'
      },
      {
        id: 'res112',
        title: '语文学习自律能力培养',
        type: '习题',
        tags: ['学习自律', '时间管理', '目标执行'],
        difficulty: '基础',
        duration: '25分钟',
        matchScore: 92,
        link: '#',
        reason: '提供语文学习自律行为训练的相关任务和练习，培养学习习惯'
      }
    ];
  }

  // 默认推荐资源
  return [
    {
      id: 'res018',
      title: '个性化语文学习策略指导',
      type: 'AI辅导',
      tags: ['语文学习', '个性化', '能力提升'],
      difficulty: '提高',
      duration: '按需',
      matchScore: 93,
      link: '#',
      reason: '根据学生语文学习特点提供定制化学习建议和方法指导'
    },
    {
      id: 'res019',
      title: '语文知识图谱构建',
      type: '互动课件',
      tags: ['语文知识体系', '思维导图', '知识关联'],
      difficulty: '提高',
      duration: '45分钟',
      matchScore: 91,
      link: '#',
      reason: '帮助学生建立语文知识体系，理解知识点之间的联系'
    },
    {
      id: 'res020',
      title: '语文阅读技能提升',
      type: '文档',
      tags: ['阅读能力', '语文学习', '理解力'],
      difficulty: '基础',
      duration: '30分钟',
      matchScore: 88,
      link: '#',
      reason: '提高语文阅读理解能力，增强语言表达和理解能力'
    },
    {
      id: 'res021',
      title: '语文学习动机与目标设定',
      type: '讨论',
      tags: ['学习动机', '目标管理', '自我激励'],
      difficulty: '基础',
      duration: '40分钟',
      matchScore: 87,
      link: '#',
      reason: '帮助学生明确语文学习目标，增强内在学习动机'
    },
    // 视频资源 - 保留3个
    {
      id: 'res113',
      title: '语文学习方法精讲：如何高效学习',
      type: '视频',
      tags: ['语文学习方法', '效率提升', '学习技巧'],
      difficulty: '基础',
      duration: '35分钟',
      matchScore: 90,
      link: '#',
      reason: '通过视频讲解高效语文学习的方法和技巧，适合各类学习风格'
    },
    {
      id: 'res114',
      title: '语文思维导图绘制实战教程',
      type: '视频',
      tags: ['思维导图', '语文知识整理', '学习工具'],
      difficulty: '基础',
      duration: '28分钟',
      matchScore: 89,
      link: '#',
      reason: '详细讲解语文思维导图的绘制方法和应用场景，帮助构建语文知识体系'
    },
    {
      id: 'res117',
      title: '语文创新思维解题技巧视频课程',
      type: '视频',
      tags: ['语文创新思维', '解题技巧', '思维拓展'],
      difficulty: '提高',
      duration: '42分钟',
      matchScore: 86,
      link: '#',
      reason: '帮助学生打破常规思维，培养语文创新解题能力'
    },
    // 习题资源 - 保留3个
    {
      id: 'res115',
      title: '语文综合能力测评练习',
      type: '习题',
      tags: ['语文综合能力', '自我评估', '能力提升'],
      difficulty: '提高',
      duration: '50分钟',
      matchScore: 92,
      link: '#',
      reason: '全面测试学生语文各方面能力，帮助发现优势和不足'
    },
    {
      id: 'res116',
      title: '语文学习习惯培养练习集',
      type: '习题',
      tags: ['语文学习习惯', '时间管理', '效率提升'],
      difficulty: '基础',
      duration: '30分钟',
      matchScore: 88,
      link: '#',
      reason: '通过实践练习培养良好的语文学习习惯和时间管理能力'
    },
    {
      id: 'res120',
      title: '语文创新思维拓展训练',
      type: '习题',
      tags: ['语文创新思维', '发散思考', '创造力'],
      difficulty: '提高',
      duration: '40分钟',
      matchScore: 87,
      link: '#',
      reason: '通过专题练习培养语文创新思维和发散思考能力'
    }
  ];
});

/** 处理关闭事件 */
function handleClose() {
  emit('update:show', false);
  emit('close');
}

/** 计算雷达图顶点坐标 */
function calculateRadarPoint(value: number, index: number, total: number) {
  const radius = 35;
  const centerX = 50;
  const centerY = 50;
  const angle = (Math.PI * 2 * index) / total - Math.PI / 2;
  const ratio = value / 100;

  return {
    x: centerX + radius * ratio * Math.cos(angle),
    y: centerY + radius * ratio * Math.sin(angle)
  };
}

/** 获取雷达图多边形顶点坐标字符串 */
function getPolygonPoints() {
  return radarData.value
    .map((item, index) => {
      const point = calculateRadarPoint(item.value, index, radarData.value.length);
      return `${point.x},${point.y}`;
    })
    .join(' ');
}

/** 雷达图多边形顶点坐标 */
// eslint-disable-next-line no-underscore-dangle
const _radarPoints = computed(() => getPolygonPoints());

/** 获取标签位置样式 */
// eslint-disable-next-line no-underscore-dangle
function _getLabelPosition(index: number, total: number) {
  const angle = (Math.PI * 2 * index) / total - Math.PI / 2;
  const radius = 50;
  const centerX = 50;
  const centerY = 50;

  // 计算标签位置
  const x = centerX + radius * Math.cos(angle);
  const y = centerY + radius * Math.sin(angle);

  return {
    '--top': `${y}%`,
    '--left': `${x}%`
  };
}

/** 可用于显示的标签 */
// eslint-disable-next-line no-underscore-dangle
const _labels = ['知识', '思\n维', '探究', '表\n达'];

// 激活的标签页
const activeTab = ref('analysis');

// 资源推荐相关变量
const resourceTabValue = ref('all'); // 资源类型标签页，默认选择全部
// eslint-disable-next-line no-underscore-dangle
const _currentPage = ref(1); // 当前分页

// 资源类型选项
const resourceTypes = [
  { label: '全部', value: 'all' },
  { label: '视频', value: '视频' },
  { label: '习题', value: '习题' },
  { label: 'AI辅导', value: 'AI辅导' },
  { label: '互动课件', value: '互动课件' },
  { label: '文档', value: '文档' },
  { label: '讨论', value: '讨论' }
];

// 根据类型筛选资源
const filteredResources = computed(() => {
  if (resourceTabValue.value === 'all') {
    return recommendedResources.value;
  }
  return recommendedResources.value.filter(resource => resource.type === resourceTabValue.value);
});

// 获取资源预计提升的能力点
function getImprovementAreas(resource: LearningResource): string[] {
  // 基于资源标签推断能力提升点
  const areaMap: Record<string, string[]> = {
    数学: ['数学能力', '逻辑思维'],
    创新思维: ['创造力', '思维发散'],
    基础知识: ['知识掌握', '记忆能力'],
    学习方法: ['学习效率', '自主学习'],
    专注力: ['注意力', '专注能力'],
    团队协作: ['沟通能力', '协作技能'],
    深度学习: ['深度思考', '批判性思维'],
    探究能力: ['科学探究', '问题解决'],
    时间管理: ['计划执行', '自我管理']
  };

  // 从资源标签中提取能力点
  const areas = new Set<string>();
  resource.tags.forEach(tag => {
    if (areaMap[tag]) {
      areaMap[tag].forEach(area => areas.add(area));
    }
  });

  // 如果没有匹配到任何能力点，返回默认值
  if (areas.size === 0) {
    if (resource.type === '视频') return ['视觉学习', '知识掌握'];
    if (resource.type === '习题') return ['应用能力', '实践能力'];
    if (resource.type === 'AI辅导') return ['个性化学习', '弱点改进'];
    return ['综合能力'];
  }

  return Array.from(areas);
}

// 资源匹配度颜色
function getResourceMatchColor(score: number): 'success' | 'info' | 'warning' | 'primary' | 'default' | 'error' {
  if (score >= 90) return 'success';
  if (score >= 75) return 'info';
  return 'warning';
}

// 打开资源
function openResource(resource: LearningResource) {
  // 这里可以根据实际需求实现资源打开逻辑
  window.open(resource.link, '_blank');
}

onMounted(() => {
  // 不需要在这里调用drawRadarChart，因为我们已经使用computed属性
});
</script>

<template>
  <NModal :show="props.show" preset="card" class="max-w-[90vw] w-[800px]" @update:show="handleClose">
    <NCard
      :bordered="false"
      size="huge"
      :title="props.title || `${props.student.name} - 智能学情分析 & 个性化资源推荐`"
      class="overflow-hidden"
    >
      <NTabs v-model:value="activeTab" type="line" animated>
        <NTabPane name="learning-behavior" tab="学习行为分析">
          <div class="p-6">
            <!-- 页面标题区域 -->
            <div class="mb-6 border border-blue-100 rounded-lg from-blue-50 to-indigo-50 bg-gradient-to-r p-6">
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="mb-2 text-xl text-gray-800 font-bold">初中语文学习行为分析</h3>
                  <p class="text-sm text-gray-600">
                    基于{{ props.student.name }}的学习数据，深度分析学习行为模式与 习惯特征
                  </p>
                </div>
                <div class="flex items-center gap-3">
                  <NTag type="primary" size="medium">
                    <!-- @vue-ignore: naive-ui 图标插槽类型提示兼容 -->
                    <template #icon>
                      <div class="i-carbon-analytics" />
                    </template>
                    分析完成
                  </NTag>
                  <NTag type="info" size="medium">基于{{ props.student.name }}的学习数据</NTag>
                </div>
              </div>
            </div>

            <!-- 学习行为数据展示 -->
            <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <!-- 学习时长统计 -->
              <section
                class="border border-gray-200 rounded-lg bg-white p-6 shadow-sm transition-shadow duration-200 hover:shadow-md"
              >
                <div class="mb-4 flex items-center justify-between">
                  <h4 class="text-lg text-gray-800 font-semibold">学习时长统计</h4>
                  <div class="i-carbon-time text-xl text-blue-500" />
                </div>
                <div class="space-y-4">
                  <div class="flex items-center justify-between border border-blue-100 rounded-md bg-blue-50 p-3">
                    <span class="text-sm text-gray-700 font-medium">日均学习时长</span>
                    <span class="text-xl text-blue-600 font-bold">2.5小时</span>
                  </div>
                  <div class="flex items-center justify-between border border-green-100 rounded-md bg-green-50 p-3">
                    <span class="text-sm text-gray-700 font-medium">本周总时长</span>
                    <span class="text-xl text-green-600 font-bold">18小时</span>
                  </div>
                  <div class="flex items-center justify-between border border-purple-100 rounded-md bg-purple-50 p-3">
                    <span class="text-sm text-gray-700 font-medium">专注度评分</span>
                    <span class="text-xl text-purple-600 font-bold">85%</span>
                  </div>
                </div>
              </section>

              <!-- 学习习惯分析 -->
              <section
                class="border border-gray-200 rounded-lg bg-white p-6 shadow-sm transition-shadow duration-200 hover:shadow-md"
              >
                <div class="mb-4 flex items-center justify-between">
                  <h4 class="text-lg text-gray-800 font-semibold">学习习惯分析</h4>
                  <div class="i-carbon-user-activity text-xl text-green-500" />
                </div>
                <div class="space-y-4">
                  <div class="flex items-center justify-between border border-gray-100 rounded-md bg-gray-50 p-3">
                    <span class="text-sm text-gray-700 font-medium">最佳学习时段</span>
                    <NTag type="success" size="medium">19:00-21:00</NTag>
                  </div>
                  <div class="flex items-center justify-between border border-gray-100 rounded-md bg-gray-50 p-3">
                    <span class="text-sm text-gray-700 font-medium">学习连续性</span>
                    <NTag type="info" size="medium">良好</NTag>
                  </div>
                  <div class="flex items-center justify-between border border-gray-100 rounded-md bg-gray-50 p-3">
                    <span class="text-sm text-gray-700 font-medium">复习频率</span>
                    <NTag type="warning" size="medium">需提升</NTag>
                  </div>
                </div>
              </section>
            </div>

            <!-- 行为趋势图表区域 -->
            <section class="mt-6 border border-gray-200 rounded-lg bg-white p-6 shadow-sm">
              <div class="mb-4 flex items-center justify-between">
                <h4 class="text-lg text-gray-800 font-semibold">学习行为趋势</h4>
                <div class="flex items-center gap-2">
                  <NButton size="small" type="primary" ghost>
                    <!-- @vue-ignore: naive-ui 图标插槽类型提示兼容 -->
                    <template #icon>
                      <div class="i-carbon-reset" />
                    </template>
                    重新分析
                  </NButton>
                  <NButton size="small" type="default" ghost>
                    <!-- @vue-ignore: naive-ui 图标插槽类型提示兼容 -->
                    <template #icon>
                      <div class="i-carbon-download" />
                    </template>
                    导出报告
                  </NButton>
                </div>
              </div>
              <div
                class="h-64 flex items-center justify-center border border-gray-200 rounded-lg from-gray-50 to-blue-50 bg-gradient-to-br"
              >
                <div class="text-center text-gray-500">
                  <div class="i-carbon-analytics mb-3 text-5xl text-blue-400" />
                  <p class="mb-1 text-lg text-gray-700 font-medium">学习行为趋势图表</p>
                  <p class="text-sm text-gray-500">显示最近30天的学习行为变化</p>
                </div>
              </div>
            </section>
          </div>
        </NTabPane>

        <NTabPane name="skill-graph" tab="技能图谱">
          <div class="p-6">
            <!-- 页面标题区域 -->
            <div class="mb-6 border border-blue-100 rounded-lg from-blue-50 to-indigo-50 bg-gradient-to-r p-6">
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="mb-2 text-xl text-gray-800 font-bold">初中语文技能图谱分析</h3>
                  <p class="text-sm text-gray-600">
                    基于{{ props.student.name }}的语文学习数据，全面分析语文核心技能掌握情况
                  </p>
                </div>
                <div class="flex items-center gap-3">
                  <NTag type="primary" size="large">
                    <!-- @vue-ignore: naive-ui 图标插槽类型提示兼容 -->
                    <template #icon>
                      <div class="i-carbon-skill-level text-sm" />
                    </template>
                    技能评估
                  </NTag>
                  <NTag type="info" size="large">
                    <!-- @vue-ignore: naive-ui 图标插槽类型提示兼容 -->
                    <template #icon>
                      <div class="i-carbon-user-avatar text-sm" />
                    </template>
                    {{ props.student.name }}的语文能力画像
                  </NTag>
                </div>
              </div>
            </div>

            <!-- 技能统计概览 -->
            <div class="grid grid-cols-4 mb-8 gap-4">
              <div class="border border-green-200 rounded-lg from-green-50 to-emerald-50 bg-gradient-to-br p-4">
                <div class="flex items-center justify-between">
                  <div>
                    <div class="text-2xl text-green-700 font-bold">5</div>
                    <div class="text-sm text-green-600 font-medium">优秀技能</div>
                  </div>
                  <div class="i-carbon-checkmark-filled text-2xl text-green-500" />
                </div>
              </div>
              <div class="border border-blue-200 rounded-lg from-blue-50 to-cyan-50 bg-gradient-to-br p-4">
                <div class="flex items-center justify-between">
                  <div>
                    <div class="text-2xl text-blue-700 font-bold">3</div>
                    <div class="text-sm text-blue-600 font-medium">良好技能</div>
                  </div>
                  <div class="i-carbon-thumbs-up text-2xl text-blue-500" />
                </div>
              </div>
              <div class="border border-yellow-200 rounded-lg from-yellow-50 to-amber-50 bg-gradient-to-br p-4">
                <div class="flex items-center justify-between">
                  <div>
                    <div class="text-2xl text-yellow-700 font-bold">2</div>
                    <div class="text-sm text-yellow-600 font-medium">待提升技能</div>
                  </div>
                  <div class="i-carbon-warning text-2xl text-yellow-500" />
                </div>
              </div>
              <div class="border border-purple-200 rounded-lg from-purple-50 to-violet-50 bg-gradient-to-br p-4">
                <div class="flex items-center justify-between">
                  <div>
                    <div class="text-2xl text-purple-700 font-bold">85%</div>
                    <div class="text-sm text-purple-600 font-medium">综合掌握度</div>
                  </div>
                  <div class="i-carbon-analytics text-2xl text-purple-500" />
                </div>
              </div>
            </div>

            <!-- 语文技能分类展示 -->
            <div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
              <!-- 语文核心技能 -->
              <section
                class="border border-blue-200 rounded-xl from-blue-50 to-indigo-50 bg-gradient-to-br p-6 shadow-sm"
              >
                <div class="mb-4 flex items-center gap-3">
                  <div class="rounded-lg bg-blue-100 p-2">
                    <div class="i-carbon-book text-xl text-blue-600" />
                  </div>
                  <h4 class="text-lg text-gray-800 font-semibold">语文核心技能</h4>
                </div>
                <div class="space-y-4">
                  <div class="border border-blue-100 rounded-lg bg-white p-4 shadow-sm">
                    <div class="mb-2 flex items-center justify-between">
                      <span class="text-sm text-gray-700 font-medium">文言文阅读理解</span>
                      <span class="text-sm text-blue-600 font-bold">88%</span>
                    </div>
                    <div class="flex items-center gap-3">
                      <NProgress type="line" :percentage="88" :height="8" :show-indicator="false" color="#3b82f6" />
                      <NTag size="small" type="success">优秀</NTag>
                    </div>
                  </div>
                  <div class="border border-blue-100 rounded-lg bg-white p-4 shadow-sm">
                    <div class="mb-2 flex items-center justify-between">
                      <span class="text-sm text-gray-700 font-medium">现代文阅读分析</span>
                      <span class="text-sm text-green-600 font-bold">92%</span>
                    </div>
                    <div class="flex items-center gap-3">
                      <NProgress type="line" :percentage="92" :height="8" :show-indicator="false" color="#10b981" />
                      <NTag size="small" type="success">优秀</NTag>
                    </div>
                  </div>
                  <div class="border border-blue-100 rounded-lg bg-white p-4 shadow-sm">
                    <div class="mb-2 flex items-center justify-between">
                      <span class="text-sm text-gray-700 font-medium">诗词鉴赏能力</span>
                      <span class="text-sm text-yellow-600 font-bold">75%</span>
                    </div>
                    <div class="flex items-center gap-3">
                      <NProgress type="line" :percentage="75" :height="8" :show-indicator="false" color="#f59e0b" />
                      <NTag size="small" type="warning">良好</NTag>
                    </div>
                  </div>
                </div>
              </section>

              <!-- 语文应用技能 -->
              <section
                class="border border-green-200 rounded-xl from-green-50 to-emerald-50 bg-gradient-to-br p-6 shadow-sm"
              >
                <div class="mb-4 flex items-center gap-3">
                  <div class="rounded-lg bg-green-100 p-2">
                    <div class="i-carbon-edit text-xl text-green-600" />
                  </div>
                  <h4 class="text-lg text-gray-800 font-semibold">语文应用技能</h4>
                </div>
                <div class="space-y-4">
                  <div class="border border-green-100 rounded-lg bg-white p-4 shadow-sm">
                    <div class="mb-2 flex items-center justify-between">
                      <span class="text-sm text-gray-700 font-medium">记叙文写作</span>
                      <span class="text-sm text-green-600 font-bold">90%</span>
                    </div>
                    <div class="flex items-center gap-3">
                      <NProgress type="line" :percentage="90" :height="8" :show-indicator="false" color="#10b981" />
                      <NTag size="small" type="success">优秀</NTag>
                    </div>
                  </div>
                  <div class="border border-green-100 rounded-lg bg-white p-4 shadow-sm">
                    <div class="mb-2 flex items-center justify-between">
                      <span class="text-sm text-gray-700 font-medium">议论文写作</span>
                      <span class="text-sm text-yellow-600 font-bold">78%</span>
                    </div>
                    <div class="flex items-center gap-3">
                      <NProgress type="line" :percentage="78" :height="8" :show-indicator="false" color="#f59e0b" />
                      <NTag size="small" type="warning">良好</NTag>
                    </div>
                  </div>
                  <div class="border border-green-100 rounded-lg bg-white p-4 shadow-sm">
                    <div class="mb-2 flex items-center justify-between">
                      <span class="text-sm text-gray-700 font-medium">语言表达运用</span>
                      <span class="text-sm text-blue-600 font-bold">85%</span>
                    </div>
                    <div class="flex items-center gap-3">
                      <NProgress type="line" :percentage="85" :height="8" :show-indicator="false" color="#3b82f6" />
                      <NTag size="small" type="info">良好</NTag>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            <!-- 语文基础技能 -->
            <section
              class="mt-8 border border-purple-200 rounded-xl from-purple-50 to-violet-50 bg-gradient-to-br p-6 shadow-sm"
            >
              <div class="mb-4 flex items-center gap-3">
                <div class="rounded-lg bg-purple-100 p-2">
                  <div class="i-carbon-character-patterns text-xl text-purple-600" />
                </div>
                <h4 class="text-lg text-gray-800 font-semibold">语文基础技能</h4>
              </div>
              <div class="grid grid-cols-1 gap-4 lg:grid-cols-4 md:grid-cols-2">
                <div class="border border-purple-100 rounded-lg bg-white p-4 shadow-sm">
                  <div class="text-center">
                    <div class="mb-1 text-2xl text-purple-600 font-bold">95%</div>
                    <div class="text-sm text-gray-600 font-medium">字词积累</div>
                    <NTag size="small" type="success" class="mt-2">优秀</NTag>
                  </div>
                </div>
                <div class="border border-purple-100 rounded-lg bg-white p-4 shadow-sm">
                  <div class="text-center">
                    <div class="mb-1 text-2xl text-blue-600 font-bold">82%</div>
                    <div class="text-sm text-gray-600 font-medium">语法知识</div>
                    <NTag size="small" type="info" class="mt-2">良好</NTag>
                  </div>
                </div>
                <div class="border border-purple-100 rounded-lg bg-white p-4 shadow-sm">
                  <div class="text-center">
                    <div class="mb-1 text-2xl text-green-600 font-bold">88%</div>
                    <div class="text-sm text-gray-600 font-medium">文学常识</div>
                    <NTag size="small" type="success" class="mt-2">优秀</NTag>
                  </div>
                </div>
                <div class="border border-purple-100 rounded-lg bg-white p-4 shadow-sm">
                  <div class="text-center">
                    <div class="mb-1 text-2xl text-yellow-600 font-bold">72%</div>
                    <div class="text-sm text-gray-600 font-medium">修辞手法</div>
                    <NTag size="small" type="warning" class="mt-2">待提升</NTag>
                  </div>
                </div>
              </div>
            </section>

            <!-- 语文技能关系图谱 -->
            <section
              class="mt-8 border border-gray-200 rounded-xl from-gray-50 to-slate-50 bg-gradient-to-br p-6 shadow-sm"
            >
              <div class="mb-4 flex items-center gap-3">
                <div class="rounded-lg bg-gray-100 p-2">
                  <div class="i-carbon-network-3 text-xl text-gray-600" />
                </div>
                <h4 class="text-lg text-gray-800 font-semibold">语文技能关系图谱</h4>
              </div>
              <div class="relative">
                <!-- 按钮组绝对定位到右上角 -->
                <div class="absolute right-0 top--12 z-10 flex items-center gap-2">
                  <NButton size="small" type="primary">
                    <!-- @vue-ignore: naive-ui 图标插槽类型提示兼容 -->
                    <template #icon>
                      <div class="i-carbon-reset" />
                    </template>
                    重新分析
                  </NButton>
                  <NButton size="small" secondary>
                    <!-- @vue-ignore: naive-ui 图标插槽类型提示兼容 -->
                    <template #icon>
                      <div class="i-carbon-download" />
                    </template>
                    导出图谱
                  </NButton>
                </div>
                <!-- 其余内容正常显示 -->
                <div
                  class="h-80 flex items-center justify-center border-2 border-gray-300 rounded-lg border-dashed bg-white"
                >
                  <div class="text-center text-gray-500">
                    <div class="i-carbon-network-3 mb-4 text-6xl text-blue-400" />
                    <h5 class="mb-2 text-lg text-gray-700 font-medium">语文技能关系图谱</h5>
                    <p class="mb-1 text-sm text-gray-500">展示语文各项技能之间的关联性和依赖关系</p>
                    <p class="text-xs text-gray-400">基于学习数据分析的个性化技能发展路径</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </NTabPane>

        <NTabPane name="knowledge-graph" tab="知识图谱">
          <div class="p-6">
            <!-- 页面标题区域 -->
            <div class="mb-6 border border-indigo-100 rounded-lg from-indigo-50 to-purple-50 bg-gradient-to-r p-6">
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="mb-2 text-xl text-gray-800 font-bold">初中语文知识图谱分析</h3>
                  <p class="text-sm text-gray-600">
                    基于{{ props.student.name }}的语文学习数据，构建个性化知识关联图谱
                  </p>
                </div>
                <div class="flex items-center gap-3">
                  <NTag type="primary" size="large">
                    <!-- @vue-ignore: naive-ui 图标插槽类型提示兼容 -->
                    <template #icon>
                      <div class="i-carbon-analytics text-sm" />
                    </template>
                    分析完成
                  </NTag>
                  <NTag type="info" size="large">
                    <!-- @vue-ignore: naive-ui 图标插槽类型提示兼容 -->
                    <template #icon>
                      <div class="i-carbon-network-3 text-sm" />
                    </template>
                    {{ props.student.name }}的语文知识体系
                  </NTag>
                </div>
              </div>
            </div>

            <!-- 知识掌握概览统计 -->
            <div class="grid grid-cols-4 mb-8 gap-4">
              <div class="border border-green-200 rounded-lg from-green-50 to-emerald-50 bg-gradient-to-br p-4">
                <div class="flex items-center justify-between">
                  <div>
                    <div class="text-2xl text-green-700 font-bold">85</div>
                    <div class="text-sm text-green-600 font-medium">已掌握知识点</div>
                  </div>
                  <div class="i-carbon-checkmark-filled text-2xl text-green-500" />
                </div>
              </div>
              <div class="border border-blue-200 rounded-lg from-blue-50 to-cyan-50 bg-gradient-to-br p-4">
                <div class="flex items-center justify-between">
                  <div>
                    <div class="text-2xl text-blue-700 font-bold">23</div>
                    <div class="text-sm text-blue-600 font-medium">学习中知识点</div>
                  </div>
                  <div class="i-carbon-in-progress text-2xl text-blue-500" />
                </div>
              </div>
              <div class="border border-yellow-200 rounded-lg from-yellow-50 to-amber-50 bg-gradient-to-br p-4">
                <div class="flex items-center justify-between">
                  <div>
                    <div class="text-2xl text-yellow-700 font-bold">12</div>
                    <div class="text-sm text-yellow-600 font-medium">薄弱知识点</div>
                  </div>
                  <div class="i-carbon-warning text-2xl text-yellow-500" />
                </div>
              </div>
              <div class="border border-purple-200 rounded-lg from-purple-50 to-violet-50 bg-gradient-to-br p-4">
                <div class="flex items-center justify-between">
                  <div>
                    <div class="text-2xl text-purple-700 font-bold">78%</div>
                    <div class="text-sm text-purple-600 font-medium">整体掌握度</div>
                  </div>
                  <div class="i-carbon-chart-line text-2xl text-purple-500" />
                </div>
              </div>
            </div>

            <!-- 语文知识分类展示 -->
            <div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
              <!-- 文言文知识体系 -->
              <section
                class="border border-amber-200 rounded-xl from-amber-50 to-orange-50 bg-gradient-to-br p-6 shadow-sm"
              >
                <div class="mb-4 flex items-center gap-3">
                  <div class="rounded-lg bg-amber-100 p-2">
                    <div class="i-carbon-document-blank text-xl text-amber-600" />
                  </div>
                  <h4 class="text-lg text-gray-800 font-semibold">文言文知识体系</h4>
                </div>
                <div class="space-y-4">
                  <div class="border border-amber-100 rounded-lg bg-white p-4 shadow-sm">
                    <div class="mb-2 flex items-center justify-between">
                      <span class="text-sm text-gray-700 font-medium">文言实词</span>
                      <span class="text-sm text-green-600 font-bold">92%</span>
                    </div>
                    <div class="flex items-center gap-3">
                      <NProgress type="line" :percentage="92" :height="8" :show-indicator="false" color="#10b981" />
                      <NTag size="small" type="success">优秀</NTag>
                    </div>
                  </div>
                  <div class="border border-amber-100 rounded-lg bg-white p-4 shadow-sm">
                    <div class="mb-2 flex items-center justify-between">
                      <span class="text-sm text-gray-700 font-medium">文言虚词</span>
                      <span class="text-sm text-yellow-600 font-bold">75%</span>
                    </div>
                    <div class="flex items-center gap-3">
                      <NProgress type="line" :percentage="75" :height="8" :show-indicator="false" color="#f59e0b" />
                      <NTag size="small" type="warning">良好</NTag>
                    </div>
                  </div>
                  <div class="border border-amber-100 rounded-lg bg-white p-4 shadow-sm">
                    <div class="mb-2 flex items-center justify-between">
                      <span class="text-sm text-gray-700 font-medium">文言句式</span>
                      <span class="text-sm text-blue-600 font-bold">88%</span>
                    </div>
                    <div class="flex items-center gap-3">
                      <NProgress type="line" :percentage="88" :height="8" :show-indicator="false" color="#3b82f6" />
                      <NTag size="small" type="info">优秀</NTag>
                    </div>
                  </div>
                </div>
              </section>

              <!-- 现代文知识体系 -->
              <section
                class="border border-cyan-200 rounded-xl from-cyan-50 to-blue-50 bg-gradient-to-br p-6 shadow-sm"
              >
                <div class="mb-4 flex items-center gap-3">
                  <div class="rounded-lg bg-cyan-100 p-2">
                    <div class="i-carbon-book text-xl text-cyan-600" />
                  </div>
                  <h4 class="text-lg text-gray-800 font-semibold">现代文知识体系</h4>
                </div>
                <div class="space-y-4">
                  <div class="border border-cyan-100 rounded-lg bg-white p-4 shadow-sm">
                    <div class="mb-2 flex items-center justify-between">
                      <span class="text-sm text-gray-700 font-medium">记叙文阅读</span>
                      <span class="text-sm text-green-600 font-bold">90%</span>
                    </div>
                    <div class="flex items-center gap-3">
                      <NProgress type="line" :percentage="90" :height="8" :show-indicator="false" color="#10b981" />
                      <NTag size="small" type="success">优秀</NTag>
                    </div>
                  </div>
                  <div class="border border-cyan-100 rounded-lg bg-white p-4 shadow-sm">
                    <div class="mb-2 flex items-center justify-between">
                      <span class="text-sm text-gray-700 font-medium">说明文阅读</span>
                      <span class="text-sm text-blue-600 font-bold">85%</span>
                    </div>
                    <div class="flex items-center gap-3">
                      <NProgress type="line" :percentage="85" :height="8" :show-indicator="false" color="#3b82f6" />
                      <NTag size="small" type="info">良好</NTag>
                    </div>
                  </div>
                  <div class="border border-cyan-100 rounded-lg bg-white p-4 shadow-sm">
                    <div class="mb-2 flex items-center justify-between">
                      <span class="text-sm text-gray-700 font-medium">议论文阅读</span>
                      <span class="text-sm text-yellow-600 font-bold">72%</span>
                    </div>
                    <div class="flex items-center gap-3">
                      <NProgress type="line" :percentage="72" :height="8" :show-indicator="false" color="#f59e0b" />
                      <NTag size="small" type="warning">待提升</NTag>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            <!-- 诗词文学知识体系 -->
            <section
              class="mt-8 border border-rose-200 rounded-xl from-rose-50 to-pink-50 bg-gradient-to-br p-6 shadow-sm"
            >
              <div class="mb-4 flex items-center gap-3">
                <div class="rounded-lg bg-rose-100 p-2">
                  <div class="i-carbon-pen-fountain text-xl text-rose-600" />
                </div>
                <h4 class="text-lg text-gray-800 font-semibold">诗词文学知识体系</h4>
              </div>
              <div class="grid grid-cols-1 gap-4 lg:grid-cols-4 md:grid-cols-2">
                <div class="border border-rose-100 rounded-lg bg-white p-4 shadow-sm">
                  <div class="text-center">
                    <div class="mb-1 text-2xl text-rose-600 font-bold">88%</div>
                    <div class="text-sm text-gray-600 font-medium">古诗词鉴赏</div>
                    <NTag size="small" type="success" class="mt-2">优秀</NTag>
                  </div>
                </div>
                <div class="border border-rose-100 rounded-lg bg-white p-4 shadow-sm">
                  <div class="text-center">
                    <div class="mb-1 text-2xl text-blue-600 font-bold">82%</div>
                    <div class="text-sm text-gray-600 font-medium">诗歌意象</div>
                    <NTag size="small" type="info" class="mt-2">良好</NTag>
                  </div>
                </div>
                <div class="border border-rose-100 rounded-lg bg-white p-4 shadow-sm">
                  <div class="text-center">
                    <div class="mb-1 text-2xl text-green-600 font-bold">90%</div>
                    <div class="text-sm text-gray-600 font-medium">诗歌情感</div>
                    <NTag size="small" type="success" class="mt-2">优秀</NTag>
                  </div>
                </div>
                <div class="border border-rose-100 rounded-lg bg-white p-4 shadow-sm">
                  <div class="text-center">
                    <div class="mb-1 text-2xl text-yellow-600 font-bold">75%</div>
                    <div class="text-sm text-gray-600 font-medium">诗歌技法</div>
                    <NTag size="small" type="warning" class="mt-2">良好</NTag>
                  </div>
                </div>
              </div>
            </section>

            <!-- 语文知识关联图谱 -->
            <section
              class="mt-8 border border-gray-200 rounded-xl from-gray-50 to-slate-50 bg-gradient-to-br p-6 shadow-sm"
            >
              <div class="mb-4 flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <div class="rounded-lg bg-gray-100 p-2">
                    <div class="i-carbon-network-3 text-xl text-gray-600" />
                  </div>
                  <h4 class="text-lg text-gray-800 font-semibold">语文知识关联图谱</h4>
                </div>
                <div class="flex items-center gap-2">
                  <NButton size="small" type="primary">
                    <!-- @vue-ignore: naive-ui 图标插槽类型提示兼容 -->
                    <template #icon>
                      <div class="i-carbon-reset" />
                    </template>
                    重新分析
                  </NButton>
                  <NButton size="small" secondary>
                    <!-- @vue-ignore: naive-ui 图标插槽类型提示兼容 -->
                    <template #icon>
                      <div class="i-carbon-download" />
                    </template>
                    导出图谱
                  </NButton>
                </div>
              </div>
              <div
                class="h-96 flex items-center justify-center border-2 border-gray-300 rounded-lg border-dashed bg-white"
              >
                <div class="text-center text-gray-500">
                  <div class="i-carbon-network-3 mb-4 text-6xl text-indigo-400" />
                  <h5 class="mb-2 text-lg text-gray-700 font-medium">语文知识关联图谱</h5>
                  <p class="mb-1 text-sm text-gray-500">展示语文各知识点之间的内在联系和学习路径</p>
                  <p class="text-xs text-gray-400">基于{{ props.student.name }}的学习数据构建个性化知识网络</p>
                </div>
              </div>
            </section>
          </div>
        </NTabPane>

        <NTabPane name="resource-recommendation" tab="资源推荐">
          <div class="p-6">
            <!-- 页面标题区域 -->
            <div class="mb-6">
              <div class="mb-3 flex items-center justify-between">
                <h3 class="text-xl text-gray-800 font-semibold">初中语文个性化资源推荐</h3>
                <div class="flex items-center gap-3">
                  <NTag type="primary" size="medium">
                    <!-- @vue-ignore: naive-ui 图标插槽类型提示兼容 -->
                    <template #icon>
                      <NIcon>
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                          <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19L21 7l-1.41-1.41z" />
                        </svg>
                      </NIcon>
                    </template>
                    推荐完成
                  </NTag>
                  <NTag type="info" size="medium">基于{{ props.student.name }}的学习数据</NTag>
                </div>
              </div>

              <!-- 推荐统计信息 -->
              <div class="grid grid-cols-1 mb-4 gap-4 md:grid-cols-3">
                <div class="rounded-lg from-blue-50 to-blue-100 bg-gradient-to-r p-4">
                  <div class="flex items-center justify-between">
                    <div>
                      <p class="text-sm text-blue-600 font-medium">推荐资源总数</p>
                      <p class="text-2xl text-blue-700 font-bold">{{ recommendedResources.length }}</p>
                    </div>
                    <NIcon size="28" color="#1d4ed8">
                      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22L12 18.77L5.82 22L7 14.14L2 9.27l6.91-1.01L12 2z"
                        />
                      </svg>
                    </NIcon>
                  </div>
                </div>

                <div class="rounded-lg from-green-50 to-green-100 bg-gradient-to-r p-4">
                  <div class="flex items-center justify-between">
                    <div>
                      <p class="text-sm text-green-600 font-medium">高匹配度资源</p>
                      <p class="text-2xl text-green-700 font-bold">
                        {{ recommendedResources.filter(r => r.matchScore >= 90).length }}
                      </p>
                    </div>
                    <NIcon size="28" color="#16a34a">
                      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                        />
                      </svg>
                    </NIcon>
                  </div>
                </div>

                <div class="rounded-lg from-purple-50 to-purple-100 bg-gradient-to-r p-4">
                  <div class="flex items-center justify-between">
                    <div>
                      <p class="text-sm text-purple-600 font-medium">AI智能辅导</p>
                      <p class="text-2xl text-purple-700 font-bold">
                        {{ recommendedResources.filter(r => r.type === 'AI辅导').length }}
                      </p>
                    </div>
                    <NIcon size="28" color="#9333ea">
                      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3s-3-1.34-3-3s1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22c.03-1.99 4-3.08 6-3.08c1.99 0 5.97 1.09 6 3.08c-1.29 1.94-3.5 3.22-6 3.22z"
                        />
                      </svg>
                    </NIcon>
                  </div>
                </div>
              </div>
            </div>

            <!-- 推荐说明卡片 -->
            <div class="mb-6 border border-blue-100 rounded-xl bg-blue-50 p-5">
              <div class="flex items-start space-x-4">
                <div class="flex-shrink-0">
                  <div class="h-10 w-10 flex items-center justify-center rounded-full bg-blue-500">
                    <NIcon size="20" color="white">
                      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"
                        />
                      </svg>
                    </NIcon>
                  </div>
                </div>
                <div class="flex-1">
                  <h4 class="mb-2 text-lg text-gray-800 font-semibold">智能推荐说明</h4>
                  <p class="text-sm text-gray-600 leading-relaxed">
                    基于
                    <span class="text-blue-600 font-medium">{{ props.student.name }}</span>
                    的语文学习风格、能力水平和知识掌握情况，
                    系统智能分析并推荐了以下初中语文学习资源。推荐算法重点关注学生的
                    <span class="text-green-600 font-medium">优势能力</span>
                    和
                    <span class="text-orange-600 font-medium">待提升项</span>
                    ，确保每个资源都能精准匹配学习需求。
                  </p>
                </div>
              </div>
            </div>

            <!-- 资源筛选器 -->
            <div class="mb-6 border border-gray-200 rounded-lg bg-white p-4">
              <div class="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                <div class="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-x-6 sm:space-y-0">
                  <div class="flex items-center space-x-3">
                    <NIcon size="18" color="#6b7280">
                      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z" />
                      </svg>
                    </NIcon>
                    <span class="text-sm text-gray-700 font-medium">筛选</span>
                  </div>
                  <div class="flex flex-wrap gap-2">
                    <NButton
                      v-for="type in resourceTypes"
                      :key="type.value"
                      :type="resourceTabValue === type.value ? 'primary' : 'default'"
                      size="small"
                      round
                      @click="resourceTabValue = type.value"
                    >
                      <!-- @vue-ignore: naive-ui 图标插槽类型提示兼容 -->
                      <template #icon>
                        <NIcon size="14">
                          <svg
                            v-if="type.value === '视频'"
                            xmlns="http://www.w3.org/2000/svg"
                            width="1em"
                            height="1em"
                            viewBox="0 0 24 24"
                          >
                            <path fill="currentColor" d="M8 5v14l11-7z" />
                          </svg>
                          <svg
                            v-else-if="type.value === '习题'"
                            xmlns="http://www.w3.org/2000/svg"
                            width="1em"
                            height="1em"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="currentColor"
                              d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"
                            />
                          </svg>
                          <svg v-else xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                            <path
                              fill="currentColor"
                              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2z"
                            />
                          </svg>
                        </NIcon>
                      </template>
                      {{ type.label }}
                    </NButton>
                  </div>
                </div>

                <div class="flex items-center text-sm text-gray-500 space-x-2">
                  <NIcon size="16">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M9 11H7v6h2v-6zm4 0h-2v6h2v-6zm4 0h-2v6h2v-6zm2-7h-3V2h-2v2H8V2H6v2H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H3V8h14v12z"
                      />
                    </svg>
                  </NIcon>
                  <span>
                    共找到
                    <span class="text-blue-600 font-semibold">{{ filteredResources.length }}</span>
                    个匹配资源
                  </span>
                </div>
              </div>
            </div>

            <!-- 资源列表 -->
            <div class="space-y-6">
              <div v-if="filteredResources.length === 0" class="py-12">
                <NEmpty description="暂无匹配的语文学习资源" />
              </div>

              <div
                v-for="resource in filteredResources"
                :key="resource.id"
                class="group relative cursor-pointer overflow-hidden border border-gray-200 rounded-xl bg-white p-6 shadow-sm transition-all duration-300 hover:border-blue-300 hover:shadow-lg"
                @click="openResource(resource)"
              >
                <!-- 资源卡片头部 -->
                <div class="flex items-start space-x-6">
                  <!-- 资源缩略图 -->
                  <div class="flex-shrink-0">
                    <div
                      class="relative h-20 w-20 flex items-center justify-center rounded-xl text-white shadow-md transition-transform duration-300 group-hover:scale-105"
                      :class="{
                        'bg-blue-500': resource.type === '视频',
                        'bg-green-500': resource.type === '习题',
                        'bg-purple-500': resource.type === 'AI辅导',
                        'bg-orange-500': resource.type === '互动课件',
                        'bg-red-500': resource.type === '文档',
                        'bg-teal-500': resource.type === '讨论'
                      }"
                    >
                      <NIcon size="28">
                        <svg
                          v-if="resource.type === '视频'"
                          xmlns="http://www.w3.org/2000/svg"
                          width="1em"
                          height="1em"
                          viewBox="0 0 24 24"
                        >
                          <path fill="currentColor" d="M8 5v14l11-7z" />
                        </svg>
                        <svg
                          v-else-if="resource.type === '习题'"
                          xmlns="http://www.w3.org/2000/svg"
                          width="1em"
                          height="1em"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="currentColor"
                            d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"
                          />
                        </svg>
                        <svg
                          v-else-if="resource.type === 'AI辅导'"
                          xmlns="http://www.w3.org/2000/svg"
                          width="1em"
                          height="1em"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="currentColor"
                            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3s-3-1.34-3-3s1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22c.03-1.99 4-3.08 6-3.08c1.99 0 5.97 1.09 6 3.08c-1.29 1.94-3.5 3.22-6 3.22z"
                          />
                        </svg>
                        <svg v-else xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                          <path
                            fill="currentColor"
                            d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"
                          />
                        </svg>
                      </NIcon>

                      <!-- 匹配度徽章 -->
                      <div class="absolute rounded-full bg-white px-2 py-1 shadow-md -right-2 -top-2">
                        <span
                          class="text-xs font-bold"
                          :class="{
                            'text-green-600': resource.matchScore >= 95,
                            'text-blue-600': resource.matchScore >= 90 && resource.matchScore < 95,
                            'text-orange-600': resource.matchScore >= 85 && resource.matchScore < 90,
                            'text-gray-600': resource.matchScore < 85
                          }"
                        >
                          {{ resource.matchScore }}%
                        </span>
                      </div>
                    </div>
                  </div>

                  <!-- 资源信息 -->
                  <div class="min-w-0 flex-1">
                    <!-- 标题和基本信息 -->
                    <div class="mb-3">
                      <h4 class="mb-2 text-lg text-gray-900 font-semibold transition-colors group-hover:text-blue-600">
                        {{ resource.title }}
                      </h4>

                      <!-- 标签行 -->
                      <div class="mb-2 flex flex-wrap items-center gap-2">
                        <NTag :type="getResourceMatchColor(resource.matchScore)" size="small" round>
                          <!-- @vue-ignore: naive-ui 图标插槽类型提示兼容 -->
                          <template #icon>
                            <NIcon size="12">
                              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                                <path
                                  fill="currentColor"
                                  d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22L12 18.77L5.82 22L7 14.14L2 9.27l6.91-1.01L12 2z"
                                />
                              </svg>
                            </NIcon>
                          </template>
                          匹配度 {{ resource.matchScore }}%
                        </NTag>

                        <NTag type="primary" size="small" round>{{ resource.type }}</NTag>

                        <NTag
                          size="small"
                          round
                          :type="
                            resource.difficulty === '挑战'
                              ? 'error'
                              : resource.difficulty === '提高'
                                ? 'warning'
                                : 'default'
                          "
                        >
                          {{ resource.difficulty }}
                        </NTag>

                        <NTag type="default" size="small" round>
                          <!-- @vue-ignore: naive-ui 图标插槽类型提示兼容 -->
                          <template #icon>
                            <NIcon size="12">
                              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                                <path
                                  fill="currentColor"
                                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm0 3.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5zM15 17.5h-6v-1h1.5v-4.5H9v-1h4.5v5.5H15v1z"
                                />
                              </svg>
                            </NIcon>
                          </template>
                          {{ resource.duration }}
                        </NTag>
                      </div>
                    </div>

                    <!-- 推荐理由 -->
                    <div class="mb-4">
                      <p
                        class="border-l-4 border-blue-400 rounded-lg bg-gray-50 p-3 text-sm text-gray-600 leading-relaxed"
                      >
                        <span class="text-blue-600 font-medium">推荐理由：</span>
                        {{ resource.reason }}
                      </p>
                    </div>

                    <!-- 资源标签 -->
                    <div class="mb-4">
                      <div class="mb-2 flex items-center">
                        <NIcon size="14" color="#6b7280" class="mr-1">
                          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                            <path
                              fill="currentColor"
                              d="M5.5 7A1.5 1.5 0 0 1 4 5.5A1.5 1.5 0 0 1 5.5 4A1.5 1.5 0 0 1 7 5.5A1.5 1.5 0 0 1 5.5 7m15.91 4.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.41l8.99 9c.37.36.87.59 1.42.59c.55 0 1.05-.23 1.41-.59l7-7c.37-.36.59-.86.59-1.41c0-.56-.23-1.06-.59-1.42z"
                            />
                          </svg>
                        </NIcon>
                        <span class="text-xs text-gray-500 font-medium">相关标签</span>
                      </div>
                      <div class="flex flex-wrap gap-1.5">
                        <NTag
                          v-for="tag in resource.tags"
                          :key="tag"
                          type="default"
                          size="small"
                          round
                          class="border-blue-200 bg-blue-50 text-xs text-blue-700"
                        >
                          {{ tag }}
                        </NTag>
                      </div>
                    </div>

                    <!-- 预计提升能力 -->
                    <div class="flex items-center justify-between">
                      <div class="flex items-center space-x-2">
                        <NIcon size="14" color="#10b981">
                          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M7 14l5-5l5 5z" />
                          </svg>
                        </NIcon>
                        <span class="text-xs text-gray-500 font-medium">预计提升：</span>
                        <div class="flex flex-wrap gap-1">
                          <span
                            v-for="area in getImprovementAreas(resource)"
                            :key="area"
                            class="rounded-full bg-green-50 px-2 py-1 text-xs text-green-600 font-medium"
                          >
                            {{ area }}
                          </span>
                        </div>
                      </div>

                      <!-- 操作按钮 -->
                      <div class="flex items-center opacity-0 transition-opacity space-x-2 group-hover:opacity-100">
                        <NButton size="small" type="primary" ghost round>
                          <!-- @vue-ignore: naive-ui 图标插槽类型提示兼容 -->
                          <template #icon>
                            <NIcon>
                              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M8 5v14l11-7z" />
                              </svg>
                            </NIcon>
                          </template>
                          开始学习
                        </NButton>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </NTabPane>
      </NTabs>
    </NCard>
  </NModal>
</template>
