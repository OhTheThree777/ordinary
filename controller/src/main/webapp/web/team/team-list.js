var pageSize = 12;
var projectId =$.cookie("projectId");
var occupationId = $.session.get("occupationId");
var personflag = $.session.get("personFlag");
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
	var index = layer.load(0, {
	    shade : false
	});
   	$.ajax({
   		type:"post",
		url:'../../teamIndexController/more_team',
		data:{'pageIndex':1,'pageSize':pageSize},
		dataType:"json",
		success:function(data){
		        	redeploy(data.page);
		        	ergodic(data);
		        	layer.close(index);
		}
	});
}
	//回调函数
function PageCallback(pageIdex){
	var index = layer.load(0, {
	    shade : false
	});
	$.ajax({
		type:"post",
		url:'../../teamIndexController/more_team',
		data:{'pageIndex':pageIdex.getCurrent(),'pageSize':pageSize},
		dataType:"json",
		success:function(data){
			//再次获取并设置总页数防止数据改动
			pageIdex.setTotalPage(data.page);
		        	ergodic(data);
		        	layer.close(index);
		}
	});
}
	//遍历数据
function ergodic(data){
	noMessages(data.rows,"more_team");
	concealPagination(data.rows);
	var personFlag = $.session.get("personFlag");
	$("#more_team").children().remove();
	$.each(data.rows,function(key,val){
		var id = val.id;
		var str=$('<li class="col-md-3 col-sm-6 col-xs-12">'
			+'			<div class="team clearfix">'
			+'				<img class="img'+id+'" src="'+val.teamEmblem+'"/>'
			+'					<div class="hover-tit">'
			+'						<p>'+val.teamName+'</p>'
			+'						<div id="particulars'+id+'" class="text-center">'
			+'							<a class="btn cherk1 join_cherk" onclick="details('+val.id+')">查看详情</a>'
			+'						</div>'
			+'						<div class="text-center" >'
			+'						</div>'
			+'					</div>'
			+'			</div>'
			+'		</li>');
		$("#more_team").append(str);
		if(undefined == data.data.map.teamId & projectId ==undefined & personflag !="5" & personflag !="4" & personflag !="3"){
			$("#"+"particulars"+id).append("<button id='btn-jiaru"+id+"' class='btn cherk1' onclick='join("+val.id+")'>加入球队</button>");
		}
		if(undefined == data.data.map.teamId){
			if(projectId ==undefined || projectId =="null"){
			}else{
				$("#"+"particulars"+id).append("<button id='btn-jiaru"+id+"' class='btn cherk1' onclick='invite_team("+val.id+")'>邀请球队</button>");
			}
		}
		var src = $(".img"+id+"").attr("src");    //获取图片路径
		 if(src == "" || undefined==src){
		        $(".img"+id+"").attr("src","../../img/zanwu.jpg");
		    }
		 $(".img"+id+"").error(function() { 
			 $(".img"+id+"").attr("src", "../../img/zanwu.jpg"); 
			 }); 
		if(4==personFlag || 3==personFlag){
			$("#"+"btn-jiaru"+id).hide();
		}
	});
	
}
//查看更多球队详情
function details(team_id){
	$.cookie('team_details_id', null,{expires: 7, path: '/' });
    $.cookie('team_details_id', team_id,{expires: 7, path: '/' });
	window.location.href="../../web/team/my_team/tean-infor-manage.html";
}

//更多球队申请加入
function join(team_id){
    swal({// 弹出提示框提示用户是否确认删除
        title : "确定要申请该球队吗？",
        text : "马上提交申请，确定要这样做么！",
        type : "warning",
        showCancelButton : true,
        confirmButtonColor : "#DD6B55",
        confirmButtonText : "确定",
        cancelButtonText : "取消",
        closeOnConfirm : true,
        closeOnCancel : true
    }, function(isConfirm) {
        if (isConfirm) {
         //   swal.close()
        	var index = layer.load(0, {shade : false });
            $.ajax({
                type:"POST",
                url:'../../JoinTeamController/join_team',
                data:{row_teamId : team_id},
                dataType:"json",
                success:function(data){
                    if (1==data.status){
                    	swal({
     					   title:"加入球队!",
     					   text:"球队申请已递交到该球队",
     					   type:"success",
     					   confirmButtonText:"确定"
     				   });
                    }else{
                    	swal({
     					   title:"已申请该球队!",
     					   text:data.msg,
     					   type:"error",
     					   confirmButtonText:"确定"
     				   });
                    }
                    layer.close(index);
                }
            });
        }
    });
}

//******************************************************************************邀请球队************************************************************************
function invite_team(teamId){
	$.ajax({
   		type:"post",
		url:'../../JoinTeamController/invite_team.json',
		data:{'teamId':teamId,'projectId':projectId},
		dataType:"json",
		success:function(data){
		        	alert("邀请");
		}
	});
}

//模糊查询
$("#seek_btn").click(function(){
	var index = layer.load(0, {
	    shade : false
	});
	var teamName=$("#seek").val();
	$.ajax({
		type:"post",
		url:'../../teamIndexController/more_team',
		data:{'pageIndex':1,'pageSize':pageSize,'teamName':teamName},
		dataType:"json",
		success:function(data){
		        	redeploy(data.page);
		        	ergodic(data);
		        	layer.close(index);
		}
	});
});

