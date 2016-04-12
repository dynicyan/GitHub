var curPage = 1,//当前加载页面banner
	stop = true,//出发开发，防止多次调用
	noMoreData = false;//标记是否已经加载完全所有数据

$.ajaxSetup({
	error:function(x,e){
		$('#showRefresh').hide();
		noMoreData = true;
		return false;
	}
})
$(function(){
	$.getJSON("./_source/data/connect.json",function(json){
		$('#showRefresh').hide();
		$('#explist').append(renderHtml(json));//add new content to the html
		stop = true;
	});
});
//js拼接json数据
function renderHtml(json){
	var list = [];
	var items = json.exp;
	//随机排序
	items.sort(function(){
		return 0.5 - Math.random()
	})
	for(var i in items){
		var item = items[i];
		// if(typeof(item.i))
		list.push('<li>'+
			'<div class="time">'+item.ymd+'</div>'+
			'<div class="place">'+item.place+'</div>'+
			'<div class="event">'+item.event+'</div>'+
			'<div class="job">'+item.job+'</div>'+
			'<div class="goal">'+item.goal+'</div>'+
			'<div class="dest">'+item.dest+'</div>'+
			'</li>'
		);
	}
	return list.join('');
}