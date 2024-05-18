<template>
    <el-row :gutter="20">
        <el-col v-for="stock in stocks" :key="stock.Code" :xs="8" :sm="6" :md="6" :lg="4" :xl="4">
            <el-card style="margin-bottom: 12px;">
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
                <el-button :disabled="username == undefined" @click="openTradeDialog(stock.Code, 'buy')">买入</el-button>
                <el-button :disabled="username == undefined" @click="openTradeDialog(stock.Code, 'sell')">卖出</el-button>
                <el-button @click="toDetail(stock.Code)">详情</el-button>
            </el-card>
        </el-col>
    </el-row>
    <el-dialog v-model="showTradeDialog" title="交易窗口" width="500">
        <el-form :model="tradeForm">
            <el-form-item label="股票代码">
                <el-input v-model="tradeForm.code" autocomplete="off" disabled />
            </el-form-item>
            <el-form-item label="交易价格">
                <el-input v-model="tradeForm.price" autocomplete="off" />
            </el-form-item>
            <el-form-item label="交易数量">
                <el-input v-model="tradeForm.amount" autocomplete="off" />
            </el-form-item>
            <!-- <el-form-item label="Zones" :label-width="formLabelWidth">
                <el-select v-model="form.region" placeholder="Please select a zone">
                    <el-option label="Zone No.1" value="shanghai" />
                    <el-option label="Zone No.2" value="beijing" />
                </el-select>
            </el-form-item> -->
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="doTrade(false)">取消</el-button>
                <el-button type="primary" @click="doTrade(true)">确定</el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import api, { StockPriceAndHistory, TradeDirection, TradeStatus } from '@/http/api';
import { ElNotification } from 'element-plus'

export default defineComponent({
    name: 'StockList',
    data(): {
        showTradeDialog: boolean,
        tradeForm: {
            code: string,
            price: number,
            amount: number,
            dire: TradeDirection
        }
    } {
        return {
            showTradeDialog: false,
            tradeForm: {
                code: '',
                price: 0,
                amount: 0,
                dire: ''
            }
        }
    },
    props: {
        stocks: {
            type: Array as () => StockPriceAndHistory[],
            required: true
        },
        username: {
            type: String,
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
        },
        openTradeDialog(code: string, dire: TradeDirection) {
            this.tradeForm.code = code
            this.tradeForm.dire = dire
            this.showTradeDialog = true
        },
        doTrade(action: boolean) {
            if (action) {
                api.tradeStock(this.username, this.tradeForm.code, this.tradeForm.dire, this.tradeForm.price, this.tradeForm.amount).then(res => {
                    console.log(res);
                    switch (res) {
                        case 0:
                            ElNotification({
                                title: '错误',
                                message: '交易失败',
                                type: 'error'
                            })
                            break;
                        case 1:
                            ElNotification({
                                title: '成功',
                                message: '委托成功',
                                type: 'success'
                            })
                            break;
                        case 2:
                            ElNotification({
                                title: '成功',
                                message: '交易成功',
                                type: 'success'
                            })
                            break;
                        case 3:
                            ElNotification({
                                title: '废单',
                                message: '买入价或卖出价超出价格变动范围',
                                type: 'error'
                            })
                            break;
                        case 4:
                            ElNotification({
                                title: '错误',
                                message: '余额不足',
                                type: 'error'
                            })
                            break;
                        case 5:
                            ElNotification({
                                title: '错误',
                                message: '持仓不足',
                                type: 'error'
                            })
                            break;
                        default:
                            break;
                    }
                })
            }
            this.tradeForm.code = 0
            this.tradeForm.price = 0
            this.tradeForm.amount = 0
            this.showTradeDialog = false
        },
    }
});
</script>