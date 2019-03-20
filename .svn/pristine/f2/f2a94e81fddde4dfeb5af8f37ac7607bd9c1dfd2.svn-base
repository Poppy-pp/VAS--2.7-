<template>
	<section class="tab_content-wrapper">
		<section class="layout">
			<div>
				<el-steps :space="260" process-status="finish" direction="vertical" style="margin: 30px 0 0 50px;" :active="active" finish-status="success">
					<el-step title="员工"> </el-step>
					<el-step title="库存"></el-step>
					<el-step title="任务"></el-step>
					<el-step title="离职完成"></el-step>
				</el-steps>
			</div>

			<div style="width:80%;">
				<!-- 步骤一： -->
				<el-form :model="addForm" label-width="110px" :rules="addFormRules" ref="addForm" v-show="this.active == 0" class="step-form">
					<el-col :span="24">
						<span class="formTile">选择离职员工</span>
					</el-col>
					<el-row :gutter="80" class="leftMargin">
						<!--员工列表选择界面——搜索查询-->
						<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
							<el-form :inline="true" :model="filters">
								<template v-for="(item,index) in filters.domSearch">
									<template v-if="index == 0">
										<div style="display:inline-block;margin:0 10px 10px 0;">
											<el-input class="noborder color icon nofocus" @keyup.native.ctrl.8="clearAll()" @keyup.native.enter="getDeciceListInfo" placeholder="请输入查询内容" v-model="filters.domSearch[index].content">
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
												<el-input class="noborder color icon nofocus" @keyup.native.ctrl.8="clearAll()" @keyup.native.enter="getDeciceListInfo" placeholder="请输入查询内容" v-model="filters.domSearch[index].content">
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
											<el-button type="primary" @click="getDeciceListInfo" icon="el-icon-search">查询</el-button>
										</el-form-item>
									</template>
								</template>
							</el-form>
						</el-col>
						<!--选择员工列表-->
						<el-table border :data="deviceListData" max-height="630" ref="deviceListData" highlight-current-row v-loading="devicelistLoading" @select="selsChange" style="width: 100%;">
							<el-table-column type="selection" fixed="left" width="50" align="center">
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
						</el-table>

						<!--工具条-->
						<el-col :span="24" class="toolbar">
							<el-pagination @size-change="dhandleSizeChange" background @current-change="dhandleCurrentChange" :page-sizes="[15, 50, 80, 100]" :page-size="dpageSize" layout="total, sizes, prev, pager, next" :total="dtotal" style="float:right;margin-top:10px;">
							</el-pagination>
						</el-col>
					</el-row>
				</el-form>

				<!-- 步骤二：-->
				<el-form :model="addForm" label-width="110px" :rules="addFormRules" ref="addForm2" v-show="this.active == 1" class="step-form">
					<el-col :span="24">
						<span class="formTile">该员工库存情况</span>
					</el-col>
					<el-row :gutter="80">
						<el-col :span="24" class="noPaddingTwo">
							<el-form-item>
								<el-table :data="stoData" empty-text="暂无库存" border style="width:100%" max-height="650" show-summary :summary-method="getSummariesSto">
									<el-table-column type="index" width="50" align="center">
									</el-table-column>
									<el-table-column prop="STORAGENAME" label="所属库房" align="center">
									</el-table-column>
									<el-table-column prop="PRODMODEL" label="产品型号" align="center">
									</el-table-column>
									<el-table-column prop="BALANCEDATE" label="最后一次更新日期" :formatter="dateFormatter" align="center">
									</el-table-column>
									<el-table-column prop="" label="当前库存数量" align="center">
										<template scope="scope">
											<el-popover ref="popover4" placement="right" width="700" @show="showprodData(scope.row.PRODUCTMODELID,scope.row.STORAGEID)" trigger="click">
												<el-table max-height="200" border :data="prodData">
													<el-table-column type="index" width="20" align="center" label="#">
													</el-table-column>
													<el-table-column prop="PRODUCTMODELNAME" label="产品型号" align="center"></el-table-column>
													<el-table-column prop="PRODNUM" label="产品编号" align="center"></el-table-column>
													<el-table-column prop="PRODSPEC" label="产品类型" width="80" align="center"></el-table-column>
													<el-table-column prop="PRODMODELB" label="绑定产品型号" align="center"></el-table-column>
													<el-table-column prop="PRODNUMB" label="绑定产品编号" align="center"></el-table-column>
													<el-table-column prop="PRODSPECB" label="绑定产品类型" width="90" align="center"></el-table-column>
												</el-table>
												<!--工具条-->
												<el-col :span="24" class="toolbar">
													<el-pagination @size-change="dhandleSizeChange" background @current-change="dhandleCurrentChange" :page-sizes="[15, 50,80,99]" :page-size="dpageSize" layout="total, sizes, prev, pager, next" :total="dtotal" style="float:right;margin-top:10px;">
													</el-pagination>
												</el-col>
											</el-popover>
											<a href="javascript:void(0);" v-popover:popover4>{{scope.row.BALANCEQTY}}</a>
										</template>
									</el-table-column>
								</el-table>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>

				<!-- 步骤三: -->
				<el-form :model="addForm" label-width="110px" :rules="addFormRules" ref="addForm1" v-show="this.active == 2" class="step-form">
					<el-col :span="24">
						<span class="formTile">该员工任务情况</span>
					</el-col>
					<el-row :gutter="80">
						<el-col :span="24" class="noPaddingTwo">
							<el-form-item>
								<el-table :data="taskData" empty-text="暂无未处理任务" show-summary :summary-method="getSummaries" border style="width: 100%" max-height="650" @select-all="taskSelectData" @select="taskSelectData">
									<el-table-column type="selection" width="50" align="center">
									</el-table-column>
									<el-table-column prop="type" label="任务类型" :formatter="typeFormat" width="80" align="center">
									</el-table-column>
									<el-table-column prop="flowData.orderno" label="单号" align="center">
									</el-table-column>
									<el-table-column prop="flowData.ownername" label="车主" width="80" align="center">
									</el-table-column>
									<el-table-column prop="flowData.vehicle_modle" label="车型" align="center">
									</el-table-column>
									<el-table-column prop="flowData.corpname" label="创建人单位" align="center">
									</el-table-column>
									<el-table-column prop="name" label="当前状态" width="60" align="center">
									</el-table-column>
									<el-table-column prop="assignee" label="当前处理人" width="80" align="center">
									</el-table-column>
									<el-table-column label="操作" width="80" align="center">
										<template scope="scope">
											<el-button type="danger" size="small" icon="el-icon-d-arrow-right" class="mt5" @click.native="handOver(scope.$index,scope.row,taskData)">移交</el-button>
										</template>
									</el-table-column>
								</el-table>
								<!-- <el-button icon="d-arrow-right" type="danger" @click.native="handOver" :disabled="this.taskSelectDataList.length === 0" style="margin-top:10px;">批量移交</el-button> -->
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>

				<!-- 步骤四：完成 -->
				<el-form :model="addForm" label-width="110px" :rules="addFormRules" ref="addForm4" v-show="this.active == 3" class="step-form">
					<div class="center"><i class='iconfont  icon-chenggongjierutongguo'></i>离职成功</div>
				</el-form>
			</div>
		</section>

		<el-button-group class="step-btn">
			<!-- 上一步按钮 -->
			<el-button type="primary" @click="prev" icon="el-icon-arrow-left" v-show="active > 0 && active < 3">上一步</el-button>
			<!-- 下一步按钮 -->
			<el-button type="primary" @click="next" v-show="active < 3">{{this.active == 2 ? '离职' : '下一步' }}<i class="el-icon-arrow-right el-icon--right"></i></el-button>
			<!-- 返回按钮 -->
			<el-button type="primary" @click="this.window.history.go(-1)">返回</el-button>
		</el-button-group>

		<!--员工移交列表选择界面-->
		<el-dialog title="员工信息" :visible.sync="deviceFormVisible" :modal-append-to-body="false" top="3%" :close-on-click-modal="false" @close="clearAll()">
			<!-- 员工查询 -->
			<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
				<el-form :inline="true" :model="filters">
					<template v-for="(item,index) in filters.domSearch">
						<template v-if="index == 0">
							<div style="display:inline-block;margin:0 10px 10px 0;">
								<el-input class="noborder color icon nofocus" @keyup.native.ctrl.8="clearAll()" @keyup.native.enter="getDeciceListInfo" placeholder="请输入查询内容" v-model="filters.domSearch[index].content">
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
									<el-input class="noborder color icon nofocus" @keyup.native.ctrl.8="clearAll()" @keyup.native.enter="getDeciceListInfo" placeholder="请输入查询内容" v-model="filters.domSearch[index].content">
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
								<el-button type="primary" @click="getDeciceListInfo" icon="el-icon-search">查询</el-button>
							</el-form-item>
						</template>
					</template>
				</el-form>
			</el-col>
			<!--选择移交员工列表-->
			<el-table border :data="deviceListData" max-height="500" ref="deviceListData" highlight-current-row v-loading="devicelistLoading" @select="selsChangeEmp" style="width: 100%;">
				<el-table-column type="selection" fixed="left" width="50" align="center">
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
			</el-table>

			<!--工具条-->
			<el-col :span="24" class="toolbar">
				<el-button type="primary" class="mt5" @click="comlist">确认移交</el-button>
				<el-pagination @size-change="dhandleSizeChange" background @current-change="dhandleCurrentChange" :page-sizes="[15, 50, 80, 100]" :page-size="dpageSize" layout="total, sizes, prev, pager, next" :total="dtotal" style="float:right;margin-top:10px;">
				</el-pagination>
			</el-col>
		</el-dialog>
	</section>
</template>

<script>
	import util from '../../common/js/util';
	import nanobar from '../../common/js/nanobar';
	import { getSelectList, getProdIDInfoList, leaveEmpTaskList, leaveEmpStoList, modifyEmployeeInfoStatus, leaveEmpTaskTransfer,leaveStoTransfer } from '../../api/api';

	export default {
		data() {
			return {
				filters: {
					domSearch: [{
						select: ['employeename'],
						content: ''
					}], //查询框
					isenable: '1',
				},
				active: 0, //步骤
				listData: [],
				empyList: [], //当前已选离职员工
				taskData: [], //当前员工任务列表
				stoData: [], //当前员工库存列表
				taskThis: '', //当前点击的任务行
				stoThis: '', //当前点击的库存行
				taskSelectDataList: [], //全选、多选时的任务组
				stoSelectDataList: [], //全选、多选时的库存组
				taskToEmpl: '', //移交任务时，选择的员工
				stoToEmpl: '', //移交库存时，选择的员工
				nextData: 0, //库存数量判断
				taskDelRows: [], //保存当前点击的任务行数组
				taskDelIndex: '', //保存当前点击的任务行index
				dtotal: 0,
				dcurrentPage: 1,
				dpageSize: 10,
				deviceListData: [], //移交任务选择列表
				deviceFormVisible: false,
				devicelistLoading: false,
				dtotal: 0,
				dcurrentPage: 0,
				dpageSize: 15,
				prodid: '',
				stoid: '',
				prodData: [], //设备列表
				total: 0,
				currentPage: 1,
				listLoading: false,
				sels: [], //员工列表选中列
				pageSize: 15,
				addFormVisible: false, //新增界面是否显示
				addLoading: false,
				addFormRules: {},
				//新增界面数据
				addForm: {},
			}
		},
		methods: {
			// 多选任务时
			taskSelectData(val) {
				this.taskSelectDataList = val; //全选、多选时任务组
			},

			// 移交按钮——任务
			handOver(index, row, rows) {
				this.deviceFormVisible = true;
				
				this.taskThis = row; //保存当前点击的任务行
				this.taskDelRows = rows; //保存当前点击的任务行数组
				this.taskDelIndex = index; //保存当前点击的任务行index
				this.filters.domSearch = [{
					select: ['employeename'],
					content: ''
				}];
				this.getDeciceListInfo();
			},

			// 移交【任务】时，选择员工
			selsChangeEmp(sels, row) {
				this.taskToEmpl = sels; //选择的移交的员工
			},
			// 确认移交【任务】
			comlist() {
				this.deviceFormVisible = false;
				this.$refs.deviceListData.clearSelection();

				if(this.taskSelectDataList.length != 0) { //当选择了任务时
					this.taskSelectDataList = []; //清空已选任务组
				}
				let para = {
					fromUserId: this.empyList[0].userid, //当前离职员工id
					toUserId: this.taskToEmpl[0].userid, //转移员工id
					taskId: this.taskThis.id, //当前任务行的任务id
				};
				leaveEmpTaskTransfer(para).then((res) => {
					if(res.data.result.desc == 'success') {
						this.$message({
							message: res.data.data,
							type: 'success'
						});
						this.taskDelRows.splice(this.taskDelIndex, 1); //删除一行
					}
				});
			},

			// 多选框 选择离职员工时
			selsChange(sels,row) {
				this.$refs.deviceListData.clearSelection(); //清除其他选项框
				this.$refs.deviceListData.toggleRowSelection(row, true); //选中选项框

				if (sels.length > 1 ) {//删除前一次选择的
					sels.shift();
				}
				this.empyList = sels;//当前选择的离职员工信息
			},
			//切换当前页
			dhandleCurrentChange(val) {
				this.dcurrentPage = val;
				this.getDeciceListInfo();
			},
			//切换每页显示数量
			dhandleSizeChange(val) {
				this.dpageSize = val;
				this.getDeciceListInfo();
			},
			// 获取员工信息
			addDeviceList() {
				this.filters.domSearch = [{
					select: ['employeename'],
					content: ''
				}];
				this.getDeciceListInfo();
			},
			//获取员工信息
			getDeciceListInfo() {
				let para = {
					currentPage: this.dcurrentPage,
					showCount: this.dpageSize,
					isenable: this.filters.isenable,
					domSearch: this.filters.domSearch,
				};
				this.devicelistLoading = true;
				getSelectList(para).then((res) => {
					if(res.data.result.code == 4001) {
						this.$message({
							message: res.data.result.desc,
							type: 'error'
						});
						this.devicelistLoading = false;
						return;
					}
					this.dtotal = res.data.data.totalResult;
					this.deviceListData = res.data.data.records;
					this.devicelistLoading = false;
				}).catch((error) => {
					this.devicelistLoading = false;
				});
			},
			//任务数量统计
			getSummaries(param) {
				const {
					columns,
					data
				} = param;
				const sums = [];
				sums[0] = "总共";
				sums[8] = data.length + "个 任务";
				return sums;
			},
			//库存数量统计
			getSummariesSto(param) {
				const {
					columns,
					data
				} = param;
				const sums = [];
				sums[0] = "总共";
				sums[4] = data.length + "类 设备";
				return sums;
			},

			// 上一步按钮
			prev() {
				if(this.active-- < 1) this.active = 0;
				this.nextData = 0; //清空库存
				if (this.active == 0 ) {//当走到第一步时，重载页面防止页面错位
					this.getDeciceListInfo();
				}
			},
			// 下一步按钮
			next() {
				// if (this.active++ > 3) this.active = 0;
				if(this.active == 0) { //选择离职员工——库存
					if(this.empyList.length != 0) {
						let para = {
							id: this.empyList[0].ID,
							showCount: 1000,
						}
						leaveEmpStoList(para).then((res) => {
							if(res.data.data != null) {
								this.stoData = res.data.data.records; //得到返回的库存列表
							}else{
								this.$message.closeAll();
							}
							this.stoData.forEach((item, index) => {
								this.nextData = item.BALANCEQTY + this.nextData;
							});
							this.active = 1;
						});
					} else {
						this.$message({
							message: '请选择离职员工！',
							type: 'warning'
						});
					}
				}
				if(this.active == 1) { //库存——任务
					//      		if ( this.nextData > 0) {//有库存时
					//      			this.$confirm('该员工有库存，须先发货清除库存！', '提示', {
					// 	type: 'warning'
					// }).then(() => {
					//      				this.active = 0;
					// });
					//      		}else{
					let para = {
						userid: this.empyList[0].userid,
						showCount: 1000,
					}
					leaveEmpTaskList(para).then((res) => {
						this.taskData = res.data.data.records; //得到返回的任务列表
						this.active = 2;
					});
					// }
				}
				if(this.active == 2) { //任务——离职
					this.$confirm('确认该员工离职吗？', '提示', {}).then(() => {
						this.addSubmit();
					}).catch((error) => {});
				}
			},
			// 显示库房关联的设备ID信息
			showprodData(prodid, stoid) {
				let para = {
					prodmodelid: prodid,
					storageid: stoid,
					currentPage: this.dcurrentPage,
					showCount: this.dpageSize,
				}
				//获取设备信息
				getProdIDInfoList(para).then((res) => {
					this.dtotal = res.data.data.totalResult;
					this.prodData = res.data.data.records;
					this.stoid = stoid;
					this.prodid = prodid;
				});
			},
			//时间转换
			dateFormatter: function(row, col) {
				if(row.BALANCEDATE == "" || row.BALANCEDATE == undefined) return;
				return util.formatDate.format(new Date(row.BALANCEDATE), 'yyyy-MM-dd');
			},
			//当前任务类型显示转换
			typeFormat: function(row, col) {
				return row.type == '1' ? '新装' : row.type == '2' ? '拆除' : row.type == '3' ? '维修' : '';
			},
			//查询清空
			clearAll() {
				this.filters.domSearch = [{
					select: [],
					content: ''
				}] //清空查询框;
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
			//获取保单列表
			handleQuery() {
				let para = {
					currentPage: this.currentPage,
					showCount: this.pageSize,
				};
				this.listLoading = true;
				// getCorporateInfoList(para).then((res) => {
				// 	this.total = res.data.data.totalResult;
				// 	this.listData = res.data.data.records;
				// 	this.listLoading = false;
				// }).catch((error) => {
				//                this.listLoading = false;
				// });
			},

			//新增
			addSubmit() {
				let para = {
					id: this.empyList[0].ID,
					userid: this.empyList[0].userid,
					isenable: 0,
				}
				modifyEmployeeInfoStatus(para).then((res) => {
					if(res.data.data.disable != undefined) {
						this.$message({
							message: '离职成功！',
							type: 'success'
						});
						this.active = 3;
					} else {
						this.$message({
							message: '该员工有关联关系，请先解除关联关系！',
							type: 'warning'
						});
					}
				});
			},
		},
		created() {
			this.addDeviceList();
		},

	}
</script>

<style>
	.layout {
		display: flex;
	}
	
	.step-btn {
		position: fixed;
		right: 25px;
		bottom: 60px;
	}
	
	.step-form {
		margin-top: 35px;
		margin-left: 50px;
		width: 100%;
	}
	
	.center {
		font-size: 25px;
		color: #16A085;
		position: absolute;
		top: calc(5%);
		left: calc(50%);
	}
	
	.center i {
		font-size: 40px;
		color: #16A085;
		position: absolute;
		top: -10px;
		left: -50px;
	}
	
	.el-row .leftMargin {
		margin-left: 0px !important;
		width: 95% !important;
	}
	
	.el-col .el-col-24 .noPadding {
		padding: 0px !important;
		margin-top: 50px;
	}
	
	.el-col .el-col-24 .noPaddingTwo {
		padding: 0px !important;
	}
</style>