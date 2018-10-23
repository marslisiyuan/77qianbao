<template>
    <div
       id="proxy"
       v-loading="loading2"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        style="width: 100%">
        <!-- 个人中心 -->
       <div class="title">
                <!-- <Icon type="ios-arrow-back"></Icon> -->
                <span></span>
                <span>代理团队</span>
                <span></span>
            </div>
        <!-- 头像和收益 -->
        <div class="head">
            
            <!-- 头像 -->
            <div  class="top">
                <div class="pic">
                    <p class="picimg">0.00</p>
                    <ul class="name">
                        <li class="fengexian">
                            <p>直接推广</p>
                            <p>{{people}}</p>
                        </li>
                        <!-- <li>
                            <p>间接推广</p>
                            <p>0</p>
                        </li> -->
                    </ul>
                </div>
            </div>
        </div>
        <ul class="user-ul" v-for="(item, index) in items" :key="index">
            <ul class="search">
                <li>
                    <img src="../assets/proxy/jy.png" alt="" class="ul-search">查询代理
                </li>
                <li class="list">
                    <img src="../assets/drawable/mycustomer_weirenzheng.png" alt="">
                    <div>
                        <p class="one">{{item.merchantCnName}}</p>
                        <ul class="number">
                            <li>
                                <p class="two">代理数量</p>
                                <p class="three">{{item.provinceId}}</p>
                            </li>
                            <li class="four">
                                <p class="two">今日订单量</p>
                                <p class="three">{{item.cityId}}</p>
                            </li>
                        </ul>
                    </div>
                </li>
                <button class="button-two" @click="check(item.merchantNo,item.merchantCnName)">查看订单量</button>
                <button class="button-one"  @click="adjust(item.merchantCnName,item.merchantNo)">调整费率</button>
            </ul>
        </ul>

    <div class="foot">

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
                loading2: true,
                level:'',
                state:"",
                items:'',
                url:'',
                people:'',
            }
        },
        mounted(){
             this.state=$.parseJSON(JSON.parse(localStorage.getItem('info'))['42'])[0].isValid
             this.bank=eval(JSON.parse(localStorage.getItem('info'))['42'])[0]
             this.$store.commit('shownav', true)
             this.version=this.$store.state.version
             this.url=this.$store.state.url
            //  this.level=$.parseJSON(JSON.parse(localStorage.getItem('info'))['42'])[0].level
             setTimeout(function(){
             $('.navname').map(function(index,item){
                   if($(item).attr('data')){
                       $(item).children('img').attr('src',require('@/assets/drawable/'+$(item).attr('data')+'.png'))
                   }
                })
             $('#kb').children('img').attr('src',require('@/assets/drawable/djkb.png'))
            },10)
            var merchantidNo=$.parseJSON(JSON.parse(localStorage.getItem('info'))['42'])[0].merchantNo
            var MAC=$.md5('0700790006'+merchantidNo+this.version+'21E4ACD4CD5D4619B063F40C5A454F7D')
            this.$http.post(
                'http://77pay.llyzf.cn:6442/lly-posp-proxy/request.app',
                {
                    '0':'0700',
                    '3':'790006',
                    '42':merchantidNo,
                    '59':this.version,
                    '64':MAC
                },{
                emulateJSON:true
                }).then(function(res){
                    if(res.data['39']=='00'){
                        this.items=JSON.parse(res.data['57']);
                        console.log(res.data['57'])
                        this.people=res.data['58']
                        console.log(this.people)
                        this.loading2=false
                    }
                    
                })
        },
        methods:{
            backed(){
                window.history.go(-1)
            },
            adjust(rel,res){
                this.$router.push({path:'/adjustment',query:{'name':rel,'data':res}})
            },
            Paymentdetail(day){
                this.$router.push({path:'/user/Paymentdetail',query:{data:day}})
            },
            quit(){
                $.cookie('user','')
                 localStorage.clear();
                this.$router.push('/login')
            },
           check(rel,red){
               console.log(red)
               this.$router.push({path:'/user/customer',query:{'id':rel,'data':red}})
           }
          
        },
    }
</script>
<style scoped="scoped">
    #proxy{
        height: 100%;
    }
    .title{
        background: #fff;
        color: black;
    }
    .head {
        width: 93%;
        background: #2472c8;
        margin: 0 auto;
        border-radius:0 0 .5375rem .5375rem /* 15/16 *//* 15/16 */; 
        padding-bottom: 0.5rem;
    }
    .top {
        width: 100%;
        /* padding: 0 .533333rem .533333rem; */
        display: flex;
        margin: 0 auto;
        
    }
    .pic{
        width: 100%;
    }
    .picimg{
        width: 100%;
        height: 1.6rem;
        margin: 0 auto;
        margin-top: 0.5rem;
        color: white;
        font-size: 0.9rem;
        text-align: center;
    }
    .top .name>p{
        font-size: 0.5rem;
        text-align: center;
        color: white;
        margin: .5rem 0;
        margin-bottom: 1.3rem;
    }
    .name>li{
        width: 100%;
        float: left;
        text-align: center;
        color: white;
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
   .user-ul{
       background: #fff;
       margin-top: .266667rem;
       overflow: hidden;
       padding-bottom: 0.2rem;
   }
   /* .ul-search{
       width: 1rem;
       height: 3rem;
   } */

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
   .user-ul .list{
       height: 3rem;
   }
   .list>div{
       width: 80%;
   }
   .user-ul .list>img{
        height:1.5rem;
        width:1.5rem;
        padding:0  .4rem;
   }
   .number{
       width: 100%;
       overflow: hidden;
   }
   .number>li{
       float: left;
       display: flex;
       flex-wrap: wrap;
       /* width: 50%; */
       text-align: center;
   }
   .number>li p{
       width: 100%;
   }
   .one{
       font-size: .4rem;
       color:#211C18;
   }
   .two{
       font-size: .3rem;
   }
   .three{
       font-size: .3rem;
       color: #2472c8;
   }
   .four{
       margin-left: 2.5rem;
   }
   .button-one{
       width: 3rem;
       text-align: center;
       background-color: #FF4A75;
       border-radius: 25px;
       color: white;
       float: right;
       margin-top: .5rem;
        padding: .25rem;
        box-shadow: 3px 0px 5px #FF4A75;
        border: none;
   }
    .button-two{
        width: 3rem;
        text-align: center;
        background-color: #564EF2;
        border-radius: 25px;
        color: white;
        float: right;
        margin-top: .5rem;
        margin-left: .5rem;
        margin-right: .5rem;
        padding: .25rem;
        box-shadow: 3px 0px 5px #564EF2;
        border: none;
   }
.foot{
    height: 2rem;
}
</style>