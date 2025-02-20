<script setup lang="ts">
// 导入必要的依赖
import { computed } from 'vue';
import { useAppStore } from '@/store/modules/app';
// 导入各个模块组件
import HeaderBanner from './modules/header-banner.vue';
import CardData from './modules/card-data.vue';
import LineChart from './modules/line-chart.vue';
import PieChart from './modules/pie-chart.vue';
import ProjectNews from './modules/project-news.vue';
import CreativityBanner from './modules/creativity-banner.vue';

// 初始化应用状态管理
const appStore = useAppStore();

// 计算间隔：移动端为0，桌面端为16
const gap = computed(() => (appStore.isMobile ? 0 : 16));
</script>

<template>
  <NSpace vertical :size="16">
    <!-- 页面主要内容布局 -->
    <!-- 头部横幅 -->
    <HeaderBanner />

    <!-- 卡片数据 -->
    <CardData />

    <!-- 第一行图表布局 -->
    <NGrid :x-gap="gap" :y-gap="16" responsive="screen" item-responsive>
      <!-- 折线图，占据 14/24 宽度 -->
      <NGi span="24 s:24 m:14">
        <NCard :bordered="false" class="card-wrapper">
          <LineChart />
        </NCard>
      </NGi>
      <!-- 饼图，占据 10/24 宽度 -->
      <NGi span="24 s:24 m:10">
        <NCard :bordered="false" class="card-wrapper">
          <PieChart />
        </NCard>
      </NGi>
    </NGrid>

    <!-- 第二行布局 -->
    <NGrid :x-gap="gap" :y-gap="16" responsive="screen" item-responsive>
      <!-- 项目新闻，占据 14/24 宽度 -->
      <NGi span="24 s:24 m:14">
        <ProjectNews />
      </NGi>
      <!-- 创意横幅，占据 10/24 宽度 -->
      <NGi span="24 s:24 m:10">
        <CreativityBanner />
      </NGi>
    </NGrid>
  </NSpace>
</template>

<style scoped></style>
