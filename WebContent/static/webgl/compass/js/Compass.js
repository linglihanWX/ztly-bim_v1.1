/**
 * 指北针
 * 使用 new Compass(viewer),添加指北针;
 */

/**
 * param viewer:场景视图
 * 
 */
var Compass = function(viewer) {
	this.viewer = viewer;
	this.init();
}

Compass.prototype = {
	rotateCompassListener : function() {
		var c = this.viewer.camera;
		var hd = c.heading;
		var jd = 180/Math.PI * hd;
		this.compassPicDiv.style.transform = "rotate("+jd+"deg)";
	},
	init : function() {
		var vc = this.viewer.container;
		var sceneCanvasP = this.viewer.canvas.parentNode;
		
		var d1 = document.createElement("div");
		var d2 = document.createElement("div");
		this.compassPicDiv = d2;
		
		d1.className = "compassDiv";
		d2.className = "compassPicDiv";
		
		d1.innerHTML = '<table class="nesw" style="width: 100%;height: 100%;position: absolute;"><tr><td></td><td style="text-align: center;vertical-align: top;"><span id="n">N</span></td><td></td></tr><tr><td style="text-align: left;vertical-align: middle;"><span id="w">W</span></td><td></td><td style="text-align: right;vertical-align: middle;"><span id="e">E</span></td></tr><tr><td></td><td style="text-align: center;vertical-align: bottom;"><span id="s">S</span></td><td></td></tr></table>';
		d1.appendChild(d2);
		sceneCanvasP.appendChild(d1);

		var spans = d1.getElementsByTagName("span");
		var neswMap = {"n":0,"e":90,"s":180,"w":270};
		for(var spansi=0;spansi<spans.length;spansi++) {
			spans[spansi].onclick = function(e) {
				this.viewer.camera.flyTo({
					destination : this.viewer.camera.position,
					orientation:{
						heading : FreeDo.Math.toRadians(neswMap[e.target.id]),
						pitch : this.viewer.camera.pitch,
						roll: this.viewer.camera.roll
					}
				});
			}.bind(this);
		}
		d2.onmouseover = function() {
			this.viewer.scene.preRender.removeEventListener(this.rotateCompassListener,this);
			this.compassPicDiv.style.transform = "rotate(0deg)";
		}.bind(this);

		d2.onmouseout = function() {
			this.viewer.scene.preRender.addEventListener(this.rotateCompassListener,this);
		}.bind(this);
		
		d2.onclick = function() {
			this.viewer.camera.flyHome(3);
		}.bind(this);
		
		this.viewer.scene.preRender.addEventListener(this.rotateCompassListener,this);
	}
}