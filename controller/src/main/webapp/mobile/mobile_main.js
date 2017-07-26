$(function(){
	//赛事
	$.ajax({
        url:'teamIndexController/main_racing?_=1491120323931',
        type:"post",
        data:{},
        async:true,
        cache:false,
        dataType:"json",
        success:function(data){
//        	alert('test');
            $.each(data.data.list,function(i,n){
            	
          var a='  	<li class="am-g am-list-item-desced am-list-item-thumbed am-list-item-thumb-left" id ="main_racing_button">';
		        a+='<div class="am-u-sm-5 am-list-thumb">';
		          a+='<a  class="">';
		            a+='<img width="25" heigh="7" src="'+n.racingPic+'" alt="'+n.racingName+'"/>';
		          a+='</a>      </div>';
		
		        a+='<div class=" am-u-sm-7 am-list-main">';
		            a+='<h3 class="am-list-item-hd"><a  class="">'+n.racingName+'</a></h3>';
					a+='<div class="am-list-item-text">';
						a+='<p>主办方：'+n.organizer+'</p>';
		            	a+='<p>比赛时间：<span style="color:#ff4a00;">'+n.racingBeginTime+'</span></p>';
		            	a+='<p style="display:inline-block;">报名截止：<span style="color:#ff4a00;">'+n.cutOffDate+'</span></p><a href="#more" class="am-fr">去报名 &raquo;</a>';
		            a+='</div>				</div>		      </li>';  
            	
            	
            	
            	 $('#main_racing_append').append(a);
            });
            }
      });
	
	
	
	
	
		//热门球队
	$.ajax({
        url:'teamIndexController/main_team',
        type:"post",
        data:{},
        async:true,
        cache:false,
        dataType:"json",
        success:function(data){
//        	alert('test');
            $.each(data.data.list,function(key,val){
            	var a="<li id='main_hotteam_imgbutton' data-teamid='"+val.id+"' >";            	
            	a+="   <a    class='am-text-center am-circle'>"
            	 a+="   <img class='person_pic big_pic am-img-thumbnail' alt='' src='"+val.teamEmblem+"'  onerror='this.src='"+val.teamEmblem+"'></a>"
            	a+="<small class='am-block'>"+val.areaCode+"</small>"
            	 a+=' </li>'
            	 $('#team_append_div').append(a);
            });
            }
      });
	$(document).on('click','#idname',function(){});
	
	$(document).on('click','#main_hotteam_imgbutton',function(){
//		$.ajax({
//		     url:'teamHomepageController/selectManageTeam.json',
//		     data:{'id':$(this).attr("data-teamid")},
//		     type:"post",
//		     dataType:"json",
//		     success:function(data){
//	
//		     }
//		 });		
		window.location.href="mobile/team_details.html?id="+$(this).attr('data-teamid')+""
//		alert($(this).attr("data-teamid"));
	});
	
	
	//main_pople 热门球员
	$.ajax({
	     url:'teamIndexController/main_pople',
	     type:"post",
	     dataType:"json",
	     success:function(data){
	    	 $.each(data.data.list,function(i,n){
	    		 
//	    		 <li>
//	    		    <a href="person_infor.html" class="am-text-center am-circle"><img class="person_pic am-img-thumbnail am-circle" alt="" src="" onerror='this.src="img/user04.png"'></a>
//	    			<small class="am-block">印度阿三</small>
//	    			<small class="am-block">印度足球俱乐部</small>
//	    		  </li>
//	    		  
	    	 var person='<li id="main_hotperson_button" data-personid="'+n.id+'">';
	    	 person+='<a href="###" class="an-text-center an-circle"> <img class="person_pic am-img-thumbail an-circle" alt="" src= "'+n.personPic+'" onerror="this.src="../img/user04.png"" ';
	    	 person+='<small class="am-block"> '+n.personName+'</small>';
	    	 person+='<small class="am-block">'+n.teamId+'</small>';
	    	 person+='</li>';
	    	 $('#person_append_div').append(person);
	    	 });
	    	 
	     }
	 });
	
	$(document).on('click','#main_hotperson_button',function(){
		window.location.href="mobile/person_infor.html?id="+$(this).attr('data-personid')+""
	})
	
	
	
	//教练
	$.ajax({
	     url:'teamIndexController/main_coach?_=1491118888566',
	     type:"post",
	     dataType:"json",
	     success:function(data){
	    	 $.each(data.data.list,function(i,n){
	    	 var person='<li id="main_hotcoach_button" data-coachid="'+n.id+'">';
	    	 person+='<a href="###" class="an-text-center an-circle"> <img class="person_pic am-img-thumbail an-circle" alt="" src= "'+n.coach_portrait+'" onerror="this.src="../img/user04.png"" ';
	    	 person+='<small class="am-block"> '+n.name+'</small>';
	    	 person+='</li>';
	    	 $('#main_hotcoach_append').append(person);
	    	 });
	    	 
	     }
	 });
	
	$(document).on("click","#main_hotcoach_button",function(){
		window.location.href="mobile/coach_infor.html?id="+$(this).attr('data-coachid')+""
	})
	
	
	
	
	
	
	
	
	
	
});