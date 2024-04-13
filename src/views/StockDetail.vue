<template>
    <h2>Code: {{ code }}</h2>
    <p>{{ history }}</p>
</template>

<script lang="ts">
import api from '@/http/api';
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'StockDetail',
    data(): {
        code: string,
        history: number[]
    } {
        return {
            code: '',
            history: []
        }
    },

    mounted() {
        this.code = (this.$route.query.code) as string
        api.getStockPrice(this.code).then(res => {
            this.history = res
        })
    }
})
</script>