$(function () {
    var h = $("#content").height();
    var h2 = $(".breadcrumb").height();
    $("#content .row-fluid").height(h - h2);
    planRouteViewer.init("init"); // 加载球模型
    var sss = new SurveyManager(globalviewer,creatEntity);
    sss.setSurveyType(SurveyType.LINE_DISTANCE);
    FreeDoUtil.digpit(globalviewer);
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
	        hierarchy : FreeDo.Cartesian3.fromDegreesArray([
	        	117.63658156506864, 39.03320978417418,  
	        	117.63663657280595, 39.03337380796097,  
	        	117.6720856828493, 39.02536903471689,  
	        	117.6720403445534, 39.02521646994533
	        	]),  
	        material : 	FreeDo.Color.BLANCHEDALMOND.withAlpha(0.8)
	    }
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
	        hierarchy : FreeDo.Cartesian3.fromDegreesArray([
	        	117.65421292746433, 39.028569363412515,
	        	117.65532530051337, 39.02833453426626,
	        	117.65496936189291, 39.02740497284379,
	        	117.65387741882599, 39.02763956354831]),  
	        material : 	FreeDo.Color.DEEPSKYBLUE.withAlpha(0.8)
	    }
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
	} );
}