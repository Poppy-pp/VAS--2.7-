var date;//定义传递数据
function timeTask(){
	date = new Date().getTime();//getTime()方法转为unix时间戳,13位数字,精确到秒
	postMessage(date);//向HTML页面传递数据
	setTimeout("timeTask()",1000);//定时器每秒执行一次
}

timeTask();//调用定时器