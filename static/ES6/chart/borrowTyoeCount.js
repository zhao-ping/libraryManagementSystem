let app=new Vue({
    el:"#app",
    data(){
        return {
            info:null,
        }
    },
    methods:{
        getInfo(){
            getData(`/admin/chart/borrow_type`,this,).then(r=>{
                this.info=r;
                this.paintChart();
            })
        },
        paintChart(){
            let data=[];
            this.info.map(item=>{
                data.push({title:item.book_type_name,num:item.count})
            })
            this.info
            var pieDatas = { 
                title: "借阅书籍类型比例环形图",
                defalutIndex:0,
                type:"circle",//pie、circle
                data ,
                callback:function(i){
                    console.log(i);
                }
            }
            new pieChart("chart", pieDatas);
        }
    },
    created(){
        // this.getInfo()
    },mounted(){
        this.getInfo()
        // this.paintChart()
    }
})