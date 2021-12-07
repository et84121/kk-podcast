import { createApp } from 'vue';
import App from './App.vue';
import '@purge-icons/generated';
import { createPinia } from 'pinia';
import './styles/base.css';

// Router
import { Router } from '/@/router';

// WindiCSS
import 'virtual:windi.css';
import 'virtual:windi-devtools';

const app = createApp(App);

app.use(createPinia());

app.use(Router);

app.mount('#app');
