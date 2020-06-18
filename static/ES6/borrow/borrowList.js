var app=new Vue({
    el:"#app",
    data:function(){
        return {
            formData:{
                book_id:null,
                book_name:null,
                student_id:null,
                page:1,
            },
            pager:null,
            list:null,
        }
    },
    methods:{
        backBook(borrow,bookIndex){
            this.$confirm(`确认学生 ${borrow.student_name} 归还书籍《${borrow.book_name}》!`).then(r=>{
                 let formData={
                    borrow_id:borrow.borrow_id
                }
                getData(`/borrow/back`,this,{method:"put",formData}).then(r=>{
                    this.list[bookIndex].borrow_state=0;
                })
            })
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
            getData('/borrow/list',this,{formData:this.formData}).then(r=>{
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