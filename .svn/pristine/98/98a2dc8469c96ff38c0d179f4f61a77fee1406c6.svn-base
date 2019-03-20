<template>
	<section class="tab_content-wrapper">
		<!--列表 :max-height="windowOutHeight-165"-->
		<el-table border class="dftable" :data="listData" highlight-current-row v-loading="listLoading" style="width: 100%;">
			<el-table-column prop="DEPTNAME" label="部门" align="center">
			</el-table-column>
			<el-table-column prop="" label="配合度(25分)" align="center">
				<template scope="props">
		          	<el-input :disabled="props.row.DEPTID == user.departmentInfo.id" @blur="cooperationBlur" v-model="props.row.COOPERATION"></el-input>
		        </template>
			</el-table-column>
			<el-table-column prop="" label="责任感(20分)" align="center">
				<template scope="props">
		          	<el-input :disabled="props.row.DEPTID == user.departmentInfo.id" @blur="responsibilityBlur" v-model="props.row.RESPONSIBILITY"></el-input>
		        </template>
			</el-table-column>
			<el-table-column prop="" label="合作/服务意识(20分)" align="center">
				<template scope="props">
		          	<el-input :disabled="props.row.DEPTID == user.departmentInfo.id" @blur="serviceBlur" v-model="props.row.SERVICE"></el-input>
		        </template>
			</el-table-column>
			<el-table-column prop="" label="沟通协调(20分)" align="center">
				<template scope="props">
		          	<el-input :disabled="props.row.DEPTID == user.departmentInfo.id" @blur="communicationBlur" v-model="props.row.COMMUNICATION"></el-input>
		        </template>
			</el-table-column>
			<el-table-column prop="" label="专业性(15分)" align="center">
				<template scope="props">
		          	<el-input :disabled="props.row.DEPTID == user.departmentInfo.id" @blur="professionalBlur" v-model="props.row.PROFESSIONAL"></el-input>
		        </template>
			</el-table-column>
			<el-table-column prop="" label="总分(100分)" align="center" :formatter="totalscore">
			</el-table-column>
			<el-table-column label="操作" width="100" align="center">
				<template scope="scope">
					<el-button type="primary" icon="el-icon-success" size="mini" @click.native="addSubmit(scope.row,scope.$index)" :disabled="scope.row.DEPTID == user.departmentInfo.id" :loading="addLoading">确认打分</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-button type="primary" class="mt10" @click.native="addMoreSubmit" :loading="addPLLoading">批量提交打分</el-button>
	</section>
</template>

<script>
	import { getDeptScoreList,deptScore,deptMoreScore } from '../../api/api';

	export default {
		props: ['windowOutHeight'],
		data() {
			return {
				listData: [],
				addLoading:false,
				user:'',
				listLoading: false,
				addPLLoading:false,
				//验证是否有错
				currflag:false
			}
		},
		methods: {
			//验证打分格式 是否正确
			numberInt(e,value,maxVal){
				var reg = /[^\d]/g,
					flag = reg.test(value);
				if($.trim(value) == '') {
					$(e.target).css({background:'transparent'});
					$(e.target).parents("div.dftable").find("input.el-input__inner").not($(e.target)).prop("disabled",false).css({background:'transparent'});
					return;
				}
				if(flag || value < 0 || value > maxVal) {
					$(e.target).css({background:'rgba(255,0,0,0.5)'});
					$(e.target).parents("div.dftable").find("input.el-input__inner").not($(e.target)).prop("disabled",true).css({background:'#f5f5f5'});
				}else{
					$(e.target).css({background:'transparent'});
					$(e.target).parents("div.dftable").find("input.el-input__inner").not($(e.target)).prop("disabled",false).css({background:'transparent'});
				}
				this.currflag = (flag || value < 0 || value > maxVal);
			},
			//配合度分数检验
			cooperationBlur(e){
				let value = $(e.target).val();
				this.numberInt(e,value,25);
			},
			//责任感分数检验
			responsibilityBlur(e){
				let value = $(e.target).val();
				this.numberInt(e,value,20);
			},
			//合作/服务意识分数检验
			serviceBlur(e){
				let value = $(e.target).val();
				this.numberInt(e,value,20);
			},
			//沟通协调分数检验
			communicationBlur(e){
				let value = $(e.target).val();
				this.numberInt(e,value,20);
			},
			//专业性分数检验
			professionalBlur(e){
				let value = $(e.target).val();
				this.numberInt(e,value,15);
			},
			//确认打分
			addSubmit(row,index){
				if(this.currflag){
					this.$message({
						message: '请先处理错误输入！!',
						center:true,
						type: 'warning'
					});
					return;
				}
				let para = {
					DEPTID:row.DEPTID,
					COOPERATION:row.COOPERATION,
					RESPONSIBILITY:row.RESPONSIBILITY,
					SERVICE:row.SERVICE,
					COMMUNICATION:row.COMMUNICATION,
					PROFESSIONAL:row.PROFESSIONAL
				}

				deptScore(para).then((res) => {
					if(res.data.result.code == 0){
						this.$message({
							message: '打分成功！',
							type: 'success'
						});
						this.handleQuery();
					}
				});
			},
			//批量跨部门确认打分
			addMoreSubmit(row,index){
				if(this.currflag){
					this.$message({
						message: '请先处理错误输入！!',
						center:true,
						type: 'warning'
					});
					return;
				}
				this.addPLLoading = true;
				deptMoreScore(this.listData).then((res) => {
					this.addPLLoading = false;
					if(res.data.result.code == 0){
						this.$message({
							message: '打分成功！',
							type: 'success'
						});
						this.handleQuery();
					}
				});
			},
			//总分计算
			totalscore(row,col,ceval){
				 let cooperation = '',
					responsibility = '',
					service = '',
					communication = '',
					professional = '',
					totalscore = '';
				try {
				    cooperation = (row.COOPERATION&&$.trim(row.COOPERATION) != "")?eval(row.COOPERATION):0;
					responsibility = (row.RESPONSIBILITY&&$.trim(row.RESPONSIBILITY) != "")?eval(row.RESPONSIBILITY):0;
					service = (row.SERVICE&&$.trim(row.SERVICE) != "")?eval(row.SERVICE):0;
					communication = (row.COMMUNICATION&&$.trim(row.COMMUNICATION) != "")?eval(row.COMMUNICATION):0;
					professional = (row.PROFESSIONAL&&$.trim(row.PROFESSIONAL) != "")?eval(row.PROFESSIONAL):0;
				}catch(err){
				}
				totalscore = cooperation+responsibility+service+communication+professional;
				return (totalscore==0?'':totalscore);
			},
			//获取保单列表 
			handleQuery() {
				let para = {
					DEPTID:this.user.departmentInfo.id
				}
				this.listLoading = true;
				getDeptScoreList(para).then((res) => {
					this.listLoading = false;
					if(res.data.result.code == 0){
						this.listData = res.data.data.records;
					}
				});
			}
		},
		created() {
			this.user = this.$store.getters.userInfo;
			this.handleQuery();
		},
	}
</script>