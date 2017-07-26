var Team_Id = $.session.get("Team_Id");
$(function(){
	//加载队伍详细信息
	$.ajax({
		url:'../../teamHomepageController/selectObjById.json',
		data:{'id':Team_Id},
		async:true,
		cache:false,
		dataType:"json",
		success:function(data){
			bindDiv("div_team", data.data.obj);
			if (data.data.obj.teamType != "") {
				$("#teamtype").append(queryTeamTypes(data.data.obj.teamType));
			}
			Angela();
		}
	});
});


//*****************************************************************************加载参赛的人员******************************************************************************
//查询报名表得到报名ID
function Angela(){
	var product_id = $.session.get("ProductId");
	var racing_id = $.session.get("RacingId");
//	$.session.remove("ProductId");
//	$.session.remove("RacingId");
	$.ajax({
 		type:"post",
		url:'../../ssRacingProductSignController/querykeywordsign.json',
		data:{
			'teamId':Team_Id,
			'productId':product_id,
			'racingId':racing_id
			},
		dataType:"json",
		success:function(data){
			if($.isEmptyObject(data.data.map)==false){

				
                var str=$('<li class="col-lg-4 col-md-6 col-sm-6 col-xs-6 text-center">'
                        +'  	<div class="player-list">'
                        +'          <div class="player-tx img-circle">'
                        +'              <div class="img-circle"></div>'
                        +'              <img src='+data.data.map.coach_pic+'>'
                        +'          </div>'
                        +'          <a class="btn cherk cherk-detail" role="button" onclick="detail('+data.data.map.id+')">查看详情</a>'
                        +'          <h4>'+isUndefined(data.data.map.coach_name,"String")+'</h4>'
                        +'      </div>'
                        +'  </li>');
				
				$('#list-inline').append(str);
			}else{
				$('#list-inline').append("<div class='weui-loadmore weui-loadmore_line'><span class='weui-loadmore__tips'>暂无数据</span></div>");
			}
			
			noMessages(data.data.list,"ybm_list");
			$.each(data.data.list,function(k,v){
				var Str = '<tr onclick="detailPerson('+v.person_id+')">'
				+'			<th><img class="img-circle img-thumbnail ybmlist_img" src='+v.person_pic+'>'+v.person_name+'</th>'
		  		+'			<td>'+v.place+'</td>'
		  		+'			<td>'+v.person_number+'号</td>';
				+'			</tr>'
			$("#ybm_list").append(Str);
			});
			
		}
			
	});
}
//查询队伍类型
function queryTeamTypes(teamType){
	var jsonObject;
	$.ajax({
		type: "POST",
		 url : "../../JoinTeamController/queryTeamType",
	    dataType : "json",
	        data : {
	            'teamType' : teamType
	        },
		async: false,  
		success: function(json)
		{
			jsonObject= json.data.map.name;
		}
	}); 
	return jsonObject;
}

//*************************************************************************教练详情****************************************************************************
function detail(coach_id){
	$.cookie('coach_id', coach_id, {expires: 7, path: '/'});//新建一个cookie
	window.location.href='../../web/coach/coach-infor.html';
}

//*************************************************************************球员详情****************************************************************************
function detailPerson(person_id){
	$.cookie('person_details_id', person_id, {expires: 7, path: '/'});//新建一个cookie
	window.location.href='../../web/person/person-infor.html';
}

