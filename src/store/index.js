import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
const store = new Vuex.Store({
    state:{ // 全局访问的state对象 
        selectTop: 0, // 选中组件的top值

    },
    getters: { // 实时监听state值得变化(相当于vue的computed)
        getSelectTop: state => {
            return state.selectTop;
        }

    },
    mutations: { // 更改state的地方
        updateSelectTop(state,curId){
            
        }
    },
    actions: { // 触发更改

    }
})
export default store;