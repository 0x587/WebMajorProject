<template>
    <div class="main">
        <h1>Home</h1>
        <template v-if="$store.state.username">
            用户模式
            <h2>Cur user: {{ $store.state.username }}</h2>
        </template>
        <template v-else>
            游客模式
        </template>
        <el-button @click="refreshStock">刷新</el-button>
        <el-countdown title="刷新倒计时" format="mm:ss" :value="refreshCountdown" @finish="refreshStock" />
        <el-tabs v-model="curStockMode" class="demo-tabs">
            <el-tab-pane label="沪市" name="hu">
                <StockList :stocks="HuStock" :username="$store.state.username" />
            </el-tab-pane>
            <el-tab-pane label="深市" name="shen">
                <StockList :stocks="ShenStock" :username="$store.state.username" />
            </el-tab-pane>
            <el-tab-pane label="创业板" name="chuang">
                <StockList :stocks="ChuangStock" :username="$store.state.username" />
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import api, { StockPriceAndHistory } from '@/http/api';
import { ElMessage } from 'element-plus';
import StockList from '@/components/StockList.vue';


export default defineComponent({
    name: 'HomeView',
    components: {
        StockList
    },
    data(): {
        curStockMode: string,
        HuStock: StockPriceAndHistory[],
        ShenStock: StockPriceAndHistory[],
        ChuangStock: StockPriceAndHistory[],
        refreshInterval: number,
        refreshCountdown: number
    } {
        return {
            curStockMode: 'hu',
            HuStock: [],
            ShenStock: [],
            ChuangStock: [],
            refreshInterval: 0,
            refreshCountdown: Date.now() + 5 * 1000
        }
    },
    mounted() {
        this.refreshStock()
    },
    methods: {
        refreshStock() {
            this.refreshCountdown = Date.now() + 5 * 1000
            api.getMarketPrice().then(res => {
                this.HuStock = []
                this.ShenStock = []
                this.ChuangStock = []
                res.forEach(item => {
                    if (item.Code.startsWith('3')) {
                        this.ShenStock.push(item)
                    } else if (item.Code.startsWith('0')) {
                        this.ChuangStock.push(item)
                    } else if (item.Code.startsWith('6')) {
                        this.HuStock.push(item)
                    }
                })
            })
        }
    }
});
</script>