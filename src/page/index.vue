<template>
    <div id="index">
        <div class="title">
            <!-- <img @click="showphone" src="../assets/nav/kefu.png" alt=""> -->
            <span>77钱包</span>
            <!-- <img src="../assets/nav/gonggao.png" @click="open" alt=""> -->
        </div>
        <header>
                    <el-carousel trigger="click" height="3.733333rem">
                        <el-carousel-item>
                             <div class="demo-carousel">
                                <img src="../assets/nav/lunbo0.png" alt="">
                            </div>
                        </el-carousel-item>
                        <el-carousel-item>
                            <div class="demo-carousel">
                                <img src="../assets/nav/lunbo0.png" alt="">
                            </div>
                        </el-carousel-item>
                        <el-carousel-item>
                             <div class="demo-carousel">
                                <img src="../assets/nav/lunbo0.png" alt="">
                            </div>
                        </el-carousel-item>
                    </el-carousel>
        </header>

                <div class="cdnav">
                    <ul>
                        <li @click="goSupportCard()">
                            <div data='kb'>
                                <img src="../assets/nav/tool/zhinengyangka.png" alt="">
                                <span>商户入驻</span>
                            </div>
                        </li>
                        <router-link tag="li" to="/emptypay">
                            <div>
                                <img src="../assets/nav/tool/shoukuan.png" alt="">
                                <span>推广赚钱</span>
                            </div>
                        </router-link>
                        <router-link tag="li" to="/bonus/bonuscash">
                            <div>
                                <img src="../assets/nav/tool/yuetixian.png" alt="">
                                <span>我要提现</span>
                            </div>
                        </router-link>
                        <!-- tag="li" to="/creditcard" -->
                        <li>
                            <div>
                                <img src="../assets/nav/tool/xinyongkashengqin.png" alt="">
                                <span>关于我们</span>
                            </div>
                        </li>
                        <li @click="pay()">
                            <div data='yq'>
                                <img src="../assets/nav/tool/fenxiangzuanqian.png" alt="">
                                <span>在线支付</span>
                            </div>
                        </li>
                    </ul>
                </div>
                 <ul class="index-ul">
                    <li @click="goSupportCard">
                        <div class="photo"><img src="../assets/nav/yyq.jpg" alt=""></div>
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
                 <div class="mask">

                 </div>
                <div class="kmjf" >
                    
                </div>
                
            </div>
        </template>

        <script>
            export default {
                // name: 'HelloWorld',
                data() {
                    return {
                        speed:'2000',
                        contents:'',
                        announcement:'',
                        version:"QQHB-1.0.0",
                        gongao:'公告',
                        text:'',
                        unbind:false,
                        dialogtext:'',
                        state:''
                    }
                },
                mounted(){
      
                    this.$store.commit('shownav', true)
                        setTimeout(function(){
                    $('.navname').map(function(index,item){
                        if($(item).attr('data')){
                            $(item).children('img').attr('src',require('@/assets/drawable/'+$(item).attr('data')+'.png'))
                        }
                        })
                    $('#sy').children('img').attr('src',require('@/assets/drawable/djsy.png'))
                    },10)
                    if(!JSON.parse(localStorage.getItem('info'))){
                       $.cookie('user','')
                        localStorage.removeItem('info')
                        this.$router.push('/login')
                    }
                     if(!$.cookie('user')){
                        this.$router.push('/login')
                     }
                    //  this.version=this.$store.state.version
                //   var merchantidNo=$.parseJSON(JSON.parse(localStorage.getItem('info'))['42'])[0].merchantNo
                //   var MAC=$.md5('0700190103'+merchantidNo+this.version+'21E4ACD4CD5D4619B063F40C5A454F7D')
                },methods:{
                      goSupportCard(){
                        //   this.$router.push({path:'/user/cardPay'}) ;   
                            var merchantidNo=$.parseJSON(JSON.parse(localStorage.getItem('info'))['42'])[0].merchantNo
                            var MAC=$.md5('0700790000'+merchantidNo+this.version+'21E4ACD4CD5D4619B063F40C5A454F7D')
                            this.$http.post(
                                'http://77pay.llyzf.cn:6442/lly-posp-proxy/request.app',
                                {
                                    '0':'0700',
                                    '3':'790000',
                                    '42':merchantidNo,
                                    '59':this.version,
                                    '64':MAC
                                },{
                                    emulateJSON:true,
                                }).then(function(res){
                                    if(res.data['39']=='00'){ 
                                        console.log(res.data['38'])    
                                        if(res.data['38']=='true'){
                                            this.$router.push({path:'/user/cardPay'}) ;
                                        }else{
                                            this.unbind=true;
                                            this.text='对不起，您没有权限'
                                        }
                                    }
                                })
                        },
                       pay(){
                           this.$router.push({path:'/saveImageone'}) ;
                       },
                }
            }
        </script>

        <!-- Add "scoped" attribute to limit CSS to this component only -->
        <style scoped="scoped">
        #index{
            height: 100%;
        }
            .title{
                background: #fff;
                color: black;
                font-size: .48rem;
                display: flex;
                justify-content: center;
            }
            /* .title img{
                height: .533333rem;
                width:  .533333rem;
            } */
            header {
               width: 100%;
               height:  3.633333rem;
               background: #554EE9;
            }
           .demo-carousel{
               width: 100%;
               height: 3.733333rem;
               overflow: hidden;
           }
           .demo-carousel img{
               width: 100%;
               /* height: 100%; */                  
           }
            .cdnav {
                height: 5.063rem /* 305/16 */;
                background: #F7F7F7;
                display: flex;
                justify-content: center;
                margin-top: 0.5rem;
            }
            .cdnav ul {
                background: #FFFFFF;
                width: 85%;
                border-radius: 15px ;
                display: flex;
                flex-wrap: wrap;
                box-shadow: 0px -3px 10px #554EE9;
            }
            .cdnav ul li {
                width: 33%;
                text-align: center;
                height: 1.853333rem;
                margin-top: .533333rem;
            }
            .cdnav ul li>div{
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction:column;
            }
            .cdnav li span{
                font-size: .32rem;
            }
            .cdnav li img{
                width: 1rem;
                height: 1rem;
            }
            .tan>li{
                width: 100%;
                background-color: white;
                position: relative;
                top:-5.5rem /* 200/16 */;
                z-index: 1111;
                color: black;
                border: 1px solid silver;
                border-radius: 0.266667rem;
            }
            .nav-group  {
                background: white;
                margin-top: 0.266667rem;
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;
                padding: .133333rem .266667rem .266667rem .266667rem;
               
            }
            .nav-group .item {
                width: 49%;
                border-bottom: 1px solid #ccc;
                line-height: .586667rem;
                white-space: nowrap;
                padding: .266667rem .186667rem;
                border-radius: .133333rem;
                margin-top: .133333rem;
            }
            .nav-group .item .logo{

                vertical-align: middle;
                display: inline-block;
            }
            .nav-group .item .info{
                display: inline-block;
                height: 1.466667rem;
                padding-left: .133333rem;
                vertical-align: middle;
            }
            .nav-group .item .info h3{
                line-height: .533333rem;
                color: white;
                border-bottom: 1px solid white;
            }
            .nav-group .item .info p{
                font-size: .32rem;
                -webkit-transform-origin-x: 0;
                transform:scale(0.8);
                margin-top: .106667rem;
                line-height: .266667rem;
                color: white;
            }
            .xykhkimg {
                margin-top: 0.266667rem;
                padding: .133333rem .133333rem .266667rem .133333rem;
                background: white;
                display: flex;
                justify-content: space-around;
                align-items: center;
            }
            .xykhkimg div {
                height: 1.6rem;
                width: 48%;
                border: 2px solid #c99bc2;
                border-radius: .133333rem;
                display: flex;
                justify-content: flex-start;
                align-items: center;
            }
            .xykhkimg div h3{
                font-size: .533333rem;
                font-weight: 800;
            }
            .kmjf {
                height:1.6rem;
                text-align: center;
                /* margin-top: .8rem; */
                width: 100%;
            }
             .index-ul{
                 margin-top: 2.133333rem;
             }
            .index-ul li{
                padding:0 .133333rem;
                background: white;
            }
            .index-ul .content{
                padding: .266667rem;
                display: flex;
                align-items: center;
                /* justify-content: space-between; */
                font-size: .426667rem;
            }
             .index-ul .content p{
                flex-grow: 1;
             }
            /* .index-ul .content img{
                height: .533333rem;
            } */
            .index-ul .photo img{
              width: 100%;
              height: 5.533333rem;
            }
            .mask{
                position: absolute;
                top: 0;
                width: 100%;
                height: 100%;
                background: black;
                opacity: 0.4;
                z-index: 3000;
                display: none;
            }
            .call-phone{
                position: absolute;
                top: 0;
                bottom: 0;
                right: 0;
                left: 0;
                border-radius: .266667rem;
                margin: auto;
                height: 3.2rem;
                width: 8rem;
                display: flex;
                justify-content: center;
                flex-direction: column;
                align-items: center;
                background: white;
                text-align: center;
                z-index: 4000;
            }
            .callbutton{
                margin-top: .4rem;
            }
            .callbutton button{
                padding: .08rem .8rem;
                background: #2472c8;
                color: #999;
                border: none;
                border-radius: .133333rem;
                margin:0 .266667rem;
            }
            .payfreeze{
                width: 25%;
                text-align: center;
                height: 1.853333rem;
                margin-top: .533333rem;
            }
            .payfreeze>div{
                display: flex;
                -webkit-box-align: center;
                -ms-flex-align: center;
                align-items: center;
                -webkit-box-pack: center;
                -ms-flex-pack: center;
                justify-content: center;
                -webkit-box-orient: vertical;
                -webkit-box-direction: normal;
                -ms-flex-direction: column;
                flex-direction: column;
            }
            .payfreeze>div>img{
                width: .8rem;
                height: .8rem;
            }
            .payfreeze>div>span{
                font-size: .32rem;
            }
            /* .announcement{
                position: absolute;
                top: 5.333333rem;
                background: white;
                border: 1px solid #efefef;
                width: 70%;
                height: 4.8rem;
                right: 0;
                left: 0;
                margin: 0 auto;
                display: flex;
                justify-content: center;
                align-items: center;
                padding: .266667rem;
            }
             .announcement .close{
                 position: absolute;
                 top: 0;
                 right: 0;
                 font-size: .533333rem;
                width: .533333rem;
                height: .533333rem;
                line-height: .426667rem;
                text-align: center;
                background: #efefef;
             } */
        </style>