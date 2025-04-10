<!-- eslint-disable vue/no-static-inline-styles -->
/** * 全局 Logo 组件 * 显示系统标志和标题，并包含指向首页的链接 */
<script setup lang="ts">
// 导入国际化翻译函数
import { $t } from '@/locales';

// 定义组件名称，便于开发调试
defineOptions({
  name: 'GlobalLogo'
});

/** 组件属性接口定义 */
interface Props {
  /** 是否显示标题文本 */
  showTitle?: boolean;
}

// 设置属性默认值
withDefaults(defineProps<Props>(), {
  // 默认显示标题
  showTitle: true
});
</script>

<template>
  <!-- 
    使用 RouterLink 组件创建指向首页的链接
    w-full: 宽度100%
    flex-center: 居中显示内容
    nowrap-hidden: 防止内容溢出包装
  -->
  <RouterLink to="/" class="w-full flex-center nowrap-hidden">
    <!-- 显示系统 Logo，设置颜色和大小 -->
    <SystemLogo class="custom-blue-color text-41px" />
    <!-- 
      显示系统标题（当 showTitle 为 true 时）
      pl-8px: 左内边距 8px
      text-20px: 字体大小 20px
      font-bold: 粗体文字
      transition: 过渡动画效果
    -->
    <h2 v-show="showTitle" class="custom-blue-color pl-8px text-21px font-bold transition duration-300 ease-in-out">
      {{ $t('system.title') }}
    </h2>
  </RouterLink>
</template>

<style scoped>
h2 {
  /* 调整字间距增强可读性 */
  letter-spacing: 0.8px;
  /* 注释掉的样式：padding-left: 6px; 调整左侧间距 */
}

.custom-blue-color {
  color: #2b46fe;
}
</style>
