let app=new Vue({
    el:"#app",
    data(){
        return {
            info:null,
        }
    },
    methods:{
        getInfo(){
            getData(`/admin/chart/most_popular_books`,this,).then(r=>{
                this.info=r;
                this.paintChart();
            })
        },
        paintChart(){
            let xData=[];
            let nums=[]
            this.info.map(item=>{
                xData.push(item.book_name.length<4?item.book_name:item.book_name.substring(0,3)+'...')
                nums.push(item.count)
            })
            var lineChartOption = {
                title: "最受欢迎的图书",
                xAxis: {
                    data: xData
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    name: '最受欢迎的图书',
                    data: nums,
                    type: 'area',//line or area
                }]
            };
            //柱状图
            new lineChart("chart", {...lineChartOption,type:"horizon"});
        }
    },
    created(){
        // this.getInfo()
    },mounted(){
        this.getInfo()
        // this.paintChart()
    }
})