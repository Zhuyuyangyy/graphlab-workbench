# GraphLab Workbench

工程化前端项目，用于展示“多源异构数据驱动岗位和能力图谱构建与动态演化分析”的研究方案。

## 技术栈

- Vite
- React
- TypeScript
- Vitest
- Playwright

## 运行

```bash
npm install
npm run dev
```

## 验证

```bash
npm run test
npm run build
npm run test:e2e
```

## 项目结构

- `src/data`：岗位、证据源、图谱节点、趋势数据
- `src/lib`：纯分析函数
- `src/hooks`：工作台状态模型
- `src/components`：工程化 UI 组件
- `src/styles`：产品级工作台样式
- `tests/unit`：分析模型单元测试
- `tests/e2e`：浏览器交互与响应式验证
