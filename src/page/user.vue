<template>
    <div
       id="user"
       v-loading="loading2"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        style="width: 100%">
        <!-- 个人中心 -->
       
        <!-- 头像和收益 -->
        <div class="head">
            <div class="title">
                <!-- <Icon type="ios-arrow-back"></Icon> -->
                <span></span>
                <span>个人中心</span>
                <span></span>
            </div>
            <!-- 头像 -->
            <div  class="top">
                <div class="pic">
                    <img src="../assets/drawable/mycustomer_weirenzheng.png" alt="" class="picimg">
                    <div class="name">
                        <p>{{name}}</p>
                    </div>
                </div>
            </div>
        </div>

          <!-- 收益 -->
            <div class="profit">
                <div @click="Paymentdetail('addMoney')">
                    <p class="tit">佣金</p>
                    <p class="desc">{{money}}</p>
                </div>
                <!-- <router-link tag="div" to="/Bonus/bonuscash">
                    <p class="tit">分润</p>
                    <p class="desc">00</p>
                </router-link>
                <div  @click="Paymentdetail('reRate')">
                    <p class="tit">零钱</p>
                    <p class="desc">00</p>
                </div> -->
            </div>
        <!-- <router-view></router-view> -->
        <ul class="user-ul">
            <li @click="Paymentdetail()">
                <img src="../assets/me/jy.png" alt="">
                <div>
                    <span>个人资料</span>
                    <img src="../assets/right.png" alt="">
                </div>
            </li>
            <router-link tag="li" to="/record">
                <img src="../assets/me/kf.png" alt="">
                <div>
                    <span>提现记录</span>
                    <img src="../assets/right.png" alt="">
                </div>
            </router-link>
            <li @click="mesage()">
                <img src="../assets/me/fx.png" alt="">
                <div>
                    <span>费率信息</span>
                    <img src="../assets/right.png" alt="">
                </div>
            </li>
            <li>
                <img src="../assets/me/xyk.png" alt="">
                <div>
                    <span>联系我们</span>
                    <img src="../assets/right.png" alt="">
                </div>
            </li>
            <li @click='quit'>
                <img src="../assets/me/cz.png" alt="">
                <div>
                    <span>安全退出</span>
                    <img src="../assets/right.png" alt="">
                </div>
            </li>
        </ul>
        <el-dialog
                :visible.sync="unbind"
                width="90%"
                top="30vh"
                >
                <span>{{text}}</span>
                <span slot="footer" class="dialog-footer">
                    <!-- <el-button @click="unbind = false">取 消</el-button> -->
                    <el-button type="primary" @click="unbind = false">确 定</el-button>
                </span>
            </el-dialog>
        <div class="user-footer">

        </div>
    </div>
</template>
<script>
    export default {
        name: 'four',
        data() {
            return {
                bank:'',
                version:"",
                money:'',
                loading2: false,
                level:'',
                state:"" ,
                unbind:false,
                text:'',
                name:''
            }
        },
        mounted(){
             this.state=$.parseJSON(JSON.parse(localStorage.getItem('info'))['42'])[0].isValid
             this.bank=eval(JSON.parse(localStorage.getItem('info'))['42'])[0]
             this.$store.commit('shownav', true)
             this.version=this.$store.state.version
             this.level=$.parseJSON(JSON.parse(localStorage.getItem('info'))['42'])[0].level
             setTimeout(function(){
             $('.navname').map(function(index,item){
                   if($(item).attr('data')){
                       $(item).children('img').attr('src',require('@/assets/drawable/'+$(item).attr('data')+'.png'))
                   }
                })
             $('#wd').children('img').attr('src',require('@/assets/drawable/djwd.png'))
            },10)
            var merchantidNo=$.parseJSON(JSON.parse(localStorage.getItem('info'))['42'])[0].merchantNo
            // console.log($.parseJSON(JSON.parse(localStorage.getItem('info'))['42'])[0])
            this.cardPay()
        },
        methods:{
            mesage(){
                this.unbind=true;
                this.text='暂未开放'
            },
            backed(){
                window.history.go(-1)
            },
            Paymentdetail(){
                this.$router.push('/user/Paymentdetail')
            },
            quit(){
                $.cookie('user','')
                 localStorage.clear();
                this.$router.push('/login')
            },
            cardPay(){
                var merchantidNo=$.parseJSON(JSON.parse(localStorage.getItem('info'))['42'])[0].merchantNo
                console.log($.parseJSON(JSON.parse(localStorage.getItem('info'))['42'])[0])
                 var MAC=$.md5('0700890001'+merchantidNo+this.version+'21E4ACD4CD5D4619B063F40C5A454F7D')
                this.$http.post(
                'http://77pay.llyzf.cn:6442/lly-posp-proxy/request.app',
                {
                    '0':'0700',
                    '3':'890001',
                    '42':merchantidNo,
                    '59':this.version,
                    '64':MAC
                },{
                    emulateJSON:true
                }).then(function(res){
                    if(res.data['39']=='00'){
                        this.money=res.data['43']
                        this.name=res.data['38']
                        console.log(this.money)
                    }
                })
            }
        },
           
    }
</script>
<style scoped="scoped">
    #user{
        height: 100%;
    }
    .title{
        background: #fff;
        color: black;
    }
    .head {
        background: url(../assets/me/bgc.png) no-repeat;
        background-size: cover;
        margin-bottom:-0.5rem; 
    }
    .top {
        width: 1.6rem;
        display: flex;
        justify-content: center;
        margin: 0 auto;
    }
    .top>.pic{
        display: flex;
        flex-flow: wrap;
        justify-content: center;
    }
    .picimg{
        width: 1.6rem;
        height: 1.6rem;
        margin-top: 0.5rem;
    }
    .top .name>p{
        text-align: center;
        color: white;
        margin: .5rem 0;
        margin-bottom: 1.3rem;
    }
    .profit {
        border-radius: 15px;
        display: flex;
        padding: .5rem .533333rem;
        width: 93%;
        margin: 0 auto;
        border-top: 4px solid #fff;
        background: #fff;
        color: #000;
    }
    .profit > div {
        width: calc(100%/3);
        border-left: 1px solid #fff;
        text-align: center;
        margin: 0 auto;
    }
    .profit > div:first-child{
        border: none;
    }
    .profit > div .tit {
        font-size: .32rem;
    }
    .profit > div .desc {
        padding-top: 0.133333rem;
        font-size: .453333rem;
    }
    .main {
        margin-top: 0.266667rem;
        display: flex;
        justify-content: flex-start;
        padding:0 .4rem;
        flex-wrap: wrap;
        width: 100%;
        background: white;
    }
    .main > li {
        width: calc(100%/3);
        margin-top: .266667rem;
        height: 2.133333rem;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        text-align: center;
        border-radius: .133333rem;
    }
   .main > li img{
       width: 1.2rem;
       height: 1.2rem;
   }
   .user-footer{
       height: 1.573333rem;
   }
   .user-ul{
       background: #fff;
       margin-top: .266667rem;
   }
   .user-ul li{
       height: 1.2rem;
       display: flex;
       align-items: center;
   }
   .user-ul li img{
     width: .293333rem;
     height: .533333rem;
     padding:0  .4rem;
   }
   .user-ul li>img{
    height:.666667rem;
    width:.666667rem;
    padding:0  .4rem;
   }
   .user-ul li div{
       flex-grow: 1;
       display: flex;
       align-items: center;
       justify-content: space-between;
       font-size: .426667rem;
       color: black;
       height: 1.2rem;
       border-bottom: 1px solid #efefef;
   }
</style>