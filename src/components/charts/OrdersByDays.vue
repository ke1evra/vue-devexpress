<template>
    <div class="pt-3">
        <orders-by-period
            v-if="dataSource"
            :dataSource="dataSource"
            groupBy="day"
            :chartName="chartName"
            :seriesArray="seriesArray"
        />
    </div>
</template>

<script>
import OrdersByPeriod from './OrdersByPeriod.vue';
import seriesArray from './series/orderStatuses';

const chartName = 'OrdersByDays';

export default {
    name: chartName,
    components: {
        OrdersByPeriod,
    },
    data() {
        return {
            chartName,
            seriesArray,
        };
    },
    props: [
        'dataSource',
    ],

};
</script>

<style lang="css">
</style>
