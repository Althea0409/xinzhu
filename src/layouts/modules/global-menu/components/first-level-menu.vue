<script setup lang="ts">
/** 一级菜单组件 用于显示全局导航菜单的第一级菜单项，支持暗色/亮色主题切换， 支持菜单折叠展开，并能根据主题色自动计算选中状态的背景色 */

import { computed } from 'vue';
import { createReusableTemplate } from '@vueuse/core';
import { SimpleScrollbar } from '@sa/materials';
import { transformColorWithOpacity } from '@sa/color';

defineOptions({
  name: 'FirstLevelMenu'
});

/**
 * 组件属性定义
 *
 * @property {App.Global.Menu[]} menus - 菜单项数组
 * @property {string} [activeMenuKey] - 当前激活的菜单项的key
 * @property {boolean} [inverted] - 是否为反色模式（深色背景）
 * @property {boolean} [siderCollapse] - 侧边栏是否折叠
 * @property {boolean} [darkMode] - 是否为暗黑模式
 * @property {string} themeColor - 主题色
 */
interface Props {
  menus: App.Global.Menu[];
  activeMenuKey?: string;
  inverted?: boolean;
  siderCollapse?: boolean;
  darkMode?: boolean;
  themeColor: string;
}

const props = defineProps<Props>();

/**
 * 组件事件定义
 *
 * @event select - 选择菜单项时触发
 * @event toggleSiderCollapse - 切换侧边栏折叠状态时触发
 */
interface Emits {
  (e: 'select', menu: App.Global.Menu): boolean;
  (e: 'toggleSiderCollapse'): void;
}

const emit = defineEmits<Emits>();

/**
 * 混合菜单项属性定义
 *
 * @property {string} label - 菜单项标签文本
 * @property {Component} icon - 菜单项图标组件
 * @property {boolean} active - 是否为激活状态
 * @property {boolean} [isMini] - 是否为迷你模式（折叠状态）
 */
interface MixMenuItemProps {
  label: App.Global.Menu['label'];
  icon: App.Global.Menu['icon'];
  active: boolean;
  isMini?: boolean;
}

// 创建可重用的菜单项模板组件
const [DefineMixMenuItem, MixMenuItem] = createReusableTemplate<MixMenuItemProps>();

/** 计算选中菜单项的背景色 根据是否为暗黑模式和主题色，计算出合适的背景色 */
const selectedBgColor = computed(() => {
  const { darkMode, themeColor } = props;

  const light = transformColorWithOpacity(themeColor, 0.1, '#ffffff');
  const dark = transformColorWithOpacity(themeColor, 0.3, '#000000');

  return darkMode ? dark : light;
});

/**
 * 处理混合菜单项点击事件
 *
 * @param {App.Global.Menu} menu - 被点击的菜单项
 */
function handleClickMixMenu(menu: App.Global.Menu) {
  emit('select', menu);
}

/** 切换侧边栏折叠状态 */
function toggleSiderCollapse() {
  emit('toggleSiderCollapse');
}
</script>

<template>
  <!-- define component: MixMenuItem -->
  <DefineMixMenuItem v-slot="{ label, icon, active, isMini }">
    <div
      class="mx-2px mb-6px flex-col-center cursor-pointer rounded-8px bg-transparent px-4px py-8px transition-300 hover:bg-[rgb(0,0,0,0.08)]"
      :class="{
        'text-primary selected-mix-menu': active,
        'text-white:65 hover:text-white': inverted,
        '!text-white !bg-primary': active && inverted
      }"
    >
      <component :is="icon" :class="[isMini ? 'text-icon-small' : 'text-icon-large']" />
      <p
        class="w-full ellipsis-text text-center text-12px transition-height-300"
        :class="[isMini ? 'h-0 pt-0' : 'h-20px pt-4px']"
      >
        {{ label }}
      </p>
    </div>
  </DefineMixMenuItem>
  <!-- define component end: MixMenuItem -->

  <div class="h-full flex-col-stretch flex-1-hidden">
    <slot></slot>
    <SimpleScrollbar>
      <MixMenuItem
        v-for="menu in menus"
        :key="menu.key"
        :label="menu.label"
        :icon="menu.icon"
        :active="menu.key === activeMenuKey"
        :is-mini="siderCollapse"
        @click="handleClickMixMenu(menu)"
      />
    </SimpleScrollbar>
    <MenuToggler
      arrow-icon
      :collapsed="siderCollapse"
      :z-index="99"
      :class="{ 'text-white:88 !hover:text-white': inverted }"
      @click="toggleSiderCollapse"
    />
  </div>
</template>

<style scoped>
.selected-mix-menu {
  background-color: v-bind(selectedBgColor);
}
</style>
