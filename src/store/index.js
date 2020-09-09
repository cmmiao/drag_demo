import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
const store = new Vuex.Store({
    state:{ // 全局访问的state对象 
         // 选中组件的top值
        centerData: [], // 中间区域的数据
        selectCom: [], // 选中的组件
        rightData: [],
        // home:undefined,

    },
    getters: { // 实时监听state值得变化(相当于vue的computed)
        getSelectTop: state => {
            return state.selectTop;
        }

    },
    mutations: { // 更改state的地方
    
        setSelectCom(state,curCom){
            state.selectCom[0] = curCom; 
            // console.log('mutaions---当前选中的组件',curCom)
        },
         
        deleteSelCom(state,{start=0 , length = 1} = {start:0,length:1}){
            state.selectCom.splice(start , length)
        },
        // getSelectCom(state,curCom){
        //    state.selectCom = curCom; 
        // },
       
    },
    actions: { // 触发更改

    }
})
export default store;