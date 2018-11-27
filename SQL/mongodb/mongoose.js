const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/mydb';

let Schema = mongoose.Schema;

//定义Schema
let mySchema = new Schema({
    title: String,
    author: String,
    body: String,
    comments: [{body: String,date: Date}],
    date: {type: Date, default: Date.now},
    hidden: Boolean,
    meta: {
        votes: Number,
        favs: Number
    }
})
mySchema.add({name: 'string', color: 'string', price: 'number'});


//断开连接
let disConnect = ()=>{
    mongoose.disconnect(function(){
        console.log("断开连接");
    })
}

mongoose.connect(url, { useNewUrlParser: true }, function(err){
    if(err){
        console.log('连接失败');
    }else{
        console.log('连接成功');
        //添加文档
        
        mySchema.methods.findSimilarTitles = function(cb){
            return this.model('myModel').find({title:this.title},cb);
        }
        let myModel = mongoose.model('myModel',mySchema); //这句要放在自定义方法后面！
        let doc1 = new myModel({title:'addressTest',name:'吴先生'});
        // doc1.save(function(err,doc){
        //     console.log(doc);
        //     disConnect();
        // })
        //查找文档 ，自定义方法findSimilarTitles
        doc1.findSimilarTitles(function(err,docs){
            console.log(docs);
            docs.forEach(function(item,index,arr){
                console.log(item.title)        
            })
            disConnect();
        })
        
    }
});
