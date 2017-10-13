/*
	脚本类。提供脚本播放相关接口。实现对脚本事件的管理。
*/

FDPScript = function( name )
{
	var m_Name = name;					//	脚本名称
	var m_ActionList = new Array();		//	脚本事件容器。
	var m_IsRun = false;				//	脚本是否处于执行状态的标志。
	var m_Speed = 1.0;					//	播放速度系数（相对正常速度）。
	var m_Time	= 0.0;					//	当前脚本时间。毫秒。
	
	//	添加脚本事件到脚本中。
	this.AddAction = function( action )
	{
		//	检查时间是否已经存在脚本。存在则不添加。
		
		
		//	按照事件开始时间(action.m_StartTime)插入到已有容器(m_ActionList)中.(时间小的排在前面）。不考虑播放优化，先不考虑该步骤。
		

		m_ActionList.push( action );
		
	}
	
	//	删除一个脚本事件
	this.RemoveAction = function( action )
	{
	}
	
	//	脚本运行。
	this.Run = function( dt )
	{
		if ( m_IsRun == false )
			return;
	
		//	更新当前脚本运行时刻。
		var time = m_Time;
		m_Time += dt*m_Speed;
	
		//	遍历所有脚本事件，执行它。
		var i;
		for ( i = 0; i < m_ActionList.length; i++ )
		{
			m_ActionList[i].Run( time, m_Time );	//	各具体时间按照当前时刻执行相应操作。
		}
	}
	
	//	设置脚本倍速。
	this.SetSpeed = function( speed )
	{
		m_Speed = speed;
	}
	
	//	脚本开始运行。
	this.Start = function()
	{
		m_Time = 0;
		m_IsRun = true;
	}
	
	//	脚本暂停
	this.Pause = function()
	{
		m_IsRun = false;
	}
	
	//	脚本继续执行。
	this.Resume = function()
	{
		m_IsRun = true;
	}
	
	//	脚本停止。
	this.Stop = function()
	{
		m_IsRun = false;
		m_Time = 0;
		
		//	遍历所有脚本事件 清理掉脚本事件引入的内容。
		var i;
		for ( i = 0; i < m_ActionList.length; i++ )
		{
			m_ActionList[i].Clear();	//	脚本事件清理资源，例如某脚本事件执行添加一个默认资源，则该函数需要删除掉该资源。
		}		
	}

	//	设置脚本时间。相当于脚本播放跳转。
	this.SetPos = function( time )
	{
		// 所有脚本事件 从头播放 ？ 清空脚本资源，从头播放？
		Stop();
		Start();
		Run(time/m_Speed);
	}
	
}



