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
}
