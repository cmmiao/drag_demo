<template>
<!--  -->
<div data-title="视频"  :id="prop.id" :class="{'select':prop.controlId==prop.id}" :style="{width:style.width,height:style.height,top:style.top,left:style.left}" 
  @click="curSelect(prop)">
  <!-- @dragstart="curData(prop)"  @dragend="curDrag(prop)" .stop.prevent-->
    <video class="dp-video" :src="data[0].props.value"  :style="{width: imgWidth}" controls>
    </video>
    <!-- <div class="dp-video" :id="'video'+prop.id"></div> -->
</div>
</template>
<script>
// import Hls from 'hls.js';
// window.Hls = require('hls.js');
// import DPlayer from "../../../node_modules/dplayer/dist/DPlayer.min.js";


export default {
    props: {
             prop: {
                type: Object,
                required: true
            },
            curData:{
                type: Function,
                required: true
            },
            curSelect:{
                type: Function,
                required: true
            }
            
            
            
        },
    data(){
        return {
            id: this.prop.id,
            style: this.prop.style,
            data: this.prop.data,
        }
    },
    computed: {
        imgWidth(){
                // console.log('computed---',this.data[1].props.value)
                if(this.data[1].props.value == "短"){
                    return '33%';
                }else if(this.data[1].props.value == "中"){
                    return '50%' ;
                }else{
                    return '100%';
                }
                
            }
    },
    methods: {},
    created(){
        console.log('视频', this.data)
    },
    mounted(){
        // this.data.dp = new DPlayer({
        //     container:document.querySelector('#video'+this.id),
        //     preload: 'none',
        //     autoplay: false,
        //     video:{
        //         url: this.data.videosrc,
        //         // type: 'hls'
        //     }
        // })
    },
}
</script>
<style scoped>
.dp-video{
    width: 100%;
    height: 100%;
    object-fit: fill;

}

</style>