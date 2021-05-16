<template>
    <div class="">
        <div class="row">
            <div class="col">
                <h1>Инфа по заказам</h1>
                <text-input
                    @text="getData"
                    formPlaceholder="Введите номер заказа"
                    buttonText="Искать"
                    :loading="loading"
                ></text-input>
            </div>
        </div>
        <orders-info-renderer
            :orderData="orderData"
            :orderNumber="orderNumber"
        ></orders-info-renderer>
    </div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
import TextInput from '../components/textInput.vue';
import OrdersInfoRenderer from '../components/ordersInfoRenderer.vue';
import { API_URL } from '../config';

export default {
    components: { TextInput, OrdersInfoRenderer },
    name: 'OrdersInfo',
    data() {
        return {
            loading: null,
            orderData: null,
            orderNumber: null,
        };
    },
    methods: {
        getData(text) {
            this.loading = true;
            const orderUrl = `${API_URL}/orders/number?order_number=${text}`;
            let firstRes;
            console.log(orderUrl);
            // eslint-disable-next-line no-return-assign
            axios.get(orderUrl).then((response) => {
                firstRes = response.data;
                const getLogs = {};
                getLogs.number = firstRes[0].phone_key;
                getLogs.from = moment(firstRes[0].date_of_registration).subtract(3, 'days').unix();
                getLogs.to = moment(firstRes[0].date_of_registration).add(3, 'days').unix();
                console.log(getLogs);
                // eslint-disable-next-line max-len
                const orderCallsUrl = `${API_URL}/calls/clientInRange?number=${getLogs.number}&date_from=${getLogs.from}&date_to=${getLogs.to}`;
                axios.get(orderCallsUrl).then((responseCalls) => {
                    this.orderData = {};
                    this.orderData.calls = responseCalls.data;
                    this.orderData.orderInfo = firstRes;
                    this.orderNumber = text;
                    this.loading = false;
                }).catch(e => console.log(e));
            }).catch(e => console.log(e));
        },
    },
};
</script>

<style scoped>

</style>
