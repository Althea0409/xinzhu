/** 学科信息接口 */
export interface SubjectInfo {
  /** 学科ID */
  id: number;
  /** 学科名称 */
  name: string;
  /** 学科类型 - 用于决定显示的颜色和样式 */
  type: 'math' | 'english' | 'chinese' | 'physics' | 'chemistry' | 'biology' | 'history' | 'geography' | 'politics';
}

/**
 * 学习状态类型
 *
 * - normal: 正常
 * - middle-excellent: 中等偏上
 * - excellent: 优秀
 * - needs-improvement: 需要改进
 */
export type StudyStatusType = 'normal' | 'middle-excellent' | 'excellent' | 'needs-improvement';

/** 学生信息接口 */
export interface StudentInfo {
  /** 学生ID */
  id: number;
  /** 学生姓名 */
  name: string;
  /** 班级名称 */
  className: string;
  /** 学习的科目列表 */
  subjects: SubjectInfo[];
  /** 学习状态 */
  studyStatus: StudyStatusType;
  /** 头像 */
  avatar?: string;
  /** 分数 */
  score?: number;
  /** 进度 */
  progress?: number;
  /** 最后活跃时间 */
  lastActive?: string;
  /** 标签 */
  tags?: string[];
}

/** 学习行为数据接口 */
export interface LearningBehaviorData {
  /** 适应性 */
  adaptability: number;
  /** 作业完成度 */
  homeworkCompletion: number;
  /** 行为习惯时长 */
  behaviorDuration: number;
  /** 知识掌握度 */
  knowledgeMastery: number;
}

/** 能力雷达图项目接口 */
export interface AbilityRadarItem {
  /** 能力名称 */
  name: string;
  /** 能力值 */
  value: number;
}

/** 学习风格分析接口 */
export interface LearningStyleAnalysis {
  /** 学习风格 */
  style: string;
  /** 描述 */
  description: string;
}

/** 问题分析项目接口 */
export interface ProblemAnalysisItem {
  /** 类型 */
  type: 'problem' | 'suggestion';
  /** 标题 */
  title: string;
  /** 描述 */
  description: string;
}

/** 综合能力评估项目接口 */
export interface ComprehensiveAssessmentItem {
  /** 类别 */
  category: string;
  /** 描述 */
  description: string;
}

/** 学习轨迹项目接口 */
export interface LearningTrackItem {
  /** 日期 */
  date: string;
  /** 事件 */
  event: string;
  /** 分数 */
  score: number | string;
}

/** 技能节点接口 */
export interface SkillNode {
  /** 技能ID */
  id: string;
  /** 技能名称 */
  name: string;
  /** 技能等级 */
  level: number;
  /** 掌握程度 */
  mastery: number;
  /** 类别 */
  category: string;
  /** 前置技能 */
  prerequisites: string[];
  /** 子技能 */
  children?: SkillNode[];
}

/** 知识节点接口 */
export interface KnowledgeNode {
  /** 知识点ID */
  id: string;
  /** 知识点名称 */
  name: string;
  /** 类型 */
  type: 'concept' | 'skill' | 'application';
  /** 掌握程度 */
  mastery: number;
  /** 难度 */
  difficulty: number;
  /** 关联知识点 */
  connections: string[];
  /** 位置 */
  position: {
    x: number;
    y: number;
  };
}
