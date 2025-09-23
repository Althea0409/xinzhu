## 代码详细解读

### 1. 修改系统标题

找到路径：

```
src/
  locales/
    langs/
      zh-cn.ts
      ...
```

在 `zh-cn.ts` 文件中定位到以下的代码：

```ts
const local: App.I18n.Schema = {
  system: {
    title: 'System Title' // 于此修改系统标题
  }
  // ...
};
```

将 `'System Title'` 修改为想要的标题即可。

---

### 2. 修改用户名和密码

找到路径：

```
src/
  views/
    _builtin/
      login/
        modules/
          pwd-login.vue
          ...
```

在 `pwd-login.vue` 文件中定位到以下的代码：

```ts
const model: FormModel = reactive({
  userName: 'Admin', // 于此修改默认用户名
  password: '123456' // 于此修改默认密码
});
```

将 `'Admin'` 和 `'123456'` 修改为想要的用户名和密码即可。

**补充**：在本文件下块代码中，可以修改更多的用户名和密码：

```ts
const accounts = computed<Account[]>(() => [
  {
    key: 'super',
    label: $t('page.login.pwdLogin.superAdmin'),
    userName: 'Super',
    password: '123456'
  },
  {
    key: 'admin',
    label: $t('page.login.pwdLogin.admin'),
    userName: 'Admin',
    password: '123456'
  },
  {
    key: 'user',
    label: $t('page.login.pwdLogin.user'),
    userName: 'User',
    password: '123456'
  }
]);
```

---

### 3. 修改主题配置

找到路径：

```
src/
  theme/
    settings.ts
    ...
```

在 `settings.ts` 文件中定位到以下的代码：

```ts
export const themeSettings: App.Theme.ThemeSetting = {
  themeScheme: 'light',
  grayscale: false,
  colourWeakness: false,
  recommendColor: true,
  themeColor: '#3b82f6',// 于此修改默认主题色
  // ...
};
```

将 `'#3b82f6'` 修改为想要的主题色即可。

其他主题配置也可以在此文件中，根据需要修改。

---

### 4. 创建路由

在终端执行 `pnpm gen-route` 命令，可以快速创建路由文件

**路由名称的命名规则**

- 一级路由: `demo`, `demo-page`, `route1`

	> 名称为小写加连字符`-`的形式

- 二级路由: `demo2_child`, `demo2-page_child`, `route2_child`

	> 路由的层级用下划线`_`分隔，两边仍然遵守一级路由的命名规则

- 三级及三级以上路由: `demo3_child_child`, `demo3-page_child_child_child`

---

### 5. 修改侧边栏菜单名称

找到路径：

```
src/
  locales/
    langs/
      zh-cn.ts
      ...
```

在 `zh-cn.ts` 文件中定位到以下的代码：

```ts
route: {
    login: '登录',
    403: '无权限',
    404: '页面不存在',
    500: '服务器错误',
    'iframe-page': '外链页面',
    home: '首页',
    system1: '系统 1',
    system2: '系统 2',
    system3: '系统 3',
    system4: '系统 4',
    system5: '系统 5',
    system6: '系统 6',
    chatbot: '对话'
  },
```

按照格式  `路由名: '想改成的名称'`  修改即可。

---

### 6. 修改侧边菜单栏顺序

找到路径：

```
src/
  router/
    elegant/
      routes.ts
      ...
```

在 `routes.ts` 文件中定位到以下的代码：

```ts
export const generatedRoutes: GeneratedRoute[] = [
   // ...
  {
    name: 'chatbot',
    path: '/chatbot',
    component: 'layout.base$view.chatbot',
    meta: {
      title: 'chatbot',
      i18nKey: 'route.chatbot',
      icon: 'mdi:robot-excited-outline',
      order: 7 // 修改这里
    }
  },
  {
    name: 'home',
    path: '/home',
    component: 'layout.base$view.home',
    meta: {
      title: 'home',
      i18nKey: 'route.home',
      icon: 'mdi:monitor-dashboard',
      order: 0 // 修改这里
    }
  },
  // ...
]
```

添加并修改 `order` 的属性值，即可修改顺序（从小到大 --> 从上到下）

---

### 7. 自定义菜单样式

找到路径：

```
src/
  store/
    modules/
      theme/
        shared.ts
        ...
```

在 `shared.ts` 文件中定位到以下的代码：

```ts
export function getNaiveTheme(colors: App.Theme.ThemeColor, recommended = false) {
  const { primary: colorLoading } = colors;

  const theme: GlobalThemeOverrides = {
    // ...
    Menu: {
      borderRadius: '8px', // 定义主题样式中的圆角半径
      itemTextColorInverted: '#474667', // 定义未选中状态下的项目文本颜色（反转主题）
      itemTextColorHoverInverted: '#474667', // 定义鼠标悬停状态下的项目文本颜色（反转主题）
      itemIconColorInverted: '#474667', // 定义未选中状态下的项目图标颜色（反转主题）
      itemIconColorHoverInverted: '#474667', // 定义鼠标悬停状态下的项目图标颜色（反转主题）
      itemColorHoverInverted: '#DCE2FC' // 定义鼠标悬停状态下的项目背景颜色（反转主题）
    }
  };

  return theme;
```

添加并修改 `Menu` 的属性值，即可修改侧边栏菜单样式

---

### 8. 提交代码

```
pnpm commit 提交代码时，会自动生成commit信息，并提交到远程仓库
```

提交规范：

```
feat:       新功能
feat-wip:   开发中的功能（如未完成的功能代码）
fix:        Bug修复
docs:       仅文档更改
typo:       拼写错误（代码/文档的校正）
style:      代码样式调整（不影响逻辑的修改）
refactor:   代码重构（非功能/非缺陷的修改）
perf:       性能改进
optimize:   代码优化
test:       测试相关修改
build:      构建系统修改
ci:         持续集成配置修改
chore:      其他非源码修改（如脚本、配置等杂项）
revert:     撤销提交
```

```
projects     项目          (项目全局配置/基建等)
packages     依赖包        (第三方包/依赖管理)  
components   组件          (可复用的UI组件)
hooks        钩子          (自定义 Hook 函数) 
utils        工具库        (通用工具函数/类)
types        类型声明      (TypeScript 类型定义)
styles       样式          (CSS/SCSS 等样式文件)
deps         项目依赖      (依赖项的增减/升级)
release      发布          (版本发布相关操作)
other        其他          (未明确分类的变更)
```

---

### 9. 删除右上角按钮

找到路径：

```
src/
  layouts/
    modules/
      global-header/
        index.vue
        ...
```

在 `index.vue` 文件中定位到以下的代码：

```html
<template>
...
    <!-- 全屏按钮 -->
    <FullScreen v-if="!appStore.isMobile" :full="isFullscreen" @click="toggle" />
    <!-- 切换语言按钮 -->
    <LangSwitch :lang="appStore.locale" :lang-options="appStore.localeOptions" @change-lang="appStore.changeLocale" />
    <!-- 主题配置按钮 -->
    <ThemeSchemaSwitch
    :theme-schema="themeStore.themeScheme"
    :is-dark="themeStore.darkMode"
    @switch="themeStore.toggleThemeScheme"
    />
...
</template>
```

注释或删除 `<LangSwitch>` 和 `<ThemeSchemaSwitch>` 等标签即可。

---

### 10. 替换logo

（1）找到路径：

```
public/
  favicon.svg
```

把新的Logo命名为 `favicon.svg` 并替换即可

（2）找到路径：

```
src/
  assets/
    svg-icon/
        logo.svg
```

把新的Logo命名为 `logo.svg` 并替换即可

---

### 11. xxx

找到路径：

```
src/
  layouts/
    modules/
      global-header/
        index.vue
        ...
```

在 `index.vue` 文件中定位到以下的代码：

```html
<template>
...
    <!-- 全屏按钮 -->
    <FullScreen v-if="!appStore.isMobile" :full="isFullscreen" @click="toggle" />
    <!-- 切换语言按钮 -->
    <LangSwitch :lang="appStore.locale" :lang-options="appStore.localeOptions" @change-lang="appStore.changeLocale" />
    <!-- 主题配置按钮 -->
    <ThemeSchemaSwitch
    :theme-schema="themeStore.themeScheme"
    :is-dark="themeStore.darkMode"
    @switch="themeStore.toggleThemeScheme"
    />
...
</template>
```

注释或删除 `<LangSwitch>` 和 `<ThemeSchemaSwitch>` 等标签即可。

---

