<template>
    <el-button>刷新</el-button>
    <div>
        <el-table :data="records" style="width: 100%">
            <el-table-column prop="Amount" label="Amount"></el-table-column>
            <el-table-column prop="Code" label="Code"></el-table-column>
            <el-table-column label="Direction">
                <template #default="scope">
                    <span>{{ directionText(scope.row.Direction) }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="KnockPrice" label="Knock Price" width="100"></el-table-column>
            <el-table-column prop="No" label="No" width="300"></el-table-column>
            <el-table-column prop="Price" label="Price" width="100"></el-table-column>
            <el-table-column label="State" width="180">
                <template #default="scope">
                    <span>{{ stateText(scope.row.State) }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="TradeTime" label="Trade Time" width="180"></el-table-column>
        </el-table>
    </div>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';
import api, { TradeRecord } from '@/http/api'
import { store } from '@/store/store';

export default defineComponent({
    data(): { records: TradeRecord[] } {
        return {
            records: []
        }
    },
    mounted() {
        if (!store.state.username) {
            this.$router.push({ name: 'login' })
        }
        this.refresh()
    },
    methods: {
        refresh() {
            api.getTradeRecord(store.state.username as string).then(res => {
                console.log(res)
                this.records = res
            })
        },
        directionText(direction: number) {
            return direction === 1 ? '卖出' : '买入';
        },
        stateText(state: number) {
            switch (state) {
                case 0:
                    return '错误';
                case 1:
                    return '委托成功';
                case 2:
                    return '交易成功';
                case 3:
                    return '废单';
                case 4:
                    return '账户余额不足';
                case 5:
                    return '持仓余额不足';
                default:
                    return '未知状态';
            }
        }
    }
})
</script>