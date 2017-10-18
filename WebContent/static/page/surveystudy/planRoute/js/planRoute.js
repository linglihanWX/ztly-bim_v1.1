$(function () {
    var h = $("#content").height();
    var h2 = $(".breadcrumb").height();
    $("#content .row-fluid").height(h - h2);
    planRouteViewer.init("init"); // 加载球模型
    var sss = new SurveyManager(globalviewer,creatEntity);
    sss.setSurveyType(SurveyType.LINE_DISTANCE);
});
var creatEntity = function(firstPoint,lastPoint) {
	console.log(globalviewer.camera);
	var road1 = globalviewer.entities.add( {  
		name : '道路1',  
		position : FreeDo.Cartesian3.fromDegrees(117.6601106774757, 39.0278397440452,15 ),  
		point : { //点  
			pixelSize : 5,  
			color : FreeDo.Color.RED,  
			outlineColor : FreeDo.Color.WHITE,  
			outlineWidth : 2  
		},  
		label : { //文字标签  
			text : '解放北路东方华尔街',  
			font : '14pt monospace',  
			style : FreeDo.LabelStyle.FILL_AND_OUTLINE,  
			outlineWidth : 2,  
			verticalOrigin : FreeDo.VerticalOrigin.BOTTOM, //垂直方向以底部来计算标签的位置  
			pixelOffset : new FreeDo.Cartesian2( 0, -18 )   //偏移量  
		},
		polygon : {  
	        hierarchy : FreeDo.Cartesian3.fromDegreesArray([117.63662864704408, 39.033380118374026,  
	        	117.6365077006233, 39.033038577053276,  
	        	117.67849476615538, 39.02343517603854,  
	        	117.67866509405319, 39.023752841924214]),  
	        material : 	FreeDo.Color.BLANCHEDALMOND.withAlpha(0.8)
	    }
		/*billboard : { //图标  
			image : "static/page/designcoordination/mainbuilding/img/tuceng/road.svg",  
			width : 50,  
			height : 50  
		},*/  
	} );
	var road2 = globalviewer.entities.add( {  
		name : '道路2',  
		position : FreeDo.Cartesian3.fromDegrees(117.65717660285547, 39.029622371574646,15 ),  
		point : { //点  
			pixelSize : 5,  
			color : FreeDo.Color.RED,  
			outlineColor : FreeDo.Color.WHITE,  
			outlineWidth : 2  
		},  
		label : { //文字标签  
			text : '估衣街',  
			font : '14pt monospace',  
			style : FreeDo.LabelStyle.FILL_AND_OUTLINE,  
			outlineWidth : 2,  
			verticalOrigin : FreeDo.VerticalOrigin.BOTTOM, //垂直方向以底部来计算标签的位置  
			pixelOffset : new FreeDo.Cartesian2( 0, -18 )   //偏移量  
		}, 
		polygon : {  
	        hierarchy : FreeDo.Cartesian3.fromDegreesArray([117.65974723500142,39.0371200384198,  
	        	117.66011027202251,39.0370471463995,  
	        	117.65481825563658,39.022534013171935,  
	        	117.6543818169068,39.02263156515081]),  
	        material : 	FreeDo.Color.BLANCHEDALMOND.withAlpha(0.8)
	    }
		/*billboard : { //图标  
			image : "static/page/designcoordination/mainbuilding/img/tuceng/road.svg",  
			width : 50,  
			height : 50  
		},*/  
	} );
	var river1 = globalviewer.entities.add( {  
		name : '水系1',  
		position : FreeDo.Cartesian3.fromDegrees(117.65443147101222, 39.02762212630358,15 ),  
		point : { //点  
			pixelSize : 5,  
			color : FreeDo.Color.RED,  
			outlineColor : FreeDo.Color.WHITE,  
			outlineWidth : 2  
		},  
		label : { //文字标签  
			text : '北运河',  
			font : '14pt monospace',  
			style : FreeDo.LabelStyle.FILL_AND_OUTLINE,  
			outlineWidth : 2,  
			verticalOrigin : FreeDo.VerticalOrigin.BOTTOM, //垂直方向以底部来计算标签的位置  
			pixelOffset : new FreeDo.Cartesian2( 0, -18 )   //偏移量  
		},  
		polygon : {  
	        hierarchy : FreeDo.Cartesian3.fromDegreesArray([117.65426048471235, 39.02870213501727,
	        	117.65387304269305, 39.02762545585438,
	        	117.6549677160827, 39.027383805363705,
	        	117.65550142448942, 39.02840709005166]),  
	        material : 	FreeDo.Color.DEEPSKYBLUE.withAlpha(0.8)
	    }
		/*billboard : { //图标  
			image : "static/page/designcoordination/mainbuilding/img/tuceng/river.svg",  
			width : 50,  
			height : 50  
		}, */ 
	} );
	var river2 = globalviewer.entities.add( {  
		name : '水系2',  
		position : FreeDo.Cartesian3.fromDegrees(117.65066204707234, 39.02692651335879,15 ),  
		point : { //点  
			pixelSize : 5,  
			color : FreeDo.Color.RED,  
			outlineColor : FreeDo.Color.WHITE,  
			outlineWidth : 2  
		},  
		label : { //文字标签  
			text : '海河',  
			font : '14pt monospace',  
			style : FreeDo.LabelStyle.FILL_AND_OUTLINE,  
			outlineWidth : 2,  
			verticalOrigin : FreeDo.VerticalOrigin.BOTTOM, //垂直方向以底部来计算标签的位置  
			pixelOffset : new FreeDo.Cartesian2( 0, -18 )   //偏移量  
		},  
		polygon : {  
	        hierarchy : FreeDo.Cartesian3.fromDegreesArray([117.65066927457492, 39.02795259702767,
	        	117.65147178875964, 39.02776766347203,
	        	117.6505447513961, 39.025518921564206,
	        	117.64983000414954, 39.025622293822636,
	        	117.6496401353364, 39.02545125718353,
	        	117.64809849977627, 39.02572863893886,
	        	117.64835503758722, 39.02636789492214,
	        	117.64976244099792, 39.025852710459255]),  
	        material : 	FreeDo.Color.DEEPSKYBLUE.withAlpha(0.8)
	    }
/*			billboard : { //图标  
			image : "static/page/designcoordination/mainbuilding/img/tuceng/river.svg",  
			width : 50,  
			height : 50  
		},*/  
	} );
/*	var firstcartographic = globalviewer.scene.globe.ellipsoid.cartesianToCartographic(firstPoint);
	var lastcartographic = globalviewer.scene.globe.ellipsoid.cartesianToCartographic(lastPoint);
	var point1=[ (firstcartographic.longitude / Math.PI * 180)+0.1, (firstcartographic.latitude / Math.PI * 180)+0.1];
	var point2=[ lastcartographic.longitude / Math.PI * 180, lastcartographic.latitude / Math.PI * 180];*/
	
	//globalviewer.zoomTo(chaiqian);
   /* var chaiqian1 = globalviewer.entities.add({
    	name:"zhangweizhuangtoucenchaiqianqu1",
    	show : false,
    	position : FreeDo.Cartesian3.fromDegrees( 116.06858204514421, 39.00027129930735 ),
    	    point : { //点
    	        pixelSize : 5,
    	        color : FreeDo.Color.RED,
    	        outlineColor : FreeDo.Color.WHITE,
    	        outlineWidth : 2
    	   },
	    label : { //文字标签
	        text : '张巍庄头村拆迁区1',
	        font : '14pt monospace',
	        style : FreeDo.LabelStyle.FILL_AND_OUTLINE,
	        outlineWidth : 2,
	        verticalOrigin : FreeDo.VerticalOrigin.BOTTOM, //垂直方向以底部来计算标签的位置
	        pixelOffset : new FreeDo.Cartesian2( 0, -9 )   //偏移量
	    }, 
    	polygon : {
            outline : true,
            outlineColor : FreeDo.Color.BLACK,
            hierarchy : {
                positions : FreeDo.Cartesian3.fromDegreesArray([
                	116.06645349307173, 39.00128583259063,
                	116.06805890528415, 39.00137476160155,
                	116.06847203271361, 39.00096730772978,
                	116.07099855244729, 39.00068954968628,
                	116.07108370221013, 38.99965486552117,
                	116.06680094255128, 38.999430993453615,  
                	116.06634852291182, 39.001497720099685
                ]),
            },
            material : FreeDo.Color.ORANGE.withAlpha(0.5),                
        }
    });*/
    
   /* var chaiqian2 = globalviewer.entities.add({
    	name:"zhangweizhuangtoucunchaiqianqu2",
    	show : false,
    	position : FreeDo.Cartesian3.fromDegrees( 116.07423862499418, 39.00019520379515 ),
    	    point : { //点
    	        pixelSize : 5,
    	        color : FreeDo.Color.RED,
    	        outlineColor : FreeDo.Color.WHITE,
    	        outlineWidth : 2
    	   },
	    label : { //文字标签
	        text : '张巍庄头村拆迁区2',
	        font : '14pt monospace',
	        style : FreeDo.LabelStyle.FILL_AND_OUTLINE,
	        outlineWidth : 2,
	        verticalOrigin : FreeDo.VerticalOrigin.BOTTOM, //垂直方向以底部来计算标签的位置
	        pixelOffset : new FreeDo.Cartesian2( 0, -9 )   //偏移量
	    }, 
    	polygon : {
            outline : false,
            outlineColor : FreeDo.Color.BLACK,
            hierarchy : {
                positions : FreeDo.Cartesian3.fromDegreesArray([
                	116.0729476400768, 39.00128672511788,
                	116.07443392797242, 39.001305921069324,
                	116.07450637409187, 39.00095121045232,
                	116.07611445700955, 39.001020225635656,
                	116.07692005313103, 38.99958268244487,
                	116.07269768778842, 38.99948404432535,  
                	116.07286882540146, 39.001300425347125
                ]),
            },
            material : FreeDo.Color.ORANGE.withAlpha(0.5),                
        }
    });
    
    var chaiqian3 = globalviewer.entities.add({
    	name:"xiaoyangcunchaiqianqu",
    	show : false,
    	position : FreeDo.Cartesian3.fromDegrees(115.97102931062608, 39.00109154188958),
    	    point : { //点
    	        pixelSize : 5,
    	        color : FreeDo.Color.RED,
    	        outlineColor : FreeDo.Color.WHITE,
    	        outlineWidth : 2
    	   },
	    label : { //文字标签
	        text : '小阳村村拆迁区',
	        font : '14pt monospace',
	        style : FreeDo.LabelStyle.FILL_AND_OUTLINE,
	        outlineWidth : 2,
	        verticalOrigin : FreeDo.VerticalOrigin.BOTTOM, //垂直方向以底部来计算标签的位置
	        pixelOffset : new FreeDo.Cartesian2( 0, -9 )   //偏移量
	    }, 
    	polygon : {
            outline : true,
            outlineColor : FreeDo.Color.BLACK,
            hierarchy : {
                positions : FreeDo.Cartesian3.fromDegreesArray([
                	115.96824373928295, 39.00265612332528,
                	115.97494923880352, 39.00230653905432,
                	115.9736701324057, 38.99958885643518,
                	115.96909923334594, 38.99943285871234,
                	115.96740306407922, 39.00292926555422,
                ]),
            },
            material : FreeDo.Color.ORANGE.withAlpha(0.5),                
        }
    });
    
    var chaiqian4 = globalviewer.entities.add({
    	name:"dayangcunchaiqianqu",
    	show : false,
    	position : FreeDo.Cartesian3.fromDegrees(115.98010448982028, 39.00048211044087),
    	    point : { //点
    	        pixelSize : 5,
    	        color : FreeDo.Color.RED,
    	        outlineColor : FreeDo.Color.WHITE,
    	        outlineWidth : 2
    	   },
	    label : { //文字标签
	        text : '大阳村村拆迁区',
	        font : '14pt monospace',
	        style : FreeDo.LabelStyle.FILL_AND_OUTLINE,
	        outlineWidth : 2,
	        verticalOrigin : FreeDo.VerticalOrigin.BOTTOM, //垂直方向以底部来计算标签的位置
	        pixelOffset : new FreeDo.Cartesian2( 0, -9 )   //偏移量
	    }, 
    	polygon : {
            outline : true,
            outlineColor : FreeDo.Color.BLACK,
            hierarchy : {
                positions : FreeDo.Cartesian3.fromDegreesArray([
                	115.97916672149702, 39.0032358412733,
                	115.97462688393176, 38.99830329643379,
                	115.98415452184332, 38.997862520049175,
                	115.98121389025711, 39.00364868091295,
                ]),
            },
            material : FreeDo.Color.ORANGE.withAlpha(0.5),                
        }
    });*/
}