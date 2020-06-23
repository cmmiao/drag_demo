<template>
    <div data-title="图片" :id="prop.id" :style="{position: 'absolute',width:style.width,height:style.height,top:style.top,left:style.left}" @dragstart.stop="curData(prop)">
    <!-- <div data-title="图片" :style="{position: 'absolute',width:'100px',height:'100px'}"> -->
       <img class="dp-img" src="https://image.pre-zuma.com/image/1260446859901519919.jpg" alt=""> 
    </div>
</template>
<script>
    export default {
        // props:['prop'],
        props:{
            prop: {
                type: Object,
                required: true
            },
            curData:{
                type: Function,
                required: true
            }
        },
        data(){
            return {
                style: this.prop.style,
                // setData: this.prop.setData,

            }
        },
        methods:{
            // curData(val,e){
            //     this.$emit('curData',val)
            //     // console.log('中央拖动---按下---子组件给父组件传值','子组件通过$emit'出发'curData'事件, 父组件监听这个事件)
            // },
            
        },
        created(){
            // console.log('img--00',this.prop)
        }
    }
</script>
<style scoped>
.dp-img{
    width: 100%;
    height: 100%;
    object-fit: cover;

}

</style>