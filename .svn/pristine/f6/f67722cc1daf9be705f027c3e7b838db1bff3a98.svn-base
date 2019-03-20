<template>
	<section class="tab_content-wrapper">
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.tagname" @keyup.native.enter="handleQuery" placeholder="当前分组名称"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handleQuery" icon="el-icon-search">查询</el-button>
				</el-form-item>
			</el-form>
		</el-col>
		<!--列表-->
		<el-table :max-height="windowOutHeight-164" stripe border :data="listData" highlight-current-row v-loading="listLoading" style="width: 100%;">
			<el-table-column type="index" width="20" align="center" label="#">
			</el-table-column>
			<el-table-column prop="corpname" label="所属客户" align="center" width="300" >
			</el-table-column>
			<el-table-column prop="parenttagname" label="分组目录" align="center" >
			</el-table-column>
			<el-table-column prop="tagname" label="当前分组名称" align="center" >
			</el-table-column>
			<el-table-column prop="vehicleNum" label="车辆数" align="center" >
				<template scope="scope">
					<el-popover ref="popover4" placement="right" width="700" @hide="hideprodData" @show="showprodData(scope.row)" trigger="click">
						<el-table max-height="400" border :data="vehData" v-loading="vehListLoading">
							<el-table-column type="index" label="#" width="25" align="center">
							</el-table-column>
							<el-table-column prop="vin" label="车架号" align="center"></el-table-column>
							<el-table-column prop="model" label="车型" align="center"></el-table-column>
							<el-table-column prop="price" label="车价(元)" align="center"></el-table-column>
						</el-table>
			<!-- 			<el-col :span="24" class="toolbar">
							<el-pagination @size-change="dhandleSizeChanges" background @current-change="dhandleCurrentChanges" :page-sizes="[15, 50,80,99]" :page-size="dpageSizes" layout="total, sizes, prev, pager, next" :total="dtotals" style="float:right;margin-top:10px;">
							</el-pagination>
						</el-col> -->
					</el-popover>
					<a href="javascript:void(0);" v-popover:popover4>{{ scope.row.vehicleNum }}</span></a>
				</template>
			</el-table-column>
			<el-table-column fixed="right" label="操作" width="120" align="center">
				<template scope="scope">
					<el-button size="small" @click="groupManger(scope.row,scope.$index)">分组车辆管理</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-pagination @size-change="handleSizeChange" background @current-change="handleCurrentChange" :page-sizes="[15, 50, 100, 500, 1000]" :page-size="pageSize" layout="total, sizes, prev, pager, next" :total="total" style="float:right;">
			</el-pagination>
		</el-col>

		<!--车辆权限编辑界面-->
		<el-dialog title="分组车辆" :modal-append-to-body="false" :visible.sync="editVehInfoVisible" :close-on-click-modal="false" @close="vehEditClose">
			<el-input style="margin-bottom:10px" placeholder="输入关键字查找车辆" @change="search" v-model="filters.domSearch[0].content"></el-input>
			<el-tree 
			v-loading="treeRouseVehLoading" 
			element-loading-text="车辆树列表加载中..." 
			element-loading-spinner="el-icon-loading" 
			element-loading-background="rgba(0, 0, 0, 0.7)" 
			class="vehSpan" 
			:data="vehRoleList" 
			show-checkbox 
			highlight-current 
			node-key="ID" 
			check-strictly 
			:default-checked-keys="defaultCheckedKeysVeh" 
			ref="treeRouseVeh" 
			@check-change="handleCheckChangeVeh" 
			:render-content="renderContentVeh" 
			:props="defaultPropsVeh">
			</el-tree>
			<div slot="footer" class="dialog-footer">
				<el-checkbox id="checkThisPage" v-model="checkAllThisPage" @change="handleCheckAllChangeThisPage" style="float:left;">选择当页</el-checkbox>
				<el-button @click.native="editVehInfoVisible = false">取消</el-button>
				<el-button type="primary" @click.native="handleVehClick" :loading="vehLoading">提交</el-button>
			</div>
		</el-dialog>


	</section>
</template>

<script>
	import util from '../../common/js/util'
	import { corporatelevel_all,vehicleInfo_queryvw,getSelectListVeh,corporatevehicle_addtag,getCorporatevehicle,corporatevehicle_vehicles } from '../../api/api';

	export default {
		props: ['windowOutHeight'],
		data() {
			return {
				vehListLoading:false,
				vehData:[],
				fmtdata: util,
				filters: {
					tagname: '',
					domSearch: [{
						select: ['vin', 'name', 'model', 'licenseplatenum'],
						content: ''
					}], //车辆查询框
				},
				vehRoleList: [], //选择的车辆组
				defaultCheckedKeysVeh: [], //默认勾选的节点的 key 的数组
				saveDefaultCheckedKeysVeh: [], //默认勾选的节点的 key 的数组
				saveDefaultCheckedKeysVehTwo: [], //默认勾选的节点的 key 的数组
				listData: [],
				checkAllThisPage: false,
				vehLoading:false,
				treeRouseVehLoading:false,
				defaultPropsVeh: {
					label: 'model',
				},
				tagid:'',
				editVehInfoVisible:false,
				total: 0,
				currentPage: 0,
				pageSize: 15,
				dtotals: 0,
				curCorpId:'',
				dcurrentPage: 0,
				dpageSizes: 155555,
				listLoading: false
			}
		},
		methods: {
			hideprodData(){

			},
			showprodData(row){
				this.getVehSzList(row);
			},
			getVehSzList(row){
				let para = {
					tagid:row.id,
					showCount: this.dpageSizes,
					currentPage: this.dcurrentPage
				}
				this.vehListLoading  = true;
				corporatevehicle_vehicles(para).then((res)=>{
					this.vehListLoading = false;
					if(res.data.result.code == 0){
						this.vehData = res.data.data.records;
						this.dtotals = res.data.data.totalResult;
					}
				});
			},
			//分组管理
			groupManger(row,index){
				this.editVehInfoVisible = true;
				let para = {
					corpid:row.corpid
				}
				this.tagid = row.id;
				this.curCorpId = row.corpid;
				this.treeRouseVehLoading = true;
				vehicleInfo_queryvw(para).then((res) => {
					if(res.data.result.code == 0){
						let resKey = res.data.data.records;
						this.vehRoleList = resKey;
						let para = {
							tagid:row.id
						}
						getCorporatevehicle(para).then((res)=>{
							this.treeRouseVehLoading = false;
							if(res.data.result.code == 0){
								res.data.data.records.forEach((item,index)=>{
									this.saveDefaultCheckedKeysVehTwo.push(item.vehicleid);
								});
								this.$refs.treeRouseVeh.setCheckedKeys(this.saveDefaultCheckedKeysVehTwo)
							}
						});
					}else{
						this.treeRouseVehLoading = false;
					}
				});
			},
			// 车辆权限关闭时
			vehEditClose() {
				this.vehRoleList = []; //列表初始化
				this.vehLoading = false;
				this.checkAllThisPage = false; //初始化
				this.defaultCheckedKeysVeh = []; //初始化
				this.saveDefaultCheckedKeysVehTwo = [];
				this.filters.domSearch = [{
					select: ['vin', 'name', 'model', 'licenseplatenum'],
					content: ''
				}] //清空查询框;
			},
			// 搜索
			search() {
				// 搜索出当前条件车辆
				let paraTwo = {
						corpid:this.curCorpId,
						domSearch: this.filters.domSearch
					},
					keyids = this.$refs.treeRouseVeh.getCheckedKeys(); //将已选存入
				getSelectListVeh(paraTwo).then((res) => {
					let tempArr = []; //新选列表
					if(res.data.result.code == 0){
						if(this.saveDefaultCheckedKeysVehTwo.length != 0) { //当有数据时
							this.saveDefaultCheckedKeysVeh = this.saveDefaultCheckedKeysVehTwo; //将合并后的数据存入
							keyids.forEach((id, index) => { //循环已选列表
								let flag = true;
								this.saveDefaultCheckedKeysVeh.forEach((id2, index) => { //循环新选列表
									if(id == id2)//当已选列表中不存在新选时
										flag = false;
								});
								if(flag)
									tempArr.push(id);
							});
						} else { //当没有数据时，将已选直接存入新选列表
							tempArr = keyids;
						}
						this.saveDefaultCheckedKeysVehTwo = this.saveDefaultCheckedKeysVeh.concat(tempArr); //合并
						this.defaultCheckedKeysVeh = this.saveDefaultCheckedKeysVehTwo; //赋值给默认选中
						this.vehRoleList = res.data.data.records; //存储搜索车辆列表数据
					}
				});
			},
			renderContentVeh(h, {node,data,store}) {
				return <span style="flex: 1; display: flex;font-size: 14px; padding-right: 8px;position:relative;height:80px;">
		                    <span>
		                    	<span>{ '车架号：'+(data.vin == null ? '暂无' : data.vin) }</span>
		                    </span>
		                    <el-tag style="margin-left:10px;" size="mini" type="primary">{ (data.name == null ? '暂无' : data.name) }</el-tag><br/>
		                    <span style="font-size:12px;color:#B6B6B6;position:absolute;top: 18px;left: 0;">{ '车型：'+(data.model == null ? '暂无' : data.model) }</span><br/>
		                    <span style="font-size:12px;color:#B6B6B6;position:absolute;top: 35px;left: 0;">{ '车牌号：'+(data.licenseplatenum == null ? '暂无' : data.licenseplatenum) }</span>
		                     <span style="font-size:12px;color:#B6B6B6;position:absolute;top: 54px;left: 0;">
		                     车辆分组：
		            		{
							    data.corporatelevels.map((item,index)=>{
							      return (<span><el-tag size="mini" type="primary">{item.tagname}</el-tag>-</span>)
							    })
							}
							</span>
						</span>
			},
			//树的选中操作
			handleCheckChangeVeh(data, checked, indeterminate) {
				let tmpFlag = true;
				if(checked) { //勾选时
					if(this.saveDefaultCheckedKeysVehTwo.length == 0) {
						this.saveDefaultCheckedKeysVehTwo.push(data.ID);
						return;
					}
					this.saveDefaultCheckedKeysVehTwo.forEach((id, index) => {
						if(id == data.ID) tmpFlag = false; //存储数据里没有
					});
					if(tmpFlag) this.saveDefaultCheckedKeysVehTwo.push(data.ID); //添加
				} else { //取消勾选时
					this.saveDefaultCheckedKeysVehTwo.forEach((id, index) => {
						if(id == data.ID) this.saveDefaultCheckedKeysVehTwo.splice(index, 1); //存储数据里已有，删除
					});
				}
			},
			// 选择当页
			handleCheckAllChangeThisPage(val) {
				if(val) { //选择当页勾选时
					let sezListKeysId = [];
					this.vehRoleList.forEach((item, index) => {
						if(item.ID != undefined)
							sezListKeysId.push(item.ID);
					});
					this.$refs.treeRouseVeh.setCheckedKeys(sezListKeysId);
				} else { //取消勾选时
					this.$refs.treeRouseVeh.setCheckedKeys([]); //勾选节点为空数组
				}
			},
			// 点击提交时
			handleVehClick() {
				let _this = this;
				// let treeNode = this.$refs.treeRouseVeh.getCheckedNodes(),
				let treeNode = this.saveDefaultCheckedKeysVehTwo,
					vehicleids = [];
				treeNode.forEach((item, index) => {
					vehicleids.push({tagid:_this.tagid, vehicleid:item}); //车辆
				});
				if(vehicleids.length == 0){
					vehicleids.push({tagid:_this.tagid, vehicleid:''});
				}
				this.vehLoading = true;
				corporatevehicle_addtag(vehicleids).then((res) => {
					let data = res.data.data;
					if(res.data.result.code == 4001) {
						this.$message({
							message: res.result.desc,
							type: 'error'
						});
					} else {
						this.$message({
							message: '车辆标签标注成功！',
							type: 'success'
						});
						this.vehLoading = false;
						this.editVehInfoVisible = false;
						this.handleQuery();
					}
				});
			},
			handleCurrentChange(val) {
				this.currentPage = val;
				this.handleQuery();
			},
			//切换每页显示数量
			handleSizeChange(val) {
				this.pageSize = val;
				this.handleQuery();
			},
			dhandleCurrentChanges(val) {
				this.dcurrentPage = val;
				this.getVehSzList();
			},
			//切换每页显示数量
			dhandleSizeChanges(val) {
				this.dpageSize = val;
				this.getVehSzList();
			},
			//获取保单列表 
			handleQuery() {
				
				let para = {
					showCount: this.pageSize,
					currentPage: this.currentPage,
					tagname:this.filters.tagname
				}

				this.listLoading = true;
				corporatelevel_all(para).then((res) => {
					this.listLoading = false;
					if(res.data.result.code == 0){
						this.listData = res.data.data.records;
						this.total = res.data.data.totalResult;
					}
				});
			}
		},
		created() {
			this.handleQuery();
		},
	}
</script>