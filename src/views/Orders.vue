<template>
  <div class="">
    <div class="row">
      <div class="col">
        <h1>Заказы</h1>
        <dual-date-picker @change="getData" v-bind:loading="loading"></dual-date-picker>
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
    getData(url) {
      this.loading = true;
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
