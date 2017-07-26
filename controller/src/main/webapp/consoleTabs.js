$(function() {
	var index = layer.load(0, {
		shade : false
	});
	$
			.ajax({
				type : "POST",
				url : "sysuserController/findMenus.json",
				dataType : "json",
				data : {},
				success : function(data) {
					layer.close(index);
					var list = data['data']['list'];
					$
							.each(
									list,
									function(i, n) {

										var li = '';
										if (typeof (n.attributes) == "undefined") {
											li = '<li ><a class="J_menuItem"><i class="'
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
																	li += '<li ><a class="J_menuItem"><i class="fa '
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
											li += '<span class=""></span></a>';
											li += "</li>";
										}
										$('#side-menu').append(li);
										
									});
					loadMenujs();
				},
				error : function() {
					layer.close(index);
					lrError("添加失败！服务器错误！");
				}
			});
});

var loadMenujs = function() {
	/*
	 * var script = document.createElement('script') script.setAttribute('src',
	 * 'hi/js/layer.min.js');
	 * document.getElementsByTagName('head')[0].appendChild(script)
	 */
	var script1 = document.createElement('script')
	script1.setAttribute('src', 'js/plugins/contabs.min.js');
	document.getElementsByTagName('head')[0].appendChild(script1)

	var script2 = document.createElement('script')
	script2.setAttribute('src', 'js/plugins/hplus.min.js?v=4.1.0');
	document.getElementsByTagName('head')[0].appendChild(script2)

}

var logout = function() {
	window.location.href ='userAction/logout';
}
