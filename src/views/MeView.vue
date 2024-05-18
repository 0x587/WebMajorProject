<template>
    <div id="app">
        <el-row :gutter="20" style="width: 80%;margin-left: 10%;">
            <el-col :span="6">
                <el-card>
                    <h2>账户余额</h2>
                    <p>{{ balance !== null ? `￥${balance}` : '加载中...' }}</p>
                    <el-button @click="fetchBalance">刷新余额</el-button>
                </el-card>
            </el-col>
            <el-col :span="18">
                <el-card>
                    <h2>持仓信息</h2>
                    <el-table :data="inventory" style="width: 100%">
                        <el-table-column prop="Code" label="Code"></el-table-column>
                        <el-table-column prop="Amount" label="Amount"></el-table-column>
                        <el-table-column prop="Total_Cost" label="Total Cost"></el-table-column>
                        <el-table-column prop="AVG_Cost" label="AVG Cost"></el-table-column>
                        <el-table-column prop="Current_Price" label="Current Price">
                            <template v-slot="scope">
                                <span>{{ scope.row.Current_Price !== undefined ? `￥${scope.row.Current_Price}` : '加载中...'
                                }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="Profit_Loss" label="Profit/Loss">
                            <template v-slot="scope">
                                <span>{{ scope.row.Profit_Loss !== undefined ? `￥${scope.row.Profit_Loss.toFixed(2)}` :
                                    '加载中...'
                                }}</span>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-button @click="fetchInventory">刷新持仓</el-button>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>
  
<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import api, { InventoryItem } from '@/http/api';
import { store } from '@/store/store';

interface RenderInventoryItem extends InventoryItem {
    Current_Price?: number;  // 新增字段
    Profit_Loss?: number;    // 新增字段
}

export default defineComponent({
    name: 'App',
    setup() {
        const balance = ref<number | null>(null);
        const inventory = ref<RenderInventoryItem[]>([]);
        const username = store.state.username;

        const fetchBalance = async () => {
            try {
                const result = await api.getBalance(username!);
                balance.value = result;
            } catch (error) {
                console.error('Failed to fetch balance:', error);
            }
        };

        const fetchInventory = async () => {
            try {
                const result = await api.getInventory(username!);
                for (const item of (result as RenderInventoryItem[])) {

                    const prices = await api.getStockPrice(item.Code);
                    item.Current_Price = prices[prices.length - 1];
                    item.Profit_Loss = (item.Current_Price - item.AVG_Cost) * item.Amount;
                }
                inventory.value = result;
            } catch (error) {
                console.error('Failed to fetch inventory:', error);
            }
        };

        onMounted(() => {
            fetchBalance();
            fetchInventory();
        });

        return {
            balance,
            inventory,
            fetchBalance,
            fetchInventory
        };
    }
});
</script>
  
<!-- <style>
@import 'element-plus/lib/theme-chalk/index.css';
</style> -->
  