import { createApp } from 'vue';
import App from './App.vue';
import '@purge-icons/generated';

import './styles/base.css';

// Router
import { Router } from '/@/router';

// WindiCSS
import 'virtual:windi.css';
import 'virtual:windi-devtools';

// pinia
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

// podcastPlayer
import { podcastPlayerPlugin } from './plugin/PodcastPlayer';

// vue-use motion
import { MotionPlugin } from '@vueuse/motion';

const app = createApp(App);

app.use(createPinia().use(piniaPluginPersistedstate));

app.use(Router);

app.use(podcastPlayerPlugin);

app.use(MotionPlugin);

app.mount('#app');
