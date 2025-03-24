/* 默认主题设置 */
export const themeSettings: App.Theme.ThemeSetting = {
  themeScheme: 'light', // 主题模式：亮色
  grayscale: false, // 灰度模式
  colourWeakness: false, // 色弱模式
  recommendColor: true, // 应用推荐算法的颜色
  themeColor: '#2B46FE', // 主题色 #605CE5
  otherColor: {
    // 其他颜色
    info: '#2B46FE', // 信息色
    success: '#52c41a', // 成功色
    warning: '#faad14', // 警告色
    error: '#f5222d' // 错误色
  },
  isInfoFollowPrimary: true, // 信息色是否跟随主题色
  resetCacheStrategy: 'close', // 缓存重置策略
  layout: {
    // 布局设置
    mode: 'vertical', // 布局模式：垂直
    scrollMode: 'content', // 滚动模式
    reverseHorizontalMix: false // 水平混合反转
  },
  page: {
    // 页面设置
    animate: true, // 开启动画
    animateMode: 'fade-slide' // 动画模式
  },
  header: {
    // 头部设置
    height: 56, // 高度
    breadcrumb: {
      // 面包屑
      visible: true, // 显示
      showIcon: true // 显示图标
    },
    multilingual: {
      // 多语言
      visible: false // 显示
    }
  },
  tab: {
    // 标签页设置
    visible: false, // 显示
    cache: true, // 缓存
    height: 44, // 高度

    mode: 'chrome' // 模式
  },
  fixedHeaderAndTab: true, // 固定头部和标签页
  sider: {
    // 侧边栏设置
    inverted: true, // 反转色
    width: 200, // 宽度 210
    collapsedWidth: 64, // 收缩宽度
    mixWidth: 90, // 混合宽度
    mixCollapsedWidth: 64, // 混合收缩宽度
    mixChildMenuWidth: 200 // 混合子菜单宽度
  },
  footer: {
    // 页脚设置
    visible: false, // 显示
    fixed: false, // 固定
    height: 48, // 高度
    right: true // 右对齐
  },
  watermark: {
    // 水印设置
    visible: false, // 显示
    text: 'EduBanboo' // 文本
  },
  tokens: {
    // 主题令牌
    light: {
      // 亮色主题
      colors: {
        // 颜色
        container: 'rgb(255, 255, 255)', // 容器色 244, 247, 252
        layout: 'rgb(244, 247, 252)', // 布局色 235,242,254  242, 246, 253
        inverted: 'rgb(234, 242, 255)', // 反转色 233, 240, 255
        'base-text': 'rgb(31, 31, 31)' // 基础文本色
      },
      boxShadow: {
        // 阴影
        header: '0 1px 2px rgb(0, 21, 41, 0.08)',
        sider: '2px 0 8px 0 rgb(29, 35, 41, 0.05)',
        tab: '0 1px 2px rgb(0, 21, 41, 0.08)'
      }
    },
    dark: {
      // 暗色主题
      colors: {
        // 颜色
        container: 'rgb(28, 28, 28)', // 容器色
        layout: 'rgb(18, 18, 18)', // 布局色
        'base-text': 'rgb(224, 224, 224)' // 基础文本色
      }
    }
  }
};

/**
 * 覆盖主题设置
 *
 * 如果发布新版本，使用 `overrideThemeSettings` 来覆盖某些主题设置
 */
export const overrideThemeSettings: Partial<App.Theme.ThemeSetting> = {};
