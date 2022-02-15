export default () => ({
  mount({ container }) {
    container.innerHTML = `
      <main>
        <h1>Welcome</h1>
        <h5>to your growing-web root config!</h5>
        <p>此页面根据你的根配置呈现。</p>
        <h2>下一步</h2>
        <h3>1. 添加共享依赖</h3>
        <ul>
          <li>找到导入映射文件 web-importmap.json</li>
          <li>添加你需要的共享依赖，例如：
  <pre><code>
  "react": "https://cdn.jsdelivr.net/npm/react@16.13.1/umd/react.production.min.js",
  "react-dom": "https://cdn.jsdelivr.net/npm/react-dom@16.13.1/umd/react-dom.production.min.js"    
  </code></pre>      
          </li>
        </ul>
        <h3>2. 创建你的微应用</h3>
        <ul>
          <li>复制当前 package 上一级目录中的 example-* 目录（例如复制 example-vue 至 news），并且成功运行它</li>
          <li>返回到 root-config 并使用你的项目名称更新导入映射 web-importmap.json（建议使用应用程序的 package.json 名称字段）</li>
          <li>编辑 web-routes.json 并且添加你的应用程序名称</li>
          <li>删除当前示例欢迎页面代码</li>
          <li>重新启动开发服务器</li>
        </ul>
        <p>在此之后，你将看不到这个欢迎页面，而看到的是你刚创建的应用程序！</p>
      </main>
      <style>
        main { width: 750px; margin: auto; }
      </style>
    `;
  },
  unmount({ container }) {
    container.innerHTML = '';
  }
});