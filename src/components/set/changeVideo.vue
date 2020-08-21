<template>
    <div>
        <div class="video-set">
            <div class="video-title">切换视频</div>
            <input type="text" v-model="prop.videosrc">
        </div>
    </div>
</template>
<script>
export default {
    //  此处值传递给center 在input框中切换图片链接
    props:['prop'],
}
</script>
<style scoped>
.video-set{
    height: 50px;
    margin-bottom: 10px;
}
.video-title{
    font-size: 14px;
    line-height: 20px;
    margin-bottom: 8px;
}
.video-set input {
    width: 90%;
    height: 30px;
    line-height: 30px;
    border: 1px solid #eee;
    border-radius: 3px;
    font-size: 14px;
    padding-left: 5px;
    
}
</style>