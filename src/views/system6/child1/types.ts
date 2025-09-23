// 学生分层相关类型
export interface StudentLayer {
  id: string | number;
  name: string;
  layer: '基础层' | '提高层' | '拓展层';
  analysisTags: string[];
  className?: string; // 学生所在班级
}

// 层级计数类型
export interface LayerCounts {
  basic: number; // 基础层人数
  improve: number; // 提高层人数
  extension: number; // 拓展层人数
}

// 练习题相关类型
export interface ExerciseQuestion {
  id: string | number;
  type: '选择题' | '填空题' | '判断题' | '简答题' | '综合题';
  content: string;
  options?: string[]; // 选择题选项
  answer: string;
  analysis?: string; // 解析
  difficulty: '简单' | '中等' | '困难';
  knowledgePoints?: string[]; // 知识点
}

// 练习题集类型
export interface ExerciseSet {
  id: string | number;
  title: string;
  targetLayer: '基础层' | '提高层' | '拓展层';
  questions: ExerciseQuestion[];
  createTime?: string;
}
