<script setup lang="ts">
import { Icon } from '@iconify/vue';

defineOptions({
  name: 'AbilityRadar'
});

const abilityData = [
  { name: '教学设计', value: 85 },
  { name: '课堂管理', value: 72 },
  { name: '学生互动', value: 90 },
  { name: '评估技能', value: 68 },
  { name: '资源使用', value: 78 }
];
</script>

<template>
  <div class="ability-radar mt-5 rounded-lg bg-white p-5 shadow-sm transition-all hover:shadow-md">
    <div class="mb-4 flex items-center justify-between">
      <h3 class="text-base text-gray-800 font-medium">个人能力图谱</h3>
      <button class="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600">
        <Icon icon="carbon:information" class="text-base" />
      </button>
    </div>

    <div class="radar-content flex items-center justify-center">
      <div class="radar-chart relative h-52 w-52 rounded-full from-[#2B46FE0D] to-gray-50 bg-gradient-to-br p-4">
        <!-- 图表中心点 -->
        <div
          class="absolute left-1/2 top-1/2 h-2 w-2 rounded-full bg-[#2B46FE] -translate-x-1/2 -translate-y-1/2"
        ></div>

        <!-- 图表网格线 -->
        <div
          class="absolute left-1/2 top-1/2 h-[90%] w-[90%] border border-gray-200 rounded-full opacity-60 -translate-x-1/2 -translate-y-1/2"
        ></div>
        <div
          class="absolute left-1/2 top-1/2 h-[70%] w-[70%] border border-gray-200 rounded-full opacity-60 -translate-x-1/2 -translate-y-1/2"
        ></div>
        <div
          class="absolute left-1/2 top-1/2 h-[50%] w-[50%] border border-gray-200 rounded-full opacity-60 -translate-x-1/2 -translate-y-1/2"
        ></div>
        <div
          class="absolute left-1/2 top-1/2 h-[30%] w-[30%] border border-gray-200 rounded-full opacity-60 -translate-x-1/2 -translate-y-1/2"
        ></div>

        <!-- 能力点 -->
        <div
          v-for="(ability, index) in abilityData"
          :key="index"
          class="ability-point absolute h-8 w-8 flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
          :style="{
            left: `${50 + (45 * Math.cos(index * ((2 * Math.PI) / abilityData.length) - Math.PI / 2) * ability.value) / 100}%`,
            top: `${50 + (45 * Math.sin(index * ((2 * Math.PI) / abilityData.length) - Math.PI / 2) * ability.value) / 100}%`
          }"
        >
          <div class="h-3 w-3 rounded-full bg-[#2B46FE] shadow-sm"></div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-3 mt-4 gap-2">
      <div v-for="(ability, index) in abilityData.slice(0, 3)" :key="index" class="text-center">
        <div class="text-xs text-gray-600 font-medium">{{ ability.name }}</div>
        <div class="mt-1 text-sm text-[#2B46FE] font-semibold">{{ ability.value }}%</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ability-radar {
  position: relative;
}

.radar-chart {
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.02);
}

.ability-point {
  transition: all 0.3s ease;
}

.ability-point::after {
  content: '';
  position: absolute;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background: rgba(43, 70, 254, 0.15);
  z-index: -1;
}
</style>
