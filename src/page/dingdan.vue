<template>
    <div class="box">
        <!-- 代理升级title -->
        <div class="title">
            <p>花呗订单</p>
        </div>

        <!-- 会员卡 -->
        <ul class="membershipCard">
            <li>
                <div class="card hj">
                    <ul id="tab">
                        <li >
                            <p @click="all()" class="tabe">全部</p>
                        </li>
                        <li  @click="payed()">
                            <p>已支付</p>
                        </li>
                        <li @click="unpay()">
                            <p>未支付</p>
                        </li>
                    </ul>
                    <div @click="zhan()">
                        展开高级筛选功能<img src="../assets/down.png" alt="">
                    </div>
                    <div id="search">
                        <input type="text" placeholder="请输入开始时间" v-model="start">-
                        <input type="text"  placeholder="请输入结束时间" v-model="end">
                        <p style="color:red">提示：时间格式为：2018-09-25</p>
                        <button id="timeButton" @click="time()">确定</button>
                    </div>
                </div>
            </li>
        </ul>
        <ul class="member" v-for="(item,index) in items" :key="index">
            <li>
                <p>订单编号：{{item.orderNo}}</p>
                <p id="red" :class="item.status=='10B'?'class2':'class1'">{{item.status=='10B' ? '已支付' : '未支付'}}</p>
            </li>
            <li class="member-img">
                <img src="../assets/dingdan.png" alt="">
                <p>商户：{{item.id}}</p>
                <p>￥{{item.trxAmt}}</p>
            </li>
            <li>
                <P id="name">{{item.status=='10B' ? '支付宝：'+item.mobile : ''}}</P>
                <P>{{item.status=='10B' ? item.completeTime : '' | formdate}}</P>
            </li>
        </ul>
        <div class="next">
            <button @click="shang()">上一页</button>
            <button @click="xia()">下一页</button>
        </div>
      <el-dialog
                :visible.sync="unbind"
                width="90%"
                top="30vh"
                >
                <span>{{texte}}</span>
                <span slot="footer" class="dialog-footer">
                    <!-- <el-button @click="unbind = false">取 消</el-button> -->
                    <el-button type="primary" @click="unbind = false">确 定</el-button>
                </span>
            </el-dialog>
         <div class="vip-footer">

         </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                version:'',
                grade:'',
                text:'',
                start:'',
                unbind:false,
                texte:'',
                end:'',
                pay:'',
                // shopname:'220699618080723',
                page:'1',
                items:'',
            }
        },
        mounted() {
            this.version=this.$store.state.version
            this.$store.commit('shownav', true)
            setTimeout(function(){
             $('.navname').map(function(index,item){
                   if($(item).attr('data')){
                       $(item).children('img').attr('src',require('@/assets/drawable/'+$(item).attr('data')+'.png'))
                   }
                })
             $('#hy').children('img').attr('src',require('@/assets/drawable/djhy.png'))
            },10)
           this.getitems();
            $('#tab>li>p').click(function(){
                $('#tab>li>p').removeClass('tabe')
                $(this).addClass('tabe')
            })
        },
        methods: {
            time(){
                this.getitems();
            },
            zhan() {
                $('#search').slideToggle();
            },
            all(){
                 this.pay=""
                 this.page=1
                 this.getitems();
            },
            payed(){
                this.pay='success'
                this.page=1
                this.getitems();
            },
            unpay(){
                this.pay='fail'
                this.page=1
                this.getitems();
            },
            shang(){
                this.page=this.page-1
                if(!this.page==0){
                    console.log(this.page)
                    this.getitems();
                }else{
                    this.unbind=true
                    this.texte='没有了'
                }
            },
            xia(){
                 this.page++
                 console.log(this.page)
                 this.getitems();
            },
            getitems(){
                var merchantidNo=$.parseJSON(JSON.parse(localStorage.getItem('info'))['42'])[0].merchantNo
                var MAC=$.md5('0700790008'+merchantidNo+this.page+this.start+this.end+this.pay+this.version+'21E4ACD4CD5D4619B063F40C5A454F7D')
                this.$http.post(
                    'http://77pay.llyzf.cn:6442/lly-posp-proxy/request.app',
                    {
                        '0':'0700',
                        '3':'790008',
                        '42':merchantidNo,
                        '43':this.page,
                        '44':this.start,
                        '45':this.end,
                        '46':this.pay,
                        '59':this.version,
                        '64':MAC
                    },{
                        emulateJSON:true,
                    }).then(function(res){
                        if(res.data['39']=='00'){     
                            var num=eval(res.data['57'])                          
                            // if(!num.length==0){
                            //     this.items=num
                            //      console.log(num)
                            //      console.log(res.data['57'])
                            // }else{
                            //     this.unbind=true
                            //     this.texte='抱歉，没有数据'
                            //     console.log(num)
                            // }    
                            if(num.length==0 && this.page==1){
                                 this.unbind=true
                                 this.texte='抱歉，没有数据'
                                 $('.next').hide();
                                 console.log(num)
                            }else if(num.length==0){
                                this.unbind=true
                                 this.texte='抱歉，没有数据'
                                 console.log(num)
                            }else{
                                this.items=num
                            }
                            console.log(this.items)
                            console.log(this.pay)
                        }else{
                            this.unbind=true
                            this.texte='操作失败,数据异常'
                        }
                    })
            },
        },
        filters:{
             formdate:function(value){ 
                 if(!value==''){
                        var date = new Date(value),
                        Y = date.getFullYear() + '-',
                        M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-',
                        D = (date.getDate()<10 ? '0'+ date.getDate():date.getDate())+ ' ',
                        h = (date.getHours()<10 ? '0'+ date.getHours():date.getHours())+ ':',
                        m = (date.getMinutes()<10 ? '0'+ date.getMinutes():date.getMinutes())+ ':',
                        s = date.getSeconds()<10?'0'+date.getSeconds():date.getSeconds()

                        return Y+M+D+h+m+s
                 }
            },
        }
    }
</script>
<style scoped="scoped">
.box{
    position: relative;
}
    .title{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .card{
         background-color: white;
    }
    .card>ul{
        overflow: hidden;
        width: 100%;
    }
    .card>ul>li{
        float: left;
        width: calc(100%/3);
        color: black;
        text-align: center;
    }
    .card>ul>li>p{
        padding: 0.3rem;
    }
    .card>div{
        color: #B7B7B7;
        display: flex;
        justify-content: center;
    }
    .card>div>img{
        width: .5rem;
        height: .4rem;
        margin: .1rem 0 0 .3rem;
    }
    .membershipCard li {
        padding-top: 0.266667rem;
        margin-bottom: 0.266667rem;
        /* background-color: white; */
        /* width: 100%; */
        border-bottom: 0.013333rem solid #ddd;
    }
    .membershipCard .card {
        /* height: 3rem; */
        width: 9.466667rem;
        padding: 0 0.266667rem;
        margin: 0 auto;
        /* background: black; */
        border-radius: .266667rem;
        overflow: hidden;
        position: relative;
        box-sizing: border-box;
        color: white;
        box-shadow: .053333rem .08rem .16rem rgba(0,0,0,.5);
    }
    .membershipCard h2{
        font-size: .48rem;
        text-align: center;
        font-weight: 600;
        padding: .4rem 0;
    }
    .membershipCard .card>div{
        padding-left: .266667rem;
        line-height: .586667rem;
    }
    .vip-footer{
        height: 1.333333rem;
    }
    .member{
        background-color: #FFFFFF;
        box-shadow: .053333rem .08rem .16rem rgba(0,0,0,.5);
        width: 9.466667rem;
        padding: 0 0.266667rem;
         border-radius: .266667rem;
         margin: 0 auto;
         margin-bottom: .2rem;
    }
    .member>li{
       padding: 0.266667rem;
       border-bottom: 0.013333rem solid #ddd;
       overflow: hidden;
        display: flex;
        align-items: center;
        justify-content:space-around;
    }
    .member>li>p{
        font-size: 0.35rem;
        /* color: #B8B8B8; */
    }
    .left{
        float: left;
    }
    .right{
        float: right;
    }
    .member-img>img{
        width: 1.3rem;
        height: 1.3rem;
    }
    #search{
        width: 93%;
        margin: 0 auto;
         margin-bottom: .5rem;
         margin-top: .5rem;
         display: flex;
         justify-content:center;
         align-items: center;
         flex-wrap: wrap;
          display: none;
    }
    #search>input{
        width: 48%;
        height: .8rem;
    }
    #search>p{
        width: 100%;
        margin-top: .3rem;
    }
    #name{
        float: left;
    }
    .class1{
        color: red ;
    }
    .class2{
        color: #9EE22A ;
    }
    .next{
        width: 100%;
        display: flex;
        justify-content:space-around;
    }
    .next>button{
        background-color: #554EE9;
        margin-top: 1.5rem;
        width: 20%;
        height: .8rem;
        margin-bottom: 1rem;
        border-radius: 0.266667rem;
        border: none;
    }
    .tabe{
       color: #2472C8;
       border-bottom: 1px solid #2472C8;
    }
    #timeButton{
        width: 93%;
        margin: 0 auto;
    }
</style>