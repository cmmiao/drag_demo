<template>
<div class="dp-header">
    <div class="hd-left">
        <i class="iconfont icon-return"></i>
        自定义建站
    </div>
    <div class="hd-center">
        <router-link to="/home" class="hd-sign" :class="{'active':prop==0}"><span class="hd-mark">1</span>编辑</router-link>       
        <i class="iconfont icon-forward"></i>
        <router-link to="/skin" class="hd-sign" :class="{'active':prop==1}"><span class="hd-mark">2</span>皮肤</router-link>       
        <i class="iconfont icon-forward"></i>
        <span class="hd-sign"><span class="hd-mark">3</span>设置</span>       
        <i class="iconfont icon-forward"></i>
        <span class="hd-sign"><span class="hd-mark">4</span>发布</span>
        
    </div>
    <div class="hd-right">
        <span>保存</span>  
        <span>预览</span>
    </div>
</div>
</template>
<script>
export default {
    props:['prop'],
    data(){
        return {
            // checkId: 0,
        }
    },
    computed:{

    },
    created(){
    }
}
</script>
<style scoped>
.dp-header{
    width: 100%;
    height: 50px;
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    padding-left: 20px;
    box-sizing: border-box;
}
.hd-right span{
    display: inline-block;
    width: 70px;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    border: 1px solid #eee;
    border-radius: 3px;
}
.dp-header i {
    color: #bbb;
    margin-right: 10px;
}

.hd-sign .hd-mark{
    display: inline-block;
    width: 16px;
    height: 16px;
    line-height: 14px;
    border: 1px solid #bbb;
    border-radius: 50%;
    text-align: center;
    margin-right: 10px;
    box-sizing: border-box;
    font-size: 12px;
    color: #bbb;
}
.hd-sign:hover,.hd-sign.active{
    color: #84b3fd;
}
.hd-sign:hover .hd-mark{
    color: #84b3fd;
    border: 1px solid #84b3fd;
}
.hd-sign.active .hd-mark{
    color: #fff;
    background: #84b3fd;
    border: 1px solid #84b3fd;
}

</style>