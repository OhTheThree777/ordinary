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
			url:'../../teamIndexController/invite_team',
			data:{'pageIndex':1,'pageSize':pageSize},
			dataType:"json",
			success:function(data){
			        	$("#more_team").children().hide(); 
			        	redeploy(data.page);
			        	ergodic(data);
			}
		});
	}
		//回调函数
	function PageCallback(pageIdex){
		$.ajax({
			type:"post",
			url:'../../teamIndexController/invite_team',
			data:{'pageIndex':pageIdex.getCurrent(),'pageSize':pageSize},
			dataType:"json",
			success:function(data){
				//再次获取并设置总页数防止数据改动
				pageIdex.setTotalPage(data.page);
				$("#more_team").children().hide(); 
			        	ergodic(data);
			}
		});
	}
		//遍历数据
	function ergodic(data){
		concealPagination(data.rows);
		noMessages(data.rows,"more_team");
			layer.close(index);
		$.each(data.rows,function(key,val){
			var id =val.id;
			var str=$('<li class="col-md-4 col-sm-6 col-xs-12">'
				+'			<div class="team clearfix">'
				+'				<img class="img'+id+'" src="'+val.team_emblem+'"/>'
				+'					<div class="hover-tit">'
				+'						<p>'+val.team_name+'</p>'
				+'						<div class="text-center">'
				+'							<a class="btn cherk1" onclick="details('+val.id+')">查看详情</a></br>'
				+'							<a class="btn cherk1 join_cherk" onclick="consent('+val.id+')">同意加入</a>'
				+'							<a class="btn cherk1 disagree" onclick="disagree('+val.id+')">拒绝加入</a>'	
				+'						</div>'
				+'					</div>'
				+'			</div>'
				+'		</li>');
			$("#more_team").append(str);
			var src = $(".img"+id+"").attr("src");    //获取图片路径
			 if(src == "" || undefined==src){
			        $(".img"+id+"").attr("src","../../img/zanwu.jpg");
			    }
			 $(".img"+id+"").error(function() { 
				 $(".img"+id+"").attr("src", "../../img/zanwu.jpg"); 
				 }); 
			$("#"+'invite_btn'+id).hide();
			$("#"+'invite_btno'+id).hide();
		});
		layer.closeAll('page');
		layer.close(index);
	}
});

//查看更多球队详情
function details(team_id){
	$.cookie('team_details_id', null,{expires: 7, path: '/' });
    $.cookie('team_details_id', team_id,{expires: 7, path: '/' });
    $.cookie('yaoqingxiangqing', 1,{expires: 7, path: '/' });
	window.location.href="../../web/team/my_team/tean-infor-manage.html";
}


//同意加入
function consent(team_id){
	var index = layer.load(0, {
        shade : false
    });
    $.ajax({
        url:'../../teamIndexController/consent.json',
        type:'post',
        data:{
            'teamId':team_id,
        },
        dataType:'json',
        success:function(data){
        	swal({
				title :"反馈成功",
				text : "已向队伍反馈为通过！",
				type : "success",
				confirmButtonText : "确定"
			},function(){
				window.location.href='../../web/team/my_team/tean-infor-manage.html';
			});
            layer.closeAll('page');
            layer.close(index);
        },
        error:function(){
            layer.close(index);
            lrError("添加失败！服务器错误！");
        }
    });
}
//拒绝加入
function disagree(team_id){
	var index = layer.load(0, {
        shade : false
    });
	$.ajax({
        url:'../../teamIndexController/disagree.json',
        type:'post',
        data:{
            'teamId':team_id,
        },
        dataType:'json',
        success:function(data){
        	swal({
				title :"反馈成功",
				text : "已向队伍反馈为拒绝！",
				type : "success",
				confirmButtonText : "确定"
			},function(){
				 window.location.reload();//刷新当前页面.
			});
//            var s1='<button type="button" id="btn-1" class="btn btn-success pull-right">已拒绝</button>';
//			$("#toolbar").append(s1);
            layer.closeAll('page');
            layer.close(index);
        },
        error:function(){
            layer.close(index);
            lrError("添加失败！服务器错误！");
        }
    });
}