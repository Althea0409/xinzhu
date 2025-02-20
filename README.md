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

### 7. xxx

