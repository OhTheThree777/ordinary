$('.tpl-skiner-toggle').on('click', function() {
	$('.tpl-skiner').toggleClass('active');
})

$('.tpl-skiner-content-bar').find('span').on('click', function() {
	$('body').attr('class', $(this).attr('data-color'))
	saveSelectColor.Color = $(this).attr('data-color');
	// 保存选择项
	storageSave(saveSelectColor);

})
//autoLeftNav();
// 侧边菜单开关

function autoLeftNav() {
	$('.tpl-header-switch-button').on('click', function() {
		if ($('.left-sidebar').is('.active')) {
			if ($(window).width() > 1024) {
				$('.tpl-content-wrapper').removeClass('active');
			}
			$('.left-sidebar').removeClass('active');
			$(this).addClass('BgColor');
		} else {

			$('.left-sidebar').addClass('active');
			$(this).removeClass('BgColor');
			if ($(window).width() > 1024) {
				$('.tpl-content-wrapper').addClass('active');
			}
		}
	})

	if ($(window).width() < 1024) {
		$('.left-sidebar').addClass('active');
	} else {
		$('.left-sidebar').removeClass('active');
	}
}
$(function() {
	var index = layer.load(0, {
		shade : false
	});
	autoLeftNav();
	$('.left-sidebar').addClass('active');
	$('.tpl-content-wrapper').addClass('active');
	
	$.ajax({
		type : "POST",
		url : "sysuserController/findMenus.json",
		dataType : "json",
		data : {},
		success : function(data) {
			layer.close(index);
			var list = data['data']['list'];
			appedMenu(list);
		}
	});

});

//遍历菜单
function appedMenu(menus) {
	$.each(menus, function(i, n) {
		var li = '';
		if (typeof (n.attributes) == "undefined") {
			li = '<li class="sidebar-nav-link" >a href="javascript:;"><i class="'
			+ n.iconCls
			+ ' sidebar-nav-link-logo"></i>';
			li += n.text;
			li+='<span class="am-icon-chevron-down am-fr am-margin-right-sm sidebar-nav-sub-ico"></span>';
			li+='</a> <ul class="sidebar-nav sidebar-nav-sub"> ';
			$.each(n.children,function(j, cn) {
				li = '<li class="sidebar-nav-link" ><a href="'+cn.attributes.url+'"><i class="'
				+ cn.iconCls
				+ ' sidebar-nav-link-logo"></i>';
				li += cn.text;
				li += '</a></li>';
			});
			li+='</li></ul>';
			
		}else{
			li = '<li class="sidebar-nav-link" ><a href="'+n.attributes.url+'"><i class="'
			+ n.iconCls
			+ ' sidebar-nav-link-logo"></i>';
			li += n.text;
			li += '</a></li>';
		}
		$('#ul_side').append(li);
	});
}