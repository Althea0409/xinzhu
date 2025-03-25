<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import type { RouteKey } from '@elegant-router/types';
import { SimpleScrollbar } from '@sa/materials';
import { GLOBAL_HEADER_MENU_ID, GLOBAL_SIDER_MENU_ID } from '@/constants/app';
import { useAppStore } from '@/store/modules/app';
import { useThemeStore } from '@/store/modules/theme';
import { useRouteStore } from '@/store/modules/route';
import { useRouterPush } from '@/hooks/common/router';
import { useMenu, useMixMenuContext } from '../../../context';

// 定义组件名称
defineOptions({
  name: 'ReversedHorizontalMixMenu'
});

// 获取路由实例和各种store
const route = useRoute();
const appStore = useAppStore();
const themeStore = useThemeStore();
const routeStore = useRouteStore();
const { routerPushByKeyWithMetaQuery } = useRouterPush();

// 从混合菜单上下文中获取必要的状态和方法
const {
  firstLevelMenus,
  childLevelMenus,
  activeFirstLevelMenuKey,
  setActiveFirstLevelMenuKey,
  isActiveFirstLevelMenuHasChildren
} = useMixMenuContext();

// 获取当前选中的菜单项
const { selectedKey } = useMenu();

// 处理混合菜单的选择事件
function handleSelectMixMenu(key: RouteKey) {
  // 设置当前激活的一级菜单
  setActiveFirstLevelMenuKey(key);

  // 如果选中的一级菜单没有子菜单，则直接跳转到对应路由
  if (!isActiveFirstLevelMenuHasChildren.value) {
    routerPushByKeyWithMetaQuery(key);
  }
}

// 用于存储展开的菜单项key
const expandedKeys = ref<string[]>([]);

// 更新展开的菜单项
function updateExpandedKeys() {
  // 如果侧边栏折叠或没有选中的菜单项，清空展开项
  if (appStore.siderCollapse || !selectedKey.value) {
    expandedKeys.value = [];
    return;
  }
  // 获取当前选中菜单项的路径作为展开项
  expandedKeys.value = routeStore.getSelectedMenuKeyPath(selectedKey.value);
}

// 监听路由变化，更新展开的菜单项
watch(
  () => route.name,
  () => {
    updateExpandedKeys();
  },
  { immediate: true }
);
</script>

<template>
  <!-- 渲染水平菜单到页面头部 -->
  <Teleport :to="`#${GLOBAL_HEADER_MENU_ID}`">
    <NMenu
      mode="horizontal"
      :value="activeFirstLevelMenuKey"
      :options="firstLevelMenus"
      :indent="18"
      responsive
      @update:value="handleSelectMixMenu"
    />
  </Teleport>
  <!-- 渲染垂直菜单到侧边栏 -->
  <Teleport :to="`#${GLOBAL_SIDER_MENU_ID}`">
    <SimpleScrollbar>
      <NMenu
        v-model:expanded-keys="expandedKeys"
        mode="vertical"
        :value="selectedKey"
        :collapsed="appStore.siderCollapse"
        :collapsed-width="themeStore.sider.collapsedWidth"
        :collapsed-icon-size="22"
        :options="childLevelMenus"
        :indent="18"
        @update:value="routerPushByKeyWithMetaQuery"
      />
    </SimpleScrollbar>
  </Teleport>
</template>

<style scoped></style>
