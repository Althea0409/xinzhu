<!-- eslint-disable vue/no-unused-properties -->
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import * as echarts from 'echarts';
import type { EChartsOption } from 'echarts';

interface RadarData {
  value: number[];
  name: string;
}

const props = defineProps<{
  title?: string;
  categories?: string[];
  data?: RadarData[];
}>();

const chartRef = ref<HTMLElement | null>(null);
let chartInstance: echarts.ECharts | null = null;

onMounted(() => {
  if (chartRef.value) {
    chartInstance = echarts.init(chartRef.value);
    updateChart();
    window.addEventListener('resize', () => {
      chartInstance?.resize();
    });
  }
});

function updateChart() {
  if (!chartInstance) return;

  const categories = props.categories || ['工具应用', '数据思维', '创新实践', '创新实践', '数据思维'];
  const data = props.data || [
    {
      value: [90, 70, 80, 85, 75],
      name: '能力值'
    }
  ];

  const option: EChartsOption = {
    radar: {
      indicator: categories.map(name => ({ name, max: 100 })),
      shape: 'polygon',
      splitNumber: 5,
      center: ['50%', '55%'],
      radius: '65%',
      axisName: {
        color: '#333',
        fontSize: 12
      },
      splitArea: {
        areaStyle: {
          color: ['rgba(238, 242, 255, 0.3)', 'rgba(223, 230, 253, 0.3)']
        }
      },
      axisLine: {
        lineStyle: {
          color: 'rgba(200, 210, 250, 0.5)'
        }
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(200, 210, 250, 0.5)'
        }
      }
    },
    series: [
      {
        name: '能力值',
        type: 'radar',
        data: data.map(item => ({
          value: item.value,
          name: item.name,
          itemStyle: {
            color: '#5073fa'
          },
          areaStyle: {
            color: 'rgba(80, 115, 250, 0.4)'
          },
          lineStyle: {
            width: 1
          },
          symbol: 'circle',
          symbolSize: 4
        }))
      }
    ]
  };

  chartInstance.setOption(option);
}
</script>

<template>
  <div ref="chartRef" class="h-60 w-full"></div>
</template>

<style scoped>
/* 额外样式可以在这里添加 */
</style>
