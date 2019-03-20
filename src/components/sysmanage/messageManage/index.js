import { get } from './service'
import messageList from './messageList'

export default {
    name: "index",
    data () {
        return {
            activeName: "",
            data: []
        }
    },
    mounted () {
        this.get()
    },
    methods: {
        async get () {
            try {
                const {data} = await get({currentPage: 1, showCount: 10000})
                this.data = data.data.records;
                if (data.data.records[0])
                    this.activeName = data.data.records[0].groupcode
            } catch (e) {

            }
        },
    },
    components: {
        messageList
    }
}