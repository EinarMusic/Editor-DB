import { createApp } from 'vue'
import App from './App.vue'
import './samples/node-api'

import router from "./router";
import store from "./store";

const app = createApp(App);

app.use(router);
app.use(store);

app.mount('#app')
  .$nextTick(() => {
    postMessage({ payload: 'removeLoading' }, '*')
  })
