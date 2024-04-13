<template>
    <el-row :gutter="20">
        <el-col v-for="stock in stocks" :key="stock.Code" :xs="8" :sm="6" :md="6" :lg="4" :xl="4">
            <el-card style="margin-bottom: 12px;" @click="toDetail(stock.Code)">
                <el-descriptions :title="stock.Name" direction="vertical" :column="1" size="small" border>
                    <el-descriptions-item label="股票代码">{{ stock.Code }}</el-descriptions-item>
                    <el-descriptions-item label="当前价格">{{ stock.Price }}</el-descriptions-item>
                    <el-descriptions-item label="涨跌价">
                        <p :style="{ color: getChangeColor(stock) }">{{ getChange(stock) }}</p>
                    </el-descriptions-item>
                    <el-descriptions-item label="涨跌幅">
                        <p :style="{ color: getChangeColor(stock) }">{{ getChangeRate(stock) }}</p>
                    </el-descriptions-item>
                </el-descriptions>
            </el-card>
        </el-col>
    </el-row>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { StockPriceAndHistory } from '@/http/api';

export default defineComponent({
    name: 'StockList',
    props: {
        stocks: {
            type: Array as () => StockPriceAndHistory[],
            required: true
        }
    },
    methods: {
        getChange(stock: StockPriceAndHistory) {
            return Math.round((stock.Price - stock.History[0]) * 1000) / 1000
        },
        getChangeRate(stock: StockPriceAndHistory) {
            return Math.round((this.getChange(stock) / stock.History[0]) * 100 * 100) / 100 + '%'
        },
        getChangeColor(stock: StockPriceAndHistory) {
            return this.getChange(stock) > 0 ? 'red' : 'green'
        },
        toDetail(code: string) {
            this.$router.push({ name: 'detail', query: { code: code } })
        }
    }
});
</script>