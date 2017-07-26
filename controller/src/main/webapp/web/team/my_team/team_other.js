var myChart = echarts.init(document.getElementById('main'));
option = {
	    title: {
	        text: ''
	    },
	    tooltip: {},
	    legend: {
	        data: ['详细信息']
	    },
	    radar: {
	        // shape: 'circle',
	        indicator: [
	           { name: '射门', max: 100},
	           { name: '门将', max: 100},
	           { name: '防守', max: 100},
	           { name: '技术', max: 100},
	           { name: '定位球', max: 100},
	           { name: '传球', max: 100}
	        ]
	    },
	    series: [{
	        name: '',
	        type: 'radar',
	        // areaStyle: {normal: {}},
	        data : [
	            {
	                value : [74, 60, 91, 77, 85, 78.6],
	                name : '各项细分',
	                
	            }
	        ]
	    }]
	};
myChart.setOption(option);
