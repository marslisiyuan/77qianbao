<template>
    <div id="codeImg">
        <div class="title">
            <div @click="backed"><img src="../../assets/left.png" alt=""></div><span>我的二维码</span>
            <span></span>
        </div>
        <div class="codeImg-2wm">
            <div class="logo">
                <div id="code">

                </div>
            </div>
            <!-- <p>请在10分钟内扫码支付</p>
            <p>1、使用智能还款，需付费.</p>
            <p>2、付费成功后请等待两分钟后，退出重新进.</p>
            <p>3、支付宝付费如果提示付费异常，重新进入生成二维码付费.</p> -->
        </div>
        <div class="consoles" style="display:none;">
            <div>
                <p>二维码生成失败</p>
            </div>
        </div>
       
    </div>
</template>
<script>
    export default {
        data(){
            return{
               items:"",
               version:'',
            }
        },
        mounted(){
           this.$store.commit('shownav',false)
           this.items=this.$route.query.js;
           console.log(this.items);
           this.version=this.$store.state.version;
           var url=this.items
           $("#code").qrcode({     
                render: "canvas",      
                width: 180,
                height:180,      
                text: url });           
            },
        methods:{
            backed(){
               window.history.go(-1)
            }   
        }
    }
</script>
<style scoped="scoped">
 #codeImg{
     height: 100%;
     background: #efefef;
 }
 .codeImg-2wm{
     margin: .533333rem;
     padding:.133333rem .266667rem;
     background: #a78b5b;
     color: #fff;
     text-align: center;
 }
 .codeImg-2wm h2{
     font-size: .64rem;
     font-weight: 600;
 }
 .codeImg-2wm .logo{
     width: 5.333333rem;
     height: 5.333333rem;
     background: white;
     /* display: flex;
     justify-content: center;
     align-items: center; */
     margin:auto;
     position: relative;
 }
 .codeImg-2wm .logo #code{
     position: absolute;
     height: 4.8rem;
     width: 4.8rem;
     top: .266667rem;
     left: .266667rem;
     display: flex;
   justify-content: center;
   align-items: center;
     /* position: absolute;
     top:0;
     bottom: 0;
     right: 0;
     left: 0;
     margin: auto; */
     /* background: red; */
 }
 .codeImg-2wm p{
     padding: .133333rem;
     font-size: .48rem;
 }
</style>
