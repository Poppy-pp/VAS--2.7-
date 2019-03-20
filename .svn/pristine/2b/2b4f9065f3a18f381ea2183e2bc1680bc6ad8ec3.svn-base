<!--* 
* @description: 报单查询 拆除保单
* @author: 王鹏 
* @update: 王鹏 (2017-05-27 10:55) 
*-->
<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :model="filters" ref="filters" :inline="true" class="flexSearchForm">
				<el-row :gutter="10" class="colflex">
					<el-col :span="4">
						<el-form-item prop="orderno" class="sf100">
							<el-input v-model="filters.orderno" @keyup.native.enter="getTodo" placeholder="请输入订单号"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="4">
						<el-form-item prop="ownername" class="sf100">
							<el-input v-model="filters.ownername" @keyup.native.enter="getTodo" placeholder="请输入车主姓名"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="4">
						<el-form-item prop="licenseplatenum" class="sf100">
							<el-input v-model="filters.licenseplatenum" @keyup.native.enter="getTodo" placeholder="请输入车牌号"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="4">
						<el-form-item prop="vin" class="sf100">
							<el-input v-model="filters.vin" @keyup.native.enter="getTodo" placeholder="请输入车架号"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<div class="colflex1">
					<el-form-item style="float:right;margin-right:0;">
						<el-button type="primary" @click="getTodo" icon="el-icon-search">查询</el-button>
						<el-button @click="resetForm('filters')">重置</el-button>
					</el-form-item>
				</div>
			</el-form>
		</el-col>

		<!--列表 -->
		<el-table border stripe :max-height="windowOutHeight-230" :data="todo" highlight-current-row v-loading="listLoading" style="width: 100%;">
			<el-table-column prop="orderno" align="center" label="订单号" width="150">
			</el-table-column>
			<el-table-column prop="aftersalerempname" align="center" label="报单人">
			</el-table-column>
			<el-table-column prop="curr_task_name_" align="center" label="当前节点" width="150">
				<template scope="scope">
					{{ scope.row.curr_task_name_?scope.row.curr_task_name_:'完成' }}
				</template>
			</el-table-column>
			<el-table-column prop="current_assingee_name_" align="center" label="当前处理人">
			</el-table-column>
			<el-table-column prop="ownername" align="center" label="车主">
			</el-table-column>
			<el-table-column prop="ownermobile" align="center" label="车主电话">
			</el-table-column>
			<el-table-column prop="licenseplatenum" align="center" label="车牌">
			</el-table-column>
			<el-table-column prop="vin" align="center" label="车架号">
			</el-table-column>
			<el-table-column prop="contactperson" align="center" label="维修联系人">
			</el-table-column>
			<el-table-column prop="contactmobile" align="center" label="维修联系人电话">
			</el-table-column>
			<el-table-column prop="aftersaledate" align="center" label="预约时间" :formatter="dateFormatter">
			</el-table-column>
			<el-table-column fixed="right" label="操作" width="140" align="center">
				<template scope="scope">
					<el-button size="mini" @click="formDetailHandle(scope.$index, scope.row)">详情</el-button>
					<el-button size="mini" @click="showDraw(scope.$index, scope.row)">安装轨迹</el-button>
				</template>
			</el-table-column> 
		</el-table>
		<el-pagination @size-change="handleSizeChange" background @current-change="handleCurrentChange" :page-sizes="[15,50,80,99]" :page-size="pageSize" layout="total, sizes, prev, pager, next" :total="total" style="float:right;margin-top:10px;">
		</el-pagination>
	</section>
</template>

<script>
	import util from '../../../common/js/util'
	import { queryApprovalperServiceInfo } from '../../../api/api';

	export default {
		props: ['windowOutHeight'],
		data() {
			return {
				todo: [], //处理表格列表数据
				//搜索 筛选信息
				filters: {
					ownername: '',
					orderno: '',
					vin: '',
					licenseplatenum: ''
				},
				total: 0,
				currentPage: 0,
				listLoading: false,
				pageSize: 15,
			}
		},
		methods: {
			// 查看安装人员轨迹
		            showDraw(index,row){
		                window.open('http://mqtt.wwvas.com:9201/Map/UserHistoryRoute?id=' + row.installby);
		            },
			//时间转换
			dateFormatter: function(row, col) {
				if(row.aftersaledate == "" || row.aftersaledate == undefined) return;
				return util.formatDate.format(new Date(row.aftersaledate), 'yyyy-MM-dd hh:mm:ss');
			},
			//报单详情查看
			formDetailHandle(index, row) {
				this.$store.state.formObj = row;
				this.$router.push('/dismDetail');
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},
			//切换当前页
			handleCurrentChange(val) {
				this.currentPage = val;
				this.getTodo();
			},
			//切换每页显示数量
			handleSizeChange(val) {
				this.pageSize = val;
				this.getTodo();
			},
			//获报单查询列表
			getTodo() {
				let para = {
					currentPage: this.currentPage,
					showCount: this.pageSize,
					aftersaletypes: "1,2",
					orderno: this.filters.orderno,
					ownername: this.filters.ownername,
					vin: this.filters.vin,
					act_node: this.filters.act_node,
					licenseplatenum: this.filters.licenseplatenum
				};
				this.listLoading = true;
				queryApprovalperServiceInfo(para).then((res) => {
					this.listLoading = false;
					if(res.data.result.code == 0){
						this.total = res.data.data.totalResult;
						this.todo = res.data.data.records;
					}
				}).catch((error) => {
					this.listLoading = false;
				});
			}
		},
		//初始化数据
		created() {
			this.getTodo();
		}
	}
</script>