/**
 * 
 */
$(function(){
		//球队列表more_team  teamappend
  	
	$.ajax({
	     url:'../teamIndexController/more_team',
	     data:{'pageIndex':1,'pageSize':100},
	     type:"post",
	     dataType:"json",
	     success:function(data){
	    	 $.each(data.rows,function(i,n){
	    	 var person='<li id="more_moreteam_button" data-teamid="'+n.id+'">';
	    	 person+='<a href="###" class="an-text-center an-circle"> <img class="person_pic am-img-thumbail an-circle" alt="" src= "'+n.teamEmblem+'" onerror="this.src="../img/user.png"" ';
	    	 person+='<small class="am-block"> '+n.teamName+'</small>';
	    	 person+='</li>';
	    	 $('#teamappend').append(person);
	    	 });
	    	 
	     }
	 });
	
	
	$(document).on('click','#more_moreteam_button',function(){
		window.location.href="team_details.html?id="+$(this).attr('data-teamid')+"";
//		alert($(this).attr("data-teamid"));
	});
	
	
	
	
})
