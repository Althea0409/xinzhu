<script setup lang="ts">
import { computed, ref } from 'vue';
import { NCard, NTabPane, NTabs, NTag } from 'naive-ui';

interface MetricItem {
  key: string;
  label: string;
  value: number; // 0-100
  trend: 'up' | 'down' | 'stable';
}

interface PortraitSection {
  title: string;
  metrics: MetricItem[];
}

interface PortraitDataMap {
  lesson: PortraitSection[];
  week: PortraitSection[];
  semester: PortraitSection[];
}

const activeKey = ref<'lesson' | 'week' | 'semester'>('lesson');

const portraitData = ref<PortraitDataMap>({
  lesson: [
    {
      title: '课堂表现',
      metrics: [
        { key: 'engagement', label: '互动活跃度', value: 86, trend: 'up' },
        { key: 'attention', label: '专注度', value: 78, trend: 'stable' },
        { key: 'homework', label: '作业完成率', value: 90, trend: 'up' }
      ]
    },
    {
      title: '教师行为',
      metrics: [
        { key: 'pacing', label: '节奏把控', value: 82, trend: 'up' },
        { key: 'tool', label: '工具使用', value: 88, trend: 'up' },
        { key: 'feedback', label: '课后反馈', value: 75, trend: 'stable' }
      ]
    }
  ],
  week: [
    {
      title: '课堂表现',
      metrics: [
        { key: 'engagement', label: '互动活跃度', value: 84, trend: 'stable' },
        { key: 'attention', label: '专注度', value: 80, trend: 'up' },
        { key: 'homework', label: '作业完成率', value: 92, trend: 'up' }
      ]
    },
    {
      title: '教师行为',
      metrics: [
        { key: 'pacing', label: '节奏把控', value: 83, trend: 'up' },
        { key: 'tool', label: '工具使用', value: 87, trend: 'stable' },
        { key: 'feedback', label: '课后反馈', value: 78, trend: 'up' }
      ]
    }
  ],
  semester: [
    {
      title: '课堂表现',
      metrics: [
        { key: 'engagement', label: '互动活跃度', value: 88, trend: 'up' },
        { key: 'attention', label: '专注度', value: 82, trend: 'up' },
        { key: 'homework', label: '作业完成率', value: 93, trend: 'up' }
      ]
    },
    {
      title: '教师行为',
      metrics: [
        { key: 'pacing', label: '节奏把控', value: 85, trend: 'up' },
        { key: 'tool', label: '工具使用', value: 89, trend: 'up' },
        { key: 'feedback', label: '课后反馈', value: 81, trend: 'up' }
      ]
    }
  ]
});

const sections = computed(() => portraitData.value[activeKey.value]);

function getTrendType(trend: MetricItem['trend']) {
  if (trend === 'up') return 'success' as const;
  if (trend === 'down') return 'error' as const;
  return 'info' as const;
}

function getProgressStatus(val: number) {
  if (val >= 85) return 'success' as const;
  if (val >= 75) return 'warning' as const;
  return 'error' as const;
}
</script>

<template>
  <div class="rounded-lg bg-white p-4 shadow-sm">
    <div class="mb-4 flex items-center">
      <div class="mr-2 h-5 w-1 rounded bg-sky-500"></div>
      <h2 class="text-lg text-sky-600 font-bold">教师画像</h2>
      <div class="ml-auto">
        <NTabs v-model:value="activeKey" type="line" size="small">
          <NTabPane name="lesson" tab="每节课" />
          <NTabPane name="week" tab="每周" />
          <NTabPane name="semester" tab="每学期" />
        </NTabs>
      </div>
    </div>

    <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
      <NCard v-for="(sec, idx) in sections" :key="idx" size="small" class="rounded-md">
        <template #header>
          <div class="flex items-center">
            <span class="mr-2 inline-block h-3 w-3 rounded-full bg-sky-400"></span>
            <span class="text-base text-gray-800 font-semibold">{{ sec.title }}</span>
          </div>
        </template>
        <div class="space-y-4">
          <div v-for="m in sec.metrics" :key="m.key" class="flex items-center">
            <div class="w-28 text-gray-700">{{ m.label }}</div>
            <div class="flex-1">
              <NProgress type="line" :percentage="m.value" :status="getProgressStatus(m.value)" :height="8" />
            </div>
            <div class="ml-3 w-12 text-right text-sm text-gray-700">{{ m.value }}%</div>
            <NTag class="ml-3" size="small" :type="getTrendType(m.trend)" round>
              {{ m.trend === 'up' ? '提升' : m.trend === 'down' ? '下降' : '稳定' }}
            </NTag>
          </div>
        </div>
      </NCard>
    </div>
  </div>
</template>

<style scoped>
/* 轻量化阴影与卡片间距 */
.shadow-sm {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
}
</style>
