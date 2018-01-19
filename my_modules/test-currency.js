//用路径./表明模块跟程序脚本放在同一目录下
var currency=require('my_module/currency');

console.log('50 Canadian dollars equals this amount of US dollars:');
//使用currency模块的canadianToUS函数
console.log(currency.canadianToUS(50));

console.log('30 US dollars equals this amount of Canadian dollars:');

//使用currency模块的USToCanadian函数
console.log(currency.USToCanadian(30));