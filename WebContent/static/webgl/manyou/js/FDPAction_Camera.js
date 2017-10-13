/*
	相机事件
	1，FDPAction_Camera_0 相机立即定位。			瞬发事件。
	2，FDPAction_Camera_1 相机立即飞行行为。		瞬发事件。
	3，FDPAction_Camera_2 相机按轨迹运动。			持续事件。
*/

//	相机瞬时定位事件。
FDPAction_Camera_0 = function( camera, time, Lon, Lat, Height, Course, Alpha, Roll )
{
	var m_Time = time;	//
	var m_Lon 	= Lon;
	var m_Lat  = Lat;
	var m_Height = Height;
	var m_Course = Course;
	var m_Alpha = Alpha;
	var m_Roll = Roll;
	var m_Camera = camera;
	
	//	执行事件，事件执行完成返回 true, 否则返回 false.
	this.Run = function( LastTime, NowTime )
	{
		if ( m_Time < LastTime )
		{
			return true;	//	事件时间已过，不执行，返回执行完成。
		}
		else if ( m_Time > NowTime )
		{
			return false;	//	事件时间未到，不执行，返回未执行。
		}
		else
		{
			//	执行事件，设置相机位置和姿态。
			m_Camera.setView(
			{
				destination : FreeDo.Cartesian3.fromDegrees(m_Lon, m_Lat, m_Height),
				orientation: 
				{
					heading : FreeDo.Math.toRadians(m_Course), 
					pitch : FreeDo.Math.toRadians(m_Alpha),    
					roll : FreeDo.Math.toRadians(m_Roll)       
				}
			});
			return true;	//	事件执行完成  返回 true;
		}
	}
	
	this.Clear = function()
	{
		//	没有资源需要清理。
	}

	this.GetStartTime = function()
	{
		return m_Time;
	}

	this.GetEndTime = function()
	{
		return m_Time;
	}

}

//	相机飞行事件，调用系统默认相机飞机接口。
FDPAction_Camera_1 = function( camera, time, Lon, Lat, Height, Course, Alpha, Roll, flyTime )
{
	var m_EndTime = time+flyTime;	//	事件结束执行时间。脚本需要
	var m_Time = time;
	var m_Lon 	= Lon;
	var m_Lat  = Lat;
	var m_Height = Height;
	var m_Course = Course;
	var m_Alpha = Alpha;
	var m_Roll = Roll;
	var m_Camera = camera;
	var m_FlyTime = flyTime;
	
	this.Run = function( LastTime, NowTime )
	{
		if ( m_Time < LastTime )
		{
			return true;	//	事件时间已过，不执行，返回执行完成。
		}
		else if ( m_Time > NowTime )
		{
			return false;	//	事件时间未到，不执行，返回未执行。
		}
		else
		{
			m_Camera.flyTo(
			{
				destination : FreeDo.Cartesian3.fromDegrees(m_Lon, m_Lat, m_Height),
				orientation: 
				{
					heading : FreeDo.Math.toRadians(m_Course), 
					pitch : FreeDo.Math.toRadians(m_Alpha),    
					roll : FreeDo.Math.toRadians(m_Roll)      
				},
				duration : m_FlyTime/1000
			});
			return true;
		}
	}

	this.Clear = function()
	{
		//	没有资源需要清理。
	}

	//	获取开始时间，用于脚本对事件排序。
	this.GetStartTime = function()
	{
		return m_Time;
	}

	//	获取开始时间，用于脚本对事件排序。
	this.GetEndTime = function()
	{
		return m_EndTime;
	}
}

//	相机按轨迹运行。route对应相机轨迹点结构体数组，定义了一系列空间位置、对应位置的姿态和时刻。参考 FDPCameraRoute
FDPAction_Camera_2 = function( camera, route )
{
	var m_Camera = camera;

//	var m_Route = route;	//		route 直接赋值还是应该复制？????
	var m_Route = new Array();
	for ( var m = 0; m < route.length; m++ )
	{
		m_Route.push( route[m] );
	}

	var m_StartTime = m_Route[0].m_Time;			   //	事件开始执行时间。脚本需要
	var m_EndTime = m_Route[m_Route.length-1].m_Time;	//	事件结束执行时间。脚本需要

	this.Run = function( LastTime, NowTime )
	{
		if ( NowTime < m_StartTime )
		{
			return false; //  时间未到，不执行，返回 未执行。
		}
		else if ( NowTime > m_EndTime )
		{
			return true;	// 时间已过，不执行，返回执行完成。
		}
		else
		{
			var i;
			var Lon;
			var Time;
			var Lat;
			var Heigt;
			var Course;
			var Alpha;
			var Roll;
			for ( i = 0; i < m_Route.length-1; i++ )
			{
				if(NowTime >= m_Route[i].m_Time && NowTime < m_Route[i+1].m_Time)
				{
					Lon = (m_Route[i+1].m_Lon - m_Route[i].m_Lon)*(NowTime-m_Route[i].m_Time)/(m_Route[i+1].m_Time - m_Route[i].m_Time)+m_Route[i].m_Lon;
					Lat = (m_Route[i+1].m_Lat - m_Route[i].m_Lat)*(NowTime-m_Route[i].m_Time)/(m_Route[i+1].m_Time - m_Route[i].m_Time)+m_Route[i].m_Lat;
					Heigt = (m_Route[i+1].m_Heigt - m_Route[i].m_Heigt)*(NowTime-m_Route[i].m_Time)/(m_Route[i+1].m_Time - m_Route[i].m_Time)+m_Route[i].m_Heigt;
					Course = (m_Route[i+1].m_Course - m_Route[i].m_Course)*(NowTime-m_Route[i].m_Time)/(m_Route[i+1].m_Time - m_Route[i].m_Time)+m_Route[i].m_Course;
					Alpha = (m_Route[i+1].m_Alpha - m_Route[i].m_Alpha)*(NowTime-m_Route[i].m_Time)/(m_Route[i+1].m_Time - m_Route[i].m_Time)+m_Route[i].m_Alpha;
					Roll = (m_Route[i+1].m_Roll - m_Route[i].m_Roll)*(NowTime-m_Route[i].m_Time)/(m_Route[i+1].m_Time - m_Route[i].m_Time)+m_Route[i].m_Roll;
					m_Camera.setView(
					{
						destination : FreeDo.Cartesian3.fromDegrees(Lon, Lat, Heigt),
						orientation: 
						{
							heading : FreeDo.Math.toRadians(Course), 
							pitch : FreeDo.Math.toRadians(Alpha),    
							roll : FreeDo.Math.toRadians(Roll)       
						}
					});
					break;
				}
			}
			return false;  // 时间范围内，未执行完成。

		}
	}
	
	this.Clear = function()
	{
		//	没有资源需要清理。
	}

	//	获取开始时间，用于脚本对事件排序。
	this.GetStartTime = function()
	{
		return m_StartTime;
	}

	//	获取开始时间，用于脚本对事件排序。
	this.GetEndTime = function()
	{
		return m_EndTime;
	}
	
}

