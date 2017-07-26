/**
 * 
 */
$(function(){
	//main_pople 热门球员
	$.ajax({
	     url:'../teamIndexController/more_pople',
	     data:{'pageIndex':1,'pageSize':500},
	     type:"post",
	     dataType:"json",
	     success:function(data){
	    	 $.each(data.rows,function(i,n){
	    		 var person='<li id="main_hotperson_button" data-personid="'+n.id+'">';
		    	 person+='<a href="###" class="an-text-center an-circle"> <img class="person_pic am-img-thumbail an-circle" alt="" src= "'+n.person_pic+'" onerror="this.src="../img/user04.png"" ';
		    	 person+='<small class="am-block"> '+isUndefined(n.person_name)+'</small>';
		    	 person+='<small class="am-block">'+isUndefined(n.team_name)+'</small>';
		    	 person+='</li>';
	    	 $('#personappend').append(person);
	    	 });
	    	 
	     }
	 });
	
	$(document).on('click','#main_hotperson_button',function(){
		window.location.href="person_infor.html?id="+$(this).attr('data-personid')+""
	})
	
})