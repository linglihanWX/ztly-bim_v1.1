/*
	相机运动轨迹数据结构
*/

FDPCameraRoute = function()
{
	this.m_Time;		// 	轨迹点对应的时间  毫秒。
	this.m_Lon;			//	轨迹点对应的经度  度。
	this.m_Lat;			//	轨迹点对应的维度  度。
	this.m_Heigt;			//	轨迹点对应的高度  米。
	this.m_Course;			//	轨迹点对应的相机方位角	度。
	this.m_Alpha;			//	轨迹点对应的相机俯仰角	度。
	this.m_Roll;			//	轨迹点对应的相机滚转角	度。	
}