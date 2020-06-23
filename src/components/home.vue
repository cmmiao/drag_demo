<template>
    <div class="dp-container">
        <div class="dp-left">
          <div class="dp-wrapper">
              <div class="dp-left-item" v-for="(item,index) in setData" :key="index">
                  <span class="iconfont" :class="item.icon" draggable="true" @dragstart.stop="dragItem(item,$event)" ></span>
                  <span >{{item.name}}</span>
              </div>
          </div>  
        </div>
        <div class="dp-center" @drop.stop.prevent="drop($event)" @dragover.prevent>
            <div class="dp-center-item" >
                <!-- <component class="drop-item" v-for="(val,i) in centerData"  :key="i" :id="val.id" :is="val.com" :prop='val.props' :openPane="openPane"  @curData=dragCenter></component> -->
                <component class="drop-item" draggable="true" v-for="(val,i) in centerData"  :key="i" :id="val.id" :is="val.com" :prop="val.props" :curData="getCurdata" ></component>
            </div>
        </div>
        <div class="dp-right">
            <!-- <div class="dp-set-box">
                <div class="dp-set-title">图片设置</div>
                <div class="dp-set-lists">

                </div>

            </div> -->

        </div>
    </div>
</template>
<script>
export default {

    data(){
        return {
            setData:[
                {
                    "icon":"icon-image",
                    "title": "img",
                    "name":"图片",
                    "style":{
                        "width": "200px",
                        "height": "200px",
                        "left": "0px",
                        "top": "0px",
                    }
                },{
                    "icon":"icon-video",
                    "title": "video",
                    "name":"视频",
                    "style":{
                        "width": "200px",
                        "height": "200px",
                        "left": "0px",
                        "top": "0px",
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
            currentData: null, // 存储拖拽时的数据
            centerData:[], // 存储拖放下的数据
            rightData:[], // 右侧设置项数据
            idLists:[], // 存储拖放下的数据的id
            selfX: 0,
            selfY: 0,
            curID: '',// 当前拖动元素的id
        }
    },
    
    computed:{},
    methods:{
        getID(length){
            return Number(Math.random().toString().substr(3,length) + Date.now()).toString(36);
        },
        dragItem(item,e){
            console.log('鼠标按下---位置1', this.currentData )
            // if(this.currentData) return;
            this.currentData = JSON.parse(JSON.stringify(item)); // 复制item赋值给currentData
            this.currentData.id= this.getID(3);
            e.dataTransfer.setData('text',e.target.innerHTML)
        },
        
        drop(e){
            e.dataTransfer.getData('text');
            let currentData = this.currentData;
            currentData.style.left =  e.pageX-100-400+'px';
            currentData.style.top =  e.pageY-100 +'px';
            console.log('放下---位置2',this.idLists.includes(currentData.id))
            //  根据id判断centerData里面是否含有currentData
            if(!this.idLists.includes(currentData.id)){
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
                this.idLists.push(this.currentData.id);
                
                
            }
            this.currentData = null;
            console.log('打印center---位置2',this.centerData,'是否正在拖动',this.idLists)
        },
        getCurdata(data){
            this.currentData = data;
            console.log('打印data,父传子方法, 拖拽时获取当前数据',data)
        },
        // openPane(){
        //     console.log('打开弹窗--0000---双击')
        // }
    },
}
</script>
<style scoped>
@import './css/home.css'
</style>    