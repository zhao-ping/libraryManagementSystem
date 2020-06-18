var app=new Vue({
    el:"#app",
    data:function(){
        return {
            formData:{
                book_name:null,
                student_id:null,
                page:1,
            },
            pager:null,
            list:null,
            currentIndex:0,
            borrowInfo:null,
        }
    },
    methods:{
        downLoad(){
            let pdfEl=document.getElementById("borrowInfo");
            let option={
                margin:2,
                filename:"催还单据.pdf",
                image:{ type: 'jpeg', quality: 0.98 },
                html2canvas:{ scale: 2 },
                jsPDF:{ unit: 'in', format: 'letter', orientation: 'portrait' }
            }
            html2pdf().from(pdfEl).to("pdf").save()
        },
        outTime(time){
            // 计算超时天数，不满一天按照一天计算
            var outTime=Math.round(new Date() / 1000)-time;
            let days=outTime/(60*60*24);
            days=Math.ceil(days)
            return days;
        },
        showBorrowInfo(item,index){
            this.borrowInfo=item;
            this.currentIndex=index;
            this.$refs["pop-borrow"].show()
        },
        reset(){
            this.formData.book_id=null;
            this.formData.book_name=null;
            this.research();
        },
        research(i){
            this.formData.page=i||1;
            this.getList();
        },
        getList(){
            getData('/borrow/list/timeout',this,{formData:this.formData}).then(r=>{
                this.list=r.list;
                this.pager=r.pager;
            })
        }
    },
    created(){
        this.getList()
    },
    mounted(){
    }
})