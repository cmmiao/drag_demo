<template>
    <div data-title="图片" :id="prop.id" :ref="prop.id" :class="{'select':prop.controlId==prop.id}" :style="{width:style.width,height:style.height,top:style.top,left:style.left}" 
      @click="curSelect(prop)" >
     <!-- @dragstart="curData(prop)" @dragend="curDrag(prop)" .stop.prevent-->
    <!-- <div data-title="图片" :style="{position: 'absolute',width:'100px',height:'100px'}"> -->
       <img class="dp-img" :src="data[0].props.value" alt="" :style="{width: imgWidth}" /> 
    </div>
</template>
<script>
    import {mapState,mapMutations} from 'vuex';
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
                id: this.prop.id,
                style: this.prop.style,
                data: this.prop.data,

            }
        },
        computed:{
            imgWidth(){
                if(this.data[1].props.value == "短"){
                    return '33%';
                }else if(this.data[1].props.value == "中"){
                    return '50%' ;
                }else{
                    return '100%';
                }
                
            }

        },
        methods:{

            
        },
        created(){
        },
        mounted(){
          
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