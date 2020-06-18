var app=new Vue({
    el:"#app",
    data:function(){
        return {
            book_types:[],
            formData:{
                book_name:null,
                book_author:null,
                book_price:50,
                book_type_id:1,
                book_count:1,
                admin_id:1,
            },
        }
    },
    methods:{
        getBookTypes(){
            getData('/book/type/list',this,{formData:this.formData}).then(r=>{
                this.book_types=r;
            })
        },
        newBook(){
            getData('/book/new',this,{method:"post",formData:this.formData}).then(r=>{
                this.$toast("新书入库成功");
            })
        }
    },
    created(){
        this.getBookTypes();
    },
    mounted(){
        
    }
})