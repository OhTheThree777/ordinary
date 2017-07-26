var index = layer.load(0, {
        shade : false
    });
$(function(){
	//加载队伍邀请运动员列表
	$.ajax({
		url:'../../teamIndexController/invite_team_person',
		data:{},
		async:true,
		cache:false,
		dataType:"json",
		success:function(data){
			noMessages(data.data.list,"person_message_in");
			$.each(data.data.list,function(key,val){
				var id = val.id;
	                var str1=$('<li class="col-lg-4 col-md-6 col-sm-6 col-xs-6 text-center">'
	                        +'  <div class="player-list">'
	                        +'          <div class="player-tx img-circle">'
	                        +'              <div class="img-circle"></div>'
	                        +'              <img src="'+val.person_pic+'" class="img'+id+'" >'
	                        +'          </div>'
	                        +'          <a class="btn btn cherk cherk-detail" role="button" onclick="person_approve('+val.person_id+','+data.data.map.myteam_id+')">查看详情</a>'
	                        +'          <h4>'+isUndefined(val.person_name,"String")+'</h4>'
	                        +'          <div id='+val.id+'></div>'
	                        +'      </div>'
	                        +'  </li>');
					$("#person_message_in").append(str1);
					listPic(id);
			});
		}
	});
	
	//加载队伍邀请教练员列表
	$.ajax({
		url:'../../teamIndexController/invite_team_coach',
		data:{},
		async:true,
		cache:false,
		dataType:"json",
		success:function(data){
			noMessages(data.data.list,"person_message_no");
			$.each(data.data.list,function(key,val){
				var id = val.id;
	                var str1=$('<li class="col-lg-4 col-md-6 col-sm-6 col-xs-6 text-center">'
	                        +'  <div class="player-list">'
	                        +'          <div class="player-tx img-circle">'
	                        +'              <div class="img-circle"></div>'
	                        +'              <img src="'+val.coach_portrait+'" class="img-circle'+id+'" >'
	                        +'          </div>'
	                        +'          <a class="btn btn cherk cherk-detail" role="button" onclick="person_approves('+val.coach_id+','+data.data.map.myteam_id+')">查看详情</a>'
	                        +'          <h4>'+isUndefined(val.name,"String")+'</h4>'
	                        +'          <div id='+val.id+'></div>'
	                        +'      </div>'
	                        +'  </li>');
					$("#person_message_no").append(str1);
					listPic(id);
			});
		}
	});
	layer.closeAll('page');
	layer.close(index);
	
});

//跳转运动员详情
function person_approve(person_id,team_id){
	$.cookie("person_details_id",null,{expires: 7,path: '/'});
	$.cookie('person_details_id', person_id,{expires: 7,path: '/'});
	window.location.href="../../web/person/person-infor.html";
}

//跳转裁判员详情
function person_approves(coach_id,team_id){
	$.cookie("coach_id",null,{expires: 7,path: '/'});
    $.cookie("coach_id",coach_id,{expires: 7,path: '/'});
	window.location.href="../../web/coach/coach-infor.html";
}