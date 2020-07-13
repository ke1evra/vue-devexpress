<template>
  <div id="calendar-demo">
    <div class="widget-container">
      <DxDropDownBox class='dropDownButton'
        :value='currentDay'
        >
          <DxCalendar
            id="calendar-container"
            v-model="currentValue"
            :min="minDateValue"
            :max="maxDateValue"
            :disabled-dates="disabledDates"
            :first-day-of-week="firstDay"
            :disabled="disabled"
            :zoom-level="zoomLevel"
            :cell-template="cellTemplate"
            :showTodayButton='true'
            @value-changed="calendarChange"
          >
            <template #custom="{ data: cell }">
              <span :class="getCellCssClass(cell.date)">
                {{ cell.text }}
              </span>
            </template>
          </DxCalendar>
      </DxDropDownBox>
    </div>
  </div>
</template>

<script>
import {
    DxCalendar,
    DxDropDownBox,
} from 'devextreme-vue';

const moment = require('moment');

export default {
    components: {
        DxCalendar,
        DxDropDownBox,
    },
    data() {
        return {
            minDateValue: null,
            maxDateValue: new Date((new Date()).getTime()),
            disabledDates: null,
            firstDay: 0,
            currentValue: new Date(),
            zoomLevels: ['month', 'year', 'decade', 'century'],
            cellTemplate: 'cell',
            zoomLevel: 'month',
            now: moment(),
            currentDay: moment().format('DD.MM.YYYY'),
        };
    },
    props: ['disabled'],
    methods: {
        calendarChange(e) {
            this.currentDay = moment(e.value).format('DD.MM.YYYY');
            this.$emit('calendarChange', e.value);
        },

    },
};
</script>
<style scoped>
.widget-container {
    margin-right: 320px;
}

#calendar-container {
    margin: auto;
}

.dx-calendar-cell:not(.dx-calendar-other-month) .weekend,
.dx-calendar-cell:not(.dx-calendar-other-month) .holyday {
    text-shadow: none;
    font-weight: bold;
}

.dx-calendar-cell:not(.dx-calendar-other-month) .weekend {
    color: #3030FF;
}

.dx-state-disabled.dx-calendar .dx-calendar-cell:not(.dx-calendar-other-month) .weekend {
    color: #8080FF;
}

.dx-calendar-cell:not(.dx-calendar-other-month) .holyday {
    color: #FF3030;
}

.dx-state-disabled.dx-calendar .dx-calendar-cell:not(.dx-calendar-other-month) .holyday {
    color: #FF8080;
}

.options {
    padding: 20px;
    background-color: rgba(191, 191, 191, 0.15);
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    width: 260px;
}

.caption {
    font-weight: 500;
    font-size: 18px;
}

.option {
    margin-top: 10px;
}

.dropDownButton {
    width: 250px;
    height: 30px;
    margin-left: 20px;
}
</style>
