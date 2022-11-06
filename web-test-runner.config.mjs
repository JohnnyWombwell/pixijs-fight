import { esbuildPlugin } from '@web/dev-server-esbuild';

export default {
  plugins: [esbuildPlugin({ ts: true })],
  nodeResolve: true,
  files: ['src/**/*.test.{ts,js}', 'src/**/*.spec.{ts,js}'],
};
