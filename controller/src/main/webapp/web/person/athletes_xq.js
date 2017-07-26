/**
 * 球员详情
 */
 $(function(){
	 alert(321312);
	 $.ajax({
		 url:'../../personInfoController/selectObjById.json',
		 type:'post',
		 datatype:'json',
		 data:{'id':$.cookie('person_xiangqing_id')},
		 success:function(xq){
			 $('#basic_message').empty();
			 $('#basic_messages').empty();
			    var img='<div class="clearfix" >'
						+'<img src="'+'../../'+xq.data.obj.personPic+'" style="height: 150px;"/>'
						+'</div>'
						+'<div class="clearfix">'
						+'<p style="margin-top: 5px;">'+xq.data.obj.personName+'</p><p style="color:#BCBCBC;font-weight: bold;">'+xq.data.obj.personState+'</p>'
						+'<div style="background:#00CC99;border-radius:20px;font-weight: bold;color: #FFFFFF;padding:3px 0;">'+xq.data.obj.personState+'</div>'
						+'</div>';
				$('#basic_message').append(img);
				 var table='<tr>'
					+'<th>性别</th>'
					+'<td>'+xq.data.obj.personSex+'</td>'
					+'<th>民族</th>'
					+'<td>'+xq.data.obj.personNational+'</td>'
				    +'</tr>'
				    +'<tr>'
					+'<th>生日</th>'
					+'<td>'+xq.data.obj.personBirthday+'</td>'
					+'<th>身高</th>'
					+'<td>'+xq.data.obj.personHeight+'</td>'
				    +'</tr>'
				    +'<tr>'
					+'<th>学历</th>'
					+'<td>'+xq.data.obj.personEducation+'</td>'
					+'<th>职业</th>'
					+'<td>'+xq.data.obj.personOccupation+'</td>'
				    +'</tr>'
				    +'<tr>'
					+'<th>体重</th>'
					+'<td>'+xq.data.obj.personWeight+'cm</td>'
					+'<th>籍贯</th>'
					+'<td>'+xq.data.obj.personBirthplace+'</td>'
				    +'</tr>'
				    +'<tr>'
					+'<th>专业</th>'
					+'<td>'+xq.data.obj.personProfessional+'</td>'
					+'<th>外语</th>'
					+'<td>'+xq.data.obj.personLanguage+'</td>'
				    +'</tr>'
				    +'<tr>'
					+'<th>毕业院校</th>'
					+'<td colspan="3">'+xq.data.obj.personSchool+'</td>'
				    +'</tr>';
				    +'<tr>'
					+'<th>家庭地址</th>'
					+'<td colspan="3">'+xq.data.obj.personPic+'</td>'
				    +'</tr>';
				 $('#basic_messages').append(table);
		 }
	 });
		 
	 
	 
	 
 });
