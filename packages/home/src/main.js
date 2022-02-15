import Vue from 'vue';
import App from './App.vue';
//import localStyleProvider from './injection.css?style-provider';
import allStyleProvider from 'virtual:style-provider?query=~/*';

export default (props) => {
  let appElement;
  let vueInstance;
  //let localStyle;
  let allStyle;

  return {
    async bootstrap({ container }) {
      //localStyle = localStyleProvider(container);
      allStyle = allStyleProvider(container);
    },
    async mount(props) {
      // const rootNode = props.container.getRootNode();
      // const inShadowDOM = rootNode instanceof ShadowRoot;
      appElement = document.createElement('div');

      props.container.appendChild(appElement);
      allStyle.mount();
      //localStyle.mount();

      vueInstance = new Vue({
        el: appElement,
        data() {
          return { ...props.data };
        },
        provide: {
          host: props,
        },
        render(h) {
          return h(App);
        },
        // shadowRoot: inShadowDOM ? props.container : undefined
      });
    },
    async update(props) {
      for (const key in props.data) {
          vueInstance[key] = props.data[key];
      }
    },
    async unmount({ container }) {
      vueInstance.$destroy();
      allStyle.unmount();
      //localStyle.unmount();
      container.innerHTML = '';
    },
  };
};
