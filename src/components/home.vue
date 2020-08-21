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
        <div class="dp-center" @drop.stop.prevent="drop($event)" @dragover.prevent=dragover($event)>
            <div class="dp-control-panel" v-if="isSelect" >
                <div class="dp-control-box" :style="{top:selectTop+'px'}" >
                    <i class="iconfont icon-add" @click.stop.prevent="addItem"></i>
                    <i class="iconfont icon-del" @click.stop.prevent="delItem"></i>
                </div>
                
            </div>
            <div class="dp-center-lists" ref="centerBox">
                <!-- <component class="drop-item" v-for="(val,i) in centerData"  :key="i" :id="val.id" :is="val.com" :prop='val.props'   :openPane="openPane" @curData=dragCenter></component> -->
                <component class="drop-item editor_com" draggable="true" v-for="(val,i) in centerData"  :key="i" :is="val.com" ref="centerItem" :prop="{...val.props,controlId:selectId,controlTop:selectTop}" :curData="getCurdata" :curSelect="getCurselect"></component>
            </div>
                
        </div>
        <div class="dp-right">
            <div class="dp-set-box" v-show="centerData.length>0&&isSelect">
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
import Header from './header.vue'
export default {
    components:{ Header },
    data(){
        return {
            setData:[
                {
                    "icon":"icon-image",
                    "title": "img",
                    "name":"图片",
                    "style":{
                        "width": "100%",
                        "height": "200px",
                        "left": "0px",
                        "top": "0px",
                    },
                    "data":{
                        "imgsrc":"https://image.pre-zuma.com/image/1260446859901519919.jpg" ,
                        "setTitle": "图片设置",
                        "setLink" :"/set/changeImg.vue" 
                    }
                },{
                    "icon":"icon-video",
                    "title": "video",
                    "name":"视频",
                    "style":{
                        "width": "100%",
                        "height": "300px",
                        "left": "0px",
                        "top": "0px",
                    },
                    "data":{
                        "videosrc":"https://www.runoob.com/try/demo_source/movie.mp4" ,
                        "setTitle": "视频设置",
                        "setLink" :"/set/changeVideo.vue" 
                    }
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
            heightData: 0, // 存储拖拽出来数据的高度总和
            selfX: 0,
            selfY: 0,
            curID: '',// 当前拖动元素的id
            curSet: '', // 设置项标题
            isSelect: false, // 中央区域的组件未被选中
            selectId: '',
            selectIndex: '',
            selectHeight: 0,
            selectTop: 0,
        }
    },
    
    computed:{
       

    },
    methods:{
        getID(length){
            return Number(Math.random().toString().substr(3,length) + Date.now()).toString(36);
        },
        dragItem(item,e){
            
            // if(this.currentData) return;
            this.currentData = JSON.parse(JSON.stringify(item)); // 复制item赋值给currentData
            this.currentData.id= this.getID(3);
            e.dataTransfer.setData('text',e.target.innerHTML);
            // e.dataTransfer.effectAllowed = 'copy';
            // console.log('鼠标按下---位置1', e.dataTransfer.effectAllowed)
        },
        dragover(e){
            // e.dataTransfer.dropEffect = 'copy';
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
                // const component = ()=> import('@/components/img/img01.vue')
                const component = ()=> import('@/components'+type)
                this.centerData.push({
                    com: component,
                    props:this.currentData});
                this.idLists.push(currentData.id); //
                this.heightData+=parseInt(currentData.style.height);
                this.selectTop= this.heightData + 15;
                // console.log('计算高度总和', this.heightData)               
            }  
            console.log('中央区域数据', this.centerData)
            // 设置项渲染
            this.rightData = [];
            this.curSet = this.currentData.data.setTitle;
            let curSet = this.currentData.data.setLink;
            let setCom = ()=>import('@/components'+ curSet);
            this.rightData.push({
                com: setCom,
                props: this.currentData.data
            })
            this.currentData = null;

        },
        getCurdata(data){
            // 拖拽排序得问题
            this.currentData = data;
            this.isSelect = true;
            // console.log('打印data,父传子方法, 拖拽时获取当前数据',data,'event',e)
        },
        getCurselect(id){
            // 记录点击时当前的下标
            console.log('选中组件----组件点击id',id, this.currentData)
            this.isSelect = true;
            this.selectId = id;
            this.selectIndex = this.getRealIndex(id);
            this.selectHeight = parseInt(this.centerData[this.selectIndex].props.style.height);
            this.$nextTick(()=>{
                let curBox = this.$refs.centerItem[this.selectIndex];
                let offsetTop = curBox.$el.offsetTop;
                this.selectTop = offsetTop + this.selectHeight + 15;
                console.log('组件选中了,点击时现实的----id',curBox,)
                this.rightData = [];
                this.curSet = curBox.data.setTitle;
                let curSet = curBox.data.setLink;
                let setCom = ()=>import('@/components'+ curSet);
                this.rightData.push({
                    com: setCom,
                    props: curBox.data
                })

            })
            // 重新渲染设置项---只显示当前组件的设置项 
            // 通过id确定当前设置项
           

            



        },
        addItem(){
            // console.log('进入添加数据',this.selectIndex,this.centerData[this.selectIndex])
            this.selectIndex = this.getRealIndex(id);
            let curCom = this.centerData[this.selectIndex];
            let selectData = JSON.parse(JSON.stringify(curCom.props));
            selectData.id= this.getID(3);
            let selectCom = curCom.com;
            this.centerData.splice(this.selectIndex+1,0,{com:selectCom,props:selectData});
            this.idLists.splice(this.selectIndex+1,0,selectData.id);

        },
        delItem(){
            this.isSelect = false;
            this.selectIndex = this.getRealIndex(id);
            this.centerData.splice(this.selectIndex,1);
            this.idLists.splice(this.selectIndex,1);
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
            // console.log(e.target,'点击事件','jjjj',curBox)
            if(this.isSelect){
                if(!curBox.contains(e.target)){
                    this.isSelect = false;
                    this.selectId = '';
                }
            }

        }
        
    },
    created(){},
    mounted(){
        console.log('home----mounted')
    },
    watch:{
        
            
      
    }
}
</script>
<style scoped>
@import './css/home.css';
</style>    