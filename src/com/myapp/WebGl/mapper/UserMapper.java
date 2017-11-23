package com.myapp.WebGl.mapper;

import com.myapp.WegGl.dto.UserBean;

public interface UserMapper {
	UserBean login(String userName, String userPwd);
}
