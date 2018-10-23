<template>
    <div
    id="carditcard"
    v-loading="loading2"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
    style="width: 100%">
        <div class="title">
          <div @click="backed"><img src="../../assets/left.png" alt=""></div>
            <span>代理信息</span>
            <span></span>
        </div>
        <ul class="information">
            <li>
                <p class="fon">真实姓名</p>
                <p>{{name}}</p>
            </li>
            <li>
                <p class="fon">手续费</p>
                <p><input type="text" placeholder="请输入手续费" class="inp" v-model="text"></p>
            </li>
            <li>
                <p class="fon">花呗基础费率</p>
                <el-select v-model="value" placeholder="请选择" ref='el'>
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </li>            
        </ul>
        <ul class="ms">
            <li style="color:red">
                仅支持花呗基础费率调整
            </li>
            <li>
                <button @click="submit">确定</button>
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
              options: [{
                value: '1.10',
                label: '1.10'
                }, {
                value: '1.15',
                label: '1.15'
                }, {
                value: '1.20',
                label: '1.20'
                }, {
                value: '1.25',
                label: '1.25'
                }, {
                value: '1.30',
                label: '1.30'
                },{
                value: '1.35',
                label: '1.35'
                }, {
                value: '1.40',
                label: '1.40'
                }, {
                value: '1.45',
                label: '1.45'
                }, {
                value: '1.50',
                label: '1.50'
                }, {
                value: '1.55',
                label: '1.55 '
                },{
                value: '1.60',
                label: '1.60'
                },{
                value: '1.65',
                label: '1.65'
                },{
                value: '1.70',
                label: '1.70'
                },{
                value: '1.75',
                label: '1.75'
                },{
                value: '1.80',
                label: '1.80'
                },{
                value: '1.85',
                label: '1.85'
                },{
                value: '1.90',
                label: '1.90'
                },{
                value: '2.00',
                label: '2.00'
                }],
             value:'',
             lable:'',
             version:'',
             bank:'',
             loan:'',
             loading2: false,
             name:'',
             text:'',
             texte:'',
             unbind:false,
            //  shopname:'220699618080723',
             data:''
            }
        },
        mounted(){
            this.$store.commit('shownav',false)
            this.version=this.$store.state.version
            this.name=this.$route.query.name;
            this.data=this.$route.query.data;
            console.log(this.data)
            this.data=this.$route.query.data;
            var merchantidNo=$.parseJSON(JSON.parse(localStorage.getItem('info'))['42'])[0].merchantNo
        },
        methods:{
            backed(){
                window.history.go(-1)
            },
           more(){
               $('.hide').slideToggle()
           },
           submit(){
               if(!this.text==''&&!this.value==''){
                    var merchantidNo=$.parseJSON(JSON.parse(localStorage.getItem('info'))['42'])[0].merchantNo
                    var MAC=$.md5('0700790007'+merchantidNo+this.data+(this.value+'+'+this.text)+this.version+'21E4ACD4CD5D4619B063F40C5A454F7D')
                    this.$http.post(
                        'http://77pay.llyzf.cn:6442/lly-posp-proxy/request.app',
                        {    
                            '0':'0700',
                            '3':'790007',
                            '42':merchantidNo,
                            '43':this.data,
                            '44':this.value+'+'+this.text,
                            '59':this.version,
                            '64':MAC
                        },
                        {
                        emulateJSON:true
                        }).then(function(res){
                            if(res.data['39']=='00'){
                                this.unbind=true
                                this.texte='操作成功'
                            }else{
                                this.unbind=true
                                this.texte='操作失败'+':'+res.data['39']
                            }
                        })
                }else{
                    this.unbind=true
                    this.texte='您没有没填写手续费 或 选择费率'
                }
               
           },
        }
    }
</script>
<style scoped="scoped">
#carditcard{
    height: 100%;
}
 .information{
     width: 100%;
     background-color: white;
      margin-top: .5rem;
 }
 .information>li{
     display: flex;
     flex-flow: wrap;
     width: 93%;
     height: 1.5rem;
     align-items: center;
     margin: 0 auto;
     border-bottom: 1px solid #CBD1DC;
    
 }
 .fon{
     color: black;
     font-size: .4rem;
     width: 30%;
     margin-right: .3rem;
 }
 .inp{
     height: .9rem;
 }
 .ms{
     width: 100%;
     background-color: #F6F6F9;
 }
 .ms>li{
      display: flex;
     flex-flow: wrap;
     width: 93%;
     height: 1.5rem;
     align-items: center;
     margin: 0 auto;
 }
 .ms>li>button{
     width: 100%;
     height: 1.3rem;
     border-radius: .266667rem;
     border: none;
     background-color: #2472C8;
 }
</style>
<style>
.popper__arrow{
     left: 80% !important;

 }
 .el-popper{
    min-width: 230px !important;
    transform-origin: center top 0px;
    z-index: 2011;
    position: absolute;
    /* top:400px !important; */
    left: 50% !important;
    transform:translateX(-50%);
    text-align:center;
    border-radius:.266667rem;
 }

 .el-select-dropdown__wrap{
    max-height:420px;
 }
  /* .popper__arrow{
      display:none !important;
  } */
  .el-select-dropdown__item{
      padding: 0px !important;
      border-bottom:1px solid #E0E0E1;
  }
 
</style>
