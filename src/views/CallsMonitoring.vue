<template>
    <div class='callsMonitoring'>
        <h2>Страница мониторинга звонков</h2>
        <div class="row">
            <div v-if='!dataSource || loadData'>
                <div class='preloader'>
                    <div class='preloaderChild bounce-1'></div>
                    <div class='preloaderChild bounce-2'></div>
                </div>
            </div>
            <calendar
                @calendarChange='reloadData'
                :disabled='!dataSource || loadData'
                :loading='!dataSource || loadData'
            />
        </div>

        <div class="row">
            <div class="col-12">
                <timelineChart v-if='dataSource'
                title='Хронология звонков'
                :dataSource='dataSource'
                argumentField='person'
                rangeValue1Field='startFix'
                rangeValue2Field='endFix'
                seriesTemplateNameField='call_type'
                customizeSeriesBool='true'
                />
            </div>
        </div>

        <missedCalls
            v-if='dataSource'
            :missedCalls='missedCalls'
        />
        </div>
</template>

<script>
import calendar from '../components/calendar.vue';
import timelineChart from '../components/charts/timelineChart.vue';
import missedCalls from '../components/missedCallsHistory.vue';
import fetchData from '../components/model/common';
import { API_URL } from '../config';

const moment = require('moment');
const nameNumberAccordance = require('../data/vks_numbers.js');

const API_URI = `${API_URL}/mango/day`;

export default {
    name: 'callsMonitoring',
    components: {
        calendar,
        timelineChart,
        missedCalls,
    },
    data() {
        return {
            date: moment(),
            dataSource: null,
            loadData: true,
            missedCalls: null,
        };
    },
    methods: {
        async getData(date) {
            const dayStart = moment(date).startOf('day').unix();
            const dayEnd = moment(date).endOf('day').unix();

            let data = await fetchData(API_URI, dayStart, dayEnd);
            this.missedCalls = data.missedCalls.map((line) => {
                // eslint-disable-next-line
                line.copyMessage = line.number;
                return line;
            });

            data = data.data1;
            if (data) {
                data = data.map((line) => {
                    /* eslint-disable */
                    const name = nameNumberAccordance[line.person] ? nameNumberAccordance[line.person] : line.person;
                    line.person = name;
                    return line;
                    /* eslint-enable */
                });
            }

            return data;
        },
        async reloadData(newDate) {
            this.loadData = true;
            this.getData(newDate)
                .then((data) => {
                    this.dataSource = data;
                    this.loadData = false;
                });
        },
    },
    mounted() {
        this.getData(this.date)
            .then((data) => {
                this.dataSource = data;
                this.loadData = false;
            });
    },
};
</script>

<style scoped lang='scss'>
@import '../common/common.scss';
</style>
