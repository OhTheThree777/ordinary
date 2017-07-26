$(function(){
//获取url中的参数
	function getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
	var r = window.location.search.substr(1).match(reg); //匹配目标参数
	if (r != null) return unescape(r[2]); return null; //返回参数值
	}

	var a =getUrlParam("id");
	//球队详细信息
	$.ajax({
		url:'../teamHomepageController/selectManageTeam.json',
		data:{'id':a},
		type:"post",
		dataType:"json",
		success:function(data){
			var  imgdata=' <p class="am-align-left">'
					imgdata+= '<img class="team_pic" src="'+data.data.obj.teamEmblem+'" alt=""/>   	  </p>'
					imgdata+=  '<h2 class="team_name">'+data.data.obj.teamName+'</h2>'
					imgdata+=	 ' <small>'+isUndefined(data.data.obj.teamIntroduction,"String")+'</small>'
			$('#team_details_img_append').append(imgdata);
			var  baseinfo='<p><small>所在地区：&nbsp;'+data.data.obj.areaCode+'</small></p>'
					baseinfo+='<p><small>成立时间：&nbsp;'+data.data.obj.teamCreatTime+'</small></p>'
					baseinfo+='<p><small>领队人：&nbsp;'+data.data.obj.teamLeader+'</small></p>'
					baseinfo+='<p><small>运动项目：&nbsp;足球</small></p>'
//	    			 运动项目根据teamtype设的 判断 123 来的数据也有问题
			$('#team_details_baseinfo_append').append(baseinfo);
//	    	 alert(data.data.map.sex);

		}
	});
//正式队员selectPerson
	$.ajax({
		url:'../teamHomepageController/selectPerson.json',
		data:{'id':a},
		type:"post",
		dataType:"json",
		success:function(data){
			$.each(data.data.list,function(i,n){
				var person='<li>';
				person+='<a href="###" id="teamperson" data-id="'+n.id+'"  class="an-text-center an-circle"> <img class="person_pic am-img-thumbail an-circle" alt="" src= "'+n.person_pic+'" onerror="this.src="../img/user04.png"" ';
				person+='<small class="am-block"> '+n.person_name+'</small>';
				person+='<small class="am-block">'+n.person_prop+'</small>';
				person+='</li>';
				$('#personappend').append(person);
			});

		}
	});
	
	$(document).on('click','#teamperson',function(){
		window.location.href="person_infor.html?id="+$(this).attr('data-id')+"";
	})


//教练selectCoach
	$.ajax({
		url:'../teamHomepageController/selectCoach.json',
		data:{'id':a},
		type:"post",
		dataType:"json",
		success:function(data){
			$.each(data.data.list,function(i,n){
				var person='<li id="teamcoach" data-id="'+n.id+'">';
				person+='<a href="###" class="an-text-center an-circle"> <img class="person_pic am-img-thumbail an-circle" alt="" src= "'+n.coach_portrait+'" onerror="this.src="../img/user04.png"" ';
				person+='<small class="am-block"> '+n.name+'</small>';
				person+='</li>';
				$('#coachappend').append(person);
			});

		}
	});
	
	$(document).on('click','#teamcoach',function(){
		window.location.href="person_infor.html?id="+$(this).attr('data-id')+"";
	})


//新队员selectNewPerson
	$.ajax({
		url:'../teamHomepageController/selectNewPerson.json',
		data:{'dangqian_team_id':a},
		type:"post",
		dataType:"json",
		success:function(data){
			$.each(data.data.list,function(i,n){
				var person='<li  >';
				person+='<a href="###" class="an-text-center an-circle"  > <img class="person_pic am-img-thumbail an-circle" alt="" src= "'+n.person_pic+'" onerror="this.src="../img/user04.png"" ';
				person+='<small class="am-block"> '+n.person_name+'</small>';
				person+='</li>';
				$('#newpersonappend').append(person);
			});

		}
	});

	







})


