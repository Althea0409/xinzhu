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
const learningBehaviors = computed(() => {
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
const studentPersonality = computed<StudentPersonality>(() => {
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
const learningTrajectory = computed<LearningTrajectory[]>(() => {
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
const learningIssues = computed(() => {
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
        title: '创新性数学思维训练',
        type: '习题',
        tags: ['数学', '创新思维', '挑战性问题'],
        difficulty: '挑战',
        duration: '45分钟',
        matchScore: 96,
        link: '#',
        reason: '针对该生创新思维不足的问题，提供非常规数学问题训练'
      },
      {
        id: 'res002',
        title: '科学探究方法与实践',
        type: '实验',
        tags: ['科学', '探究能力', '实验设计'],
        difficulty: '提高',
        duration: '60分钟',
        matchScore: 94,
        link: '#',
        reason: '帮助提升探究能力，培养科学研究思维'
      },
      {
        id: 'res003',
        title: '团队协作与有效沟通',
        type: '互动课件',
        tags: ['软技能', '团队协作', '沟通'],
        difficulty: '基础',
        duration: '30分钟',
        matchScore: 92,
        link: '#',
        reason: '针对团队协作能力不足的情况，提供实用的合作技巧'
      },
      {
        id: 'res004',
        title: '高效在线学习策略',
        type: '文档',
        tags: ['学习方法', '时间管理', '自律'],
        difficulty: '基础',
        duration: '15分钟',
        matchScore: 90,
        link: '#',
        reason: '帮助解决在线学习时间减少的问题，提高学习效率'
      },
      {
        id: 'res013',
        title: 'AI个性化数学辅导',
        type: 'AI辅导',
        tags: ['数学', '一对一', '适应性学习'],
        difficulty: '提高',
        duration: '按需',
        matchScore: 97,
        link: '#',
        reason: '基于该生学习特点的智能辅导，针对性解决薄弱环节'
      },
      // 视频资源 - 保留
      {
        id: 'res101',
        title: '创新思维解题技巧视频课程',
        type: '视频',
        tags: ['数学', '创新思维', '解题技巧'],
        difficulty: '提高',
        duration: '35分钟',
        matchScore: 94,
        link: '#',
        reason: '通过视频讲解创新性解题思路，帮助突破思维定式'
      },
      {
        id: 'res102',
        title: '探究性学习方法与案例分析',
        type: '视频',
        tags: ['探究能力', '学习方法', '案例分析'],
        difficulty: '提高',
        duration: '28分钟',
        matchScore: 92,
        link: '#',
        reason: '通过真实案例视频分析探究性学习方法的应用'
      },
      // 习题资源 - 保留
      {
        id: 'res103',
        title: '团队合作能力强化练习',
        type: '习题',
        tags: ['团队协作', '沟通', '合作能力'],
        difficulty: '基础',
        duration: '25分钟',
        matchScore: 93,
        link: '#',
        reason: '针对团队协作能力不足设计的情境式习题，强化协作意识'
      },
      {
        id: 'res104',
        title: '数学应用能力进阶训练',
        type: '习题',
        tags: ['数学', '应用能力', '实际问题'],
        difficulty: '提高',
        duration: '40分钟',
        matchScore: 95,
        link: '#',
        reason: '提供生活中的实际问题，训练数学知识的应用能力'
      }
    ];
  } else if (studentId.includes('02')) {
    return [
      {
        id: 'res005',
        title: '数学基础概念强化训练',
        type: '视频',
        tags: ['数学', '基础知识', '概念理解'],
        difficulty: '基础',
        duration: '40分钟',
        matchScore: 98,
        link: '#',
        reason: '针对基础知识不扎实的问题，系统梳理核心概念'
      },
      {
        id: 'res006',
        title: '专注力提升与学习效率',
        type: '互动课件',
        tags: ['学习技巧', '专注力', '效率'],
        difficulty: '基础',
        duration: '25分钟',
        matchScore: 95,
        link: '#',
        reason: '帮助提高注意力集中度，解决学习分心问题'
      },
      {
        id: 'res007',
        title: '系统化学习方法指导',
        type: '文档',
        tags: ['学习方法', '知识体系', '思维导图'],
        difficulty: '提高',
        duration: '30分钟',
        matchScore: 94,
        link: '#',
        reason: '提供系统学习的方法和工具，解决知识点零散问题'
      },
      {
        id: 'res008',
        title: '英语听力强化训练',
        type: '习题',
        tags: ['英语', '听力', '基础训练'],
        difficulty: '提高',
        matchScore: 92,
        duration: '35分钟',
        link: '#',
        reason: '针对英语听力较弱的情况，提供有针对性的训练'
      },
      {
        id: 'res014',
        title: '注意力训练助手',
        type: 'AI辅导',
        tags: ['专注力', '时间管理', '学习习惯'],
        difficulty: '基础',
        duration: '每天15分钟',
        matchScore: 96,
        link: '#',
        reason: '通过AI监测学习状态，适时提醒，培养专注学习习惯'
      },
      {
        id: 'res015',
        title: '作业质量自查工具',
        type: '互动课件',
        tags: ['学习效率', '自我评估', '质量控制'],
        difficulty: '基础',
        duration: '10分钟',
        matchScore: 91,
        link: '#',
        reason: '帮助建立作业自查习惯，提高作业质量和完成度'
      },
      // 视频资源 - 保留
      {
        id: 'res105',
        title: '数学概念可视化解析',
        type: '视频',
        tags: ['数学', '概念理解', '可视化教学'],
        difficulty: '基础',
        duration: '32分钟',
        matchScore: 96,
        link: '#',
        reason: '通过动画和可视化方式讲解抽象数学概念，加深理解'
      },
      {
        id: 'res106',
        title: '如何构建完整知识体系',
        type: '视频',
        tags: ['学习方法', '知识体系', '思维导图'],
        difficulty: '提高',
        duration: '25分钟',
        matchScore: 93,
        link: '#',
        reason: '专业讲师指导如何将零散知识点构建成体系'
      },
      // 习题资源 - 保留
      {
        id: 'res107',
        title: '数学基础概念巩固练习',
        type: '习题',
        tags: ['数学', '基础概念', '巩固练习'],
        difficulty: '基础',
        duration: '30分钟',
        matchScore: 97,
        link: '#',
        reason: '针对基础知识不扎实设计的练习，强化核心概念掌握'
      },
      {
        id: 'res108',
        title: '专注力训练习题集',
        type: '习题',
        tags: ['专注力', '思维训练', '注意力集中'],
        difficulty: '基础',
        duration: '20分钟',
        matchScore: 94,
        link: '#',
        reason: '通过特别设计的习题训练专注力和持续注意力'
      }
    ];
  } else if (studentId.includes('03')) {
    return [
      {
        id: 'res009',
        title: '深度思考：从表象到本质',
        type: '讨论',
        tags: ['批判性思维', '深度学习', '分析能力'],
        difficulty: '提高',
        duration: '50分钟',
        matchScore: 95,
        link: '#',
        reason: '培养深度思考习惯，提升学习深度'
      },
      {
        id: 'res010',
        title: '抽象概念可视化学习',
        type: '互动课件',
        tags: ['理论学习', '可视化', '概念理解'],
        difficulty: '提高',
        matchScore: 94,
        duration: '35分钟',
        link: '#',
        reason: '通过可视化方式学习抽象概念，增强理解'
      },
      {
        id: 'res011',
        title: '科学实验技能提升',
        type: '实验',
        tags: ['科学', '动手能力', '实验技巧'],
        difficulty: '提高',
        duration: '60分钟',
        matchScore: 92,
        link: '#',
        reason: '提升科学实验操作能力，弥补动手能力不足'
      },
      {
        id: 'res012',
        title: '自律习惯养成与学习规划',
        type: '项目',
        tags: ['自律', '时间管理', '目标设定'],
        difficulty: '基础',
        duration: '两周',
        matchScore: 90,
        link: '#',
        reason: '帮助建立自律习惯，提高学习规律性'
      },
      {
        id: 'res016',
        title: '智能学习进度追踪',
        type: 'AI辅导',
        tags: ['自律', '进度管理', '目标达成'],
        difficulty: '基础',
        duration: '持续使用',
        matchScore: 93,
        link: '#',
        reason: '通过AI助手监控学习进度，提供及时反馈和调整建议'
      },
      {
        id: 'res017',
        title: '问题深度探究引导',
        type: 'AI辅导',
        tags: ['深度思考', '提问技巧', '探究学习'],
        difficulty: '提高',
        duration: '按需',
        matchScore: 96,
        link: '#',
        reason: '引导学生思考更深层次的问题，培养批判性思维能力'
      },
      // 视频资源 - 保留
      {
        id: 'res109',
        title: '批判性思维发展视频课程',
        type: '视频',
        tags: ['批判性思维', '深度思考', '分析能力'],
        difficulty: '提高',
        duration: '45分钟',
        matchScore: 94,
        link: '#',
        reason: '通过实例讲解批判性思维的方法和应用技巧'
      },
      {
        id: 'res110',
        title: '理论学习实用技巧',
        type: '视频',
        tags: ['理论学习', '学习方法', '抽象思维'],
        difficulty: '基础',
        duration: '30分钟',
        matchScore: 93,
        link: '#',
        reason: '讲解如何高效学习理论知识，提高学习耐心'
      },
      // 习题资源 - 保留
      {
        id: 'res111',
        title: '深度思考能力训练题集',
        type: '习题',
        tags: ['深度思考', '分析能力', '批判性思维'],
        difficulty: '提高',
        duration: '40分钟',
        matchScore: 95,
        link: '#',
        reason: '提供需要深度分析的问题，训练批判性思维能力'
      },
      {
        id: 'res112',
        title: '自律能力培养练习',
        type: '习题',
        tags: ['自律', '时间管理', '目标执行'],
        difficulty: '基础',
        duration: '25分钟',
        matchScore: 92,
        link: '#',
        reason: '提供自律行为训练的相关任务和练习，培养自律习惯'
      }
    ];
  }

  // 默认推荐资源
  return [
    {
      id: 'res018',
      title: '个性化学习策略指导',
      type: 'AI辅导',
      tags: ['学习方法', '个性化', '能力提升'],
      difficulty: '提高',
      duration: '按需',
      matchScore: 93,
      link: '#',
      reason: '根据学生特点提供定制化学习建议和方法指导'
    },
    {
      id: 'res019',
      title: '学科知识图谱构建',
      type: '互动课件',
      tags: ['知识体系', '思维导图', '学科关联'],
      difficulty: '提高',
      duration: '45分钟',
      matchScore: 91,
      link: '#',
      reason: '帮助学生建立知识体系，理解知识点之间的联系'
    },
    {
      id: 'res020',
      title: '双语阅读技能提升',
      type: '文档',
      tags: ['阅读能力', '语言学习', '理解力'],
      difficulty: '基础',
      duration: '30分钟',
      matchScore: 88,
      link: '#',
      reason: '提高阅读理解能力，增强语言表达和理解能力'
    },
    {
      id: 'res021',
      title: '学习动机与目标设定',
      type: '讨论',
      tags: ['学习动机', '目标管理', '自我激励'],
      difficulty: '基础',
      duration: '40分钟',
      matchScore: 87,
      link: '#',
      reason: '帮助学生明确学习目标，增强内在学习动机'
    },
    // 视频资源 - 保留3个
    {
      id: 'res113',
      title: '学习方法精讲：如何高效学习',
      type: '视频',
      tags: ['学习方法', '效率提升', '学习技巧'],
      difficulty: '基础',
      duration: '35分钟',
      matchScore: 90,
      link: '#',
      reason: '通过视频讲解高效学习的方法和技巧，适合各类学习风格'
    },
    {
      id: 'res114',
      title: '思维导图绘制实战教程',
      type: '视频',
      tags: ['思维导图', '知识整理', '学习工具'],
      difficulty: '基础',
      duration: '28分钟',
      matchScore: 89,
      link: '#',
      reason: '详细讲解思维导图的绘制方法和应用场景，帮助构建知识体系'
    },
    {
      id: 'res117',
      title: '创新思维解题技巧视频课程',
      type: '视频',
      tags: ['创新思维', '解题技巧', '思维拓展'],
      difficulty: '提高',
      duration: '42分钟',
      matchScore: 86,
      link: '#',
      reason: '帮助学生打破常规思维，培养创新解题能力'
    },
    // 习题资源 - 保留3个
    {
      id: 'res115',
      title: '综合能力测评练习',
      type: '习题',
      tags: ['综合能力', '自我评估', '能力提升'],
      difficulty: '提高',
      duration: '50分钟',
      matchScore: 92,
      link: '#',
      reason: '全面测试学生各方面能力，帮助发现优势和不足'
    },
    {
      id: 'res116',
      title: '学习习惯培养练习集',
      type: '习题',
      tags: ['学习习惯', '时间管理', '效率提升'],
      difficulty: '基础',
      duration: '30分钟',
      matchScore: 88,
      link: '#',
      reason: '通过实践练习培养良好的学习习惯和时间管理能力'
    },
    {
      id: 'res120',
      title: '创新思维拓展训练',
      type: '习题',
      tags: ['创新思维', '发散思考', '创造力'],
      difficulty: '提高',
      duration: '40分钟',
      matchScore: 87,
      link: '#',
      reason: '通过专题练习培养创新思维和发散思考能力'
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
const radarPoints = computed(() => getPolygonPoints());

/** 获取标签位置样式 */
function getLabelPosition(index: number, total: number) {
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
const labels = ['知识', '思\n维', '探究', '表\n达'];

// 激活的标签页
const activeTab = ref('analysis');

// 资源推荐相关变量
const resourceTabValue = ref('ai'); // 资源类型标签页，默认选择AI辅导
const currentPage = ref(1); // 当前分页

// 根据类型筛选资源
const filteredResources = computed(() => {
  const typeMap = {
    video: '视频',
    doc: '文档',
    exercise: '习题',
    interactive: '互动课件',
    ai: 'AI辅导'
  };

  // 默认显示AI辅导资源
  if (!resourceTabValue.value || !typeMap[resourceTabValue.value as keyof typeof typeMap]) {
    // 如果没有有效的选择，默认使用AI辅导作为默认值
    return recommendedResources.value.filter(resource => resource.type === 'AI辅导');
  }

  return recommendedResources.value.filter(
    resource => resource.type === typeMap[resourceTabValue.value as keyof typeof typeMap]
  );
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
        <NTabPane name="analysis" tab="学情分析">
          <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
            <!-- 左侧：基本信息和学习特征 -->
            <div class="space-y-6">
              <!-- 基本信息 -->
              <section class="rounded-md bg-gray-50 p-4">
                <h3 class="mb-3 text-base text-gray-700 font-medium">基本信息</h3>
                <div class="text-sm text-gray-600 space-y-2">
                  <div class="flex items-center">
                    <span class="w-20">班级:</span>
                    <span>{{ props.student.className }}</span>
                  </div>
                  <div class="flex items-center">
                    <span class="w-20">学号:</span>
                    <span>{{ props.student.id }}</span>
                  </div>
                </div>
              </section>

              <!-- 学科表现显示 -->
              <!--
 <section class="rounded-md bg-gray-50 p-4">
                <h3 class="mb-3 text-base text-gray-700 font-medium">学科表现</h3>
                <div class="space-y-3">
                  <div v-if="subjectPerformance.math">
                    <div class="mb-1 flex items-center justify-between">
                      <span class="text-sm font-medium">数学</span>
                      <span
                        class="text-sm"
                        :class="subjectPerformance.math.score >= 90 ? 'text-green-600' : 'text-blue-600'"
                      >
                        {{ subjectPerformance.math.score }}分
                      </span>
                    </div>
                    <NProgress
                      type="line"
                      :percentage="subjectPerformance.math.score"
                      :height="8"
                      :border-radius="4"
                      :color="subjectPerformance.math.score >= 90 ? '#18a058' : '#2080f0'"
                      :show-indicator="false"
                    />
                    <div class="mt-1 flex justify-between text-xs text-gray-500">
                      <span>班级排名: {{ subjectPerformance.math.rank }}</span>
                      <span>{{ subjectPerformance.math.trend }}</span>
                    </div>
                  </div>
                </div>
              </section> 
-->

              <!-- 学习特征 -->
              <section class="rounded-md bg-gray-50 p-4">
                <h3 class="mb-3 text-base text-gray-700 font-medium">学习行为数据</h3>
                <div class="space-y-3">
                  <div v-for="item in learningBehaviors" :key="item.name">
                    <div class="mb-1 flex items-center justify-between">
                      <span class="text-sm text-gray-600">{{ item.name }}</span>
                      <span class="text-sm font-medium">{{ item.value }}%</span>
                    </div>
                    <NProgress
                      type="line"
                      :percentage="item.value"
                      :height="8"
                      :border-radius="4"
                      :color="item.value > 85 ? '#18a058' : item.value > 70 ? '#2080f0' : '#f0a020'"
                      :show-indicator="false"
                    />
                  </div>
                </div>
              </section>

              <!-- 学习问题与改进建议 -->
              <section class="rounded-md bg-gray-50 p-4">
                <h3 class="mb-3 text-base text-gray-700 font-medium">问题分析与改进建议</h3>
                <div class="space-y-4">
                  <div
                    v-for="(item, index) in learningIssues"
                    :key="index"
                    class="border-l-4 border-blue-500 rounded bg-white p-3"
                  >
                    <div class="mb-1 text-sm text-gray-700 font-medium">{{ item.issue }}</div>
                    <div class="text-xs text-gray-600">{{ item.suggestion }}</div>
                  </div>
                </div>
              </section>

              <!-- 综合能力评估卡片 -->
              <section class="rounded-md bg-[#F9FAFB] p-4">
                <h3 class="mb-4 text-base text-gray-700 font-medium">综合能力评估</h3>
                <!-- 红框中显示的三个卡片布局 -->
                <div class="flex flex-col space-y-4">
                  <!-- 学科平衡分析 - 蓝色背景 -->
                  <div class="relative border-l-[6px] border-blue-500 rounded-md bg-blue-50 p-4 pl-5">
                    <div class="mb-2 text-sm text-blue-700 font-medium">学科平衡分析</div>
                    <div class="text-xs text-blue-700 leading-relaxed">
                      该生数学成绩突出，语文和英语成绩稳定，具有较全面的学科发展。建议适当平衡各学科学习时间，以维持优势。
                    </div>
                  </div>

                  <!-- 学习方法建议 - 绿色背景 -->
                  <div class="relative border-l-[6px] border-green-500 rounded-md bg-green-50 p-4 pl-5">
                    <div class="mb-2 text-sm text-green-700 font-medium">学习方法建议</div>
                    <div class="text-xs text-green-700 leading-relaxed">
                      根据该生混合型学习特点，推荐采用多样化学习方法。可增加视觉辅助学习内容，提升学习效率和记忆效果。
                    </div>
                  </div>

                  <!-- 能力提升重点 - 紫色背景 -->
                  <div class="relative border-l-[6px] border-purple-500 rounded-md bg-purple-50 p-4 pl-5">
                    <div class="mb-2 text-sm text-purple-700 font-medium">能力提升重点</div>
                    <div class="text-xs text-purple-700 leading-relaxed">
                      建议重点提升学习效率和专注度，培养深度思考习惯。可通过思维导图等工具建立知识体系，强化知识间联系。
                    </div>
                  </div>
                </div>
              </section>
            </div>

            <!-- 右侧：能力雷达图 -->
            <div class="space-y-6">
              <section class="rounded-md bg-gray-50 p-4">
                <h3 class="mb-3 text-base text-gray-700 font-medium">能力雷达图</h3>
                <div class="relative h-64 w-full">
                  <div class="radar-chart-container">
                    <!-- 雷达环 -->
                    <div
                      v-for="(_, index) in 3"
                      :key="index"
                      class="radar-circle"
                      :class="`radar-scale-${(index + 1) * 33}`"
                    ></div>

                    <!-- 雷达轴 -->
                    <div
                      v-for="(_, index) in 5"
                      :key="index"
                      class="radar-axis"
                      :class="`radar-angle-${index * 72}`"
                    ></div>

                    <!-- 雷达标签 -->
                    <div
                      v-for="(label, index) in labels"
                      :key="index"
                      class="radar-label"
                      :style="getLabelPosition(index, labels.length)"
                    >
                      {{ label }}
                    </div>

                    <!-- 数据图形 -->
                    <svg class="absolute inset-0 h-full w-full overflow-visible" viewBox="0 0 100 100">
                      <!-- 填充区域 -->
                      <polygon
                        :points="radarPoints"
                        fill="rgba(59, 130, 246, 0.2)"
                        stroke="#3b82f6"
                        stroke-width="2"
                      ></polygon>

                      <!-- 数据点 -->
                      <template v-for="(item, index) in radarData" :key="index">
                        <circle
                          :cx="calculateRadarPoint(item.value, index, radarData.length).x"
                          :cy="calculateRadarPoint(item.value, index, radarData.length).y"
                          r="3"
                          fill="#3b82f6"
                        ></circle>
                      </template>
                    </svg>
                  </div>
                </div>
              </section>

              <!-- 学习风格分析 -->
              <section class="rounded-md bg-[#F9FAFB] p-4">
                <h3 class="mb-3 text-base text-gray-700 font-medium">学习风格分析</h3>
                <div class="space-y-3">
                  <div class="flex items-center">
                    <div class="mr-2 text-sm text-gray-600">学习风格：</div>
                    <div class="text-sm font-medium">{{ studentPersonality.learningStyle }}</div>
                  </div>

                  <div>
                    <div class="mb-1 text-sm text-gray-600">优势：</div>
                    <div class="flex flex-wrap gap-1">
                      <NTag
                        v-for="item in studentPersonality.strengths"
                        :key="item"
                        size="small"
                        class="border-0 rounded bg-green-50 text-green-600"
                      >
                        {{ item }}
                      </NTag>
                    </div>
                  </div>

                  <div>
                    <div class="mb-1 text-sm text-gray-600">待提升：</div>
                    <div class="flex flex-wrap gap-1">
                      <NTag
                        v-for="item in studentPersonality.weaknesses"
                        :key="item"
                        size="small"
                        class="border-0 rounded bg-orange-50 text-orange-500"
                      >
                        {{ item }}
                      </NTag>
                    </div>
                  </div>

                  <div>
                    <div class="mb-1 text-sm text-gray-600">兴趣点：</div>
                    <div class="flex flex-wrap gap-1">
                      <NTag
                        v-for="item in studentPersonality.interests"
                        :key="item"
                        size="small"
                        class="border-0 rounded bg-blue-50 text-blue-500"
                      >
                        {{ item }}
                      </NTag>
                    </div>
                  </div>

                  <div class="mt-2">
                    <div class="text-sm text-gray-600 font-medium">个性化学习建议：</div>
                    <div class="mt-1 text-xs text-gray-600">
                      作为{{ studentPersonality.learningStyle }}，建议优先使用以下学习资源类型：
                      <span v-for="(item, index) in studentPersonality.preferredResources" :key="index">
                        {{ item }}{{ index < studentPersonality.preferredResources.length - 1 ? '、' : '' }}
                      </span>
                    </div>
                  </div>
                </div>
              </section>

              <!-- 近期学习轨迹 -->
              <section class="rounded-md bg-[#F9FAFB] p-4">
                <h3 class="mb-3 text-base text-gray-700 font-medium">近期学习轨迹</h3>
                <div class="space-y-4">
                  <div v-for="(item, index) in learningTrajectory" :key="index" class="relative pl-6">
                    <!-- 时间线 -->
                    <div class="absolute left-0 top-0 h-full w-0.5 bg-blue-500"></div>
                    <!-- 时间点 -->
                    <div class="absolute left-0 top-0 mt-0 h-3 w-3 rounded-full bg-blue-500 -ml-[5px]"></div>

                    <div class="text-xs text-gray-500">{{ item.date }}</div>
                    <div class="text-sm font-medium">{{ item.event }}</div>
                    <div v-if="item.score" class="mt-0.5 text-xs text-gray-600">得分: {{ item.score }}</div>
                    <div v-if="item.improvement" class="mt-0.5 text-xs text-gray-600">提升: {{ item.improvement }}</div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </NTabPane>

        <!-- 个性化资源推荐 -->
        <NTabPane name="resources" tab="资源推荐">
          <div class="p-4">
            <div class="mb-4 flex items-center justify-between">
              <h3 class="text-base text-gray-700 font-medium">个性化学习资源推荐</h3>
              <div class="flex items-center gap-2">
                <NTag type="primary">匹配度: 94%</NTag>
                <NTag type="info">基于{{ props.student.name }}的学情分析智能推荐</NTag>
              </div>
            </div>

            <!-- 优先解决问题区域 -->
            <section class="mb-6 rounded-md bg-[#F9FAFB] p-4">
              <h4 class="mb-3 text-base text-gray-700 font-medium">优先解决问题</h4>
              <div class="grid grid-cols-1 gap-3 md:grid-cols-3">
                <div
                  v-for="(item, index) in learningIssues.slice(0, 3)"
                  :key="index"
                  class="border-l-4 rounded bg-white p-3"
                  :class="{
                    'border-blue-500': index === 0,
                    'border-green-500': index === 1,
                    'border-purple-500': index === 2
                  }"
                >
                  <div
                    class="mb-1 text-sm font-medium"
                    :class="{
                      'text-blue-700': index === 0,
                      'text-green-700': index === 1,
                      'text-purple-700': index === 2
                    }"
                  >
                    {{ item.issue }}
                  </div>
                  <div class="mb-2 text-xs text-gray-600">{{ item.suggestion }}</div>
                  <NButton
                    size="tiny"
                    quaternary
                    :class="{
                      'text-blue-600': index === 0,
                      'text-green-600': index === 1,
                      'text-purple-600': index === 2
                    }"
                  >
                    查看解决方案 →
                  </NButton>
                </div>
              </div>
            </section>

            <!-- 资源类型导航 -->
            <div class="mb-4">
              <NTabs v-model:value="resourceTabValue" type="segment" size="small">
                <NTabPane name="ai" tab="AI辅导" />
                <NTabPane name="exercise" tab="习题" />
                <NTabPane name="interactive" tab="互动" />
                <NTabPane name="video" tab="视频" />
                <NTabPane name="doc" tab="文档" />
              </NTabs>
            </div>

            <!-- 资源匹配解释 -->
            <div class="mb-4 rounded-md bg-blue-50 p-3">
              <div class="flex items-start">
                <div class="mr-2 flex-shrink-0">
                  <NIcon size="20" color="#2080f0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"
                      />
                    </svg>
                  </NIcon>
                </div>
                <div class="text-sm text-blue-700">
                  <div class="font-medium">资源匹配说明</div>
                  <div class="mt-1 text-xs text-blue-600">
                    基于{{ props.student.name }}的学习风格({{
                      studentPersonality.learningStyle
                    }})和能力点分析，系统推荐了以下资源。 重点针对学生的待提升项（{{
                      studentPersonality.weaknesses.join('、')
                    }}）和优势项（{{ studentPersonality.strengths.slice(0, 2).join('、') }}）进行匹配。
                  </div>
                </div>
              </div>
            </div>

            <!-- 资源列表 -->
            <div class="space-y-4">
              <div v-if="filteredResources.length === 0" class="py-8">
                <NEmpty description="暂无匹配的资源" />
              </div>

              <div
                v-for="resource in filteredResources"
                :key="resource.id"
                class="flex flex-col cursor-pointer border border-gray-100 rounded-lg bg-white p-4 transition-shadow md:flex-row hover:shadow-md"
                @click="openResource(resource)"
              >
                <!-- 资源缩略图 -->
                <div class="mb-3 h-24 flex-shrink-0 md:mb-0 md:mr-4 md:w-32">
                  <div
                    class="h-full w-full flex items-center justify-center rounded-md text-white"
                    :class="{
                      'bg-blue-500': resource.type === '视频',
                      'bg-green-500': resource.type === '文档',
                      'bg-orange-500': resource.type === '习题',
                      'bg-purple-500': resource.type === '互动课件',
                      'bg-indigo-500': resource.type === '实验',
                      'bg-teal-500': resource.type === 'AI辅导'
                    }"
                  >
                    <div v-if="resource.type === '视频'" class="text-3xl">
                      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M8 6.82v10.36c0 .79.87 1.27 1.54.84l8.14-5.18a1 1 0 0 0 0-1.69L9.54 5.98A.998.998 0 0 0 8 6.82z"
                        />
                      </svg>
                    </div>
                    <div v-else-if="resource.type === '文档'" class="text-3xl">
                      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M8 16h8v2H8zm0-4h8v2H8zm6-10H6c-1.1 0-2 .9-2 2v16c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11z"
                        />
                      </svg>
                    </div>
                    <div v-else-if="resource.type === '习题'" class="text-3xl">
                      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"
                        />
                      </svg>
                    </div>
                    <div v-else-if="resource.type === '互动课件'" class="text-3xl">
                      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h5v2h8v-2h5c1.1 0 1.99-.9 1.99-2L22 5c0-1.1-.9-2-2-2zm0 14H3V5h18v12z"
                        />
                      </svg>
                    </div>
                    <div v-else-if="resource.type === '实验'" class="text-3xl">
                      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M13 6v3h3v2h-3v3h-2v-3H8V9h3V6h2zm6 13.59L14.41 15L8 21.41V15H2V4c0-1.1.9-2 2-2h16c1.1 0 2 .9 2 2v13.59zM19 6.41V4H5v2.41l2.3 2.3l4.2-4.2l7.5 7.5V6.41zM5 14.59V16.1l3-3l-3-3v2.59z"
                        />
                      </svg>
                    </div>
                    <div v-else-if="resource.type === 'AI辅导'" class="text-3xl">
                      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M21 10.12h-6.78l2.74-2.82c-2.73-2.7-7.15-2.8-9.88-.1a6.875 6.875 0 0 0 0 9.79a7.02 7.02 0 0 0 9.88 0C18.32 15.65 19 14.08 19 12.1h2c0 1.98-.88 4.55-2.64 6.29c-3.51 3.48-9.21 3.48-12.72 0c-3.5-3.47-3.53-9.11-.02-12.58a8.987 8.987 0 0 1 12.65 0L21 3v7.12zM12.5 8v4.25l3.5 2.08l-.72 1.21L11 13V8h1.5z"
                        />
                      </svg>
                    </div>
                    <div v-else class="text-3xl">
                      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M17.5 4.5c-1.95 0-4.05.4-5.5 1.5c-1.45-1.1-3.55-1.5-5.5-1.5c-1.45 0-2.99.22-4.28.79C1.49 5.62 1 6.33 1 7.14v11.28c0 1.3 1.22 2.26 2.48 1.94c.98-.25 2.02-.36 3.02-.36c1.56 0 3.22.26 4.56.92c.6.3 1.28.3 1.87 0c1.34-.67 3-.92 4.56-.92c1 0 2.04.11 3.02.36c1.26.32 2.48-.65 2.48-1.94V7.14c0-.81-.49-1.52-1.22-1.85c-1.28-.57-2.82-.79-4.27-.79zM21 17.23c0 .63-.58 1.09-1.2.98c-.75-.17-1.42-.22-2.3-.22c-1.78 0-3.22.4-4.5 1.08c-.25.13-.56.13-.81 0c-1.28-.68-2.73-1.08-4.5-1.08c-.88 0-1.55.04-2.3.22c-.62.11-1.2-.34-1.2-.98v-2.89c0-.46.37-.83.83-.83c.77 0 1.35.14 2.67.36c1.49.25 2.98-.16 4.5-1.08c.25-.13.56-.13.81 0c1.52.92 3.01 1.33 4.5 1.08c1.32-.22 1.9-.36 2.67-.36c.46 0 .83.37.83.83v2.89z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                <!-- 资源信息 -->
                <div class="flex-grow">
                  <div class="flex items-start justify-between">
                    <div>
                      <h4 class="mb-1 text-base text-gray-800 font-medium">{{ resource.title }}</h4>
                      <div class="mb-2 flex flex-wrap items-center gap-2">
                        <NTag
                          size="small"
                          :color="
                            resource.type === '视频'
                              ? '#2080f0'
                              : resource.type === '习题'
                                ? '#d97706'
                                : resource.type === 'AI辅导'
                                  ? '#0ea5e9'
                                  : '#10b981'
                          "
                        >
                          {{ resource.type }}
                        </NTag>
                        <div class="flex items-center text-xs text-gray-500">
                          <span class="mr-1">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="1em"
                              height="1em"
                              viewBox="0 0 24 24"
                              class="inline-block"
                            >
                              <path
                                fill="currentColor"
                                d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8s8 3.58 8 8s-3.58 8-8 8z"
                              />
                              <path fill="currentColor" d="M12.5 7H11v6l5.25 3.15l.75-1.23l-4.5-2.67z" />
                            </svg>
                          </span>
                          {{ resource.duration }}
                        </div>
                        <div class="flex items-center text-xs text-gray-500">
                          <span class="mr-1">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="1em"
                              height="1em"
                              viewBox="0 0 24 24"
                              class="inline-block"
                            >
                              <path
                                fill="currentColor"
                                d="M21 11.18V9.72c0-.47-.16-.92-.46-1.28L16.6 3.72c-.38-.46-.94-.72-1.54-.72H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-1.18c.31-.11.53-.39.53-.72v-3.18c0-.33-.22-.61-.53-.72V10.9c.31-.11.53-.39.53-.72zM15.59 4.59l3.82 4.41H15.59zM5 19V5h8.5v5h5.5v1.18c-.31.11-.53.39-.53.72v3.18c0 .33.22.61.53.72V19z"
                              />
                              <path
                                fill="currentColor"
                                d="M11.85 15.87c.15.15.34.22.53.22s.38-.07.53-.22l1.26-1.26l1.26 1.27c.29.29.77.29 1.06 0s.29-.77 0-1.06l-1.26-1.27l1.26-1.26a.754.754 0 0 0 0-1.06c-.29-.29-.77-.29-1.06 0l-1.26 1.26l-1.26-1.26a.754.754 0 0 0-1.06 0c-.29.29-.29.77 0 1.06l1.26 1.26l-1.26 1.26c-.29.3-.29.77 0 1.06z"
                              />
                            </svg>
                          </span>
                          难度: {{ resource.difficulty }}
                        </div>
                      </div>
                      <div class="mb-1 flex flex-wrap gap-1">
                        <NTag v-for="tag in resource.tags" :key="tag" size="small" type="default" class="text-xs">
                          {{ tag }}
                        </NTag>
                      </div>
                      <div class="mt-2 text-xs text-gray-600">
                        <span class="font-medium">推荐理由:</span>
                        {{ resource.reason }}
                      </div>

                      <!-- 能力提升点 -->
                      <div class="mt-2 flex flex-col text-xs sm:flex-row sm:items-center">
                        <span class="mb-1 mr-2 text-gray-600 font-medium sm:mb-0">预计提升能力:</span>
                        <div class="flex flex-wrap gap-1">
                          <NTag
                            v-for="(area, i) in getImprovementAreas(resource)"
                            :key="i"
                            size="small"
                            class="border-0 bg-blue-50 text-blue-600"
                          >
                            {{ area }}
                          </NTag>
                        </div>
                      </div>
                    </div>
                    <div class="flex flex-col items-end">
                      <NTag :type="getResourceMatchColor(resource.matchScore)" class="mb-2">
                        匹配度 {{ resource.matchScore }}%
                      </NTag>
                      <div class="mt-auto">
                        <NButton size="small" type="primary" text>查看详情</NButton>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- 分页 -->
            <div class="mt-4 flex justify-center">
              <NPagination v-model:page="currentPage" :page-count="5" />
            </div>
          </div>
        </NTabPane>
      </NTabs>
    </NCard>
  </NModal>
</template>

<style scoped>
.radar-chart-container {
  --uno: absolute inset-0 flex items-center justify-center;
  perspective: 1000px;
}

.radar-circle {
  --uno: absolute border border-gray-200 rounded-full;
}

.radar-scale-33 {
  width: calc(100% * 0.33);
  height: calc(100% * 0.33);
  top: calc(50% - 50% * 0.33);
  left: calc(50% - 50% * 0.33);
}

.radar-scale-66 {
  width: calc(100% * 0.66);
  height: calc(100% * 0.66);
  top: calc(50% - 50% * 0.66);
  left: calc(50% - 50% * 0.66);
}

.radar-scale-99 {
  width: calc(100% * 0.99);
  height: calc(100% * 0.99);
  top: calc(50% - 50% * 0.99);
  left: calc(50% - 50% * 0.99);
}

.radar-axis {
  --uno: absolute top-1/2 left-0 w-full border-t border-gray-200;
  transform-origin: center;
}

.radar-angle-0 {
  transform: rotate(0deg);
}

.radar-angle-72 {
  transform: rotate(72deg);
}

.radar-angle-144 {
  transform: rotate(144deg);
}

.radar-angle-216 {
  transform: rotate(216deg);
}

.radar-angle-288 {
  transform: rotate(288deg);
}

.radar-label {
  --uno: absolute text-xs font-medium text-gray-500;
  top: var(--top);
  left: var(--left);
  transform: translate(-50%, -50%);
  white-space: pre-line;
  text-align: center;
}

.radar-label:nth-child(1) {
  transform: translate(-50%, -100%);
}

.radar-label:nth-child(2) {
  transform: translate(-50%, 0);
}

.radar-label:nth-child(3) {
  transform: translate(-100%, -50%);
}

.radar-label:nth-child(4) {
  transform: translate(0, -50%);
}
</style>
