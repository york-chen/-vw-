import Vue from 'vue'
import App from '@/app.vue'
import router from '@/routes'
import store from './store'
import '@/app.scss'
import '@/config'
import tool from './libs/tool'
import Vant from '@/vendor/vant'
import viewportUnitsBuggyfill from 'viewport-units-buggyfill'
import filters from '@/libs/filters'
Vue.use(Vant);
Vue.prototype.$tool = tool;
filters(Vue);
window.onload = function () {
    viewportUnitsBuggyfill.init({
        hacks: viewportUnitsBuggyfill.hacks
    });
}
new Vue({
    router,
    store,
    el: '#app',
    components: {App},
    template: '<App/>'
});
