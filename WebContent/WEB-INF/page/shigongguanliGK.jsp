<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
        <%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="ctx" value="<%=request.getContextPath()%>"></c:set>
<!DOCTYPE html>
<html lang="en">

<head>

    <!-- start: Meta -->
    <meta charset="utf-8">
    <title>项目概况</title>
    <meta name="description" content="Bootstrap Metro Dashboard">
    <meta name="author" content="Dennis Ji">
    <meta name="keyword"
          content="Metro, Metro UI, Dashboard, Bootstrap, Admin, Template, Theme, Responsive, Fluid, Retina">
    <!-- end: Meta -->

    <!-- start: Mobile Specific -->
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link id="bootstrap-style" href="${ctx }/static/page/common/css/bootstrap.min.css" rel="stylesheet">
    <link href="${ctx }/static/page/common/css/bootstrap-responsive.min.css" rel="stylesheet">
    <link id="base-style" href="${ctx }/static/page/common/css/style.css" rel="stylesheet">
    <link id="base-style-responsive" href="${ctx }/static/page/common/css/style-responsive.css" rel="stylesheet">

  	<link rel="stylesheet" href="${ctx }/static/page/common/css/common.css">
    <link rel="stylesheet" href="${ctx }/static/page/common/css/reset.css">
    <link rel="stylesheet" href="${ctx }/static/page/common/IconFont/iconfont.css">
    <script src="${ctx }/static/page/common/js/jquery-1.9.1.min.js"></script>
    <!--<script src="./js/jquery-1.9.1.min.js"></script>-->
    <link rel="stylesheet" href="${ctx }/static/page/common/js/zTreeStyle/zTreeStyle.css">
    <script src="${ctx }/static/page/common/js/zTreeStyle/ztree.js"></script>
    <link rel="stylesheet" href="${ctx }/static/page/shigongguanli/shigongguanliGK/css/shigongguanliGK.css">
    <link rel="stylesheet" href="${ctx }/static/page/common/css/media.css">

    <!-- The HTML5 shim, for IE6-8 support of HTML5 elements -->
    <!--[if lt IE 9]>
    <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
    <link id="ie-style" href="css/ie.css" rel="stylesheet">
    <![endif]-->

    <!--[if IE 9]>
    <link id="ie9style" href="css/ie9.css" rel="stylesheet">
    <![endif]-->
</head>

<body>
<!-- start: Header -->
<div class="navbar">
    <div class="navbar-inner">
        <div class="container-fluid">
            <a class="btn btn-navbar" data-toggle="collapse"
               data-target=".top-nav.nav-collapse,.sidebar-nav.nav-collapse">
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </a>
            <a class="brand" href="${ctx }/toIndex"><span>BIM全生命周期管理平台</span></a>

            <!-- start: Header Menu -->
            <div class="nav-no-collapse header-nav">
                <ul class="nav pull-right">
                    <li class="dropdown hidden-phone">
                        <a class="btn dropdown-toggle" data-toggle="dropdown" href="#">
                            <i class="icon-bell"></i>
                        </a>
                    </li>
                    <!-- start: Message Dropdown -->
                    <li class="dropdown hidden-phone">
                        <a class="btn dropdown-toggle" href="${ctx }/toSet">
                            <i class="iconfont icon-set"></i>
                        </a>
                    </li>
                    <!-- start: Notifications Dropdown -->
                    <li class="dropdown hidden-phone">
                        <a class="btn dropdown-toggle" href="${ctx }/toIndex">
                            <i class="icon-home" style="font-size: 20px"></i>
                        </a>
                    </li>
                    <!-- end: Notifications Dropdown -->
                    <!-- start: User Dropdown -->
                    <li class="dropdown">
                        <a class="btn dropdown-toggle" data-toggle="dropdown" href="#">
                            <i class="halflings-icon white user"></i>李荣
                            <span class="caret"></span>
                        </a>
                        <ul class="dropdown-menu">
                            <li class="dropdown-menu-title">
                                <span>账户设置</span>
                            </li>
                            <li><a href="#"><i class="halflings-icon user"></i> 文件</a></li>
                            <li><a href="${ctx }/loginPage"><i class="halflings-icon off"></i>退出登录</a></li>
                        </ul>
                    </li>
                    <!-- end: User Dropdown -->
                </ul>
            </div>

        </div>
    </div>
</div>
<!-- start: Header -->

<div class="container-fluid-full">
    <div class="row-fluid">

        <!-- start: Main Menu -->
        <div id="sidebar-left" class="span2">
            <div class="nav-collapse sidebar-nav">
                <ul class="nav nav-tabs nav-stacked main-menu">
						<li>
							<a href="${ctx }/toSurveystudyGK">
								<i class="iconfont icon-kcmanager"></i>
								<span class="hidden-tablet">勘测可研</span>
							</a>
						</li>
						<li>
							<a href="${ctx }/toGaikuang">
								<i class="iconfont icon-sheji"></i>
								<span class="hidden-tablet">设计协同</span>
							</a>
						</li>
						<li class="active">
							<a href="${ctx }/toShigongguanliGK">
								<i class="iconfont icon-construct"></i>
								<span class="hidden-tablet">施工管理</span>
							</a>
						</li>
						<li>
							<a href="${ctx }/toYunweiGK">
								<i class="iconfont icon-Refresh"></i>
								<span class="hidden-tablet">运维管理</span>
							</a>
						</li>
                </ul>
            </div>
        </div>
        <!-- end: Main Menu -->

        <!-- start: Content -->
        <div id="content" class="span10">
            <ul class="breadcrumb">
                <i class="iconfont icon-hxzfont08"></i>
                <li class="lists">
                		<a href="${ctx }/toShigongguanliGK" class="activeList">项目概况</a>
						<a href="${ctx }/toEbs">进度管理</a>
						<a href="${ctx }/toPm">场景管理</a>
						<a href="${ctx }/toSafe">安全管理</a>
						<a href="${ctx }/toDungou">盾构监测</a>
						<a href="${ctx }/toRiskmgmt">风险管理</a>
						<a href="#">质量管理</a>
						<a href="#">成本管理</a>
						<a href="#">合同管理</a>
						<a href="#">施工日志</a>
						<a href="#">项目信息</a>
						<a href="${ctx }/toWorkShow">3D综合展示</a>
                </li>

            </ul>
            <div class="row-fluid sortable">
                
                <div class="box span12">
                    <div class="box-header">
                        <h2><i class="halflings-icon white align-justify"></i><span class="break"></span>项目概况</h2>
                        <div class="box-icon">
                            <a href="#" class="btn-setting"><i class="halflings-icon white wrench"></i></a>
                            <a href="#" class="btn-minimize"><i class="halflings-icon white chevron-up"></i></a>
                            <a href="#" class="btn-close"><i class="halflings-icon white remove"></i></a>
                        </div>
                    </div>
                    <div class="box-content">
                        <table class="table table-bordered">
                            <thead>
                            <tr>
                                <th>项目名称</th>
                                <th>项目类别</th>
                                <th>项目成本</th>
                                <th>质量达标</th>
                                <th>安全系数达标</th>
                                <th>项目信息</th>
                                <th>负责人</th>
                                <th>项目进度</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>塘沽地铁站</td>
                                <td>隧道工程</td>
                                <td>24亿</td>
                                <td>达标</td>
                                <td>达标</td>
                                <td>地下20米的，隧道地铁。</td>
                                <td>肖东菁</td>
                                <td><span class="outside"><span class="inside progress1" style="width:20px"></span></span>29%</td>
                            </tr>
                            <tr>
                                <td>广州高明区电场</td>
                                <td>电力工程</td>
                                <td>33亿</td>
                                <td>达标</td>
                                <td>达标</td>
                                <td>输电线路50公里小型发电场</td>
                                <td>傅双育</td>
                                <td><span class="outside"><span class="inside progress1" style="width:35px"></span></span>54%</td>
                            </tr>
                            <tr>
                                <td>岳阳奇家岭水电站</td>
                                <td>水力工程</td>
                                <td>56亿</td>
                                <td>达标</td>
                                <td>达标</td>
                                <td>输电线路2050公里大型水电站</td>
                                <td>潘小旋</td>
                                <td><span class="outside"><span class="inside progress1" style="width:53px"></span></span>70%</td>
                            </tr>
                            <tr>
                                <td>斜拉索大桥</td>
                                <td>桥梁工程</td>
                                <td>19亿</td>
                                <td>达标</td>
                                <td>达标</td>
                                <td>沙岭到范垄3.5公里跳河大桥</td>
                                <td>袁沁茹</td>
                                <td><span class="outside"><span class="inside progress1" style="width:30px"></span></span>40%</td>
                            </tr>
                            <tr>
                                <td>永安水电站</td>
                                <td>水力工程</td>
                                <td>15亿</td>
                                <td>达标</td>
                                <td>达标</td>
                                <td>输电线路919公里大型水电站</td>
                                <td>黄鼎</td>
                                <td><span class="outside"><span class="inside progress1" style="width:8px"></span></span>12%</td>
                            </tr> <tr>
                                <td>张通高速</td>
                                <td>道路工程</td>
                                <td>0.5亿</td>
                                <td>达标</td>
                                <td>达标</td>
                                <td>张州到通古50公里高速公路</td>
                                <td>高群</td>
                                <td><span class="outside"><span class="inside progress1" style="width:22px"></span></span>36%</td>
                            </tr>

                            </tbody>
                        </table>
                        <div class="pagination pagination-centered">
                            <ul>
                                <li><a href="#">上页</a></li>
                                <li class="active">
                                    <a href="#">1</a>
                                </li>
                                <li><a href="#">2</a></li>
                                <li><a href="#">3</a></li>
                                <li><a href="#">下页</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script src="${ctx }/static/page/common/js/jquery-migrate-1.0.0.min.js"></script>
<script src="${ctx }/static/page/common/js/jquery-ui-1.10.0.custom.min.js"></script>
<script src="${ctx }/static/page/common/js/bootstrap.min.js"></script>
<script src='${ctx }/static/page/common/js/jquery.dataTables.min.js'></script>
<script src="${ctx }/static/page/common/js/jquery.chosen.min.js"></script>
<script src="${ctx }/static/page/common/js/jquery.uniform.min.js"></script>
<script src="${ctx }/static/page/common/js/jquery.cleditor.min.js"></script>
<script src="${ctx }/static/page/common/js/jquery.elfinder.min.js"></script>
<script src="${ctx }/static/page/common/js/jquery.raty.min.js"></script>
<script src="${ctx }/static/page/common/js/jquery.uploadify-3.1.min.js"></script>
<script src="${ctx }/static/page/common/js/custom.js"></script>
</body>

</html>