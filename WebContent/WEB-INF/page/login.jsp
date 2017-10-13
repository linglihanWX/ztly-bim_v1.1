<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
    <c:set var="ctx" value="<%=request.getContextPath()%>"></c:set>
<!DOCTYPE html>
<html lang="en">
<head>

	<!-- start: Meta -->
	<meta charset="utf-8">
	<title>登录</title>
	<meta name="description" content="Bootstrap Metro Dashboard">
	<meta name="author" content="Dennis Ji">
	<meta name="keyword" content="Metro, Metro UI, Dashboard, Bootstrap, Admin, Template, Theme, Responsive, Fluid, Retina">
	<!-- end: Meta -->

	<!-- start: Mobile Specific -->
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<!-- end: Mobile Specific -->

	<!-- start: CSS -->
	<link id="bootstrap-style" href="${ctx}/static/page/common/css/bootstrap.min.css" rel="stylesheet">
	
	<link href="${ctx}/static/page/common/css/bootstrap-responsive.min.css" rel="stylesheet">
	
	<link id="base-style" href="${ctx}/static/page/common/css/style.css" rel="stylesheet">
	
	<link id="base-style-responsive" href="${ctx}/static/page/common/css/style-responsive.css" rel="stylesheet">
	
	<link href='http://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800&subset=latin,cyrillic-ext,latin-ext'
	    rel='stylesheet' type='text/css'>
	<!-- end: CSS -->

	<!-- start: Favicon -->
	<link rel="shortcut icon" href="img/favicon.ico">
	<!-- end: Favicon -->

	<style type="text/css">
		body {
			background: url("${ctx}/static/page/common/img/bg-login.jpg") !important;
		}
		a:hover{
			text-decoration: none;
		}
		.header{
			width: 100%;
			height: 50px;
			padding:0 40px;
			background-color: #000;
			box-sizing:border-box;
		}
		.header a{
			display: inline-block;
			height: 100%;
			color: #fff;
			font-size: 24px;
			line-height: 50px;
		}
	</style>



</head>

<body>
	<div class="header">
		<a href="#"><span>BIM全生命周期管理平台</span></a>
	</div>
	<div class="container-fluid-full">
		<div class="row-fluid">

			<div class="row-fluid">
				<div class="login-box">
					<div class="icons">
						<a href="#"><i class="halflings-icon home"></i></a>
						<a href="#"><i class="halflings-icon cog"></i></a>
					</div>
					<h2>登录你的账户</h2>
					<form class="form-horizontal" action="${ctx }/login" method="post">
						<fieldset>

							<div class="input-prepend" title="Username">
								<span class="add-on"><i class="halflings-icon user"></i></span>
								<input class="input-large span10" name="userName" id="userName" type="text" placeholder="用户名" />
							</div>
							<div class="clearfix"></div>

							<div class="input-prepend" title="Password">
								<span class="add-on"><i class="halflings-icon lock"></i></span>
								<input class="input-large span10" name="userPwd" id="userPwd" type="password" placeholder="密码" />
							</div>
							<div class="clearfix"></div>

							<label class="remember" for="remember"><input type="checkbox" id="remember" />记住我</label>

							<div class="button-login">
								<button type="submit" class="btn btn-primary">登录</button>
							</div>
							<div class="clearfix"></div>
					</form>
					<hr>
					<h3>忘记密码</h3>
					<p>
						没问题,<a href="#">点击我</a>找回密码.
					</p>
				</div>
				<!--/span-->
			</div>
			<!--/row-->


		</div>
		<!--/.fluid-container-->

	</div>
	<!--/fluid-row-->

	<!-- start: JavaScript-->

	<script src="${ctx}/static/page/common/js/jquery-1.9.1.min.js"></script>
	
	<script src="${ctx}/static/page/common/js/jquery-migrate-1.0.0.min.js"></script>

	<script src="${ctx}/static/page/common/js/jquery-ui-1.10.0.custom.min.js"></script>

	<script src="${ctx}/static/page/common/js/jquery.ui.touch-punch.js"></script>

	<script src="${ctx}/static/page/common/js/modernizr.js"></script>

	<script src="${ctx}/static/page/common/js/bootstrap.min.js"></script>

	<script src="${ctx}/static/page/common/js/jquery.cookie.js"></script>

	<script src='${ctx}/static/page/common/js/fullcalendar.min.js'></script>

	<script src='${ctx}/static/page/common/js/jquery.dataTables.min.js'></script>

	<script src="${ctx}/static/page/common/js/excanvas.js"></script>
	
	<script src="${ctx}/static/page/common/js/jquery.flot.js"></script>
	
	<script src="${ctx}/static/page/common/js/jquery.flot.pie.js"></script>
	
	<script src="${ctx}/static/page/common/js/jquery.flot.stack.js"></script>
	
	<script src="${ctx}/static/page/common/js/jquery.flot.resize.min.js"></script>

	<script src="${ctx}/static/page/common/js/jquery.chosen.min.js"></script>

	<script src="${ctx}/static/page/common/js/jquery.uniform.min.js"></script>

	<script src="${ctx}/static/page/common/js/jquery.cleditor.min.js"></script>

	<script src="${ctx}/static/page/common/js/jquery.noty.js"></script>

	<script src="${ctx}/static/page/common/js/jquery.elfinder.min.js"></script>

	<script src="${ctx}/static/page/common/js/jquery.raty.min.js"></script>

	<script src="${ctx}/static/page/common/js/jquery.iphone.toggle.js"></script>

	<script src="${ctx}/static/page/common/js/jquery.uploadify-3.1.min.js"></script>

	<script src="${ctx}/static/page/common/js/jquery.gritter.min.js"></script>

	<script src="${ctx}/static/page/common/js/jquery.imagesloaded.js"></script>

	<script src="${ctx}/static/page/common/js/jquery.masonry.min.js"></script>

	<script src="${ctx}/static/page/common/js/jquery.knob.modified.js"></script>

	<script src="${ctx}/static/page/common/js/jquery.sparkline.min.js"></script>

	<script src="${ctx}/static/page/common/js/counter.js"></script>

	<script src="${ctx}/static/page/common/js/retina.js"></script>

	<script src="${ctx}/static/page/common/js/custom.js"></script>
	<!-- end: JavaScript-->

</body>

</html>