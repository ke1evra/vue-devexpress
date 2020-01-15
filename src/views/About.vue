<template>
  <div>
    <h1>Заказы</h1>
    <dual-date-picker @change="getData"></dual-date-picker>
    <orders-table v-bind:dataSource="dataSource"></orders-table>
  </div>
</template>
<script>
import axios from 'axios';
import OrdersTable from '../components/ordersTable.vue';
import DualDatePicker from '../components/dualDatePicker.vue';


export default {
  components: { DualDatePicker, OrdersTable },
  data() {
    return {
      dataSource: null,
      url: null,
    };
  },
  methods: {
    getData(url) {
      axios
        .get(url)
        // eslint-disable-next-line no-return-assign
        .then(response => (this.dataSource = response.data));
    },
  },
};
</script>
