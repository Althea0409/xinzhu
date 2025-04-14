import type { ExerciseSet, LayerCounts, StudentLayer } from '../types';

// 模拟学生数据
export const mockStudents: StudentLayer[] = [
  { id: 1, name: '陈晓明', layer: '基础层', analysisTags: ['基础薄弱'], className: '初三(1)班' },
  { id: 2, name: '王思雨', layer: '提高层', analysisTags: ['稳定中等'], className: '初三(2)班' },
  { id: 3, name: '李华', layer: '拓展层', analysisTags: ['逻辑思维强'], className: '初三(3)班' },
  { id: 4, name: '张小芳', layer: '基础层', analysisTags: ['计算需加强'], className: '初三(1)班' },
  { id: 5, name: '刘明', layer: '提高层', analysisTags: ['应用题优势'], className: '初三(2)班' },
  { id: 6, name: '王强', layer: '基础层', analysisTags: ['几何优势'], className: '初三(3)班' },
  { id: 7, name: '赵敏', layer: '拓展层', analysisTags: ['创新思维佳'], className: '初三(1)班' },
  { id: 8, name: '孙伟', layer: '基础层', analysisTags: ['基础薄弱'], className: '初三(2)班' },
  { id: 9, name: '李四', layer: '提高层', analysisTags: ['代数需加强'], className: '初三(3)班' },
  { id: 10, name: '王五', layer: '基础层', analysisTags: ['计算需加强'], className: '初三(1)班' },
  { id: 11, name: '赵六', layer: '提高层', analysisTags: ['稳定中等'], className: '初三(2)班' },
  { id: 12, name: '钱七', layer: '拓展层', analysisTags: ['全面发展'], className: '初三(3)班' },
  { id: 13, name: '周宇', layer: '基础层', analysisTags: ['基础薄弱'], className: '初三(1)班' },
  { id: 14, name: '吴彤', layer: '提高层', analysisTags: ['应用题优势'], className: '初三(2)班' },
  { id: 15, name: '郑怡', layer: '拓展层', analysisTags: ['逻辑思维强'], className: '初三(3)班' },
  { id: 16, name: '冯芳', layer: '基础层', analysisTags: ['几何优势'], className: '初三(1)班' },
  { id: 17, name: '陈浩', layer: '提高层', analysisTags: ['代数需加强'], className: '初三(2)班' },
  { id: 18, name: '杨云', layer: '拓展层', analysisTags: ['创新思维佳'], className: '初三(3)班' }
];

// 计算各层级学生人数
export function calculateStudentCounts(students: StudentLayer[]): LayerCounts {
  return {
    basic: students.filter(s => s.layer === '基础层').length,
    improve: students.filter(s => s.layer === '提高层').length,
    extension: students.filter(s => s.layer === '拓展层').length
  };
}

// 生成模拟练习题集
export function generateMockExercise(targetLayer: '基础层' | '提高层' | '拓展层'): ExerciseSet {
  return {
    id: Date.now(),
    title: `${targetLayer}数学练习题集`,
    targetLayer,
    createTime: new Date().toLocaleString(),
    questions: [
      {
        id: 1,
        type: '选择题',
        content: '计算: 12 × 4 - 8 ÷ 2 = ?',
        options: ['44', '46', '48', '50'],
        answer: 'B',
        difficulty: '简单',
        analysis: '先算乘除，后算加减: 12 × 4 - 8 ÷ 2 = 48 - 4 = 44'
      },
      {
        id: 2,
        type: '填空题',
        content: '已知三角形的两边长分别为5cm和7cm，则第三边的长度可能是_____cm。',
        answer: '任意大于2小于12的数',
        difficulty: '中等',
        analysis:
          '三角形的任意两边之和大于第三边，任意两边之差小于第三边。所以第三边长满足: |5-7| < 第三边 < 5+7，即2 < 第三边 < 12'
      },
      {
        id: 3,
        type: '判断题',
        content: '等腰三角形的三个内角一定相等。',
        answer: '错误',
        difficulty: '简单',
        analysis: '等腰三角形只有两个角相等（底角相等），不是等边三角形'
      },
      {
        id: 4,
        type: '选择题',
        content: '下列图形中，不是轴对称图形的是？',
        options: ['正方形', '等腰梯形', '平行四边形', '圆形'],
        answer: 'C',
        difficulty: '中等',
        analysis: '平行四边形一般不是轴对称图形，除非它是矩形、菱形或正方形'
      },
      {
        id: 5,
        type: '综合题',
        content:
          '小明有25元钱，他买了3支钢笔和2本笔记本，一共花了23元。已知每支钢笔的价格相同，每本笔记本的价格也相同。<br>(1) 设每支钢笔的价格为x元，每本笔记本的价格为y元，请列出方程。<br>(2) 求每支钢笔和每本笔记本的价格。',
        answer: '钢笔5元/支，笔记本4元/本',
        difficulty: '困难',
        analysis: '(1) 根据题意，可列方程组：3x + 2y = 23<br>(2) 解得x = 5, y = 4，即钢笔5元/支，笔记本4元/本'
      }
    ]
  };
}
