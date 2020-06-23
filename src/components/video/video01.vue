<template>
<div data-title="视频"  :id="prop.id" :style="{position: 'absolute',width:style.width,height:style.height,top:style.top,left:style.left}" @dragstart.stop="curData(prop)">
    <video class="dp-video" src="https://www.runoob.com/try/demo_source/movie.mp4" controls>
    </video>
</div>
</template>
<script>
export default {
    props: {
            prop: {
                type: Object,
                required: true
            },
            curData:{
                type: Function,
                default: null
            }
        },
    data(){
        return {
            style: this.prop.style,
        }
    },
    computed: {},
    methods: {},
    created(){
        console.log('视频', this.curData)
    },
    mounted(){},
}
</script>
<style scoped>
.dp-video{
    width: 100%;
    height: 100%;
    object-fit: cover;

}

</style>