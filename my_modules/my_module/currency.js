var canadianDollar=0.91;
function roundTwoDecimals(amount){
	return Math.round(amount * 100)/100;
}
//canadianToUS函数
exports.canadianToUS=function(canadian){
	return roundTwoDecimals(canadian * canadianDollar);
}
//USToCanadian也设定在exports模块中
exports.USToCanadian=function(us){
	return roundTwoDecimals(us/canadianDollar);
}

