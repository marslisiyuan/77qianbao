<template>
    <div 
        id="paymentdetail"
       v-loading="loading2"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        style="width: 100%">
        <div class="title">
            <div @click="backed"><img src="../../assets/left.png" alt=""></div>
            <span>支付提现配置</span><span></span>
        </div>
        <ul class="reset">
            <li>
                <p>真实姓名：</p>
                <input type="text" name="" id="" placeholder="请输入真实姓名" v-model="realname">
            </li>
            <li>
                <p>支付宝姓名：</p>
                <input type="text" name="" id="" placeholder="请输入支付宝姓名" v-model="name">
            </li>
            <li>
                <p>提现支付宝：</p>
                <input type="text" name="" id="" placeholder="请输入提现支付宝" v-model="id">
            </li>
            <li style="color:red ">
                在提现操作时，会验证用户的账号和名称，为避免给用户带来不必要的麻烦，请填写真实的支付宝信息！
            </li>
            <!-- <li>
                <p>微信号</p>
                <input type="text" name="" id="" placeholder="请输入微信号">
            </li> -->
            <li id="save">
                <button @click="save()">保存</button>
            </li>
        </ul>
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
    </div>
</template>
<script>
    export default {
        data(){
            return{
              day:"",
              num:1,
              more:'00',
              particulars:'',
              loading2: false,
              name:'',
              id:'',
            //   shopname:'220699618080723',
              texte:'',
              unbind:false,
              realname:''
            }
        },
        mounted(){
             this.$store.commit('shownav',false)
             this.day=this.$route.query.data
             this.version=this.$store.state.version
             this.setali()
        },
        methods:{
            setali(){
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
                    emulateJSON:true
                }).then(function(res){
                    if(res.data['39']=='00'){
                        this.realname=res.data['38']
                        this.name=res.data['40']
                        this.id=res.data['41']
                        console.log(res.data['38']+res.data['40']+res.data['41'])
                    }
                })
            },
            save(){
                    var merchantidNo=$.parseJSON(JSON.parse(localStorage.getItem('info'))['42'])[0].merchantNo
                    var MAC=$.md5('0700890002'+this.realname+this.name+this.id+merchantidNo+this.version+'21E4ACD4CD5D4619B063F40C5A454F7D')
                    this.$http.post('http://77pay.llyzf.cn:6442/lly-posp-proxy/request.app',
                        {
                            '0':'0700',
                            '3':'890002',
                            '38':this.realname,
                            '40':this.name,
                            '41':this.id,
                            '42':merchantidNo,
                            '59':this.version,
                            '64':MAC
                        },{
                        emulateJSON:true
                        }).then(function(res){
                            if(res.data['39']=='00'){
                                this.unbind=true
                                this.texte='操作成功'
                                setTimeout(()=>{
                                    this.$router.push({path:'/user'})
                                },1000)
                            }else{
                                this.unbind=true
                                this.texte='操作失败'
                            }                         
                        })
                },
            backed(){
                window.history.go(-1)
            },
            
        },
    }
</script>
<style scoped="scoped">
  #paymentdetail{
      height: 100%;
     background: url(../../assets/banner/bg@3x.png);
     background-size: cover;
     background-position-x: -2rem;
  }
 .reset{
     width: 93%;
     margin: 0 auto;
     background-color: white;
     border-radius: .266667rem;
     margin-top: 3rem;
 }
 .reset>li{
     width: 93%;
     margin: 0 auto;
     display: flex;
     flex-wrap: wrap;
     height: 2rem;
     align-items: center;
     border-bottom: 1px solid #C8CEDA;
 }
 .reset>li>p{
     width: 30%;
     color: black;
 }
 input{
     height: 1rem;;
     width: 70%;
     border: none;
 }
 button{
     width: 93%;
     margin: 0 auto;
     height: 1rem;
     border-radius: 1rem;
     border: none;
     background-color: #554EE9;
     color: white;
 }
 #save{
     /* padding-top: 3rem; */
     height: 6rem;
 }
</style>
