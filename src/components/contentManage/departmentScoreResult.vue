<template>
	<section class="tab_content-wrapper">
		<!--列表-->
		<el-table border :max-height="windowOutHeight-90" class="dftable" :data="listData" highlight-current-row v-loading="listLoading" style="width: 100%;">
			<el-table-column prop="DEPTNAME" label="部门" align="center">
			</el-table-column>
			<el-table-column prop="BYDEPTNAME" label="打分部门" align="center">
			</el-table-column>
			<el-table-column prop="COOPERATION" label="配合度(25分)" align="center">
			</el-table-column>
			<el-table-column prop="RESPONSIBILITY" label="责任感(20分)" align="center">
			</el-table-column>
			<el-table-column prop="SERVICE" label="合作/服务意识(20分)" align="center">
			</el-table-column>
			<el-table-column prop="COMMUNICATION" label="沟通协调(20分)" align="center">
			</el-table-column>
			<el-table-column prop="PROFESSIONAL" label="专业性(15分)" align="center">
			</el-table-column>
			<el-table-column prop="" label="总分(100分)" align="center" :formatter="totalscore">
			</el-table-column>
		</el-table>
	</section>
</template>

<script>
	import { getDeptScoreList } from '../../api/api';

	export default {
		props: ['windowOutHeight'],
		data() {
			return {
				listData: [],
				user:'',
				listLoading: false,
			}
		},
		methods: {
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
				this.listLoading = true;
				let para = {
					showCount:1000
				}
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