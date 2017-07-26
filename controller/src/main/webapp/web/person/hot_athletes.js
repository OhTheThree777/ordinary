/**
 * 热门球员列表
 */
var pageSize = 6;// 每页显示条数
var pageCount;
$(function() {

	$.ajax({
		url : '../../PeopleInfoController/main.json',// 查询信息
		type : 'post',
		datatype : 'json',
		data : {
			'offset' : 1,
			'limit' : pageSize
		// 告诉后台每页显示几条数据
		},
		success : function(data) {
			$("#list_person").empty();
			fenye(data.rows, data.page);// 分页
			pageCount = data.total;
			each(data);// 遍历查询
			byName();
		}
	});
});

function fenye(rows, pcount) {
	$(".M-box3").pagination({
		maxentries : rows,// 所有数据个数
		pageCount : pcount,// 总页数
		jump : true,
		jumpIptCls : 'jump-ipt', // 文本框内容
		jumpBtnCls : 'jump-btn', // 跳转按钮
		jumpBtn : '跳转',
		prevContent : '上页',
		nextContent : '下页',
		callback : callback// 翻页时调用的方法
	});
}

function callback(pageIndex) {// 翻页是调用的方法
	var name = $('#search_byid').val();
	$.ajax({
		type : 'post',
		datatype : 'json',
		url : '../../PeopleInfoController/main.json',
		data : {
			'offset' : pageIndex.getCurrent(),// 获得当前显示页
			'limit' : pageSize,
			'name' : name
		},
		success : function(data) {
			// alert("阿里巴巴" +
			// pageIdex.getCurrent()+"数据："+pageSize+"本页："+data.page);
			$("#list_person").children().remove();
			each(data);
		}

	});
}
function each(data) {
	 
	 
	
	$
			.each(
					data.rows,
					function(i, n) {// data.rows请求回来数据的集合，n为解析好的对象，i为key值
						var html = '<li class="col-md-4 col-sm-6 col-xs-12">'
								+ '<div class="clearfix player-ctt">'
								+ '<div class="col-xs-6 player-head clearfix">'
								+ '<a href="javascript:;">' + '<img src="'
								+ '../../'
								+ n.personPic
								+ '" class="img-circle" />'
								+ '<div class="img-circle"><button type="button" class="btn btn-warning cherk" onclick="xiangqing('
								+ n.id
								+ ')">查看详情</button></div>'
								+ '</a>'

								+ '<div id="showid'
								+ n.id
								+ '" class="btn-success player-state">挂牌中</div>'
								+ '<div id="disid'
								+ n.id
								+ '" style="display:none" class="btn-info player-state">正式进入</div>'
								+ '<div id="disonid'
								+ n.id
								+ '" style="display:none" class="btn-info player-state">未通过</div>'

								+ '</div>'
								+ '<div class="col-xs-6 player-infor clearfix">'
								+ '<dl>'
								+ '<dt>'
								+ n.personName
								+ '</dt>'
								+ '<dd>'
								/* 性别、身高、体重 */+ '<p>'
								+ n.personSex
								+ 'cm</p><p>'
								+ n.personHeight
								+ '</p><p>'
								+ n.personWeight
								+ '</p>'
								+ '</dd>'
								+ '</dl>'
								+ '<button type="button" id="showbut'
								+ n.id
								+ '" class="btn btn-success pull-left player-invite" onclick="yaoqing('
								+ n.id
								+ ')">邀请</button>'

								+ '<button type="button" id="disbut'
								+ n.id
								+ '" style="display:none" class="btn btn-info pull-left player-invite" onclick="yaoqing('
								+ ')">已邀请</button>'

								+ '</div>' + '</div>' + '</li>';
						$("#list_person").append(html);
						$.cookie("person_state", n.personState);// 人员状态
						
						$.each(data.data.list, function(j, t) {
							person = t.personId;
							
							if (null != person) {
								if (person == n.id && n.personState == 1) {// 此人已经同意加入登录者队伍
									$("#" + 'showid' + n.id).hide();
									$("#" + 'disid' + n.id).show();
									$("#" + 'showbut' + n.id).hide();
									$("#" + 'disbut' + n.id).hide();
								} else if (person == n.id && n.personState == 2) {// //
									$("#" + 'showid' + n.id).show();
									$("#" + 'disid' + n.id).hide();
									$("#" + 'disbut' + n.id).show();
									$("#" + 'showbut' + n.id).hide();
								} else if (person == n.id && n.personState == 3) {// //
									$("#" + "disonid" + n.id + "").show();
									$("#" + 'showbut' + n.id).show();
									$("#" + 'showid' + n.id).hide();
									$("#" + 'disbut' + n.id).hide();

								}
							}else{
								swal({
									title:data.data.msg,
									text:"请先创建队伍！",
									type:"success",
									confirmButtonText:"确定"
								});
							}

						});

					});

}
function xiangqing(id) {// 球员详情
	$.cookie('person_xiangqing_id', id);
	layer.open({
		title : '球员详情信息',
		maxmin : true,// 最大化按钮
		type : 2,
		shadeclose : true,// 关闭窗口
		shade : false,
		area : [ '80%', '80%' ],
		content : '../../web/person/athletes_xq.html'
	});
}
// 人名搜索
function byName() {
	$('#search_but').click(function() {
		var name = $('#search_byid').val();
		$.ajax({
			url : '../../PeopleInfoController/main.json',
			type : 'post',
			datatype : 'json',
			data : {
				'offset' : 1,// 获得当前显示页
				'limit' : pageSize,
				'personName' : name
			},
			success : function(data) {
				// alert("阿里巴巴"+data.data);
				$("#list_person").children().remove();
				each(data);
			}

		});

	});
}

function yaoqing(personId) {// 邀请球员：通过查询运动员当前状态来判断此运动员是否已经加入队伍
	alert("点击了邀请");// 本方法是针对当前登录用户查询，并判断是否有资格邀请队员

	$.ajax({
		url : '../../PeopleInfoController/add.json',
		datatype : 'json',
		type : 'post',
		data : {
			'teamUserId' : $.cookie("user_id"),// 用户id
			'personId' : personId
		},
		success : function(data) {
			if (0 == data.data.obj.invitationStatus) {
				swal({
					title : data.data.msg,
					text : '请先创建队伍！',
					type : 'success',
					confirmButtonText : "确定"
				});

			} else {
				var id = data.data.obj.personId;
				swal({
					title : "邀请已发送!",
					text : "请耐心等待运动员同意!",
					type : "success",
					confirmButtonText : "确定"

				});
			}

			if ($.cookie("person_state") == 1) {// 审核通过
				$("#" + 'showid' + id + '').hide();
				$("#" + 'disid' + id + '').show();
				$("#" + 'disbut' + id + '').hide();
				$("#" + 'showbut' + id + '').hide();
			} else if ($.cookie("person_state") == 2) {// 未审核
				$("#" + 'showid' + id + '').show();
				$("#" + 'disid' + id + '').hide();
				$("#" + 'disbut' + id + '').show();
				$("#" + 'showbut' + id + '').hide();
			} else if ($.cookie("person_state") == 3) {// 审核未通过
				$("#" + 'showbut' + id + '').show();
				$("#" + 'disbut' + id + '').hide();
				$("#" + 'showid' + id + '').hide();
				$("#" + 'disonid' + id + '').show();// 未通过
			} else {
				$("#" + 'showbut' + id + '').show();
				$("#" + 'showid' + id + '').show();

			}
		},
		error : function(data) {
			alert("失败！");
		}

	});
	
	$.ajax({
		url:'../../AddPlayersController/addPlayers.json',
		type:'post',
		data:{
			 'id':personId
		},
		datatype:'json',
		cache:true,
		success:function(data){
			swal({
				title:"请求成功！运动员已发布",
				confirmButtonText:"确定",
			    type:'success'
			    	
				
			});
		},
		error:function(data){
			
			swal({
				title:"失败了!",
				confirmButtonText:"确定",
			    type:'success'
			    	
				
			});
		}
		
	});
	
}