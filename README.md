# Growing Web 示例仓库

- 使用单体仓库组织不同的库、网站栏目、库，实现多人协作
- 使用 [turbo](https://turborepo.org) 来管理单体仓库的构建命令。它通过分析包的依赖关系并来启动构建顺序、通过按需构建、并行构建提高性能
- 使用 pnpm 代替 npm。提高单体仓库的依赖安装性能、使用它的 `workspace:*` 协议而不是具体的版本号来引用本地包
- 使用 Web Router 与 Web Widget 将应用容器化，让应用具备集成与优化空间
- 使用 wpm 生成导入映射
- 使用导入映射垫片解决浏览器兼容问题
- 使用 Web Builder 构建应用（非必需项）

## 开发

初始化：

```bash
pnpm install
pnpm run build
```

运行根服务器：

```bash
cd root-config
pnpm run dev
```

## 目录

Growing Web 没有约定目录组织方式，当前示例仓库的目录设计：

- `apps/*` 微应用包
- `packages/*` 公共依赖包
- `root-config` 站点根配置包
- `layout` 页面布局包
