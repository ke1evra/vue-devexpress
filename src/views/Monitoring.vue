<template>
  <div>
    <div class="">
      <div class="row">
        <div class="col">
          <h1>Мониторинг</h1>
          <dual-date-picker @range="setRange"
                            v-bind:loading="loading"
                            v-bind:from="from"
                            v-bind:to="to"
          ></dual-date-picker>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <p class="bg-light rounded p-3">
            from: {{from}}
            <br>
            to: {{to}}
            <br>
            {{dataSource}}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import moment from 'moment';
import axios from 'axios';
import DualDatePicker from '../components/dualDatePicker.vue';

export default {
  name: 'Monitoring',
  components: { DualDatePicker },
  data() {
    return {
      dataSource: null,
      dataUrl: null,
      from: null,
      to: null,
    };
  },
  created() {
  },
  methods: {
    setRange(range) {
      this.from = moment(range.from, 'DDMMYYYY').unix();
      this.to = moment(range.to, 'DDMMYYYY').endOf('day').unix();
      this.getOrdersSumData();
    },
    getOrdersSumData() {
      const formatDate = date => moment.unix(date).format('YYYY-MM-DD HH:mm:ss');
      const url = `http://185.176.25.157:3000/orders/sum?date_from=${formatDate(this.from)}&date_to=${formatDate(this.to)}`;
      console.log(url);
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
