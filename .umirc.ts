import { defineConfig } from 'umi';

export default defineConfig({
  fastRefresh: {},
  publicPath: '/search-tool/',
  title: '🔍搜索工具',
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [{ path: '/', component: '@/pages/index' }],
});
