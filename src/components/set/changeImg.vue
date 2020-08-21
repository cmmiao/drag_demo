<template>
    <div>
        <div class="img-set">
            <div class="img-title">切换图片</div>
            <input type="text" v-model="imgsrc" @input="changeValue(prop)" />
        </div>
    </div>
</template>
<script>
export default {
    //  此处值传递给center 在input框中切换图片链接
    props:['prop'],
    data(){
        return {
            imgsrc:this.prop.imgsrc
        }
    },
    methods:{
        changeValue(data){
            // 根据当前的id,修改数据centerData里的数据
            console.log(data,this.imgsrc,'set---0')
        }
    },
    created(){
        console.log('set0----0', this.prop,this.prop.id)
    },
    mounted(){},

}
</script>
<style scoped>
.img-set{
    height: 50px;
    margin-bottom: 10px;
}
.img-title{
    font-size: 14px;
    line-height: 20px;
    margin-bottom: 8px;
}
.img-set input {
    width: 90%;
    height: 30px;
    line-height: 30px;
    border: 1px solid #eee;
    border-radius: 3px;
    font-size: 14px;
    padding-left: 5px;
    
}
</style>