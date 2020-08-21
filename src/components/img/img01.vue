<template>
    <div data-title="图片" :id="prop.id" :ref="prop.id" :class="{'select':prop.controlId==prop.id}" :style="{width:style.width,height:style.height,top:style.top,left:style.left}" @dragstart.stop="curData(prop)" @click.stop.prevent="curSelect(prop.id)">
    <!-- <div data-title="图片" :style="{position: 'absolute',width:'100px',height:'100px'}"> -->
       <img class="dp-img" :src="data.imgsrc" alt="" /> 
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
            },
            curSelect:{
                type: Function,
                required: true
            }
        },
        data(){
            return {
                style: this.prop.style,
                data: this.prop.data,
                // setData: this.prop.setData,

            }
        },
        methods:{
            // curData(val,e){
            //     this.$emit('curData',val)
            //     // console.log('中央拖动---按下---子组件给父组件传值','子组件通过$emit'出发'curData'事件, 父组件监听这个事件)
            // },
            // curSelect(e,id){
            //     this.selectId = id;
            // }
            
        },
        created(){
            console.log('img--00',this.prop)
        },
        mounted(){
            // 初次渲染时,被选中,被显示增加删除按钮
            // this.$nextTick(()=>{
            //     let curEle = this.$refs[this.prop.id];
            //     let curTop = curEle.offsetTop + parseInt(this.prop.style.height) + 15;
            //     this.$emit('curSelect',this.prop.id);
            //     console.log('mounted-----',curTop);
            // })
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