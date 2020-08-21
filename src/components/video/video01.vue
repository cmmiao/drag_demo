<template>
<div data-title="视频"  :id="prop.id" :class="{'select':prop.controlId==prop.id}" :style="{width:style.width,height:style.height,top:style.top,left:style.left}" @dragstart.stop="curData(prop)" @click.stop.prevent="curSelect(prop.id)">
    <video class="dp-video" :src="prop.data.videosrc" controls>
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
    computed: {},
    methods: {},
    created(){
        console.log('视频', this.curData)
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