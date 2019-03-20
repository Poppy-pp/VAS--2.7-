<template>
	<section class="tab_content-wrapper">
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<template v-for="(item,index) in filters.domSearch">
					<template v-if="index == 0">
						<div style="display:inline-block;margin:0 10px 10px 0;">
							<el-input class="noborder color icon nofocus" @keyup.native.ctrl.8="clearAll()" @keyup.native.13="handleQuerySelect" placeholder="请输入查询内容" v-model="filters.domSearch[index].content">
								<el-select class="wp_select" multiple clearable filterable v-model="filters.domSearch[index].select" slot="prepend" placeholder="选择条件">
									<el-option label="姓名" value="employeename"></el-option>
									<el-option label="公司" value="corpname"></el-option>
									<el-option label="部门" value="deptname"></el-option>
									<el-option label="分组" value="groupname"></el-option>
									<el-option label="岗位" value="positionname"></el-option>
									<el-option label="用户名" value="username"></el-option>
									<el-option label="手机" value="mobile"></el-option>
									<el-option label="类型" value="employeetypename"></el-option>
								</el-select>
								<template v-if="index == filters.domSearch.length-1">
									<el-button slot="append" @click="addSelect" icon="el-icon-plus" title="添加查询条件"></el-button>
								</template>
								<template v-else>
									<el-button slot="append" @click="removeSelect(index)" icon="el-icon-minus" title="移除查询条件"></el-button>
								</template>
							</el-input>
						</div>
					</template>
					<template v-else>
						<el-col :span="24">
							<div style="display:inline-block;margin:0 10px 10px 0;">
								<el-input class="noborder color icon nofocus" @keyup.native.ctrl.8="clearAll()" @keyup.native.13="handleQuerySelect" placeholder="请输入查询内容" v-model="filters.domSearch[index].content">
									<el-select class="wp_select" multiple clearable filterable v-model="filters.domSearch[index].select" slot="prepend" placeholder="选择条件">
										<el-option label="姓名" value="employeename"></el-option>
										<el-option label="公司" value="corpname"></el-option>
										<el-option label="部门" value="deptname"></el-option>
										<el-option label="分组" value="groupname"></el-option>
										<el-option label="岗位" value="positionname"></el-option>
										<el-option label="用户名" value="username"></el-option>
										<el-option label="手机" value="mobile"></el-option>
										<el-option label="类型" value="employeetypename"></el-option>
									</el-select>
									<template v-if="index == filters.domSearch.length-1">
										<el-button slot="append" @click="addSelect" icon="el-icon-plus" title="添加查询条件"></el-button>
									</template>
									<template v-else>
										<el-button slot="append" @click="removeSelect(index)" icon="el-icon-minus" title="移除查询条件"></el-button>
									</template>
								</el-input>
							</div>
						</el-col>
					</template>

					<template v-if="index == 0">
						<el-form-item>
							<el-button type="primary" @click="handleQuerySelect" icon="el-icon-search">查询</el-button>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="handleAdd" icon="el-icon-plus">新增</el-button>
						</el-form-item>
						<el-form-item>
							<el-switch v-model="filters.isenable" active-color="#00C1DE" inactive-color="#ff4949" active-value="1" active-text="有效" inactive-value="0" inactive-text="无效" @change="showData">
							</el-switch>
						</el-form-item>
					</template>
				</template>

				<el-form-item style="float:right;">
					<el-button type="primary" @click="empIn" icon="el-icon-circle-check">员工入职</el-button>
					<el-button type="primary" @click="empLeave" icon="el-icon-circle-cross">员工离职</el-button>
				</el-form-item>
			</el-form>
		</el-col>
		<!--列表-->
		<el-table :max-height="windowOutHeight-165" stripe border :data="listData" :row-class-name="tableRowClassName" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;" @sort-change="sortChange">
			<el-table-column type="index" width="25" align="center" label="#">
			</el-table-column>
			<el-table-column type="selection" width="30" align="center">
			</el-table-column>
			<el-table-column prop="headiconpath" label="头像" align="center" width="60">
				<template scope="scope">
					<div class="brod">
						<template v-if="!scope.row.headiconpath">
							<img src="../../assets/images/pho.png" class="avatar">
						</template>
						<template else-if>
							<img v-if="scope.row.headiconpath" :src="$store.state.IMG_URL+scope.row.headiconpath" class="avatar">
						</template>
					</div>
				</template>
			</el-table-column>
			<el-table-column prop="employeename" label="姓名" align="center" width="80" >
			</el-table-column>
			<el-table-column prop="corpname" label="公司" align="center" >
			</el-table-column>
			<el-table-column prop="deptname" label="部门" align="center" >
			</el-table-column>
			<el-table-column prop="groupname" label="分组" align="center" >
			</el-table-column>
			<el-table-column prop="positionname" label="岗位" align="center" >
			</el-table-column>
			<el-table-column prop="username" label="用户名" align="center" >
			</el-table-column>
			<el-table-column prop="mobile" label="手机" width="100" align="center" >
			</el-table-column>
			<el-table-column prop="employeetypename" label="类型" width="100" align="center" >
			</el-table-column>

			<el-table-column fixed="right" label="操作" width="180" align="center">
				<template scope="scope">
					<el-button id="button" @click="formDetailHandle(scope.row.ID)" title="详情" :disabled="scope.row.isenable == '0' ? true : false">
						<i :class="scope.row.isenable == '0' ? 'iconfont icon-xiangqing operate' : 'iconfont icon-xiangqing operate operate-xiangqing'"></i>
					</el-button>
					<el-button id="button" @click="handleEdit(scope.$index, scope.row)" :disabled="scope.row.isenable == '0' ? true : false" title="编辑">
						<i :class="scope.row.isenable == '0' ? 'iconfont icon-bianji1 operate' : 'iconfont icon-bianji1 operate operate-bianji'"></i>
					</el-button>
					<el-button id="button" @click="roleEdit(scope.$index, scope.row)" title="编辑角色">
						<i class="iconfont icon-jiaoseshezhi operate operate-bianji-coc"></i>
					</el-button>
					<el-button id="button" @click="handleChange(scope.$index, scope.row)" :title='scope.row.isenable == "0" ? "设置为有效" : "设置为无效"'>
						<i :class='scope.row.isenable == "0" ? "iconfont icon-cha operate operate-cha" : "iconfont icon-duigou operate operate-duigou"' @mouseover="mouseoverChange" @mouseout="mouseoutChange"></i>
					</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<!-- <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button> -->
			<el-pagination @size-change="handleSizeChange" background @current-change="handleCurrentChange" :page-sizes="[15, 50, 80, 99]" :page-size="pageSize" layout="total, sizes, prev, pager, next" :total="total" style="float:right;">
			</el-pagination>
		</el-col>

		<!--角色编辑界面-->
		<el-dialog title="编辑角色" :modal-append-to-body="false" :visible.sync="editRoleInfoVisible" :close-on-click-modal="false" @close="roleEditClose">
			<el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
			<div style="margin: 15px 0;"></div>
			<el-checkbox-group v-model="checkedCities" class="userchedaa" @change="handleCheckedCitiesChange">
				<el-checkbox v-for="city in cities" :label="city.id">{{ city.rolename }}</el-checkbox>
			</el-checkbox-group>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editRoleInfoVisible = false">取消</el-button>
				<el-button type="primary" @click.native="handleNodeClick" :loading="nodeLoading">提交</el-button>
			</div>
		</el-dialog>
		<!-- 详情 弹窗 start-->
		<el-dialog title="" :modal-append-to-body="false" :visible.sync="formDialogTableVisible">
			<el-tabs>
				<el-row style="padding:0 40px;margin-bottom:20px;border-bottom:1px solid #C4E8D6;">
					<el-col :span="24">
						<span class="formTile">员工信息</span>
					</el-col>
					<el-col :span="8">
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>头像:</dt>
							<dd>
								<template v-if="!otherinfoData.headiconpath ">
									<img style="width:35px;height:35px;border-radius:100%;" src="../../assets/images/pho.png" alt="头像">
								</template>
								<template v-else>
									<img style="width:40px;height:40px;border-radius:100%;" :src="$store.state.IMG_URL+otherinfoData.headiconpath" alt="头像">
								</template>
							</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>姓名:</dt>
							<dd>{{ otherinfoData.employeename }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>用户名:</dt>
							<dd>{{ otherinfoData.username }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>员工编号:</dt>
							<dd>{{ otherinfoData.employeecode == undefined ? '暂无' : otherinfoData.employeecode }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>性别:</dt>
							<dd>{{ otherinfoData.gender == 'M' ? '男' : otherinfoData.gender == 'F' ? '女' : '暂无' }}</dd>
						</dl>
					</el-col>
					<el-col :span="9">
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>所属公司:</dt>
							<dd>{{ otherinfoData.corpname == undefined ? '暂无' : otherinfoData.corpname }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>所属部门:</dt>
							<dd>{{ otherinfoData.deptname == undefined ? '暂无' : otherinfoData.deptname }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>所属分组:</dt>
							<dd>{{ otherinfoData.groupname == undefined ? '暂无' : otherinfoData.groupname }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>员工岗位:</dt>
							<dd>{{ otherinfoData.positionname == undefined ? '暂无' : otherinfoData.positionname }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>员工类型:</dt>
							<dd>{{ otherinfoData.employeetypename == undefined ? '暂无' : otherinfoData.employeetypename }}</dd>
						</dl>
					</el-col>
					<el-col :span="7">
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>手机:</dt>
							<dd>{{ otherinfoData.mobile }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>区域:</dt>
							<dd>{{ otherinfoData.region == undefined ? '暂无' : otherinfoData.region }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>通讯地址:</dt>
							<dd>{{ otherinfoData.address == undefined ? '暂无' : otherinfoData.address }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>微信:</dt>
							<dd>{{ otherinfoData.wechatid == undefined ? '暂无' : otherinfoData.wechatid }}</dd>
						</dl>
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>QQ:</dt>
							<dd>{{ otherinfoData.qq == undefined ? '暂无' : otherinfoData.qq }}</dd>
						</dl>
					</el-col>
				</el-row>

				<el-row style="padding:10px 40px;margin-bottom:20px;border-bottom:1px solid #C4E8D6;">
					<el-col :span="24">
						<span class="formTile">创建信息</span>
					</el-col>
					<el-col :span="6">
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>创建人:</dt>
							<dd>{{createname == undefined ? '暂无' : createname}}</dd>
						</dl>
					</el-col>
					<el-col :span="6">
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>创建日期:</dt>
							<dd>{{otherinfoData.createdate == null ? "暂无" :fmtdata.formatDate.format(new Date(otherinfoData.createdate), 'yyyy-MM-dd') }}</dd>
						</dl>
					</el-col>
					<el-col :span="6">
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>修改人:</dt>
							<dd>{{updatename == undefined ? '暂无' : updatename}}</dd>
						</dl>
					</el-col>
					<el-col :span="6">
						<dl class="dllist" style="margin-bottom:10px;">
							<dt>修改日期:</dt>
							<dd>{{otherinfoData.updatedate == null ? "暂无" :fmtdata.formatDate.format(new Date(otherinfoData.updatedate), 'yyyy-MM-dd') }}</dd>
						</dl>
					</el-col>
				</el-row>
			</el-tabs>
		</el-dialog>
		<!-- 订单详情 弹窗  end-->

		<!--编辑界面-->
		<el-dialog title="编辑" :modal-append-to-body="false" :visible.sync="editFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="员工头像" prop="headiconpath">
							<el-upload v-model="editForm.headiconpath" class="avatar-uploader" action="/vasms-web/atta/upload" :show-file-list="false" :accept="accept" name="mediaFile" list-type="picture-card" :on-success="headImgSuccess">
								<img v-if="imageUrl" :src="imageUrl" class="avatar radius">
								<i v-else class="el-icon-plus avatar-uploader-icon"></i>
							</el-upload>
						</el-form-item>
						<el-form-item label="员工姓名" prop="employeename">
							<el-input v-model="editForm.employeename" placeholder="请输入员工姓名" auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="性别" prop="gender">
							<el-radio-group v-model="editForm.gender">
								<el-radio class="radio" label="M">男</el-radio>
								<el-radio class="radio" label="F">女</el-radio>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="类型" prop="employeetypename">
							<el-select v-model="editForm.employeetypename" @visible-change="empChange" :loading="etLoading" filterable placeholder="请选择员工类型" clearable>
								<el-option v-for="item in emptype" :key="item.dictdatavalue" :label="item.dictdatavalue" :value="item.dictdataname">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="手机号码" prop="mobile" ref="mobile">
							<el-input v-model="editForm.mobile" placeholder="请输入员工手机号码" auto-complete="off" @blur="checkout('mobile',editForm.mobile,0)"></el-input>
						</el-form-item>
						<el-form-item label="用户名" prop="username">
							<el-input v-model="editForm.username" disabled placeholder="请输入员工用户名" auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="员工编号" prop="employeecode">
							<el-input v-model="editForm.employeecode" placeholder="请输入员工编号" auto-complete="off"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="所属公司" prop="corpname">
							<el-select v-model="editForm.corpname" @visible-change="corpChange" :loading="corpLoading" filterable placeholder="请选择所属公司" clearable @change="sendCorpIdData" remote :remote-method="corpChangeSelect">
								<el-option v-for="item in corplist" :key="item.corpname" :label="item.corpname" :value="item.ID">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="所属部门" prop="deptname">
							<el-select v-model="editForm.deptname" @visible-change="deptChange" :loading="deptLoading" filterable placeholder="请选择所属部门" clearable @change="sendDeptIdData">
								<el-option v-for="item in deptlist" :key="item.deptname" :label="item.deptname" :value="item.id">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="所属分组" prop="groupname">
							<el-select v-model="editForm.groupname" :loading="groupLoading" filterable placeholder="请选择所属分组" clearable>
								<el-option v-for="item in grouplist" :key="item.groupname" :label="item.groupname" :value="item.ID">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="员工岗位" prop="positionname">
							<el-select v-model="editForm.positionname" @visible-change="posChange" :loading="posLoading" filterable placeholder="请选择员工岗位" clearable remote :remote-method="posChangeSelect">
								<el-option v-for="item in poslist" :key="item.positionname" :label="item.positionname" :value="item.ID">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="所属区域" prop="regionAll">
							<el-cascader placeholder="请选择省/市/区" v-model="editForm.regionAll" :options="prOptions" filterable clearable change-on-select></el-cascader>
						</el-form-item>
						<el-form-item label="通讯地址" prop="address">
							<el-input v-model="editForm.address" placeholder="请输入通讯地址" auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="员工QQ" prop="qq">
							<el-input v-model="editForm.qq" placeholder="请输入员工QQ" auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="员工微信" prop="wechatid">
							<el-input v-model="editForm.wechatid" placeholder="请输入员工微信" auto-complete="off"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
			</div>
		</el-dialog>

		<!--新增界面-->
		<el-dialog title="新增" :modal-append-to-body="false" :visible.sync="addFormVisible" :close-on-click-modal="false">
			<el-form :model="addForm" label-width="100px" :rules="addFormRules" ref="addForm">
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item label="员工头像" prop="headiconpath">
							<el-upload class="avatar-uploader" action="/vasms-web/atta/upload" :show-file-list="false" :accept="accept" name="mediaFile" list-type="picture-card" :on-success="headImgSuccess">
								<img v-if="imageUrl" :src="imageUrl" class="avatar radius">
								<i v-else class="el-icon-plus avatar-uploader-icon"></i>
							</el-upload>
						</el-form-item>
						<el-form-item label="员工姓名" prop="employeename">
							<el-input v-model="addForm.employeename" placeholder="请输入员工姓名" auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="性别" prop="gender">
							<el-radio-group v-model="addForm.gender">
								<el-radio class="radio" label="M">男</el-radio>
								<el-radio class="radio" label="F">女</el-radio>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="类型" prop="employeetypename">
							<el-select v-model="addForm.employeetypename" @visible-change="empChange" :loading="etLoading" filterable placeholder="请选择员工类型" clearable>
								<el-option v-for="item in emptype" :key="item.dictdatavalue" :label="item.dictdatavalue" :value="item.dictdataname">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="手机号码" prop="mobile" ref="mobile">
							<el-input v-model="addForm.mobile" placeholder="请输入员工手机号码" auto-complete="off" @blur="checkout('mobile',addForm.mobile,0)"></el-input>
						</el-form-item>
						<el-form-item label="用户名" prop="username">
							<el-input v-model="addForm.username" disabled placeholder="请输入员工用户名" auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="员工编号" prop="employeecode">
							<el-input v-model="addForm.employeecode" placeholder="请输入员工编号" auto-complete="off"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="所属公司" prop="corpname">
							<el-select v-model="addForm.corpname" @visible-change="corpChange" :loading="corpLoading" filterable placeholder="请选择所属公司" clearable @change="sendCorpIdData" remote :remote-method="corpChangeSelect">
								<el-option v-for="item in corplist" :key="item.corpname" :label="item.corpname" :value="item.ID">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="所属部门" prop="deptname">
							<el-select v-model="addForm.deptname" @visible-change="deptChange" :loading="deptLoading" filterable placeholder="请选择所属部门" clearable @change="sendDeptIdData">
								<el-option v-for="item in deptlist" :key="item.deptname" :label="item.deptname" :value="item.id">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="所属分组" prop="groupname">
							<el-select v-model="addForm.groupname" :loading="groupLoading" filterable placeholder="请选择所属分组" clearable>
								<el-option v-for="item in grouplist" :key="item.groupname" :label="item.groupname" :value="item.ID">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="员工岗位" prop="positionname">
							<el-select v-model="addForm.positionname" @visible-change="posChange" :loading="posLoading" filterable placeholder="请选择员工岗位" clearable remote :remote-method="posChangeSelect">
								<el-option v-for="item in poslist" :key="item.positionname" :label="item.positionname" :value="item.ID">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="所属区域" prop="address">
							<el-cascader placeholder="请选择省/市/区" v-model="addForm.regionAll" :options="prOptions" filterable clearable change-on-select></el-cascader>
						</el-form-item>
						<el-form-item label="通讯地址" prop="address">
							<el-input v-model="addForm.address" placeholder="请输入通讯地址" auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="员工QQ" prop="qq">
							<el-input v-model="addForm.qq" placeholder="请输入员工QQ" auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="员工微信" prop="wechatid">
							<el-input v-model="addForm.wechatid" placeholder="请输入员工微信" auto-complete="off"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="addFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
			</div>
		</el-dialog>
	</section>
</template>
<style>
	div.brod {
		border-radius: 100%;
		width: 35px;
		height: 35px;
		overflow: hidden;
		margin: 2px auto;
	}
	
	div.brod img {
		width: 100%;
		height: 100%;
	}
	
	.radius {
		border-radius: 100%;
		width: 145px;
		height: 140px;
	}
	
	.el-table .warning-row {
		background-color: #F3F5F8;
		color: #BFCBD9;
	}
	
	#button {
		border: none;
		display: inline-block;
		width: 0;
		margin: 0;
		background-color: transparent;
	}
	
	.wp_select {
		max-width: 1396px;
		min-width: 94px;
		cursor: pointer;
		margin-right: 0 !important;
		margin-left: 0 !important;
	}
	
	.wp_select .el-select__tags {
		max-width: 1396px !important;
		position: relative;
		line-height: normal;
		height: 36px;
		line-height: 36px;
		white-space: inherit;
		z-index: 1;
		top: 0;
		transform: inherit;
		-ms-transform: inherit;
		padding: 0 10px 0 0;
	}
	
	.wp_select .el-input {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		-ms-transform: translateY(-50%);
		z-index: 0;
		padding-left: 5px;
	}
	/*搜索输入框左边框*/
	
	.noborder .el-input__inner {
		border-left: 0;
		padding: 0;
	}
	/*搜素下拉框颜色*/
	
	.color .el-input-group__prepend {
		background-color: #fff;
	}
	/*搜索下拉框箭头宽*/
	
	.icon .el-input__icon {
		width: 14px;
		right: 12px;
	}
	
	.nofocus .el-input__inner:focus,
	.nofocus .el-input__inner:hover {
		border-color: #bfcbd9;
	}
</style>
<script>
	import util from '../../common/js/util';
	import nanobar from '../../common/js/nanobar';
	import { getEmployeeInfoList, addEmployeeInfo, modifyEmployeeInfo, removeEmployeeInfo, getEmpType, getPosList, getDeptList, getGroupList, getUserList, getCorporateInfoList, getGroupInfoList, searchCorpNameList, getEmpGroupInfoList, getSortList, getSelectList, getPositionList, getDepartmentInfoList, getUserRole, getSysRoleInfoList, editUserRole, modifyEmployeeInfoStatus, getCheckout, getNamebyUserid } from '../../api/api';
	export default {
		name:'EmployeeInfo',
		props: ['windowOutHeight'],
		data() {
			// 验证手机
			var checkMobile = (rule, value, callback) => {
				var reg = /^1\d{10}$/g,
					flag = reg.test(value);
				if(!flag) {
					return callback(new Error('请输入11位的手机号码'));
				} else {
					callback();
				}
			};
			//验证中文名字(只能输入中文不能大于四个子)
			var checkName = (rule, value, callback) => {
				var reg = /^[a-zA-Z\u4e00-\u9fa5]{1,10}$/g,
					flag = reg.test(value);
				if(!flag) {
					return callback(new Error('只能输入10个以内的汉字和字母'));
				} else {
					callback();
				}
			}
			return {
				fmtdata: util,
				filters: {
					isenable: '1',
					domSearch: [{
						select: ['employeename'],
						content: ''
					}] //查询框
				},
				radio: '1',
				editRoleInfoVisible: false,
				isIndeterminate: true,
				prOptions: util.initProvince(),
				listData: [],
				emptype: [], //员工类型列表
				poslist: [], //员工职位列表
				posLoading: false,
				deptlist: [], //员工所属部门列表
				deptLoading: false,
				corplist: [], //所属公司
				corpLoading: false, //
				grouplist: [], //所属分组
				groupLoading: false, //
				createname: "",
				updatename: "",
				otherinfoData: [], //详情数据
				formDialogTableVisible: false, //是否显示订单详情弹出
				etLoading: false,
				ptLoading: false,
				total: 0,
				checkoutDataT: true, //数据验证返回的布尔值true
				checkoutDataF: [], //数据验证组
				thisInput: '', //编辑时存入row验证的值
				currentPage: 1,
				pageSize: 15,
				listLoading: false,
				curUserId: '',
				cities: [],
				checkAll: true,
				nodeLoading: false,
				groupLoading: false, //
				imageUrl: '', //头像
				accept: '.jpg,.png,.jpeg',
				// headers:{token:JSON.parse(localStorage.getItem('user')).token},
				sels: [], //列表选中列
				editFormVisible: false, //编辑界面是否显示
				editLoading: false,
				editFormRules: { //表单验证
					employeename: [{
							required: true,
							message: "请输入员工姓名",
							trigger: 'blur'
						},
						{
							validator: checkName,
							trigger: 'blur'
						}
					],
					mobile: [{
							required: true,
							message: "请输入员工手机号码",
							trigger: 'blur'
						},
						{
							validator: checkMobile,
							trigger: 'blur'
						}
					],
					employeetypename: [{
						required: true,
						message: "请选择员工类型",
						trigger: 'blur'
					}]
				},
				//编辑界面数据
				editForm: {
					id: '',
					headiconpath: '',
					employeetypename: '',
					employeecode: '',
					employeename: '',
					username: '',
					positionname: '',
					mobile: '',
					isenable: 1,
					positionid: '',
					groupid: '',
					groupname: '',
					deptid: '',
					deptname: '',
					gender: '',
					region: '',
					address: '',
					wechatid: '',
					qq: '',
					regionAll: '',
				},
				editFormId: {
					employeetype: '',
					positionid: '',
					userid: '',
					corpid: '',
					corpname: '',
					groupid: '',
					groupname: '',
					positionname: '',
					deptname: '',
					deptid: '',
				},
				//新增界面数据
				addForm: {
					headiconpath: '',
					employeetypename: '',
					employeecode: '',
					employeename: '',
					username: '',
					positionname: '',
					deptname: '',
					groupname: '',
					corpname: '',
					mobile: '',
					stogisneed: '',
					isenable: 1,
					positionid: '',
					deptid: '',
					groupid: '',
					corpid: '',
					gender: 'M',
					region: '',
					address: '',
					wechatid: '',
					qq: '',
					regionAll: '',
				},
				checkedCities: [],
				addFormVisible: false, //新增界面是否显示
				addLoading: false,
				addFormRules: {
					employeename: [{
							required: true,
							message: "请输入员工姓名",
							trigger: 'blur'
						},
						{
							validator: checkName,
							trigger: 'blur'
						}
					],
					mobile: [{
							required: true,
							message: "请输入员工手机号码",
							trigger: 'blur'
						},
						{
							validator: checkMobile,
							trigger: 'blur'
						}
					],
					regionAll: [{
						required: true,
						message: "请选择所属区域",
						trigger: 'blur'
					}], //区域验证
					employeetypename: [{
						required: true,
						message: "请选择员工类型",
						trigger: 'blur'
					}]
				},

			};

		},
		methods: {
			//新增时数据监测
			checkout(p, v, index) {
				if(v == "") return;
				if(this.thisInput == v) return; //编辑时 没改输入框值
				this.checkoutDataT = true; //初始化
				let paras = {
					para: p,
					value: v,
				}
				getCheckout(paras).then((res) => {
					let errorInput = res.data.data.param; //保存验证失败的字段
					if(!res.data.data.result) {
						this.$message({
							message: '信息输入重复！',
							type: 'warning'
						});
						this.$refs[errorInput].$el.className = "el-form-item is-error"; //输入框标红
						this.checkoutDataF[index] = false
					} else {
						this.$refs[errorInput].$el.className = "el-form-item"; //输入框恢复
						this.checkoutDataF[index] = true
					}
				});
			},
			// 员工入职跳转
			empIn() {
				this.$router.push('/employeeInduction');
			},
			// 员工离职跳转
			empLeave() {
				this.$router.push('/employeeLeave');
			},
			//查询清空
			clearAll() {
				this.filters.domSearch = [{
					select: [],
					content: ''
				}] //清空查询框;
			},
			// 角色编辑
			roleEditClose() {
				this.checkedCities = [];
			},
			handleCheckAllChange(event) {
				let arry = [];
				this.cities.forEach(function(obj) {
					arry.push(obj.id);
				});
				this.checkedCities = event ? arry : [];
				this.isIndeterminate = false;
			},
			handleCheckedCitiesChange(value) {
				let checkedCount = value.length;
				this.checkAll = checkedCount === this.cities.length;
				this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
			},
			//角色编辑
			roleEdit: function(index, row) {
				this.editRoleInfoVisible = true;
				this.curUserId = row.userid;

				//初始化角色
				let paraOne = {isenable:"1"}
				getSysRoleInfoList(paraOne).then((res) => {
					this.cities = res.data.data.records;
					let para = {
						userid: this.curUserId,
					};
					getUserRole(para).then((res) => {
						let carry = [];
						res.data.data.records.forEach(function(obj) {
							carry.push(obj.roleid);
						});
						this.checkedCities = carry;
					});
				});
			},
			handleNodeClick() {
				this.nodeLoading = true;
				let checkedNode = this.checkedCities,
					para = {
						userid: this.curUserId,
						data: []
					},
					_this = this;
				checkedNode.forEach(function(val) {
					var obj = {};
					obj.userid = _this.curUserId;
					obj.roleid = val;
					para.data.push(obj);
				});
				editUserRole(para).then((res) => {
					var data = res.data.data;
					this.$message({
						message: '编辑角色权限成功！',
						type: 'success'
					});
					this.nodeLoading = false;
					this.editRoleInfoVisible = false;
				});
			},
			// 排序
			sortChange(col, prop, order) {
				let para = {
					prop: col.prop,
					order: col.order.substring(0, col.order.length - 6),
				}
				console.log(para);
				getSortList(para).then((res) => {});
			},
			//详情查看
			formDetailHandle(empid) {
				this.formDialogTableVisible = true;
				let para = {
					id: empid,
				}
				nanobar.go(70);
				getEmployeeInfoList(para).then((res) => {
					this.otherinfoData = res.data.data.records[0];
					nanobar.go(100);

					let paraThree = {
						createby: this.otherinfoData.createby == null ? 0 : this.otherinfoData.createby,
						updateby: this.otherinfoData.updateby == null ? 0 : this.otherinfoData.updateby,
					}
					getNamebyUserid(paraThree).then((res) => {
						this.createname = res.data.data[0];
						this.updatename = res.data.data[1];
					});
				});

			},
			// 有效无效开关
			showData(i) {
				this.filters.isenable = i;
				this.handleQuery();
			},
			//  // 分组——搜索下拉
			// querySearchGropName(queryString, cb){
			//         let para = {
			//             groupname : queryString
			//         },groupNameArray=[];
			//         getGroupInfoList(para).then((res) => {
			//             res.data.data.records.forEach( function(item, index) {
			//                 groupNameArray.push({value:item.groupname,id:item.ID});
			//             });
			//             cb(groupNameArray);
			//         });
			// },
			// handleSelectGropName(item){
			//       this.editForm.groupname = item.value;
			//       this.editForm.groupid = item.id;
			//       this.addForm.groupname = item.value;
			//       this.addForm.groupid = item.id;
			//  },
			// 公司——搜索下拉
			// querySearchCorpName(queryString, cb){
			//         let para = {
			//             corpname : queryString
			//         },corpNameArray=[];
			//         searchCorpNameList(para).then((res) => {
			//             res.data.data.records.forEach( function(item, index) {
			//                 corpNameArray.push({value:item.corpname,id:item.id});
			//             });
			//             cb(corpNameArray);
			//         });
			// },
			// handleSelectCorpName(item){
			//       this.editForm.corpname = item.value;
			//       this.editForm.corpid = item.id;
			//       this.addForm.corpname = item.value;
			//       this.addForm.corpid = item.id;
			//  },
			// 职位——搜索下拉
			// querySearchName(queryString, cb){
			//         let para = {
			//             positionname : queryString,
			//             isdelete:0
			//         },posNameArray=[];
			//         getPosList(para).then((res) => {
			//             res.data.data.records.forEach( function(item, index) {
			//                 posNameArray.push({value:item.positionname,id:item.id});
			//             });
			//             cb(posNameArray);
			//         });
			// },
			// handleSelectName(item){
			//       this.editForm.positionname = item.value;
			//       this.editForm.positionid = item.id;
			//       this.addForm.positionname = item.value;
			//       this.addForm.positionid = item.id;
			//  },
			// 部门——搜索下拉
			// querySearchDepName(queryString, cb){
			//         let para = {
			//             deptname : queryString
			//         },depNameArray=[];
			//         getDeptList(para).then((res) => {
			//             res.data.data.records.forEach( function(item, index) {
			//                 depNameArray.push({value:item.deptname,id:item.id});
			//             });
			//             cb(depNameArray);
			//         });
			// },
			// handleSelectDepName(item){
			//       this.editForm.deptname = item.value;
			//       this.editForm.deptid = item.id;
			//       this.addForm.deptname = item.value;
			//       this.addForm.deptid = item.id;
			//  },

			// 选择所属公司时，匹配部门，传corpid
			sendCorpIdData(val) {
				this.addForm.deptname = ''; //清空所属部门
				this.addForm.groupname = ''; //清空所属分组
				this.editForm.deptname = ''; //清空所属部门
				this.editForm.groupname = ''; //清空所属分组

				let para = {
					corpid: val
				}
				if(typeof(para.corpid) == 'number') {
					getDepartmentInfoList(para).then((res) => {
						this.deptlist = res.data.data.records;
					});
				}
			},
			// 选择所属部门时，匹配分组，传deptid
			sendDeptIdData(val) {
				this.addForm.groupname = ''; //清空所属分组
				this.editForm.groupname = ''; //清空所属分组
				let para = {
					deptid: val
				}
				if(typeof(para.deptid) == 'number') {
					getGroupInfoList(para).then((res) => {
						this.grouplist = res.data.data.records;
					});
				}

			},
			/*所属公司——下拉*/
			corpChange(r) {
				this.corplist = [];
				if(!r || this.corplist.length > 0) return;
				let para = {
					showCount: 30
				}
				this.corpLoading = true;
				getCorporateInfoList(para).then((res) => {
					this.corplist = res.data.data.records;
					this.corpLoading = false;
				});
			},
			// 所属公司，模糊查询
			corpChangeSelect(query) {
				let para = {
					showCount: 30,
					corpname: query,
				}
				this.corpLoading = true;
				getCorporateInfoList(para).then((res) => {
					this.corplist = res.data.data.records;
					this.corpLoading = false;
				});
			},
			//所属 部门——搜索下拉
			deptChange(r) {
				if(!r || this.deptlist.length > 0) return;
				this.deptLoading = true;
				getDeptList().then((res) => {
					// this.deptlist = res.data.data.records;//未选择公司时不获取部门信息
					this.deptLoading = false;
				});
			},
			// 员工岗位——搜索下拉
			posChange(r) {
				if(!r || this.poslist.length > 0) return;
				this.posLoading = true;
				getPositionList().then((res) => {
					this.poslist = res.data.data.records;
					this.posLoading = false;
				});
			},
			// 员工岗位——模糊搜索下拉
			posChangeSelect(query) {
				let para = {
					showCount: 30,
					positionname: query,
				}
				this.posLoading = true;
				getPositionList(para).then((res) => {
					this.poslist = res.data.data.records;
					this.posLoading = false;
				});
			},
			//有效无效转换
			isenableFomat(row, col) {
				return row.isenable == 1 ? '是' : row.isenable != undefined ? '否' : '未知';
			},
			// 有效无效颜色切换
			tableRowClassName(row, index) {
				if(row.isenable == 0) {
					return 'warning-row';
				}
				return '';
			},
			// 有效按钮切换状态
			handleChange: function(index, row) {
				this.$confirm('确认设置该条记录的状态吗？', '提示', {
					type: 'warning'
				}).then(() => {
					let para = {
						id: row.ID,
						userid: row.userid,
						isenable: row.isenable == 0 ? 1 : 0,
						isactive: row.isenable == 0 ? 1 : 0,
					}
					if(para.isenable == 0) { //有效变无效时
						modifyEmployeeInfoStatus(para).then((res) => {
							if(res.data.data.disable != undefined) {
								this.$message({
									message: '设置成功',
									type: 'success'
								});
								row.isenable = para.isenable;
							} else {
								this.$message({
									message: '该员工有关联关系，请先解除关联关系！',
									type: 'warning'
								});
							}

						});
					} else {
						modifyEmployeeInfo(para).then((res) => {
							this.$message({
								message: '设置成功！',
								type: 'success'
							});
							row.isenable = para.isenable;
						}).catch(() => {
							this.listLoading = false;
						});
					}
				});
			},
			// 有效 鼠标移入
			mouseoverChange(e) {
				if($(e.target).hasClass('icon-duigou')) {
					$(e.target).addClass('operate-cha icon-cha').removeClass('operate-duigou icon-duigou');
				} else {
					$(e.target).addClass('operate-duigou icon-duigou').removeClass('operate-cha icon-cha');
				}
			},
			// 有效 鼠标移除
			mouseoutChange(e) {
				if($(e.target).hasClass('icon-cha')) {
					$(e.target).addClass('operate-duigou icon-duigou').removeClass('operate-cha icon-cha');
				} else {
					$(e.target).addClass('operate-cha icon-cha').removeClass('operate-duigou icon-duigou');
				}
			},
			// 上传图片成功后
			headImgSuccess(res, file) {
				this.imageUrl = URL.createObjectURL(file.raw);
				this.editForm.headiconpath = res;
				this.addForm.headiconpath = res;
			},
			// 员工类型
			empChange(r) {
				if(!r || this.emptype.length > 0) return;
				this.etLoading = true;
				getEmpType().then((res) => {
					this.emptype = res.data.data.records;
					this.etLoading = false;
				});
			},

			//切换当前页
			handleCurrentChange(val) {
				this.currentPage = val;
				// this.handleQuery();
				this.handleQuerySelect(); //查询分页
			},
			//切换每页显示数量
			handleSizeChange(val) {
				this.pageSize = val;
				this.handleQuery();
			},
			// 添加查询条件
			addSelect() {
				this.filters.domSearch.push({
					select: [],
					content: ''
				});
			},
			// 移除查询条件
			removeSelect(index) {
				this.filters.domSearch.splice(index, 1); //从当前index位置开始，删除一项
			},
			//搜索按钮——模糊查询
			handleQuerySelect() {
				let para = {
					currentPage: this.currentPage,
					showCount: this.pageSize,
					isenable: this.filters.isenable,
					domSearch: this.filters.domSearch,
				};
				this.listLoading = true;
				getSelectList(para).then((res) => {
					this.total = res.data.data.totalResult;
					this.listData = res.data.data.records;
					this.listLoading = false;
				}).catch((error) => {
					this.listLoading = false;
				});
			},
			//获取保单列表
			handleQuery() {
				let para = {
					currentPage: this.currentPage,
					showCount: this.pageSize,
					isenable: this.filters.isenable,
					content: this.filters.content,
					select: this.filters.select,
				};
				this.listLoading = true;
				getEmployeeInfoList(para).then((res) => {
					this.total = res.data.data.totalResult;
					this.listData = res.data.data.records;
					this.listLoading = false;
				}).catch((error) => {
					this.listLoading = false;
				});
			},
			//删除
			handleDel(index, row) {
				this.$confirm('确认删除该记录吗?', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					let para = {
						ids: row.ID,
						method: "delete"
					};
					removeEmployeeInfo(para).then((res) => {
						this.listLoading = false;
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.handleQuery();
					});
				}).catch(() => {
					this.listLoading = false;
				});
			},
			//显示编辑界面
			handleEdit(index, row) {
				// 查询公司部门分组
				this.sendCorpIdData(row.corpid);
				this.sendDeptIdData(row.deptid);

				$(".is-error").removeClass('is-error'); //清空验证时的红框
				this.editFormVisible = true;
				// 地址
				var addrVal = row.region;
				if(addrVal != null) {
					var addrArr = addrVal.split(",");
				} else {
					var addrArr = ["四川", "成都", "高新区"];
				}
				this.editForm = {
					id: row.ID,
					headiconpath: row.headiconpath,
					employeetypename: row.employeetypename,
					employeecode: row.employeecode,
					employeename: row.employeename,
					username: row.username,
					positionname: row.positionname,
					corpname: row.corpname,
					groupname: row.groupname,
					deptname: row.deptname,
					mobile: row.mobile,
					isenable: parseInt(row.isenable),
					gender: row.gender,
					regionAll: addrArr,
					address: row.address,
					wechatid: row.wechatid,
					qq: row.qq,
				}
				this.editFormId = {
					employeetype: row.employeetype,
					employeetypename: row.employeetypename,
					positionid: row.positionid,
					positionname: row.positionname,
					deptid: row.deptid,
					deptname: row.deptname,
					corpid: row.corpid,
					corpname: row.corpname,
					groupid: row.groupid,
					groupname: row.groupname,
				}
				this.thisInput = this.editForm.mobile; //将当前验证的字段 已获得的值存入
				// 设置编辑时获取头像方式
				if(this.editForm.headiconpath == undefined) {
					this.imageUrl = '';
				} else {
					this.imageUrl = this.$store.state.IMG_URL + row.headiconpath;
				}
			},
			//显示新增界面
			handleAdd() {
				$(".is-error").removeClass('is-error'); //清空验证时的红框
				this.addFormVisible = true;
				this.addForm = {
					headiconpath: '',
					employeetypename: '',
					username: '',
					employeecode: '',
					employeename: '',
					positionname: '',
					deptname: '',
					corpname: '',
					groupname: '',
					mobile: '',
					stogisneed: '',
					isenable: 1,
					gender: 'M',
					regionAll: ["四川", "成都", "高新区"],
					region: '',
					address: '',
					wechatid: '',
					qq: '',
					deptid: '',
					groupid: '',
					positionid: '',
				};
			},
			//编辑
			editSubmit() {
				this.$refs.editForm.validate((valid) => {
					if(valid) {
						this.editLoading = true;
						let para = {
							id: this.editForm.id,
							employeecode: this.editForm.employeecode,
							employeename: this.editForm.employeename,
							username: this.editForm.username,
							deptid: this.editForm.deptname,
							positionid: this.editForm.positionname,
							corpid: this.editForm.corpname,
							groupid: this.editForm.groupname,
							mobile: this.editForm.mobile,
							isenable: this.editForm.isenable,
							headiconpath: this.editForm.headiconpath,
							gender: this.editForm.gender,
							region: this.editForm.regionAll.toString(),
							address: this.editForm.address,
							wechatid: this.editForm.wechatid,
							qq: this.editForm.qq,
						}
						if(this.editFormId.employeetypename == this.editForm.employeetypename) {
							para.employeetype = this.editFormId.employeetype;
						} else {
							para.employeetype = this.editForm.employeetypename;
						}
						// if(this.editFormId.deptname == this.editForm.deptname) {
						//     para.deptid = this.editFormId.deptid;
						// }else{
						//     para.deptid = this.editForm.deptid;
						// }
						if(this.editFormId.deptname == this.editForm.deptname) {
							para.deptid = this.editFormId.deptid;
						} else {
							para.deptid = this.editForm.deptname;
						}
						if(this.editFormId.groupname == this.editForm.groupname) {
							para.groupid = this.editFormId.groupid;
						} else {
							para.groupid = this.editForm.groupname;
						}
						if(this.editFormId.positionname == this.editForm.positionname) {
							para.positionid = this.editFormId.positionid;
						} else {
							para.positionid = this.editForm.positionname;
						}
						if(this.editFormId.corpname == this.editForm.corpname) {
							para.corpid = this.editFormId.corpid;
						} else {
							para.corpid = this.editForm.corpname;
						}
						if(para.corpid != '' && para.deptid == '') { //当选择了公司,未选择部门时
							this.$message({
								message: '请选择部门！',
								type: 'warning'
							});
							this.editLoading = false;
							return;
						} else {
							modifyEmployeeInfo(para).then((res) => {
								this.editLoading = false;
								if(res.data.result.desc != 'success') {
									this.$message({
										message: '当前员工电话号码有误或者在员工(有效或者无效)中已存在此号码！',
										type: 'warning'
									});
									return;
								} else {
									this.$message({
										message: '编辑成功！',
										type: 'success'
									});
								}
								this.$refs['editForm'].resetFields(); //表单清空
								this.editFormVisible = false;
								this.handleQuerySelect();
							}).catch((error) => {
								this.editLoading = false;
							});
						}

					}
				});
			},
			//新增
			addSubmit() {
				this.$refs.addForm.validate((valid) => {
					if(valid) {
						this.addLoading = true;
						let para = {
							employeetype: this.addForm.employeetypename,
							employeecode: this.addForm.employeecode,
							headiconpath: this.addForm.headiconpath,
							employeename: this.addForm.employeename,
							username: this.addForm.username,
							positionid: this.addForm.positionname,
							deptid: this.addForm.deptname,
							corpid: this.addForm.corpname,
							groupid: this.addForm.groupname,
							mobile: this.addForm.mobile,
							stogisneed: this.addForm.stogisneed,
							isenable: this.addForm.isenable,
							gender: this.addForm.gender,
							region: this.addForm.regionAll.toString(),
							address: this.addForm.address,
							wechatid: this.addForm.wechatid,
							qq: this.addForm.qq,
						}
						if(this.checkoutDataT) { //验证通过时(无重复时)
							if(para.corpid != '' && para.deptid == '') { //当选择了公司,未选择部门时
								this.$message({
									message: '请选择部门！',
									type: 'warning'
								});
								this.addLoading = false;
								return;
							} else {
								addEmployeeInfo(para).then((res) => {
									this.addLoading = false;
									if(res.data.result.desc != 'success') {
										this.$message({
											message: '员工添加失败！',
											type: 'warning'
										});
										return;
									} else {
										this.$message({
											message: '新增成功！',
											type: 'success'
										});
										this.$refs['addForm'].resetFields();
										this.addFormVisible = false;
										this.handleQuery();
									}
								}).catch((error) => {
									this.addLoading = false;
								});
							}
						} else {
							this.addLoading = false;
							this.$message({
								message: '标红信息已存在！',
								type: 'warning'
							});
						}
					}
				});
			},
			selsChange(sels) {
				this.sels = sels;
			},
			//批量删除
			batchRemove() {
				var ids = this.sels.map(item => item.id).toString();
				this.$confirm('确认删除选中记录吗？', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					let para = {
						ids: ids,
						method: "delete"
					};
					removeEmployeeInfo(para).then((res) => {
						this.listLoading = false;
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.handleQuery();
					});
				}).catch(() => {

				});
			}
		},
		activated() {
			this.handleQuery();
		}
	}
</script>