<template>
  <div>
    <div class="row pb-1">
      <div class="col-md-2">
        <b-form-select v-model="selected" :options="options" v-on:change="setFromDate(selected)">
        </b-form-select>
      </div>
    </div>
    <div class="row pb-3">
      <div class="col">
        <div class="form-inline">
          <the-mask
            :mask="'##.##.####'"
            class="form-control mr-1 text-center"
            placeholder="DD.MM.YYYY"
            v-model="fromDate"
            style="width: 120px;"
          />
          <the-mask
            :mask="'##.##.####'"
            class="form-control mr-1 text-center"
            placeholder="DD.MM.YYYY"
            v-model="toDate"
            style="width: 120px;"
          />
          <b-button
            variant="primary"
            v-on:click="setUrl()"
            v-b-popover.hover="'Применить выбранный диапазон'"
          >Применить</b-button>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col">
      </div>
    </div>
    <div class="row">
      <div class="col">
        <DxDataGrid
          v-if="dataUrl"
          :show-borders="true"
          :allow-column-reordering="true"
          :data-source="dataUrl"
        >
          <DxColumn
            data-field="order_number"
            caption="Номер заказа"
          />
          <DxColumn
            data-field="month"
            caption="Месяц"
          />
          <DxColumn
            data-field="created_day"
            caption="День"
          />
          <DxColumn
            data-field="name"
            caption="Менеджер"
          />
          <DxColumn
            data-field="shop_title"
            caption="Магазин"
          />
          <DxColumn
            data-field="order_status_title"
            caption="Статус"
          />
          <DxColumn
            data-field="order_sum"
            caption="Сумма заказа"
          >
            <dx-format
              type="currency"
              currency="RUB"
            />
          </DxColumn>
          <DxGroupPanel :visible="true"/>
          <DxSearchPanel :visible="true"/>
          <DxGrouping :auto-expand-all="autoExpandAll"/>
          <DxPaging :page-size="10"/>
        </DxDataGrid>
      </div>
    </div>
  </div>
</template>
<script>

import {
  DxDataGrid,
  DxColumn,
  DxGrouping,
  DxGroupPanel,
  DxSearchPanel,
  DxPaging,
  DxFormat,
} from 'devextreme-vue/data-grid';
import { locale, loadMessages } from 'devextreme/localization';
import ruMessages from 'devextreme/localization/messages/ru.json';
import { TheMask } from 'vue-the-mask';
import moment from 'moment';

export default {
  components: {
    DxColumn,
    DxGroupPanel,
    DxGrouping,
    DxPaging,
    DxSearchPanel,
    DxDataGrid,
    DxFormat,
    TheMask,
  },
  data() {
    return {
      dataUrl: null,
      dataUrlTemp: 'http://194.58.98.118:3000/orders?date_from=2020-01-03 00:00:00&date_to=2020-01-03 23:59:59',
      autoExpandAll: true,
      fromDate: moment().format('DDMMYYYY'),
      toDate: moment().format('DDMMYYYY'),
      moment,
      selected: null,
      options: [
        { value: null, text: '-- Выберите диапазон дат --', disabled: true },
        { value: '01012019', text: '01.01.2019' },
      ],
    };
  },
  created() {
    loadMessages(ruMessages);
    locale('ru');
  },
  methods: {
    setUrl() {
      // eslint-disable-next-line no-return-assign
      return this.dataUrl = `http://194.58.98.118:3000/orders?date_from=${moment(`${this.fromDate.slice(2, 4)}-${this.fromDate.slice(0, 2)}-${this.fromDate.slice(4, 8)}`).format('YYYY-MM-DD')} 00:00:00&date_to=${moment(`${this.toDate.slice(2, 4)}-${this.toDate.slice(0, 2)}-${this.toDate.slice(4, 8)}`).format('YYYY-MM-DD')} 23:59:59`;
    },
    setFromDate(value) {
      // eslint-disable-next-line no-return-assign
      return this.fromDate = value;
    },
  },
};
</script>
