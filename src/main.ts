import { createApp } from 'vue';
import App from './App.vue';
import './index.css';
import { pinia } from './pinia';
import router from './router/router';

const app = createApp(App);

app.directive('click-outside', {
  created(element, binding) {
    element.clickOutsideEvent = (event: { target: any }) => {
      //  check that click was outside the el and his children
      if (!(element === event.target || element.contains(event.target))) {
        binding.value(); // run callback function
      }
    };
    document.body.addEventListener('click', element.clickOutsideEvent);
  },
  unmounted(element) {
    document.body.removeEventListener('click', element.clickOutsideEvent);
  },
});

app.use(router);
app.use(pinia);
app.mount('#app');
