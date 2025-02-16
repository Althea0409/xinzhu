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
### 4. 修改