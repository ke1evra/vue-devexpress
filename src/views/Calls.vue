<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col">
        <h1>Звонки</h1>
        <dual-date-picker @change="getData"
                          v-bind:loading="loading"
                          v-bind:urltype="urltype"
        ></dual-date-picker>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <calls-table v-bind:dataSource="dataSource"></calls-table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import DualDatePicker from '../components/dualDatePicker.vue';
import callsTable from '../components/callsTable.vue';

export default {
  components: { DualDatePicker, callsTable },
  name: 'calls',
  data() {
    return {
      dataSource: null,
      loading: null,
      urltype: 'calls',
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

<style scoped>

</style>
