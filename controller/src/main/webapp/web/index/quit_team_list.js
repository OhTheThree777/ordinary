var index = layer.load(0, {
        shade : false
    });
$(function(){
	//加载队伍邀请运动员列表
	$.ajax({
		url:'../../teamIndexController/quit_team_list_person.json',
		data:{},
		async:true,
		cache:false,
		dataType:"json",
		success:function(data){
				noMessages(data.data.map.personList,"person_message_in");
				$.each(data.data.map.personList,function(key,val){
					var id = val.id;
		                var str1=$('<li class="col-lg-4 col-md-6 col-sm-6 col-xs-6 text-center">'
		                        +'  <div class="player-list">'
		                        +'          <div class="player-tx img-circle">'
		                        +'              <div class="img-circle"></div>'
		                        +'              <img src="'+val.personPic+'" class="img'+id+'" >'
		                        +'          </div>'
		                        +'          <a class="btn btn cherk cherk-detail" role="button" onclick="person_approve('+val.id+')">查看详情</a>'
		                        +'          <h4>'+isUndefined(val.personName,"String")+'</h4>'
		                        +'          <div id='+val.id+'></div>'
		                        +'      </div>'
		                        +'  </li>');
						$("#person_message_in").append(str1);
						listPic(id);
				});
				noMessages(data.data.map.coachList,"person_message_no");
				$.each(data.data.map.coachList,function(key,val){
					var id = val.id;
		                var str1=$('<li class="col-lg-4 col-md-6 col-sm-6 col-xs-6 text-center">'
		                        +'  <div class="player-list">'
		                        +'          <div class="player-tx img-circle">'
		                        +'              <div class="img-circle"></div>'
		                        +'              <img src="'+val.coachPortrait+'" class="img-circle'+id+'" >'
		                        +'          </div>'
		                        +'          <a class="btn btn cherk cherk-detail" role="button" onclick="person_approves('+val.id+')">查看详情</a>'
		                        +'          <h4>'+isUndefined(val.name,"String")+'</h4>'
		                        +'          <div id='+val.id+'></div>'
		                        +'      </div>'
		                        +'  </li>');
						$("#person_message_no").append(str1);
						listPic(id);
				});
		}
	});
	layer.close(index);
});

//跳转运动员详情
function person_approve(person_id){
	$.cookie("person_details_id",null,{expires: 7,path: '/'});
	$.cookie('person_details_id', person_id,{expires: 7,path: '/'});
	window.location.href="../../web/person/person-infor.html";
}

//跳转裁判员详情
function person_approves(coach_id){
	$.cookie("coach_id",null,{expires: 7,path: '/'});
    $.cookie("coach_id",coach_id,{expires: 7,path: '/'});
	window.location.href="../../web/coach/coach-infor.html";
}