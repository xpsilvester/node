const MongoClient = require('mongodb').MongoClient;
//连接mydb数据库
const url = "mongodb://localhost:27017/mydb";
//数据库名称
const dbaseName = "mydb";

//创建集合(表)
let createTable = (name)=>{
    MongoClient.connect(url,{ useNewUrlParser: true }, function (err, db) {
        if (err) throw err;
        console.log('数据库已创建');
        var dbase = db.db(dbaseName);
        dbase.createCollection(name, function (err, res) {
            if (err) throw err;
            console.log("创建集合"+name+"成功!");
            db.close();
        });
    });
}

//插入数据 name集合名称，data数据
let insertData = (name,data)=>{
    MongoClient.connect(url,{ useNewUrlParser: true },function(err, db) {
        if (err) throw err;
        var dbo = db.db(dbaseName);

        if(Array.isArray(data)){//判断是否为多条数据
            dbo.collection(name).insertMany(data, function(err, res) {
                if (err) throw err;
                console.log("插入的文档数量为: " + res.insertedCount);
                console.log(data);
                db.close();
            });
        }else if(typeof data === 'object'){
            dbo.collection(name).insertOne(data, function(err, res) {
                if (err) throw err;
                console.log("文档插入成功");
                console.log(data);
                db.close();
            });
        }
    });
}

//查询数据库 name集合名称，opt条件，sort排序条件1:升序、-1:降序
let searchData = (name,opt,sort)=>{
    sort = typeof sort == 'object' ? sort : {};
    MongoClient.connect(url,{ useNewUrlParser: true },function(err, db) {
        if (err) throw err;
        var dbo = db.db(dbaseName);
        dbo.collection(name). find(opt).sort(sort).toArray(function(err, result) { // 返回集合中所有数据
            if (err) throw err;
            console.log("查询条件为:"+JSON.stringify(opt));
            console.log("查询"+name+"集合成功");
            console.log(result);
            db.close();
        });
    });
}

//更新数据库 name集合名称，opt查询条件，data更新数据
let updateData = (name,opt,data)=>{
    MongoClient.connect(url,{ useNewUrlParser: true },function(err, db) {
        if (err) throw err;
        var dbo = db.db(dbaseName);
        var updateStr = {$set: data};
        //更新所有符合条件文档，（更新一条用updateOne）
        dbo.collection(name).updateMany(opt, updateStr, function(err, res) {
            if (err) throw err;
            console.log("文档更新成功");
            console.log("集合:"+name+"更新条件:"+JSON.stringify(opt)+",更新内容:"+JSON.stringify(data));
            db.close();
        });
    });
}

//删除文档 name集合名称，opt查询条件
let deleteData = (name,opt)=>{
    MongoClient.connect(url,{ useNewUrlParser: true },function(err, db) {
        if (err) throw err;
        var dbo = db.db(dbaseName);
        //删除所有符合条件的文档，（删除一条用deleteOne）
        dbo.collection(name).deleteMany(opt, function(err, obj) {
            if (err) throw err;
            console.log("集合"+name+"条件："+JSON.stringify(opt)+"，"+obj.result.n+"条文档删除成功");
            db.close();
        });
    });
}

//删除集合 name集合名称
let deleteTable = (name)=>{
    MongoClient.connect(url,{ useNewUrlParser: true },function(err, db) {
        if (err) throw err;
        var dbo = db.db(dbaseName);
        // 删除集合
        dbo.collection(name).drop(function(err, delOK) {  // 执行成功 delOK 返回 true，否则返回 false
            if (err) throw err;
            if (delOK) console.log("集合"+name+"已删除");
            db.close();
        });
    });
}

//连接集合，table1集合1，table2集合2，name1,name2相同字段名称，新字段名称
let unionTable = (table1,tbale2,name1,name2,newTable)=>{
    MongoClient.connect(url,{ useNewUrlParser: true },function(err, db) {
        if (err) throw err;
        var dbo = db.db(dbaseName);
        dbo.collection(table1).aggregate([
          { $lookup:
             {
               from: tbale2,          // 右集合
               localField: name1,     // 左集合 join 字段
               foreignField: name2,   // 右集合 join 字段
               as: newTable           // 新生成字段（类型array）
             }
           }
          ]).toArray(function(err, res) {
          if (err) throw err;
          console.log(JSON.stringify(res));
          db.close();
        });
      });
}

//createTable("test"); 
//insertData("uidk",[{ name: "xpsilvester", score: 100 },{name:"xp",score:90}]);
//searchData("uidi",{name:"xpsilvester"},{url:-1});
//updateData("site",{name:"xp"},{url:"xp.com"});
//deleteData("site",{name:"xp"});
//unionTable("uidi","uidk","name","name1","uids");
//deleteTable("test");

