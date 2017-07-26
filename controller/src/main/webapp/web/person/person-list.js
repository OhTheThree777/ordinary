var pageSize = 9;
var personflag = $.session.get("personFlag");
var Anna;
//全部信息
$(function(){
	Anna = $.session.get("Anna");
	//删除session中的Anna
	$.session.remove("Anna");
	//加载第一页数据并得到总页数
	
	Init(Anna)
	//数据字典下拉选
	//getCodes('../','job_type','jobType');
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
		url:'../../teamIndexController/more_pople',
		data:{'pageIndex':1,'pageSize':pageSize,'state':Anna},
		dataType:"json",
		success:function(data){
		        	$("#more_person").children().remove(); 
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
	//获取下拉选进行分类查询
	//var personOccupation=$("#jobType").val();
	var personName=$("#seek").val();
	$.ajax({
		type:"post",
		url:'../../teamIndexController/more_pople',
		data:{'pageIndex':pageIdex.getCurrent(),'pageSize':pageSize,'personName':personName,'state':Anna},
		dataType:"json",
		success:function(data){
			//再次获取并设置总页数防止数据改动
			pageIdex.setTotalPage(data.page);
			$("#more_person").children().remove(); 
		        	ergodic(data);
			layer.close(index);
		}
	});
}



	//遍历数据
function ergodic(data){
	concealPagination(data.rows);
	noMessages(data.rows,"more_person");
	$.each(data.rows,function(key,val){
		var id=val.id
		var str=$('<li class="col-md-4 col-sm-6 col-xs-12">'
				+'		<div class="clearfix player-ctt">'
				+'			<div class="col-xs-6 player-head clearfix">'
				+'				<a href="javascript:;">'
				+'					<img src="'+val.person_pic+'" class="img-circle img'+id+'" />'
				+'						<div class="img-circle"><button type="button" class="btn cherk" onclick="detail('+val.id+')">查看详情</button></div>'
				+'				</a>'
				+'				<div id="lanxin'+id+'" class="btn-success player-state">'+getCodeKey('../../','athlete_state',''+val.person_state+'')+'</div>'
				+'			</div>'
				+'			<div class="col-xs-6 player-infor clearfix" id="cocklebur'+id+'">'
				+'				<dl>'
				+'					<dt>'+isUndefined(val.person_name,"String")+'</dt>'
				+'					<dd>'
				+'						<p>位置:'+isUndefined(getAttributServerList(id),"String")+'</p><p>年龄:'+isUndefined(countAge(val.person_birthday),"String")+'</p><p>身高:'+isUndefined(val.person_height,"String")+'cm</p>'//类型:<p>'+val.personProp+'</p>
				+'					</dd>'
				+'				</dl>'
				+'				<button type="button" class="btn btn-success pull-left player-invite" id="invite_btn'+id+'" onclick="invite('+val.id+')">邀请</button>'
				+'				<button type="button" class="btn btn-danger pull-left player-invite" id="invite_btno'+id+'" disabled="disabled">已邀请</button>'
				+'				<button type="button" class="btn btn-danger pull-left player-invite" id="invite_btnto'+id+'" disabled="disabled">申请中</button>'
				+'			</div>'
				+'	</div>'
				+'</li>');
		$("#more_person").append(str);
		listPic(id);
		$("#"+'invite_btn'+id).hide();//邀请
		$("#"+'invite_btno'+id).hide();//已邀请
		$("#"+'invite_btnto'+id).hide();//申请中
		//人员状态样式
		var personState = val.person_state;
		if(1==personState){
        	$("#"+'lanxin'+id).addClass("current_state");
        }else if(2==personState){
        	$("#"+'lanxin'+id).addClass("current_state btn-info");
        }else if(3==personState){
        	$("#"+'lanxin'+id).addClass("current_state btn-danger");
        }
		if(3 !=personflag){
		//已邀请
		var my_teamId=data.data.map.my_teamId;
		if(undefined !=my_teamId){
			var a =val.b_team_id;
			if(undefined !=a){
				if(my_teamId ==val.team_id_g & 2==val.invitation_status_g & 1==val.person_state & 0==val.team_check_g){
					$("#"+'invite_btno'+id).show();
				}else if(my_teamId ==val.team_id_g & 1==val.invitation_status_g & 1==val.person_state & 0==val.team_check_g){
					$("#"+'invite_btnto'+id).show();
				}else if(1==val.person_state){
					$("#"+'invite_btn'+id).show();
				}
			}else if(undefined==val.team_name && 1==val.person_state){
				$("#"+'invite_btn'+id).show();
			}
		}
	}
		//正式进入（队伍）
		if(undefined !=val.team_name && 2==val.person_state){
				var str= $("<button class='btn btn-info player-invite1 btn-block pull-left'>"+val.team_name+"</button>");
				$("#"+'cocklebur'+id).append(str);
				$("#"+'invite_btn'+id).hide();
				$("#"+'invite_btno'+id).hide();
				$("#"+'invite_btnto'+id).hide();
		}
	});
}
//姓名查询
$("#seek_btn").click(function(){
	var index = layer.load(0, {
	    shade : false
	});
	var personName=$("#seek").val();
	$.ajax({
		type:"post",
		url:'../../teamIndexController/more_pople',
		data:{'pageIndex':1,'pageSize':pageSize,'personName':personName,'state':Anna},
		dataType:"json",
		success:function(data){
		        	$("#more_person").children().remove(); 
		        	redeploy(data.page);
		        	ergodic(data);
		        	layer.close(index);
		}
	});
});

//更多球员查看运动员详情
	function detail(person_id){
		$.cookie("person_details_id",null,{expires: 7,path: '/'});
		$.cookie('person_details_id', person_id,{expires: 7,path: '/'});
		window.location.href="person-infor.html";
	}
	
	//获取运动员的场上信息
	//从服务器获取值(list页面)
	function getAttributServerList(personId){
		var jsonObject;
		$.ajax({
			type: "POST",
			 url : "../../personInfoController/queryLocation.json",
		    dataType : "json",
		        data : {
		            'personId' : personId
		        },
			async: false,  
			success: function(json)
			{
				jsonObject= json.data.map.place;
			}
		}); 
		return jsonObject;
	}
	
