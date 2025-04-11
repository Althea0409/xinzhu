<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { EChartsOption } from 'echarts';
import { useElementSize } from '@vueuse/core';

defineOptions({
  name: 'ClassComparisonChart'
});

interface ClassData {
  /** 班级编号 */
  id: string;
  /** 班级名称 */
  name: string;
  /** 学生人数 */
  studentCount: number;
  /** 平均成绩 */
  averageScore: number;
  /** 出勤率 */
  attendanceRate: number;
  /** 作业完成率 */
  homeworkRate: number;
  /** 平均正确率 */
  averageCorrectRate: number;
}

// 模拟班级数据
const classData = ref<ClassData[]>([
  {
    id: '1',
    name: '班级1',
    studentCount: 48,
    averageScore: 72,
    attendanceRate: 95,
    homeworkRate: 80,
    averageCorrectRate: 76
  },
  {
    id: '2',
    name: '班级2',
    studentCount: 45,
    averageScore: 80,
    attendanceRate: 90,
    homeworkRate: 75,
    averageCorrectRate: 70
  },
  {
    id: '3',
    name: '班级3',
    studentCount: 50,
    averageScore: 68,
    attendanceRate: 92,
    homeworkRate: 85,
    averageCorrectRate: 72
  },
  {
    id: '4',
    name: '班级4',
    studentCount: 52,
    averageScore: 85,
    attendanceRate: 98,
    homeworkRate: 88,
    averageCorrectRate: 82
  }
]);

// 切换班级显示
const showClassRef = ref([true, true, true, true]);

function toggleClassVisibility(index: number) {
  showClassRef.value[index] = !showClassRef.value[index];
  setupChart();
}

const chartRef = ref<HTMLElement | null>(null);
// 使用下划线前缀，表示有意未使用的变量，以符合ESLint规则
const { width: _width, height: _height } = useElementSize(chartRef);
let chartInstance: echarts.ECharts | null = null;

const chartCategories = ['学生人数', '平均成绩', '出勤率', '作业完成率', '平均正确率'];
const chartColors = ['#4361ee', '#ff9f43', '#28c76f', '#00cfdd'];

function createChartOption(): EChartsOption {
  const series = classData.value
    .filter((_, index) => showClassRef.value[index])
    .map((item, index) => {
      return {
        name: item.name,
        type: 'bar' as const, // 使用类型断言指定类型
        barMaxWidth: 30,
        data: [item.studentCount, item.averageScore, item.attendanceRate, item.homeworkRate, item.averageCorrectRate],
        itemStyle: {
          color: chartColors[index % chartColors.length]
        }
      };
    });

  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: classData.value.map(c => c.name),
      bottom: 0,
      icon: 'rect',
      itemWidth: 14,
      itemHeight: 14,
      textStyle: {
        fontSize: 12
      }
    },
    grid: {
      left: '3%',
      right: '3%',
      top: '3%',
      bottom: 40,
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: chartCategories,
        axisTick: {
          alignWithLabel: true
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        max: 100,
        splitLine: {
          lineStyle: {
            type: 'dashed'
          }
        }
      }
    ],
    series
  };
}

function setupChart() {
  if (!chartRef.value) return;

  if (!chartInstance) {
    // 动态导入echarts，减小初始加载包体积
    import('echarts').then(echarts => {
      if (!chartRef.value) return;
      chartInstance = echarts.init(chartRef.value);
      const option = createChartOption();
      chartInstance.setOption(option);
    });
  } else {
    const option = createChartOption();
    chartInstance.setOption(option);
  }
}

onMounted(() => {
  setupChart();

  // 监听窗口大小变化
  window.addEventListener('resize', () => {
    chartInstance?.resize();
  });
});
</script>

<template>
  <div class="rounded-md bg-white p-4 shadow-sm">
    <div class="mb-4 flex items-center justify-between">
      <div class="flex items-center space-x-2">
        <div class="h-4 w-1 rounded bg-blue-500"></div>
        <h3 class="font-bold">班级对比</h3>
      </div>
      <div>
        <NButton size="small" class="rounded-full text-xs" secondary type="primary">添加</NButton>
      </div>
    </div>

    <div class="mb-3 flex flex-wrap gap-2">
      <template v-for="(item, index) in classData" :key="item.id">
        <div
          :class="{ 'opacity-50': !showClassRef[index] }"
          class="cursor-pointer rounded-full px-2 py-1 text-xs text-white"
          :style="{ backgroundColor: chartColors[index % chartColors.length] }"
          @click="toggleClassVisibility(index)"
        >
          {{ item.name }}
        </div>
      </template>
    </div>

    <div ref="chartRef" class="h-64 w-full"></div>
  </div>
</template>

<style scoped>
/* 使用UnoCSS的方式，无需额外CSS */
</style>
