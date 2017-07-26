var index = layer.load(0, {
    shade : false
});
$(function(){
	var pageSize = 9;

	//全部信息
	$(function(){
		//加载第一页数据并得到总页数
		Init();
	});
		//加载初始化分页设置总页数
	function redeploy(TotalPage){
		$('.M-box3').pagination({
	        pageCount:TotalPage,
	        jump:true,
	        coping:true,
	        count:5,
	        prevContent:'上页',
	        nextContent:'下页',
	        callback:PageCallback
	    });
		
	}

	function Init(){
	   	$.ajax({
	   		type:"post",
			url:'../../teamIndexController/invite_team_racing',
			data:{'pageIndex':1,'pageSize':pageSize},
			dataType:"json",
			success:function(data){
			        	$("#more_racing").children().hide(); 
			        	redeploy(data.page);
			        	ergodic(data);
			}
		});
	}
		//回调函数
	function PageCallback(pageIdex){
		$.ajax({
			type:"post",
			url:'../../teamIndexController/invite_team_racing',
			data:{'pageIndex':pageIdex.getCurrent(),'pageSize':pageSize},
			dataType:"json",
			success:function(data){
				//再次获取并设置总页数防止数据改动
				pageIdex.setTotalPage(data.page);
				$("#more_racing").children().hide(); 
				ergodic(data);
			}
		});
	}
		//遍历数据
	function ergodic(data){
		concealPagination(data.rows);
		noMessages(data.rows,"more_racing");
		concealPagination(data.rows);
		$.each(data.rows,function(key,val){
			var id =val.id;
			var str=$('<li class="col-md-4 col-sm-6 col-xs-12">'
				+'			<div class="team clearfix">'
				+'				<img class="img'+id+'" src="'+incisionPicture(val.racing_pic)+'"/>'
				+'					<div class="hover-tit">'
				+'						<p>'+val.racing_name+'</p>'
				+'						<div class="text-center">'
				+'							<a class="btn cherk1 join_cherk" onclick="details('+val.id+','+val.user_id+')">查看详情</a>'
				+'						</div>'
				+'					</div>'
				+'			</div>'
				+'		</li>');
			$("#more_racing").append(str);
			var src = $(".img"+id+"").attr("src");    //获取图片路径
			 $(".img"+id+"").error(function() { 
				 $(".img"+id+"").attr("src", "../../img/zanwu.jpg"); 
				 }); 
		});
		layer.close(index);
	}
});

//查看竞赛详情
function details(racing_id,user_id){
	$.session.set('Racing_Id',racing_id)
	$.session.set('User_Id',user_id)
	window.location.href="../../web/ss/front_project_details.html";
}