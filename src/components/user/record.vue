<template>
    <div id="app">
        <!-- 我的客户title -->
        <div class="title titlefixed">
            <div @click="backed"><img src="../../assets/left.png" alt=""></div>
            <span>提现记录</span>
            <span></span>
        </div>
        <!-- 提现记录-->
        <div class="list">
            <ul class="member" v-for="(item,index) in items" :key="index">
                <li>
                    <p>订单编号：{{item.userId}}</p>
                    <p id="red" :class="item.status=='10B'?'class2':'class1'">{{item.status=='10B' ? '支付成功' : '支付失败'}}</p>
                </li>
                <li class="member-img">
                    <img src="../../assets/dingdan.png" alt="">
                    <p>{{item.status=='10B' ?' 手续费：' + JSON.parse(item.paymentOrderId).charge : ''}}</p>
                    <p>{{item.status=='10B' ? '真实到账：' + JSON.parse(item.paymentOrderId).realMoney : ''}}</p>
                    <p>总额：￥{{item.trxAmt}}</p>
                </li>
                <li id="zhifu">
                    <P id="name">{{item.status=='10B' ? '支付宝：'+JSON.parse(item.paymentOrderId).alipayAccount : ''}}</P>
                    <P>{{item.status=='10B' ? item.createTime : ''|formdate}}</P>
                </li>
            </ul>
        </div>
        <!-- 弹窗 -->
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
    </div>
</template>
<script>
    export default {
        name: 'fourone',
        data() {
            return {
              version:" ",
              client:'',
              unbind:false,
              text:'',
              level:'',
              items:'',
              class1:'',
              class2:'',
            }
        },
        mounted(){
            this.level=$.parseJSON(JSON.parse(localStorage.getItem('info'))['42'])[0].level
            this.$store.commit('shownav',false)
            this.version=this.$store.state.version
            var phone=eval(JSON.parse(localStorage.getItem('info'))['42'])[0].linkPhone
           this.select();
        },
        methods:{
            backed(){
                window.history.go(-1)
            },
            select(){
                var merchantidNo=$.parseJSON(JSON.parse(localStorage.getItem('info'))['42'])[0].merchantNo
                var MAC=$.md5('0700890003'+merchantidNo+this.version+'21E4ACD4CD5D4619B063F40C5A454F7D')
                this.$http.post(
                    'http://77pay.llyzf.cn:6442/lly-posp-proxy/request.app',
                    {
                        '0':'0700',
                        '3':'890003',
                        '42':merchantidNo,
                        '59':this.version,
                        '64':MAC
                    },{
                        emulateJSON:true,
                    }).then(function(res){
                        if(res.data['39']=='00'){
                            this.items=eval(res.data['57'])          
                            console.log(res.data['57'])
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
#app{
    height: 100%;
    overflow: hidden;
}
.list{
    margin-top: 1rem;
    overflow: hidden;
}
 .member{
        background-color: #FFFFFF;
        box-shadow: .053333rem .08rem .16rem rgba(0,0,0,.5);
        width: 9.466667rem;
        padding: 0 0.266667rem;
         border-radius: .266667rem;
         margin: 0 auto;
         margin-bottom: .2rem;
         margin-top: .5rem;
    }
    .member>li{
       padding: 0.266667rem;
       border-bottom: 0.013333rem solid #ddd;
       overflow: hidden;
        display: flex;
        align-items: center;
        justify-content:space-between;
    }
    .member>li>p{
        font-size: 0.33rem;
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
</style>
