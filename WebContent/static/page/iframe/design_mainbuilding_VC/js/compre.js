$(document).ready(function(){
	window.myviewer = initViewer("FreeDoContainer");
	window.modelTile.readyPromise.then(function() {
		moveModel(window.modelTile,-80,20,4,15,0,0,1,1,1);
		var redStyle = new FreeDo.FreedoPModelStyle({color: {conditions: [["${component} === \'" + "e24e51cc-afe3-11e7-46c2-5ebc1b3c3ce2" + "\'", "color('red')"],["${component} === \'" + "e1de51d2-afe3-11e7-46c2-5ebc1b3c3ce2" + "\'", "color('red')"],["${component} === \'" + "e15d8922-afe3-11e7-46c2-5ebc1b3c3ce2" + "\'", "color('green')"],["${component} === \'" + "e1d4b4e0-afe3-11e7-46c2-5ebc1b3c3ce2" + "\'", "color('green')"],["true", "color('white')"]]}});
		window.modelTile.style=redStyle;
	});
});
