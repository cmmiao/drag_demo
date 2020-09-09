<template>
<div>
    <div class="img-set">
        <div class="img-title" >{{prop.title}}</div>
        <div class="set-select iconfont icon-forward" :class="{'select':isSelect}" @click.stop.prevent="curClick">{{prop.value}}</div>
        <ul class="set-list" v-show="isSelect">
            <li v-for="(val, i) in prop.liData" :key="i" @click.stop.prevent="liClick(val)">{{val}}</li>
            <!-- <li>短</li>
            <li>中</li>
            <li>长</li> -->
        </ul>
        
    </div>
</div>
</template>
<script>
export default {
    props: ['prop'],
    data(){
        return {
            isSelect: false,
        }
    },
    methods: {
       curClick(){
           this.isSelect = !this.isSelect;
       },
       liClick(val){
            this.prop.value = val;
            this.isSelect = false;
       }

    },
    created(){
        // console.log('set01',this.prop)
    }
}

</script>
<style scoped>
.img-set{
    height: 60px;
    margin-bottom: 10px;
}
.img-title{
    font-size: 14px;
    line-height: 20px;
    margin-bottom: 8px;
}
.set-select{
    width: 100%;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    border: 1px solid #eee;
    border-radius: 5px;
    position: relative;
    padding: 0 32px 0 10px;
    box-sizing: border-box;

}
.set-select.select{
    border-color: #84b3fd;
}
.set-select::before{
    position: absolute;
    right: 10px;
    color: #e7e7e7;
    font-size: 14px;
}
.set-select.select::before{
   transform: rotate(90deg);
}

.set-list{
    border: 1px solid #eee;
    background: #fff;
}
.set-list li{
    height: 30px;
    line-height: 30px;
    padding-left: 10px;
    font-size: 14px;
}
.set-list li:hover{
    background: #84b3fd;
}
</style>