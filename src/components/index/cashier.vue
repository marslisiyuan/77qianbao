<template>
<div class="box">
    <!-- 无卡支付title -->
    <div class="title">
        <div @click="backed"><img src="../../assets/left.png" alt=""></div>
        <span>支付宝收银台</span>
        <span></span>
    </div>
    <div class="erweimabg">
        <ul id="erweimabg" >
            <li class="border">
                <img src="../../assets/banner/7@2x.png" alt="" class="one">
                <p>哈哈哈的收银台【自动回款】</p>
            </li>
            <li style="color:#040404;font-size:0.45rem">选择付款方式</li>
            <li class="border">
                <img src="../../assets/banner/6@2x.png" alt="" class="two">
                <p>花呗通道</p>
            </li>
            <li style="color:#040404;font-size:0.45rem">温馨提示</li>
            <li class="tell"><span>请勿相信网络上的</span><span class="red">财务结算走账/刷单刷信誉返佣金/信用卡代办</span><span class="red">提额/货款办理/客服赔款退款等之类的各种骗局，</span><span>如果选择继续</span><span>交易视你已阅读以上内容，并且核实无误，否则产生的资金损失</span><span>由您本人自行承担。</span></li>
        </ul>
    </div>
</div>
</template>
<script>
   import {mapState} from "vuex"
    export default {
        data(){
            return{
               jump:false,
               moneys:'',
            }
        },
        mounted(){
            this.$store.commit("shownav",false)
        },
        methods:{
            // showtable(){
            //     document.getElementById("numb_tab").style.display="block";
            // },
            // hidetable(){
            //    document.getElementById("numb_tab").style.display="none";
            // },
            srnum(event){                
                   var tf = document.getElementById('tf')
                   if(tf.innerHTML.indexOf('.')>-1){
                       if(tf.innerHTML.length-tf.innerHTML.indexOf('.')>2){
                           return false
                       }
                   }
                 if(event.target.value == "." && tf.innerHTML == "") return false;
                if(event.target.value == "." && tf.innerHTML.indexOf(".") != -1) return false;
                if(tf.innerHTML.length==1){
                 if(tf.innerHTML.charAt(0)==0 && event.target.value != "."){
                     return false
                 }
                }
                if(tf.value == "0"){
                if(event.target.value == "."){
                tf.innerHTML += event.target.value;
                }
                }else{
                tf.innerHTML += event.target.value;
                if(tf.innerHTML!=""){
                    document.getElementById("ok_btn").style.color="white";
                }else{
                    document.getElementById("ok_btn").style.color="#c8c8c8";
                }
                
                }  
                if(parseFloat(tf.innerHTML)>0){
                   this.jump=true
                }
                this.moneys=tf.innerHTML
            },
            back(){
                var tf =document.getElementById('tf')
                tf.innerHTML = tf.innerHTML.replace(/.$/,'')
                 if(parseFloat(tf.innerHTML)>0){
                   this.jump=true
                }else{
                   this.jump=false 
                }
                if(tf.innerHTML!=""){
                    document.getElementById("ok_btn").style.color="#444";
                }else{
                    document.getElementById("ok_btn").style.color="#c8c8c8";
                }
            },
            backed(){
                window.history.go(-1)
            },
            bankcard(){
                if(this.jump){
                    this.$router.history.push('/emptypay/bankCard')
                    sessionStorage.setItem('money',this.moneys)
                }
                
            },
            changepay(event,index){
             if(index=='1'){
                  $('.paychange').removeClass('on')
                  $(event.currentTarget).addClass("on")
                }else if(index=='4'){
                    this.$router.push('/emptyPayMoney')
                }else{
                  $('.consoles').show()  
                    setTimeout(function(){
                    $('.consoles').hide() },1000)
                }
              
            }
        }
    }
</script>
<style scoped="scoped">
.box{
    height: 100%;
}
.erweimabg{
    height: 100%;
    background-color: #EEEEEE;
}
#erweimabg{
    width: 93%;
   background: url(../../assets/banner/5@3x.png) no-repeat;
   background-size: 100% 100%;
   height:100%;
   margin: 0 auto;
   margin-top:.5rem;
}
#erweimabg>li{
    width: 100%;
    /* height: 2rem; */
    display: flex;
    flex-wrap:wrap;
    justify-content: flex-start;
    align-items: center;
    padding: .4rem;
}
.one,.two{
    width: 1rem;
    height: 1rem;
    margin-right: .3rem
}
.border{
    border-bottom: 1px solid #E4E4E4;
}
.tell{
    font-size: .3rem;
    overflow: hidden;
    
}
.red{
    color: red;
}
.tell>span{
    padding-bottom: .2rem;
}
</style>
