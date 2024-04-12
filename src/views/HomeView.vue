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
        <el-tabs v-model="curStockMode" class="demo-tabs" @tab-click="handleClick">
            <el-tab-pane label="沪市" name="hu">
                <el-row :gutter="20">
                    <el-col v-for="stock in HuStock" :key="stock.Code" :span="6">
                        <el-card style="margin-bottom: 12px;">
                            <p>{{ stock.Name }}</p>
                            <p>{{ stock.Price }}</p>
                            <p>{{ stock.Code }}</p>
                        </el-card>
                    </el-col>
                </el-row>
            </el-tab-pane>
            <el-tab-pane label="深市" name="shen">
                {{ ShenStock }}
            </el-tab-pane>
            <el-tab-pane label="创业板" name="chuang">
                {{ ChuangStock }}
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import api, { StockPrice } from '@/http/api';
import { ElMessage } from 'element-plus';


export default defineComponent({
    name: 'HomeView',
    data(): {
        curStockMode: string,
        HuStock: StockPrice[],
        ShenStock: StockPrice[],
        ChuangStock: StockPrice[]
    } {
        return {
            curStockMode: 'hu',
            HuStock: [],
            ShenStock: [],
            ChuangStock: []
        }
    },
    mounted() {
        api.getMarketPrice().then(res => {
            console.log(res);
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
    },
    methods: {

    }
});
</script>