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
        getData(range) {
            this.loading = true;
            const url = `${API_URL}/orders?date_from=${range.from} 00:00:00&date_to=${range.to} 23:59:59`;
            // console.log(url);
            // eslint-disable-next-line no-return-assign
            axios.get(url).then((response) => {
                this.loading = false;
                this.dataSource = response.data;
            }).catch(e => console.log(e));
        },
    },
};
</script>
