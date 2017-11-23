package com.freedotech.onLinePro.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import com.myapp.WegGl.dto.UserBean;

public class LoginInterceptor implements HandlerInterceptor{

	@Override
	public void afterCompletion(HttpServletRequest req, HttpServletResponse res, Object handler, Exception arg3)
			throws Exception {
	}

	@Override
	public void postHandle(HttpServletRequest arg0, HttpServletResponse arg1, Object arg2, ModelAndView arg3)
			throws Exception {
		// TODO 自动生成的方法存根
		
	}

	@Override
	public boolean preHandle(HttpServletRequest req, HttpServletResponse res, Object handler) throws Exception {
		
		HttpSession session = req.getSession();
		UserBean user = (UserBean) session.getAttribute("user");
		boolean returnValue = null == user;
		if(returnValue) {
			req.setAttribute("loginErrorMsg", "请先登陆系统！");
			req.getRequestDispatcher("/WEB-INF/page/login.jsp").forward(req, res);
		}		
		return !returnValue;
	}
}
