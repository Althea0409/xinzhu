<script setup lang="ts">
import { computed } from 'vue';
import type { SubjectInfo } from '../types';

interface Props {
  /** 学科信息 */
  subject: SubjectInfo;
}

const props = defineProps<Props>();

/** 根据学科名称返回背景颜色类名 */
const bgColorClass = computed(() => {
  const nameMap = {
    // 阅读类 - 蓝色系
    现代文阅读: 'bg-blue-100',
    散文阅读: 'bg-blue-200',
    说明文阅读: 'bg-blue-300',
    阅读技巧: 'bg-sky-100',
    课外阅读: 'bg-cyan-100',

    // 文言文类 - 紫色系
    文言文基础: 'bg-purple-100',
    文言文翻译: 'bg-purple-200',
    古文理解: 'bg-violet-100',

    // 诗词类 - 粉色系
    诗歌鉴赏: 'bg-pink-100',
    古诗词背诵: 'bg-pink-200',
    诗词赏析: 'bg-rose-100',

    // 写作类 - 绿色系
    作文写作: 'bg-green-100',
    基础写作: 'bg-green-200',
    记叙文写作: 'bg-emerald-100',
    写作技法: 'bg-lime-100',

    // 语言基础类 - 橙色系
    字词积累: 'bg-orange-100',
    语法基础: 'bg-orange-200',
    词汇运用: 'bg-amber-100',
    语法应用: 'bg-yellow-100',
    语言文字运用: 'bg-orange-300',
    语言表达: 'bg-yellow-200',

    // 文学类 - 红色系
    文学常识: 'bg-red-100',
    文学鉴赏: 'bg-red-200',

    // 修辞表达类 - 青色系
    修辞手法: 'bg-teal-100',
    口语交际: 'bg-teal-200',

    // 议论文类 - 灰色系
    议论文基础: 'bg-slate-100'
  };

  return nameMap[props.subject.name as keyof typeof nameMap] || 'bg-gray-100';
});

/** 根据学科名称返回文本颜色类名 */
const textColorClass = computed(() => {
  const nameMap = {
    // 阅读类 - 蓝色系
    现代文阅读: 'text-blue-600',
    散文阅读: 'text-blue-700',
    说明文阅读: 'text-blue-800',
    阅读技巧: 'text-sky-600',
    课外阅读: 'text-cyan-600',

    // 文言文类 - 紫色系
    文言文基础: 'text-purple-600',
    文言文翻译: 'text-purple-700',
    古文理解: 'text-violet-600',

    // 诗词类 - 粉色系
    诗歌鉴赏: 'text-pink-600',
    古诗词背诵: 'text-pink-700',
    诗词赏析: 'text-rose-600',

    // 写作类 - 绿色系
    作文写作: 'text-green-600',
    基础写作: 'text-green-700',
    记叙文写作: 'text-emerald-600',
    写作技法: 'text-lime-600',

    // 语言基础类 - 橙色系
    字词积累: 'text-orange-600',
    语法基础: 'text-orange-700',
    词汇运用: 'text-amber-600',
    语法应用: 'text-yellow-600',
    语言文字运用: 'text-orange-800',
    语言表达: 'text-yellow-700',

    // 文学类 - 红色系
    文学常识: 'text-red-600',
    文学鉴赏: 'text-red-700',

    // 修辞表达类 - 青色系
    修辞手法: 'text-teal-600',
    口语交际: 'text-teal-700',

    // 议论文类 - 灰色系
    议论文基础: 'text-slate-600'
  };

  return nameMap[props.subject.name as keyof typeof nameMap] || 'text-gray-600';
});
</script>

<template>
  <span class="inline-block rounded-full px-2 py-0.5 text-xs font-medium" :class="[bgColorClass, textColorClass]">
    {{ subject.name }}
  </span>
</template>

<style scoped>
/* 使用UnoCSS声明式样式 */
</style>
