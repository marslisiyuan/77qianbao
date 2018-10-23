<template>
    <div id="codeImg">
        <div class="title">
            <div @click="backed"><img src="../../assets/left.png" alt=""></div><span>我的二维码</span>
            <span></span>
        </div>
        <ul v-for="(item, index) in items" :key="index" class="information">
            <li>
                账号：{{item.alipay}}
            </li>
            <li>
                支付宝名称:{{item.alipayName}}
            </li>
            <li>
                费率：{{item.rate}}
            </li>
            <li>
                每笔的最小额度:{{item.minMoney}}
            </li>
            <li>
                每笔的最大额度:{{item.maxMoney}}
            </li>
            <li>
                每日额度：{{item.everydayLimit}}
            </li>
            <li>
                创建时间：{{item.createTime}}
            </li>
            <li id="butt">
                <button id="delet" @click="ulclick(item.authUrl)">打开</button>
                <button id="delet" @click="del(item.id)">删除</button>
            </li>
        </ul>
         <button @click="goin" class="goin">+ 入驻</button>
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
               items:"",
               text:'',
               unbind:false,
               version:'',
               name:'',
                number:'',
                percent:'',
                mix:'',
                max:'',
                everyday:'',
            }
        },
        // computed(){
        //     this.items=JSON.parse(this.$route.query.js);
        // },
        mounted(){
           this.$store.commit('shownav',false)
           this.version=this.$store.state.version;
           var merchantidNo=$.parseJSON(JSON.parse(localStorage.getItem('info'))['42'])[0].merchantNo
           console.log(merchantidNo)
           this.goSupportCard();      
        },
        methods:{
            backed(){
               window.history.go(-1)
            },
             goin(){
                 this.$router.push({path:'/addPay'}) ;
             },
             ulclick(rel){     
                this.$router.push({path:'/user/usererweima',query:{'js':rel}}) ; 
                console.log(rel)
             },
              goSupportCard(){
                var merchantidNo=$.parseJSON(JSON.parse(localStorage.getItem('info'))['42'])[0].merchantNo
                var MAC=$.md5('0700790002'+merchantidNo+this.version+'21E4ACD4CD5D4619B063F40C5A454F7D')
                this.$http.post(
                'http://77pay.llyzf.cn:6442/lly-posp-proxy/request.app',
                {
                    '0':'0700',
                    '3':'790002',
                    '42':merchantidNo,
                    '59':this.version,
                    '64':MAC
                },{
                    emulateJSON:true
                }).then(function(res){
                    if(res.data['39'] == '00'){
                        this.items = JSON.parse(res.data['57']);
                        console.log(res.data['57'])
                    }    
                })
                
            },   
            del(rel){
                var merchantidNo=$.parseJSON(JSON.parse(localStorage.getItem('info'))['42'])[0].merchantNo
                var MAC=$.md5('0700790009'+merchantidNo+rel+this.version+'21E4ACD4CD5D4619B063F40C5A454F7D')
                this.$http.post(
                'http://77pay.llyzf.cn:6442/lly-posp-proxy/request.app',
                {
                    '0':'0700',
                    '3':'790009',
                    '42':merchantidNo,
                    '43':rel,
                    '59':this.version,
                    '64':MAC
                },{
                    emulateJSON:true
                }).then(function(res){
                    if(res.data['39'] == '00'){
                       this.unbind=true;
                       this.text='删除成功'
                       this.goSupportCard()
                    }    
                })
            } 
        }
    }
</script>
<style scoped="scoped">
 #codeImg{
     height: 100%;
     background: #efefef;
 }
 .information{
     background:white;
     width: 93%;
     margin: 0 auto;
     border-radius: 0.266667rem;
     display: flex;
     flex-flow: wrap;
     margin-top: .5rem;
     position: relative;
 }
 .information>li{
     width: 100%;
     display: flex;
     flex-flow: wrap;
     justify-content:flex-start;
     padding: .1rem;
 }
 .goin{
     display: block;
     width: 93%;
     margin: 0 auto;
     border: none;
     text-align: center;
     background-color: white;
     margin-top: .3rem;
     border-radius: 0.266667rem;
     padding: .2rem;
     font-size: .5rem;
     color: #2472C8;
 }
 #delet{
     width: 45%;
     z-index: 1111;
     height: .8rem;
     border-radius: .266667rem;
     background-color: #554EE9;
     border: none;
     color: white;
 }
 #butt{
     display: flex;
     justify-content: space-around;
 }
</style>
