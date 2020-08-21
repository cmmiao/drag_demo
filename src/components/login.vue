<template>
<div class="dp-register">
    <div class="dp-logo">拖拽建站</div>
    <div class="dp-content">
        <div class="dp-load">
            <h1>登陆</h1>
            <form>
              <div class="dp-username">
                  <label for="name" class="label">
                   <i class="iconfont icon-load"></i>
                   <input type="text" v-model="name" placeholder="手机号码或邮箱" @blur="checkName" />                      
                  </label>
                  <p class="errMsg"><span v-show="!userReg">格式不对，用户名只能为邮箱或手机号码</span></p>
              </div>
              <div class="dp-password">
                  <label for="password" class="label">
                   <i class="iconfont icon-password"></i>
                   <input type="password" v-model="password" @blur="checkPassword" />   
                  </label>
                  <p class="errMsg"><span v-show="!passReg">密码不能为空</span></p>
              </div>
              <div class="dp-loading" @click.stop.prevent="submitInfo">登陆</div>  
            </form>

        </div>
        <div class="dp-login"></div>

    </div>
</div>
</template>
<script>
export default {
    data(){
        return {
            userReg: true,
            passReg: true,
            name: '',
            password: '',
            userArr:[{name:'17521188052',pass:'123456'}],


        }
    },
    methods:{
        checkName(){
            console.log('----',this.name)
            // 校验this.name是否为手机号或者邮箱
            const mobile = /^0?(13[0-9]|14[0-9]|15[0-9]|16[0-9]|17[0-9]|18[0-9]|19[0-9])[0-9]{8}$/;
            const email = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
            if(mobile.test(this.name) || email.test(this.name)){
                this.userReg = true;
            }else{
                this.userReg = false;
            }



        },
        checkPassword(){
            const password = /^[@A-Za-z0-9!#$%^&*.~,]{6,20}$/;
            if(password.test(this.password)){
                this.passReg = true;
            }else{
                this.passReg = false;
            }

        },
        submitInfo(){
            this.userArr.forEach((val,i)=>{
                if(this.name == val.name && this.password == val.pass){
                    // 跳转到登陆页面
                    localStorage.setItem('userName', this.name);
                    this.$router.push("home")
                }else{
                    // 提示账号密码不正确
                }
            })
        }
    }
    
}
</script>
<style scoped>
    .dp-register{
        width: 100%;
        height: 100%;
    }
    .dp-logo{
        height: 50px;
        line-height: 50px;
    }
    .dp-content{
        height: calc(100% - 50px);
        padding-top: 100px;
        background: url("https://www.bangboss.com/images/loginback.png") no-repeat;
    }
    .dp-load{
        box-sizing: border-box;
        width: 500px;
        margin: 0 auto;
        padding: 20px 50px;
        background: #fff;
    }
    .dp-load h1{
        font-size: 20px;
        line-height: 1.1;
        padding: 30px 0px;
    }
    .label{
        display: block;
        height: 40px;
        padding: 7px 0px;
        /* margin-bottom: 20px; */
        box-sizing: border-box;
        border: 1px solid #e9e9e9;
        border-radius: 2px;
        text-align: left;
        font-size: 14px;
    }
    .label i{
        display: inline-block;
        font-size: 22px;
        width: 40px;
        text-align: center;
    }
    .label input {
        width: 70%;
        line-height: 26px;
        padding-left: 7px;
        border: 0;
        outline: none;
        background: transparent;
        box-shadow: inset 0 0 0 1000px #fff!important;
    }
    .dp-loading{
        width: 100%;
        line-height: 40px;
        font-size: 14px;
        margin-top: 20px;
        background-color: #5b99fd;
        border: 1px solid #5b99fd;
        border-radius: 2px;
        color: #fff;
        cursor: pointer;
    }
    .errMsg{
        text-align: left;
        font-size: 14px;
        color: rgba(253,66,56,.8);
        text-indent: 18px;
        height: 25px;
    }
</style>