import { createApp } from 'vue';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import axios from 'axios';
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import '@/assets/styles/style.css';
import formatNumber from '@/api/FormatNumber';
// 실제 데이터를 json으로 주고받기 위해 무언가 요청할 때 사용할 수 있도록 설정
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const app = createApp(App);

app.use(store).use(router).use(VueToast).mount('#app');

// axios 설정
app.config.globalProperties.axios = axios;
app.config.productionTip = false;

// 숫자(원화 형식 적용: 3자리수 콤마)
app.config.globalProperties.formatNumber = formatNumber;


