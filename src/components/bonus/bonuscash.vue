<template>
  <div>
        <!-- 分润提现title -->
        <div class="title titlefixed">
             <div @click="backed"><img src="../../assets/left.png" alt=""></div>
            <span>提现申请</span>
            <span></span>
        </div>
        <ul class="money">
            <li class="type">
                <img src="../../assets/tixian/type.png" alt="">
                <p>提现类型</p>
            </li>
            <li style="border:none">
                <ul class="icon">
                    <li>
                        <img src="../../assets/tixian/djhk.png" alt="">
                        <p>佣金</p>
                    </li>
                    <!-- <li>
                        <img src="../../assets/tixian/hj.png" alt="">
                        <p>分润</p>
                    </li>
                    <li>
                        <img src="../../assets/tixian/hy.png" alt="">
                        <p>零钱</p>
                    </li> -->
                </ul> 
                
            </li>
            <li>
                <p>提现支付宝</p>
                <p id="inp">{{number}}</p> 
            </li>
            <li>
                <p>支付宝姓名</p>
                <p id="inp">{{name}}</p>
            </li>
            <li>
                <p>提现金额 </p>
                <input type="text" name="" id="last" placeholder="￥0.00" v-model="mymoney">
                <p style="color:red">最低提现金额100元，每笔1%的手续费</p>
            </li>
            <li style="color:#6B61C5">当前可用余额：￥{{yue}}</li>
            <li style="border:none">
                <button @click="submit($event)">确定</button>
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
    </div>
</template>
<script>
    export default {
        data(){
            return{
              show:false,
              money:'',
              version:'',
              balance:'',
              text:'',
              unbind:false,
              shopname:'220699618080723',
              name:'',
              number:'',
              yue:'',
              mymoney:'',
            }
        },
        mounted(){
            this.version=this.$store.state.version
            this.$store.commit("shownav",false)
            var merchantidNo=$.parseJSON(JSON.parse(localStorage.getItem('info'))['42'])[0].merchantNo
            this.allMoney()
        },
        methods:{
          backed(){
              window.history.go(-1)
          },
          allMoney(){
                var merchantidNo=$.parseJSON(JSON.parse(localStorage.getItem('info'))['42'])[0].merchantNo
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
                        emulateJSON:true,
                    }).then(function(res){
                        if(res.data['39']=='00'){
                             this.name=res.data['40']     
                             this.number=res.data['41']
                             this.yue=res.data['43']
                        }else{
                            this.unbind=true
                            this.text='操作失败,数据异常'
                        }
                    })
          },
          submit(event){
              var _vm=this
              console.log(event)
              $(event.currentTarget).attr('disabled','disabled')
              var events=$(event.currentTarget)
              var merchantidNo=$.parseJSON(JSON.parse(localStorage.getItem('info'))['42'])[0].merchantNo
              var MAC=$.md5('0700890000'+merchantidNo+this.mymoney+this.version+'21E4ACD4CD5D4619B063F40C5A454F7D')
              this.$http.post(
                  'http://77pay.llyzf.cn:6442/lly-posp-proxy/request.app',
                  {
                    '0':'0700',
                    '3':'890000',
                    '42':merchantidNo,
                    '43':this.mymoney,
                    '59':this.version,
                    '64':MAC
                  },{
                     emulateJSON:true
                  }).then(function(res){
                     if(res.data['39']=='00'){
                        this.unbind=true
                        this.text='提现成功'
                         var curCount = 60  
                                function SetRemainTime() {
                                    if (curCount == 0) {
                                        clearInterval(interValObj); //停止计时器
                                        events.removeClass("disabled").attr("disabled",false).html("提现");
                                    } else {
                                        curCount--;
                                        events.addClass("disabled").attr("disabled",true).html("剩余" + curCount + "秒");
                                    }
                                }
                                var interValObj = setInterval(SetRemainTime, 1000);
                     }else{
                         event.attr("disabled",false)
                         this.unbind=true
                         this.text=res.data['39']
                     }
                  })
              
          }
        }
    }
</script>
<style scoped="scoped">
    .money{
        margin: 0 auto;  
         margin-top: 1.466667rem;  
         width: 93%;  
         background-color: #FFF;
         border-radius:  .266667rem; 

    }
    .money>li{
        display: flex;
        width: 92%;  
        flex-wrap: wrap;
         justify-content: space-start;
         align-items: center;
        margin: 0 auto;
         padding: .4rem ;
         border-bottom: 0.013333rem solid #ddd;
    }
    .type>img{
        width: .6rem;
        height: .6rem;
    }
    .type>p{
        margin-left: .2rem;
        color: #808080;
    }
    .icon{
        width: 100%;
        display: flex;
        justify-content: space-around;
    }
    .icon>li{
        display: flex;
        width: calc(90%/3);
        flex-flow:wrap;
        justify-content: space-around;
    }
    .icon>li>img{
        width: 100%;
    }
    #inp{
        /* height: 1rem; */
        width: 70%;
        margin-left: .3rem;
        outline: medium;
        border: none;
    }
    input{
        height: 1rem;
        margin-bottom: .5rem;
    }
    #last{
        margin-left: .6rem
    }
    button{
        width: 100%;
        height: 1.25rem;
        margin: 0 auto;
        border-radius: .666667rem;
        background-color: #5149F4;
        color: white;
        border: none;
    }
</style>
