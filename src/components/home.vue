<template>
<div class="dp-box" @click="closeControlPanel">
    <Header :prop="0"></Header>
    <div class="dp-container">
        <div class="dp-left">
          <div class="dp-left-title">通用字段</div>
          <div class="dp-wrapper">
              <div class="dp-left-item" v-for="(item,index) in setData" :key="index" draggable="true"  @dragstart.stop="dragItem(item,$event)">
                  <span class="iconfont" :class="item.icon"  ></span>
                  <span >{{item.name}}</span>
              </div>
          </div>  
        </div>
        <!--   -->
        <div class="dp-center" @drop.prevent="drop($event)" @dragover.prevent>
            <div class="dp-control-panel" v-if="isSelect" >
                <div class="dp-control-box" :style="{top:selectTop+'px'}" >
                    <i class="iconfont icon-add" @click.stop.prevent="addItem"></i>
                    <i class="iconfont icon-del" @click.stop.prevent="delItem"></i>
                </div>
                
            </div>
            <div class="dp-center-lists" ref="centerBox">
                <!-- <keep-alive> -->
                    <component class="drop-item editor_com" v-for="val in centerData" :key="val.props.id" :is="val.com" ref="centerItem" :prop="{...val.props,controlId:selectId}" :curData="getCurdata" :curSelect="getCurselect"
                    v-dragging="{ item: val, list: centerData, group: 'val'  }">
                    </component>
                <!-- </keep-alive> -->
                <!-- <component class="drop-item" v-for="(val,i) in centerData"  :key="i" :id="val.id" :is="val.com" :prop='val.props'   :openPane="openPane" @curData=dragCenter></component> -->
            </div>
        </div>
        <div class="dp-right">
            <div class="dp-set-box" ref="setBox" v-show="centerData.length>0&&isSelect">
                <div class="dp-set-title">{{curSet}}</div>
                <div class="dp-set-lists">
                    <component class="set-item" v-for="(val,i) in rightData"  :key="i" :is="val.com" :prop="val.props"></component>
                </div>

            </div>

        </div>
    </div>
</div>
    
</template>
<script>
import Header from './header.vue';
import {mapState,mapMutations} from 'vuex';
export default {
    components:{ Header },
    data(){
        return {
            setData:[
                {
                    "icon":"icon-image",
                    "title": "img",
                    "name":"图片",
                    "setTitle": "图片设置",
                    "style":{
                        "width": "100%",
                        "height": "200px",
                        "left": "0px",
                        "top": "0px",
                    },
                    "data":[{
                        type:"/set/changeImg.vue",
                        props:{
                            "title": "图片设置",
                            "value":"https://image.pre-zuma.com/image/1260446859901519919.jpg" ,
                        }
                    },{
                        type:"/set/changeStyle.vue",
                        props:{
                            "title": "组件宽度",
                            "value": "长",
                             "liData": ["短","中","长"]
                        }
                    }
                    ]
                },{
                    "icon":"icon-video",
                    "title": "video",
                    "name":"视频",
                    "setTitle": "视频设置",
                    "style":{
                        "width": "100%",
                        "height": "300px",
                        "left": "0px",
                        "top": "0px",
                    },
                    "data":[{
                        type:"/set/changeImg.vue",
                        props:{
                            "title": "视频设置",
                            "value":"https://www.runoob.com/try/demo_source/movie.mp4" ,
                        }
                    },{
                        type:"/set/changeStyle.vue",
                        props:{
                            "title": "组件宽度",
                            "value": "长",
                            "liData": ["短","中","长"]
                        }
                    }
                    ]
                },{
                    "icon":"icon-slide",
                    "title": "slide",
                    "name":"轮播",
                    "style":{
                        "width": "200px",
                        "height": "200px",
                        "left": "0px",
                        "top": "0px",
                    }
                },{
                    "icon":"icon-swiper",
                    "title": "swiper",
                    "name":"轮播",
                    "style":{
                        "width": "200px",
                        "height": "200px",
                        "left": "0px",
                        "top": "0px",
                    }
                },{
                    "icon":"icon-swiper",
                    "title": "swiper",
                    "name":"轮播",
                    "style":{
                        "width": "200px",
                        "height": "200px",
                        "left": "0px",
                        "top": "0px",
                    }
                }



            ],
            currentData: null, // 存储拖拽时的数据 只在拖拽时使用
            centerData:[], // 存储拖放下的数据
            rightData:[], // 右侧设置项数据
            idLists:[], // 存储拖放下的数据的id
            selfX: 0,
            selfY: 0,
            curID: '',// 当前拖动元素的id
            curSet: '', // 设置项标题
            isSelect: false, // 中央区域的组件未被选中
            selectId: '',
            selectTop: 0,
        }
    },
    
    computed:{
     ...mapState(['selectCom','setInfo']),
        // centerData() {
        //     return this.$store.state.centerData
        // }
        // currentData() {
        //     return this.$store.state.selectCom[0]
        // }
    },
    methods:{
        // 拖拽使用的插件  npm install awe-dnd --save
        ...mapMutations(['setSelectCom']),
        getID(length){
            return Number(Math.random().toString().substr(3,length) + Date.now()).toString(36);
        },
        dragItem(item,e){
            const data = JSON.parse(JSON.stringify(item))
            data.id = this.getID(3)
            this.currentData = data;
            // if(this.currentData) return;
            // this.currentData = JSON.parse(JSON.stringify(item)); // 复制item赋值给currentData
            // this.currentData.id= this.getID(3);
            // this.$store.commit("deleteSelCom") 
            // this.$store.commit("setSelectCom" ,data) 
            e.dataTransfer.setData('text',e.target.innerHTML);
        },
        
        drop(e){
            e.dataTransfer.getData('text');
            let currentData = this.currentData;
            //  根据id判断centerData里面是否含有currentData
            this.isSelect = true;
            this.selectId = currentData.id;
            if(!this.idLists.includes(currentData.id)){ // 初次添加到中央区域
                const {img,video}={img:'/img/img01.vue',video:'/video/video01.vue'};
                let type = '';
                switch(currentData.title){
                    case 'img':
                        type = img;
                        break;
                    case 'video': 
                        // type = '/video/video01.vue';
                        type = video;
                        break;   
                }
                const component = ()=> import('@/components'+type)
                this.centerData.push({
                    com: component,
                    props:this.currentData});
                this.idLists.push(currentData.id); //
                let heightData = 0;
                this.centerData.map(val =>{
                    heightData += parseInt(val.props.style.height);
                })
                this.selectTop= heightData + 15;
                this.$store.commit('setSelectCom',this.currentData);
            } 
            this.getCurSet(this.currentData);
            // this.$store.commit('setSelectCom',undefined);
            this.currentData = null;

        },
        getCurSet(data){
            this.rightData = [];
            this.curSet = data.setTitle;
            // 遍历设置项,添加到rightData数据里面
            let curSet = data.data;
            curSet.map((val)=>{
                let setCom = ()=>import('@/components'+val.type)
                this.rightData.push({
                    com: setCom,
                    props: val.props
                })
            })
        },
        getCurdata(data){
            // 拖拽排序得问题
            this.currentData = data;
            this.isSelect = true;
        },
        getCurselect(data){
            // 记录点击时当前的下标
            // console.log('选中组件----组件点击id', this.currentData)
            this.isSelect = true;
            this.currentData = data;
            this.selectId = data.id;
            let selectIndex = this.getRealIndex(data.id);
            let selectHeight = parseInt(data.style.height);
            this.$nextTick(()=>{
                let curBox = this.$refs.centerItem[selectIndex];
                let offsetTop = curBox.$el.offsetTop;
                this.selectTop = offsetTop + selectHeight + 15;
                this.getCurSet(data);
            })
        },

        
        addItem(){
            let selectIndex = this.getRealIndex(this.currentData.id);
            let curCom = this.centerData[selectIndex];
            let selectData = JSON.parse(JSON.stringify(curCom.props));
            selectData.id= this.getID(3);
            let selectCom = curCom.com;
            this.centerData.splice(selectIndex+1,0,{com:selectCom,props:selectData});
            this.idLists.splice(selectIndex+1,0,selectData.id);
            this.$store.state.centerData = this.centerData
        },
        delItem(){
            this.isSelect = false;
            let selectIndex = this.getRealIndex(this.currentData.id);
            this.centerData.splice(selectIndex,1);
            this.idLists.splice(selectIndex,1);
            this.$store.state.centerData = this.centerData
        },
        // 获取选中元素的真实下标
        getRealIndex(id){
            let realIndex = 0;
            this.idLists.map((val,i)=>{
                if(val==id){ realIndex = i; }
            })
            return realIndex;
        },
        // 点击非中间区域组件,隐藏增加删除按钮
        closeControlPanel(e){
            let curBox = this.$refs.centerBox;
            let setBox = this.$refs.setBox;
            // console.log(e.target,'点击事件','jjjj',curBox)
            if(this.isSelect){
                if(!curBox.contains(e.target) && !setBox.contains(e.target)){
                    this.isSelect = false;
                    this.selectId = '';
                }
            }

        }
        
    },
    created(){},
    mounted(){
        this.$dragging.$on('dragged', (value) => {
            console.log('拖拽开始---mounted---选中组件',value)
            this.currentData = value.draged.props;
            this.selectId = this.currentData.id;

        })
        this.$dragging.$on('dragend', (value) => {
                // 再次拖拽放下的 要计算this.selectTop
                console.log('打印当前的数组', this.centerData,this.currentData,)
                this.idLists = [];
                this.centerData.map(val => {
                    this.idLists.push(val.props.id);
                })
                
                let selectIndex = this.getRealIndex(this.currentData.id);
                let selectHeight = parseInt(this.currentData.style.height);
                let offsetTop = 0;
                this.centerData.map((val,i)=>{
                    if(i<=selectIndex){
                        offsetTop += parseInt(val.props.style.height);
                    }else{
                        return ;
                    }
                })
                this.selectTop = offsetTop + 15;
               console.log(offsetTop,'距离上边线的距离',this.selectTop,'下标',selectIndex,selectHeight);
        })
        // this.$store.state.home = this
        window.home = this
    },
    watch:{
        
            
      
    }
}
</script>
<style scoped>
@import './css/home.css';
</style>    