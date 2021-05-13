<template>
  <div class="">
    <div class="row">
      <div class="col">
        <h1>Заказы</h1>
        <dual-date-picker @range="getData" v-bind:loading="loading"></dual-date-picker>
        <orders-table v-bind:dataSource="dataSource" ></orders-table>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <orders-chart v-bind:dataSource="dataSource"></orders-chart>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import moment from 'moment';
import OrdersTable from '../components/ordersTable.vue';
import OrdersChart from '../components/ordersChart.vue';
import DualDatePicker from '../components/dualDatePicker.vue';
import { API_URL } from '../config';

export default {
    components: { DualDatePicker, OrdersTable, OrdersChart },
    data() {
        return {
            dataSource: null,
            url: null,
            loading: null,
        };
    },
    methods: {
        getUrl(range){
            const from = moment(`${range.from.slice(2, 4)}-${range.from.slice(0, 2)}-${range.from.slice(4, 8)}`).format('YYYY-MM-DD');
            const to = moment(`${range.to.slice(2, 4)}-${range.to.slice(0, 2)}-${range.to.slice(4, 8)}`).format('YYYY-MM-DD');
            return `${API_URL}/orders?date_from=${from} 00:00:00&date_to=${to} 23:59:59`;
        },
        getData(range) {
            this.loading = true;
            const url = this.getUrl(range);
            axios
                .get(url)
            // eslint-disable-next-line no-return-assign
                .then((response) => {
                    this.loading = false;
                    this.dataSource = response.data;
                });
        },
    },
};
</script>
