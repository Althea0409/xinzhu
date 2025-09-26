import type { ExerciseSet, LayerCounts, StudentLayer } from '../types';

// 模拟学生数据
export const mockStudents: StudentLayer[] = [
  // 基础层学生 (20人)
  { id: 1, name: '陈晓明', layer: '基础层', analysisTags: ['字词基础薄弱'], className: '初一（2）班' },
  { id: 2, name: '张小芳', layer: '基础层', analysisTags: ['拼音需加强'], className: '初一（2）班' },
  { id: 3, name: '王强', layer: '基础层', analysisTags: ['字词基础薄弱'], className: '初一（2）班' },
  { id: 4, name: '孙伟', layer: '基础层', analysisTags: ['拼音需加强'], className: '初一（2）班' },
  { id: 5, name: '王五', layer: '基础层', analysisTags: ['字词基础薄弱'], className: '初一（2）班' },
  { id: 6, name: '周宇', layer: '基础层', analysisTags: ['拼音需加强'], className: '初一（2）班' },
  { id: 7, name: '冯芳', layer: '基础层', analysisTags: ['字词基础薄弱'], className: '初一（2）班' },
  { id: 8, name: '马丽', layer: '基础层', analysisTags: ['拼音需加强'], className: '初一（2）班' },
  { id: 9, name: '朱伟', layer: '基础层', analysisTags: ['字词基础薄弱'], className: '初一（2）班' },
  { id: 10, name: '胡静', layer: '基础层', analysisTags: ['拼音需加强'], className: '初一（2）班' },
  { id: 11, name: '徐涛', layer: '基础层', analysisTags: ['字词基础薄弱'], className: '初一（2）班' },
  { id: 12, name: '林娜', layer: '基础层', analysisTags: ['拼音需加强'], className: '初一（2）班' },
  { id: 13, name: '何军', layer: '基础层', analysisTags: ['字词基础薄弱'], className: '初一（2）班' },
  { id: 14, name: '郭敏', layer: '基础层', analysisTags: ['拼音需加强'], className: '初一（2）班' },
  { id: 15, name: '罗峰', layer: '基础层', analysisTags: ['字词基础薄弱'], className: '初一（2）班' },
  { id: 16, name: '梁雪', layer: '基础层', analysisTags: ['拼音需加强'], className: '初一（2）班' },
  { id: 17, name: '韩磊', layer: '基础层', analysisTags: ['字词基础薄弱'], className: '初一（2）班' },
  { id: 18, name: '曹颖', layer: '基础层', analysisTags: ['拼音需加强'], className: '初一（2）班' },
  { id: 19, name: '邓强', layer: '基础层', analysisTags: ['字词基础薄弱'], className: '初一（2）班' },
  { id: 20, name: '谢琳', layer: '基础层', analysisTags: ['拼音需加强'], className: '初一（2）班' },

  // 提高层学生 (20人)
  { id: 21, name: '王思雨', layer: '提高层', analysisTags: ['语文基础稳定'], className: '初一（2）班' },
  { id: 22, name: '刘明', layer: '提高层', analysisTags: ['现代文阅读优势'], className: '初一（2）班' },
  { id: 23, name: '李四', layer: '提高层', analysisTags: ['语文基础稳定'], className: '初一（2）班' },
  { id: 24, name: '赵六', layer: '提高层', analysisTags: ['现代文阅读优势'], className: '初一（2）班' },
  { id: 25, name: '吴彤', layer: '提高层', analysisTags: ['语文基础稳定'], className: '初一（2）班' },
  { id: 26, name: '陈浩', layer: '提高层', analysisTags: ['现代文阅读优势'], className: '初一（2）班' },
  { id: 27, name: '黄磊', layer: '提高层', analysisTags: ['语文基础稳定'], className: '初一（2）班' },
  { id: 28, name: '周婷', layer: '提高层', analysisTags: ['现代文阅读优势'], className: '初一（2）班' },
  { id: 29, name: '吴刚', layer: '提高层', analysisTags: ['语文基础稳定'], className: '初一（2）班' },
  { id: 30, name: '郑丽', layer: '提高层', analysisTags: ['现代文阅读优势'], className: '初一（2）班' },
  { id: 31, name: '冯杰', layer: '提高层', analysisTags: ['语文基础稳定'], className: '初一（2）班' },
  { id: 32, name: '蒋雯', layer: '提高层', analysisTags: ['现代文阅读优势'], className: '初一（2）班' },
  { id: 33, name: '沈涛', layer: '提高层', analysisTags: ['语文基础稳定'], className: '初一（2）班' },
  { id: 34, name: '卢萍', layer: '提高层', analysisTags: ['现代文阅读优势'], className: '初一（2）班' },
  { id: 35, name: '韦强', layer: '提高层', analysisTags: ['语文基础稳定'], className: '初一（2）班' },
  { id: 36, name: '崔娟', layer: '提高层', analysisTags: ['现代文阅读优势'], className: '初一（2）班' },
  { id: 37, name: '薛斌', layer: '提高层', analysisTags: ['语文基础稳定'], className: '初一（2）班' },
  { id: 38, name: '史洁', layer: '提高层', analysisTags: ['现代文阅读优势'], className: '初一（2）班' },
  { id: 39, name: '段鹏', layer: '提高层', analysisTags: ['语文基础稳定'], className: '初一（2）班' },
  { id: 40, name: '龚慧', layer: '提高层', analysisTags: ['现代文阅读优势'], className: '初一（2）班' },

  // 拓展层学生 (10人)
  { id: 41, name: '李华', layer: '拓展层', analysisTags: ['文学素养高'], className: '初一（2）班' },
  { id: 42, name: '赵敏', layer: '拓展层', analysisTags: ['语言运用灵活'], className: '初一（2）班' },
  { id: 43, name: '钱七', layer: '拓展层', analysisTags: ['综合能力强'], className: '初一（2）班' },
  { id: 44, name: '郑怡', layer: '拓展层', analysisTags: ['古诗文理解佳'], className: '初一（2）班' },
  { id: 45, name: '杨云', layer: '拓展层', analysisTags: ['文学素养高'], className: '初一（2）班' },
  { id: 46, name: '袁博', layer: '拓展层', analysisTags: ['语言运用灵活'], className: '初一（2）班' },
  { id: 47, name: '夏雨', layer: '拓展层', analysisTags: ['综合能力强'], className: '初一（2）班' },
  { id: 48, name: '方宇', layer: '拓展层', analysisTags: ['古诗文理解佳'], className: '初一（2）班' },
  { id: 49, name: '石磊', layer: '拓展层', analysisTags: ['文学素养高'], className: '初一（2）班' },
  { id: 50, name: '白雪', layer: '拓展层', analysisTags: ['语言运用灵活'], className: '初一（2）班' }
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
    title: `${targetLayer}语文练习题集`,
    targetLayer,
    createTime: new Date().toLocaleString(),
    questions: [
      // 选择题 1
      {
        id: 1,
        type: '选择题',
        content: '下列词语中加点字的读音完全正确的一组是：',
        options: [
          '确凿(záo) 菜畦(qí) 桑椹(shèn)',
          '人迹罕至(hǎn) 人声鼎沸(dǐng)',
          '攒成(cuán) 脑髓(suǐ) 收敛(liǎn)',
          '骊歌(lí) 花圃(pǔ) 叮嘱(zhǔ)'
        ],
        answer: 'D',
        difficulty: '简单',
        analysis: 'A项"桑椹"应读"shèn"；B项"人声鼎沸"的"鼎"应读"dǐng"；C项"攒成"应读"cuán"；D项读音全部正确',
        knowledgePoints: ['字音识记', '汉字读音']
      },
      // 选择题 2
      {
        id: 2,
        type: '选择题',
        content: '下列句子中没有语病的一项是：',
        options: [
          '通过这次活动，使我们受到了深刻的教育',
          '我们要防止不再犯类似的错误',
          '春天的公园里到处都是美丽的花朵',
          '他的学习成绩在班级里是最优秀的'
        ],
        answer: 'C',
        difficulty: '中等',
        analysis: 'A项缺少主语；B项"防止"和"不再"重复否定；D项"成绩"不能说"优秀"，应该说"优异"；C项语句通顺，没有语病',
        knowledgePoints: ['病句辨析', '语法知识']
      },
      // 填空题 1
      {
        id: 3,
        type: '填空题',
        content: '《从百草园到三味书屋》的作者是_____，原名_____，字_____。',
        answer: '鲁迅，周树人，豫才',
        difficulty: '简单',
        analysis: '鲁迅是中国现代文学的奠基人，原名周树人，字豫才，浙江绍兴人',
        knowledgePoints: ['文学常识', '作家作品']
      },
      // 填空题 2
      {
        id: 4,
        type: '填空题',
        content: '"_____，志在千里"出自曹操的《龟虽寿》。',
        answer: '老骥伏枥',
        difficulty: '中等',
        analysis: '这句诗表达了曹操虽然年老，但仍有远大志向的豪迈情怀。"骥"指良马，"枥"指马槽',
        knowledgePoints: ['古诗文默写', '文言文']
      },
      // 填空题 3
      {
        id: 5,
        type: '填空题',
        content: '修辞手法"_____"是把物当作人来写，赋予物以人的思想感情和行为。',
        answer: '拟人',
        difficulty: '简单',
        analysis: '拟人是一种常见的修辞手法，通过把事物人格化，使文章更加生动形象',
        knowledgePoints: ['修辞手法', '语言文字运用']
      },
      // 判断题 1
      {
        id: 6,
        type: '判断题',
        content: '《论语》是记录孔子及其弟子言行的语录体散文集。',
        answer: '正确',
        difficulty: '简单',
        analysis: '《论语》确实是记录孔子及其弟子言行的语录体散文集，是儒家经典著作之一',
        knowledgePoints: ['文学常识', '古代文化']
      },
      // 判断题 2
      {
        id: 7,
        type: '判断题',
        content: '散文的特点是"形散神不散"，即结构可以灵活多样，但主题思想必须明确集中。',
        answer: '正确',
        difficulty: '中等',
        analysis: '"形散神不散"是散文的重要特征，"形散"指结构自由，"神不散"指主题集中',
        knowledgePoints: ['文体知识', '散文特点']
      },
      // 判断题 3
      {
        id: 8,
        type: '判断题',
        content: '律诗共八句，分为首联、颔联、颈联、尾联，其中颔联和颈联必须对仗。',
        answer: '正确',
        difficulty: '中等',
        analysis: '律诗的格律要求严格，八句分为四联，中间两联（颔联、颈联）必须对仗工整',
        knowledgePoints: ['诗歌知识', '古代文学']
      },
      // 综合题
      {
        id: 9,
        type: '综合题',
        content:
          '阅读下面的文言文片段，回答问题：\n\n子曰："学而时习之，不亦说乎？有朋自远方来，不亦乐乎？人不知而不愠，不亦君子乎？"\n\n(1) 解释下列加点词的含义：①说 ②愠\n(2) 翻译句子："人不知而不愠，不亦君子乎？"\n(3) 这段话体现了孔子怎样的教育思想？',
        answer:
          '(1)①说：通"悦"，高兴 ②愠：生气，发怒 (2)别人不了解自己却不生气，不也是君子的品格吗？ (3)体现了孔子注重学习方法、重视友谊交往、强调个人修养的教育思想',
        difficulty: '困难',
        analysis: '这是《论语》开篇第一章，从学习、交友、修养三个方面阐述了君子应有的品格和态度',
        knowledgePoints: ['文言文阅读', '古代文化', '孔子思想']
      }
    ]
  };
}
