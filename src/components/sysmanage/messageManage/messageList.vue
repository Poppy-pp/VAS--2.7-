<template>
    <div>
        <div style="margin: 10px 0;">
            <div class="message-title">短信发送列表</div>
            <el-button type="primary" @click="add" icon="el-icon-plus">新建短信群发</el-button>
        </div>
        <el-table border stripe :data="data" highlight-current-row v-loading="loading" style="width: 100%;">
            <el-table-column type="index" label="#" width="35" align="center">
            </el-table-column>
            <el-table-column prop="message_name" align="center" width="180" label="短信名称">
            </el-table-column>
            <el-table-column prop="push_date" align="center" width="200" label="发送时间" :formatter="dateFormat">
            </el-table-column>
            <el-table-column prop="template_content" align="center" min-width="300" label="短信内容">
            </el-table-column>
            <el-table-column align="center" width="100" label="全部号码">
                <template scope="scope">
                    <el-button type="text" @click="getNumber(scope.row)">{{scope.row.push_item_count || 0}}</el-button>
                </template>
            </el-table-column>
            <el-table-column align="center" width="100" label="发送成功号码">
                <template scope="scope">
                    <el-button type="text" @click="getNumber(scope.row, '3')" v-if="scope.row.isSend !== '0'">{{scope.row.push_success_count >=0 ? scope.row.push_success_count : '未知'}}
                    </el-button>
                    <span v-else>未发送</span>
                </template>
            </el-table-column>
            <el-table-column align="center" width="100" label="发送失败号码">
                <template scope="scope">
                    <el-button type="text" @click="getNumber(scope.row, '2')" v-if="scope.row.isSend !== '0'">{{scope.row.push_fail_count >=0 ? scope.row.push_fail_count : '未知'}}</el-button>
                    <span v-else>未发送</span>
                </template>
            </el-table-column>
            <el-table-column align="center" width="100" label="未知号码">
                <template scope="scope">
                    <!--<el-button type="text" @click="getNumber(scope.row)" v-if="scope.row.isSend !== '0'">0</el-button>-->
                    <span v-if="scope.row.isSend !== '0'">0</span>
                    <span v-else>未发送</span>
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="90" align="center">
                <template scope="scope">
                    <!--<el-button id="button" @click="formDetailHandle(scope.row)" title="详情">-->
                    <!--<i class="iconfont icon-xiangqing operate operate-xiangqing"></i>-->
                    <!--</el-button>-->
                    <el-button id="button" :class="{'font-blue': scope.row.isSend && scope.row.isSend === '0'}" @click="handleSend(scope.row)" title="发送"
                               :disabled="!scope.row.isSend || scope.row.isSend === '1'">
                        <i class="fa fa-arrow-circle-up operate-font"></i>
                    </el-button>
                    <!--<el-button id="button" @click="handleRefresh(scope.row)" title="刷新" :disabled="Boolean(scope.row.isSend)">-->
                    <!--<i class="fa fa-refresh operate-font"></i>-->
                    <!--</el-button>-->
                </template>
            </el-table-column>
        </el-table>
        <!--工具条-->
        <el-col :span="24" class="toolbar">
            <el-pagination @size-change="handleSizeChange" background @current-change="handleCurrentChange" :page-sizes="[10, 20, 50, 100]"
                           :page-size="pagination.size"
                           layout="total, sizes, prev, pager, next" :total="pagination.total" style="float:right;margin-top: 5px;">
            </el-pagination>
        </el-col>

        <el-dialog title="新建短信群发" :modal-append-to-body="false" :visible.sync="formVisible" :close-on-click-modal="false" width="40%">
            <el-form :model="form" label-width="100px" ref="form" :rules="rules" v-if="formVisible">
                <el-row :gutter="20">
                    <el-col :span="24">
                        <el-form-item label="短信名称" prop="name">
                            <el-input v-model="form.name" auto-complete="off" placeholder="请输入短信名称"></el-input>
                        </el-form-item>
                        <el-form-item label="短信模板" prop="model">
                            <el-select v-model="form.template_id" filterable placeholder="请选择短信模板" @change="changeTemplate">
                                <el-option
                                        v-for="item in moduleOptions"
                                        :key="item.id"
                                        :label="item.template_name"
                                        :value="item.id"
                                >
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="短信内容" prop="content">
                            <el-input type="textarea" v-model="form.content" disabled></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="formVisible = false">取消</el-button>
                <el-button type="primary" @click.native="submit" :loading="editLoading">提交</el-button>
            </div>
        </el-dialog>

        <el-dialog title="短信列表" :modal-append-to-body="false" :visible.sync="listVisible" width="40%">
            <el-row :gutter="20" style="height: 800px; overflow: auto">
                <el-col :span="24">
                    <el-table
                            :data="messageDetailsList"
                            style="width: 100%">
                        <el-table-column
                                prop="phone"
                                label="电话">
                        </el-table-column>
                        <el-table-column
                                prop="send_result"
                                label="状态">
                        </el-table-column>
                    </el-table>
                </el-col>
            </el-row>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="listVisible = false">关闭</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import { getMessage, getModuleOptions, save, send, handleRefresh, getInfo, getNumber } from './service'

    export default {
        name: "messageList",
        props: ['group'],
        data () {
            return {
                // windowOutHeight: 700,
                loading: false,
                pagination: {
                    page: 0,
                    size: 20,
                    total: 0
                },
                formVisible: false,
                editLoading: false,
                listVisible: false,
                form: {
                    name: '',
                    template_id: '',
                    content: ''
                },
                moduleOptions: [],
                moduleMap: {},
                data: [],
                messageDetailsList: [],
                rules: {
                    name: [
                        {required: true, message: '请输入短信名称', trigger: 'blur'}
                    ]
                },
                timer: null,
                queryList: []
            }
        },
        mounted () {
            //初始化窗体高
            // this.windowOutHeight = $(window).height();
            this.getMessage()
        },
        methods: {
            // 获取列表
            async getMessage () {
                this.loading = true
                const param = {
                    currentPage: this.pagination.page,
                    showCount: this.pagination.size,
                    groupid: this.group.id
                }
                try {
                    const {data} = await getMessage(param)
                    this.loading = false
                    this.data = data.data.records
                    this.pagination.size = data.data.showCount
                    this.pagination.page = data.data.currentPage
                    this.pagination.total = data.data.totalResult

                    if (this.timer)
                        clearInterval(this.timer);
                    this.getInfo();
                } catch (e) {
                    this.loading = false
                }
            },
            // 轮训获取单条数据 并且 赋值
            getInfo () {
                this.queryList = [];
                this.data.forEach(item => {
                    if (item.isSend === '1' && (item.push_item_count > item.push_success_count + item.push_fail_count)) {
                        this.queryList.push(item.id)
                    }
                })
                this.queryList = [...new Set(this.queryList)]
                this.timer = setInterval(() => {
                    this.queryList.forEach(async id => {
                        const {data} = await getInfo(id);
                        this.data.forEach(item => {
                            if (item.id === id) {
                                for (let key in item) {
                                    // if (item[key] && data.data[key]) {

                                    item[key] = data.data[key]

                                    // }
                                }
                            }
                        })
                    })
                }, 10000)
            },
            // 打开新建
            async add () {
                this.formVisible = true
                this.initForm()
                const param = {
                    currentPage: 0,
                    showCount: 10000
                }
                try {
                    const {data} = await getModuleOptions(param)
                    this.moduleOptions = data.data.records
                    this.moduleOptions.forEach((item) => {
                        this.moduleMap[item.id] = item
                    })
                } catch (e) {

                }
            },
            formDetailHandle () {

            },
            // 发送短信
            handleSend (row) {
                this.$confirm('确定发送短信', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    const userId = JSON.parse(sessionStorage.getItem('user')).id + ""
                    let sendDate = ''
                    const dateArr = new Date().toLocaleDateString().split('/');
                    if (dateArr[1].length === 1) {
                        dateArr[1] = "0" + dateArr[1]
                    }
                    if (dateArr[2].length === 1) {
                        dateArr[2] = "0" + dateArr[2]
                    }
                    sendDate = dateArr.join('')

                    const param = {
                        groupId: this.group.id,
                        template: row.template_code,
                        sign: '万网鑫成',
                        userId,
                        pushId: row.id,
                        sendDate
                    }
                    try {
                        await send(param)
                        this.queryList.push(row.id)
                        row.isSend = '1'
                        this.$message({
                            type: 'success',
                            message: '发送成功!'
                        });
                    } catch (e) {

                    }
                    // this.getMessage();
                }).catch(() => {
                });
            },
            handleSizeChange (size) {
                this.pagination.size = size;
                this.getMessage()
            },
            handleCurrentChange (currentPage) {
                this.pagination.page = currentPage;
                this.getMessage()
            },
            /**
             * 新建短信
             * @returns {Promise<void>}
             */
            submit () {
                this.editLoading = true;
                const param = {
                    groupid: this.group.id,
                    templateid: this.form.template_id,
                    message_name: this.form.name
                }

                this.$refs["form"].validate(async (valid) => {
                    if (valid) {
                        try {
                            await save(param)
                            this.formVisible = false;
                            this.editLoading = false;
                            this.$message({
                                message: '创建短信成功！',
                                type: 'success'
                            });
                            this.getMessage()
                        } catch (e) {
                            this.editLoading = false;
                        }
                    } else {
                        this.editLoading = false;
                    }
                })
            },
            dateFormat (row) {
                if (row.isSend === '0') return '未发送'
                if (!row.push_date) return '未知'
                return new Date(row.push_date).toLocaleString();
            },
            async getNumber (row, send_status) {
                this.listVisible = true;
                const param = {
                    currentPage: 1,
                    showCount: 1000000,
                    send_status,
                    push_id: row.id,
                    group_id: this.group.id
                }
                try {
                    const {data} = await getNumber(param)
                    this.messageDetailsList = data.data.records
                } catch (e) {

                }
            },
            changeTemplate (template_id) {
                this.form.content = this.moduleMap[template_id].template_content;
            },
            initForm () {
                this.form = {
                    name: '',
                    template_id: '',
                    content: ''
                }
            },
            async handleRefresh (row) {
                const userId = JSON.parse(sessionStorage.getItem('user')).id + "";
                let push_date = "";
                if (row.push_date) {
                    const dateArr = new Date(row.push_date).toLocaleDateString().split('/');
                    if (dateArr[1].length === 1) {
                        dateArr[1] = "0" + dateArr[1]
                    }
                    if (dateArr[2].length === 1) {
                        dateArr[2] = "0" + dateArr[2]
                    }
                    push_date = dateArr.join('')
                }
                const param = {
                    groupId: this.group.id + "",
                    sendDate: push_date,
                    userId,
                    pushId: row.id + ""
                };
                try {
                    const {data} = await handleRefresh(param)
                    for (let key in row) {
                        if (row[key] && data.data[key]) {
                            row[key] = data.data[key]
                        }
                    }
                    this.$message({
                        message: '刷新状态成功！',
                        type: 'success'
                    });
                } catch (e) {

                }
            }
        },
        destroyed () {
            if (this.timer) clearInterval(this.timer)
        }
    }
</script>

<style scoped>

    .message-title {
        display: inline-block;
        border-left: 5px solid rgba(62, 162, 238, 1);
        height: 30px;
        line-height: 30px;
        font-size: 20px;
        padding-left: 10px;
        margin-right: 10px;
    }

    .operate-font {
        font-size: 2.5rem;
        margin-left: -10px;
    }

    .font-blue {
        color: #00c1de
    }

</style>