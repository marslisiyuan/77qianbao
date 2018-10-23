import  Tool  from '@/components/index/tool'
import Loan from '@/components/index/loan'
import Querycredit from "@/components/index/querycredit"
import Increasecheats from "@/components/index/increase_cheats"
import Simulationbank from '@/components/index/simulationbank'
import StudentCreditCard from "@/components/index/studentCreditCard"
import Peeradd from "@/components/index/peeradd"
import Rule from "@/components/index/rule"
import Creditcard from "@/components/index/creditcard"
import Cardhistory from "@/components/index/cardhistory"
import SupportCard from "@/components/index/supportCard"
import Bonus from "@/components/index/bonus"
import Carddata from "@/components/index/carddata"
import SaveImageone from "@/components/index/saveImageone"
import Erweima from "@/components/index/erweima"
import Cashier from "@/components/index/cashier"
import Adjustment from "@/components/index/adjustment"
import Usererweima from "@/components/user/usererweima"
import Addnew from "@/components/index/addnew"
import AddPay from "@/components/user/addPay"
import Customer from "@/components/user/customer"
import Record from "@/components/user/record"
export default[
    {
        path:'/tool',
        mame:'Tool',
        component:Tool,
        meta:{
            title:'展示工具'
        },
    },
    {
        path:'/addPay',
        mame:'AddPay',
        component:AddPay,
        meta:{
            title:'入驻'
        }
    },
    {
        path:'/record',
        mame:'Record',
        component:Record,
        meta:{
            title:'提现记录'
        }
    },
    {
        path:'/addnew',
        mame:'Addnew',
        component:Addnew,
        meta:{
            title:'新增收款码'
        }
    },
    {
        path:'/saveImageone',
        mame:'SaveImageone',
        component:SaveImageone,
        meta:{
            title:'收款码汇总'
        }
    },
    {
        path:'/adjustment',
        mame:'Adjustment',
        component:Adjustment,
        meta:{
            title:'代理信息'
        }
    },
    {
        path:'/erweima',
        mame:'Erweima',
        component:Erweima,
        meta:{
            title:'二维码'
        }
    } , 
    {
        path:'/user/usererweima',
        mame:'Usererweima',
        component:Usererweima,
        meta:{
            title:'用户二维码'
        }
    } ,    
    {
        path:'/cashier',
        mame:'Cashier',
        component:Cashier,
        meta:{
            title:'支付宝收银台'
        }
    } ,  
    {
        path:'/user/customer',
        name:'Customer',
        component:Customer,
        meta:{
            tltle:'代理订单'
        }
    },
    {
         path:'/loan',
         name:'Loan',
        component:Loan,
        meta:{
            title:'信用贷款'
        }
    },
    {
         path:'/query_credit',
         name:'Querycredit',
        component:Querycredit,
        meta:{
            title:'征信查询'
        }
    },
    {
         path:'/increase_cheats',
         name:'Increasecheats',
        component:Increasecheats,
        meta:{
            title:'提额秘籍'
        }
    },
    {
        path:'/simulationBank',
        name:'Simulationbank',
        component:Simulationbank,
        meta:{
            title:'额度评估'
        }
    },
    {
        path:"/studentCreditCard",
        name:"StudentCreditCard",
        component:StudentCreditCard,
        meta:{
            title:"信用卡申请"
        }
    },
    {
        path:"/Cardhistory",
        name:"Cardhistory",
        component:Cardhistory,
        meta:{
            title:"申请记录"
        }
    },
    {
        path:"/peeradd",
        name:"Peeradd",
        component:Peeradd,
        meta:{
            title:"贷款经理"
        }
    },
    {
        path:"/rule",
        name:"Rule",
        component:Rule,
        meta:{
            title:"常见问题"
        }
    },{
        path:'/creditcard',
        name:"Creditcard",
        component:Creditcard,
        meta:{
            title:"办卡中心"
        }
    },{
        path:'/supportCard',
        name:"SupportCard",
        component:SupportCard,
        meta:{
            title:'养卡计划'
        }
    },{
        path:'/bonus',
        name:"Bonus",
        component:Bonus,
        meta:{
            title:'我的分润'
        }
    },{
        path:'/Carddata',
        name:"Carddata",
        component:Carddata,
        meta:{
            title:'提交申请资料'
        }
    }
]