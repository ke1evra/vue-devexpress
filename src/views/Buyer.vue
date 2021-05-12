<template>
    <div class="">
        <div class="row">
            <div class="col">
                <h1>Байер</h1>
                <dual-date-picker @change="getData" v-bind:loading="loading"></dual-date-picker>
                <orders-table v-bind:dataSource="dataSource" ></orders-table>
            </div>
        </div>
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
            loading: null,
        };
    },
    methods: {
        getData(url) {
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
