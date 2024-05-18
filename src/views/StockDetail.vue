<template>
    <h2>Code: {{ code }}</h2>
    <!-- <p>{{ history }}</p> -->
    <div id="char" style="width: 100%; height: 600px"></div>
</template>

<script lang="ts">
import api from '@/http/api';
import { defineComponent } from 'vue';
import { ECharts, EChartsOption, init } from 'echarts';

export default defineComponent({
    name: 'StockDetail',
    data(): {
        code: string,
        history: number[],
        x: number[],
        y: number[],
    } {
        return {
            code: '',
            history: [],
            x: [],
            y: [],
        }
    },
    methods: {
        update() {
            this.code = (this.$route.query.code) as string
            api.getStockPrice(this.code).then(res => {
                this.history = res
                this.x = []
                this.y = []
                for (let index = 0; index < res.length; index++) {
                    const element = res[index];
                    this.x.push(index)
                    this.y.push(element)
                }
                const option: EChartsOption = {
                    title: {
                        text: '股票价格走势',
                    },
                    xAxis: { data: this.x },
                    yAxis: { type: 'value' },
                    dataZoom: [
                        {
                            type: 'inside',
                            start: 0,
                            end: 20
                        },
                        {
                            start: 0,
                            end: 20
                        }
                    ],
                    series: [
                        {
                            data: this.y,
                            type: 'line',
                            smooth: true
                        }
                    ]
                };
                const charEle = document.getElementById('char') as HTMLElement;
                const charEch: ECharts = init(charEle);
                charEch.setOption(option);
            })
        }
    },
    mounted() {
        this.update()
    }
})
</script>