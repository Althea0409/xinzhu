/// <reference types="vite/client" />
/// <reference types="vue/macros-global" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<Record<string, any>, Record<string, any>, any>;
  export default component;
}

declare module 'naive-ui' {
  import type { DefineComponent } from 'vue';

  // 组件相关
  const NButton: DefineComponent<any, any, any>;
  const NCard: DefineComponent<
    {
      title?: string;
      bordered?: boolean;
      size?: 'small' | 'medium' | 'large';
      segmented?: boolean | { content?: boolean; footer?: boolean };
      [key: string]: any;
    },
    {
      'header-extra'?: any;
      default?: any;
      footer?: any;
      action?: any;
      cover?: any;
      [key: string]: any;
    },
    any
  >;
  const NCollapse: DefineComponent<any, any, any>;
  const NCollapseItem: DefineComponent<any, any, any>;
  const NConfigProvider: DefineComponent<any, any, any>;
  const NDialogProvider: DefineComponent<any, any, any>;
  const NDivider: DefineComponent<any, any, any>;
  const NDropdown: DefineComponent<any, any, any>;
  const NIcon: DefineComponent<any, any, any>;
  const NInput: DefineComponent<any, any, any>;
  const NList: DefineComponent<any, any, any>;
  const NListItem: DefineComponent<any, any, any>;
  const NLoadingBarProvider: DefineComponent<any, any, any>;
  const NMessageProvider: DefineComponent<any, any, any>;
  const NModal: DefineComponent<any, any, any>;
  const NNotificationProvider: DefineComponent<any, any, any>;
  const NRadio: DefineComponent<any, any, any>;
  const NRadioGroup: DefineComponent<any, any, any>;
  const NSelect: DefineComponent<any, any, any>;
  const NSpace: DefineComponent<any, any, any>;
  const NSpin: DefineComponent<any, any, any>;
  const NTabPane: DefineComponent<any, any, any>;
  const NTabs: DefineComponent<any, any, any>;
  const NTag: DefineComponent<any, any, any>;
  const NWatermark: DefineComponent<any, any, any>;

  // hooks相关
  function useDialog(): any;
  function useLoadingBar(): any;
  function useMessage(): any;
  function useNotification(): any;

  // 主题相关
  const darkTheme: any;
  const dateEnUS: any;
  const dateZhCN: any;
  const enUS: any;
  const zhCN: any;

  // 类型相关
  type PopoverPlacement =
    | 'top'
    | 'top-start'
    | 'top-end'
    | 'right'
    | 'right-start'
    | 'right-end'
    | 'bottom'
    | 'bottom-start'
    | 'bottom-end'
    | 'left'
    | 'left-start'
    | 'left-end';
  type FormInst = any;
  type PaginationProps = any;
  type NDateLocale = any;
  type NLocale = any;
  type GlobalThemeOverrides = any;
  type WatermarkProps = any;

  // 导出所有声明
  export {
    NButton,
    NCard,
    NCollapse,
    NCollapseItem,
    NConfigProvider,
    NDialogProvider,
    NDivider,
    NDropdown,
    NIcon,
    NInput,
    NList,
    NListItem,
    NLoadingBarProvider,
    NMessageProvider,
    NModal,
    NNotificationProvider,
    NRadio,
    NRadioGroup,
    NSelect,
    NSpace,
    NSpin,
    NTabPane,
    NTabs,
    NTag,
    NWatermark,
    useDialog,
    useLoadingBar,
    useMessage,
    useNotification,
    darkTheme,
    dateEnUS,
    dateZhCN,
    enUS,
    zhCN,
    PopoverPlacement,
    FormInst,
    PaginationProps,
    NDateLocale,
    NLocale,
    GlobalThemeOverrides,
    WatermarkProps
  };
}
