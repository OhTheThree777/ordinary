// JavaScript Document

/**
 * 框架 控制 对象
 */

var f = {
	
	/**
	 * 加载 系统 菜单
	 */
	loadMenus : function(cb) {
		$.ajax({
					url : 'sys/menu/getUserMenus.json',
					dataType:'json',
					success : function(menu) {
						
						var menu=
						$
								.each(
										menu,
										function(i, n) {
											var li = '';
											if (typeof (n.attributes) == "undefined") {
												li = '<li ><a ><i class="fa '
														+ n.iconCls
														+ '"></i><span class="nav-label">';
												li += n.text;
												li += '</span> <span class="fa arrow"></span></a>';
												li += '<ul class="nav nav-second-level">';
												$
														.each(
																n.children,
																function(j, cn) {
																	if (typeof (cn.attributes) == "undefined") {
																		li += '<li ><a ><i class="fa '
																				+ cn.iconCls
																				+ '"></i><span class="nav-label">';
																		li += cn.text;
																		li += '</span> <span class="fa arrow"></span></a>';
																		li += '<ul class="nav nav-third-level">';
																		$
																				.each(
																						cn.children,
																						function(
																								f,
																								cnn) {
																							li += '<li ><a class="J_menuItem" href='
																									+ cnn.attributes.url
																									+ '><i class="fa '
																									+ cnn.iconCls
																									+ '"></i><span class="nav-label"></span>';
																							li += cnn.text;
																							li += "</a></li>";
																						});
																		li += "</ul>";
																		li += "</li>";
																	} else {
																		li += '<li ><a class="J_menuItem" href='
																				+ cn.attributes.url
																				+ '><i class="fa '
																				+ cn.iconCls
																				+ '"></i><span class="nav-label"></span>';
																		li += cn.text;
																		li += "</a></li>";
																	}
																});

												li += "</ul>";
												li += "</li>";

											} else {
												li += '<li ><a class="J_menuItem" href='
														+ n.attributes.url
														+ '><i class="fa '
														+ n.iconCls
														+ '"></i><span class="nav-label"></span>';
												li += n.text;
												li += '</a>';
												li += "</li>";
											}
											
											$('#side-menu').append(li);
										});
						loadMenujs();
					}
					
				});

		/*
		 * var _menus; if (f.currentUser.yhjs=="1") { _menus = f.sysMenus; }
		 * else if (f.currentUser.yhjs=="2") { _menus = f.orgMenus; } else if
		 * (f.currentUser.yhjs=="3") { _menus = f.hyMenus; } for(var i in
		 * _menus) { var o = _menus[i]; var _tree = $('<ul />').tree({ lines :
		 * true, onClick : function (node) { if (node.attributes ) {
		 * if(node.attributes.uri != null) { mainTabs.append(node.text,
		 * node.attributes.uri, node.iconCls, true); } } }, data: o.children });
		 * $('#e_m_menus').accordion('add', { title: o.text, selected: ((i==0) ?
		 * true:false), content: _tree, iconCls: o.iconCls }); }
		 */
		if (cb) {
			cb();
		}

	},
	
	/**
	 * 退出系统
	 */
	exit : function() {
		$.messager.confirm('退出', '确定要退出系统吗？', function(r) {
			if (r) {
				hoslic.ajax.post({
					url : 'logout.json',
					success : function(d) {
						if (d.status == '1') {
							$.messager.alert('信息', '退出成功！', 'info', function() {
								window.location.href = "login.jsp";
							});
						} else {
							$.messager.alert('信息', e.emsg, 'error');
						}
					}
				});
			}
		});

	},
	
	/**
	 * 加载 当前 会话 登录 的 用户 信息；
	 * 
	 * @returns
	 */
	currentUser : {}, // 当前 用户 对象
	loadSessionUserInfo : function(cb) {
		// var _cu = f.currentUser;
		$.ajax({
            type: "POST",
            url:'currentUser/getUserInfo.json',
            dataType:'json',
            success: function( d ) {
            	if (d.status == '1') {
					$('#e_username_span').text(d.data.obj.zsxm);
					$.extend(true, f.currentUser, d.data.obj);
				} else if (d.status == '4') {
					sweetAlert("用户信息过期", "用户未定路系统或系统会话超时！", "error");
					window.location.href = "login.jsp";
					/*
					 * $.messager.alert('信息', "用户未定路系统或系统会话超时！", 'error',
					 * function() { window.location.href = "login.jsp"; });
					 */
				}
				if (cb) {
					cb();
				}
            },
            error:function() {
				if (cb) {
					cb();
				}
			}
        });
	},
	initSysConfig : function(cb) {
		/* $('#e_sys_name').html(sysParameter.sysName); */

		var oldHref = $('#uiTheme').attr('href');
		var newHref = oldHref.substring(0, oldHref.indexOf('themes'))
				+ 'themes/' + sysParameter.uiThemeName + '/easyui.css';
		$('#uiTheme').attr('href', newHref);

		if (cb) {
			cb();
		}
	}
};

var sysCodes = {
	codes : {},
	loadSysCodes : function(cb) {
		// var _c = this.codes;
		hoslic.ajax.post({
			url : '../global/getSysCode.json',
			success : function(d) {
				if (d.status == '1') {
					$.extend(true, sysCodes.codes, d.data.obj);
				}
				if (cb) {
					cb();
				}
			},
			error : function() {
				if (cb) {
					cb();
				}
			}
		});
	},
	getMc : function(bs, dm) {
		var r = dm;
		if (!sysCodes.codes[bs])
			return r;
		$.each(sysCodes.codes[bs], function(i, o) {
			if (o.dm == dm)
				r = o.mc;
		});
		return r;
	}
};




/**
 * 
 * 
 */

var loadMenujs = function() {
	/*
	var script = document.createElement('script')
	script.setAttribute('src', 'hi/js/layer.min.js');
	document.getElementsByTagName('head')[0].appendChild(script)
	*/	
	var script1 = document.createElement('script')
	script1.setAttribute('src', 'hi/js/contabs.min.js');
	document.getElementsByTagName('head')[0].appendChild(script1)
	
	var script2 = document.createElement('script')
	script2.setAttribute('src', 'hi/js/hplus.min.js?v=4.1.0');
	document.getElementsByTagName('head')[0].appendChild(script2)

}

// 退出操作
function logout() {
	swal({
		title : "确认信息",
		text : "确定要注销当前用户吗！",
		type : "warning",
		showCancelButton : false,
		confirmButtonColor : "#DD6B55",
		confirmButtonText : "注销",
		closeOnConfirm : false
	}, function() {
		hoslic.ajax.post({
			url : 'logout.json',
			data : {
				'random' : Math.random()
			},
			success : function(d) {
				swal("注销成功！", "您已经注销该用户!。", "success");
			},
			error : function() {
			},
			after : function() {
				location.reload();
			}
		});
	});

}

function TaskQueue( tasks, change ) {
	
	var _total = 0;
	this.total = _total; // 总任务个数
	var _completed = 0;
	this.completed = _completed; // 已完成任务个数
	
	var _tasks = new Array();
	this.taskStack = _tasks; // 作业栈
	
	this.change = change;
	
	$.each(tasks, function( i,o ) {
		_tasks.push(o);
		_total += 1;
	});
	
	var _runOneFun = function() {
		if(_tasks.length > 0) {
			// currnetTask 当前任务
			var ct = _tasks.shift();
			_completed += 1;
			if(typeof ct === "function") {
				ct(_runOneFun);
			} else {
				_runOneFun();
			}
			if(typeof change === "function") {
				change(_total,_completed);
			}
		}
	};
	
	this.run = _runOneFun; // 运行任务队列
}
$(function() {

	/*
	 * f.loadMenus(); f.loadSessionUserInfo(); sysCodes.loadSysCodes();
	 */

	// 初始化控制台
	var tasks = [ f.loadSessionUserInfo, // 
	 // 初始化菜单f.loadMenus()
	];
	var taskQueue = new TaskQueue(tasks);
	taskQueue.run();
});


