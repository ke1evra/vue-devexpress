<template>
    <div class="missedCalls">
        <h2>Missed calls</h2>
        <div class='callsList'>
            <b-button-group class='mb-1 listNumber' variant='danger'
                :key='number.number' v-for="number in missedCalls">
                <b-button :variant='getButtonColorClass(number)'
                    v-clipboard:copy='number.number'
                    v-clipboard:success='onCopy(number)'
                >
                    {{ number.copyMessage }}
                </b-button>
                <b-dropdown :variant='getButtonColorClass(number)'>
                    <b-dropdown-item :href="`https://ec-crm.ru/orders/filter_template?client_phone=${number.number}`"
                        target='_blank' title='Искать заказ в админке по номеру телефона'
                    >
                        В Админку
                    </b-dropdown-item>
                    <b-dropdown-divider></b-dropdown-divider>
                    <b-dropdown-header>
                        History
                    </b-dropdown-header>
                    <b-dropdown-divider></b-dropdown-divider>
                    <b-dropdown-item :key='call.number' v-for='call in number.calls'
                        :disabled='true'>
                        <table>
                            <tr>
                                <td>
                                    <b-badge :variant='getButtonHistoryLineColorClass(call)'>
                                        {{ call.startTime }}
                                    </b-badge>
                                </td>
                                <td>
                                    {{ call.line || 'undefined' }}
                                </td>
                            </tr>
                        </table>
                    </b-dropdown-item>
                    <b-dropdown-divider></b-dropdown-divider>
                </b-dropdown>
            </b-button-group>
        </div>
    </div>
</template>

<script>
const moment = require('moment');

export default {
    name: 'missedCalls',
    props: [
        'missedCalls',
    ],
    methods: {
        getButtonColorClass(number) {
            const passedSinceNow = moment(new Date()).diff(moment(number.callTime), 'minutes');
            let colorClass = '';

            if (passedSinceNow < 120) {
                colorClass = 'success';
            } else if (passedSinceNow < 180) {
                colorClass = 'warning';
            } else {
                colorClass = 'danger';
            }

            return colorClass;
        },
        getButtonHistoryLineColorClass(call) {
            let colorClass = '';
            if (call.call_type === 'inComing') {
                colorClass = 'success';
            } else if (call.call_type === 'inComingFail') {
                colorClass = 'danger';
            } else if (call.call_type === 'outComing') {
                colorClass = 'info';
            } else if (call.call_type === 'outComingFail') {
                colorClass = 'warning';
            }

            return colorClass;
        },
        // eslint-disable-next-line
        onCopy(number) {
            return () => {
                // eslint-disable-next-line
                number.copyMessage = 'Copied';
            };
        },
    },
};
</script>

<style scoped lang='scss'>
.listNumber {
    margin-right: 5px;
}
</style>
