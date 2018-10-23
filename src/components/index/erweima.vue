<template>
<div class="box">
    <!-- 无卡支付title -->
    <div class="title">
        <div @click="backed"><img src="../../assets/left.png" alt=""></div>
        <span>二维码</span>
        <span></span>
    </div>
    <div  class="erweimabg"></div>
    <ul class="pay">
        <!-- 方便测试收银页面布局，实应扫码跳转 tag="li" to="/cashier"-->
        <li>
            <p id="paypic">
                
            </p>
        </li>
        <li class="li-2">用支付宝扫码，请关闭WIFI和定位</li>
        <li class="li-3"  id="li-3">
            <div>
                <img src="../../assets/banner/1@2x.png" alt="">
                <p>零等待秒回款</p>
            </div>
            <div>
                <img src="../../assets/banner/3@2x.png" alt="">
                <p>自动换商户</p>
            </div>
            <div>
                <img src="../../assets/banner/2@2x.png" alt="">
                <p>支持花呗信用卡</p>
            </div>
            <div>
                <img src="../../assets/banner/4@2x.png" alt="">
                <p>超低点位</p>
            </div>
        </li>
    </ul>
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
             this.$store.commit('shownav',false)
             this.items=this.$route.query.js;
             console.log(this.items);
             this.version=this.$store.state.version;
             var url=this.items
             $("#paypic").qrcode({     
                render: "canvas",      
                width: 180,
                height:180,      
                text: url });       
        },
        methods:{
            backed(){
                window.history.go(-1)
            },
        }
    }
</script>
<style scoped="scoped">
.box{
    height: 100%;
}
.erweimabg{
    /* width: 100%; */
   background: url(../../assets/banner/banner.png) no-repeat;
   background-size: cover;
   height: 5rem;
   margin-bottom: -1rem;
}
.pay{
    width: 93%;
    background-color: white;
    margin: 0 auto;
    overflow: hidden;
    border-radius: 0.266667rem;
    padding-bottom: 1rem;
}
.pay>li{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    overflow: hidden;
    padding: .2rem;
}
#paypic{
    width: 5rem;
    height: 5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 1.5rem;
}
.li-2{
    color: #D81F15;
    font-size: .5rem;
}
.li-3>div>img{
    width: 1rem;
    height: 1rem;
   margin-left: .2rem;
}
.li-3{
    display: flex;
    flex-flow: wrap;
    justify-content: flex-start;
}
#li-3>div{
    width: 50%;
    display: flex;
    flex-flow: wrap;
    justify-content: center;
    margin: 0 auto;
    margin-top: .7rem;
}
#li-3>div>p{
    width: 50%;
    display: flex;
    flex-flow: wrap;
    justify-content: center;
    margin: 0 auto;
}
</style>
