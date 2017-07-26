$(function(){
	$.ajax({
        url:'../teamIndexController/more_racing',
        type:"post",
        data:{"pageIndex":1,"pageSize":100},
        async:true,
        cache:false,
        dataType:"json",
        success:function(data){
//        	alert('test');
            $.each(data.rows,function(i,n){
           	 var a='<li class="am-g am-list-item-desced am-list-item-thumbed am-list-item-thumb-left">';
              a+='<div class="am-u-sm-5 am-list-thumb">';
                a+='<a href="###" class="">';
                  a+='<img src="'+n.racing_pic+'" alt="'+n.racing_name+'"/>';
                a+='</a>    </div>';
         
              a+='<div class=" am-u-sm-7 am-list-main">';
                  a+='<h3 class="am-list-item-hd"><a href="###" class="">'+n.racing_name+'</a></h3>';
         			a+='<div class="am-list-item-text">';
         				a+='<p>组织方：'+n.main_organizers_name+'</p>';
                  	a+='<p>比赛时间：<span style="color:#ff4a00;">'+n.racing_begin_time+'</span></p>';
                  	a+='<p style="display:inline-block;">报名截止：<span style="color:#ff4a00;">'+n.cut_off_date+'</span></p><a href="#more" class="am-fr">去报名 &raquo;</a>';
                  a+='</div>		</div>';
            	
            	
            	
            	 $('#event_append').append(a);
            });
            }
      });
	
	
	
	
	
})