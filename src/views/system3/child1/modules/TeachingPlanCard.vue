<script setup lang="ts">
import { computed } from 'vue';
import { Icon } from '@iconify/vue';

interface Subject {
  id: string;
  title: string;
  description: string;
}

interface TeachingPlan {
  id: string;
  title: string;
  school: string;
  rating: number;
  downloads: number;
  subjects: Subject[];
}

defineOptions({
  name: 'TeachingPlanCard'
});

const props = defineProps<{
  plan: TeachingPlan;
}>();

const emit = defineEmits<{
  (e: 'view', id: string): void;
  (e: 'clone', id: string): void;
}>();

// 处理卡片点击，触发查看详情事件
function handleClick() {
  emit('view', props.plan.id);
}

function handleClone(event: Event) {
  event.stopPropagation(); // 阻止冒泡，防止触发卡片的点击事件
  emit('clone', props.plan.id);
}

// 根据评分生成星级数组
const ratingStars = computed(() => {
  const fullStars = Math.floor(props.plan.rating);
  const hasHalfStar = props.plan.rating % 1 >= 0.5;
  const stars = [];

  for (let i = 0; i < 5; i += 1) {
    if (i < fullStars) {
      stars.push('full');
    } else if (i === fullStars && hasHalfStar) {
      stars.push('half');
    } else {
      stars.push('empty');
    }
  }

  return stars;
});
</script>

<template>
  <div
    class="group h-full flex flex-col cursor-pointer overflow-hidden border border-gray-200 rounded-lg bg-white shadow-sm transition-all duration-300 hover:border-indigo-200 hover:shadow-md"
    @click="handleClick"
  >
    <div class="relative h-40 w-full from-indigo-50 to-blue-50 bg-gradient-to-br">
      <!-- 背景图片占位 -->
      <div class="absolute left-0 top-0 h-full w-full bg-[url('/pattern-dots.svg')] opacity-10"></div>

      <!-- 标题和标签区域 -->
      <div class="absolute bottom-0 left-0 w-full p-3">
        <div class="mb-1 flex flex-wrap gap-1">
          <span class="inline-block rounded-full bg-indigo-100 px-2 py-0.5 text-xs text-indigo-700">
            {{ props.plan.subjects[0]?.title }}
          </span>
          <span class="inline-block rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-700">数学</span>
        </div>
        <h3 class="line-clamp-2 rounded-md bg-white/80 p-2 text-base text-gray-800 font-bold backdrop-blur-sm">
          {{ plan.title }}
        </h3>
      </div>
    </div>

    <div class="flex flex-col flex-1 p-4">
      <div class="mb-3 flex items-center justify-between">
        <span class="text-sm text-gray-700 font-medium">{{ plan.school }}</span>
        <div class="flex items-center">
          <div class="mr-1 flex">
            <Icon
              v-for="(star, index) in ratingStars"
              :key="index"
              :icon="star === 'full' ? 'carbon:star-filled' : star === 'half' ? 'carbon:star-half' : 'carbon:star'"
              class="text-sm text-yellow-500"
            />
          </div>
          <span class="text-xs font-medium">{{ plan.rating }}</span>
        </div>
      </div>

      <div class="line-clamp-2 mb-5 text-xs text-gray-600">教学目标：{{ plan.subjects[0]?.description }}</div>

      <div class="mt-auto px-3 py-3">
        <div class="flex items-center justify-between">
          <div class="text-xs text-gray-500">
            <span class="flex items-center">
              <Icon icon="carbon:download" class="mr-1" />
              {{ plan.downloads }}次下载
            </span>
          </div>

          <NButton
            class="ml-auto flex items-center justify-center rounded-full text-xs"
            type="primary"
            secondary
            @click="handleClone"
          >
            <template #icon>
              <Icon icon="carbon:copy" class="mr-1" />
            </template>
            二次创作
          </NButton>
        </div>
      </div>
    </div>
  </div>
</template>
