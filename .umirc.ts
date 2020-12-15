import { defineConfig } from 'umi';

export default defineConfig({
  fastRefresh: {},
  publicPath: '/search-tool/',
  title: '🔍搜索工具',
  hash: true,
  history: { type: 'hash' },
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [{ path: '/', component: '@/pages/index' }],
});
