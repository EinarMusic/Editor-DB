import { createRouter, createWebHistory } from "vue-router";

import Home from "../views/Home.vue";
import Editor from "../views/Editor.vue";
import Merge from "../views/Merge.vue";
import Editing from "../views/Editing.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: Home
    },
    {
      path: "/editor",
      component: Editor
    },
    {
      path: "/merge",
      component: Merge
    },
    {
      path: "/editing",
      component: Editing
    }
  ]
});

export default router;
