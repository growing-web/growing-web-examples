export default () => ({
  mount({ container }) {
    container.innerHTML = `
      <main>
        <h1>Welcome</h1>
        <p>此页面根据你的根配置呈现。</p>
        <h2>下一步</h2>
        <h3>1. 添加共享依赖</h3>
        <ul>
          <li>找到 index.html <code>importmap</code></li>
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
          <li>返回到 root，将应用的包名添加到 package.json 的 dependencies 中，这样应用的修改将会自动触发根配置的构建</li>
          <li>修改 site.cofnig.json，在 routes 中为你的应用设置路由</li>
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