<template>
  <div>
    <DxDataGrid
      v-if="dataSource"
      :show-borders="true"
      :allow-column-reordering="true"
      :data-source="dataSource"
      :hover-state-enabled="true"
      >
      <DxExport
        :enabled="true"
        :allow-export-selected-data="true"
      />
      <DxFilterRow
        :visible="true"
      />
      <DxHeaderFilter
        :visible="true"
      />
      <DxSearchPanel
        :visible="true"
        :width="240"
        placeholder="Search..."
      />
      <DxGroupPanel :visible="true"/>
      <DxSearchPanel :visible="true"/>
      <DxGrouping
        expand-mode="rowClick"
        :auto-expand-all="false"
      />
      <DxPaging :page-size="10"/>
      <DxPager
        :show-page-size-selector="true"
        :allowed-page-sizes="[10, 25, 50, 100]"
      ></DxPager>
<!--      <DxSummary>-->
<!--        <DxGroupItem-->
<!--          column="order_number"-->
<!--          summary-type="count"-->
<!--          show-in-column="month"-->
<!--          :customize-text="formatCount"-->
<!--          :show-in-group-footer="false"-->
<!--          :align-by-column="true"-->
<!--        />-->
<!--        <DxGroupItem-->
<!--          column="order_sum"-->
<!--          summary-type="sum"-->
<!--          :show-in-group-footer="false"-->
<!--          :align-by-column="true"-->
<!--          :customize-text="formatSum"-->
<!--        />-->
<!--        <DxGroupItem-->
<!--          column="order_sum"-->
<!--          summary-type="avg"-->
<!--          :show-in-group-footer="false"-->
<!--          :align-by-column="true"-->
<!--          :customize-text="formatAvg"-->
<!--        />-->
<!--        <DxTotalItem-->
<!--          column="order_number"-->
<!--          summary-type="count"-->
<!--        />-->
<!--        <DxTotalItem-->
<!--          column="order_sum"-->
<!--          summary-type="sum"-->
<!--          :customize-text="formatSum"-->
<!--        />-->
<!--      </DxSummary>-->
<!--      <DxSortByGroupSummaryInfo summary-item=""/>-->
      <template #dataRowTemplate="rowInfo">
        <tbody
          class="dx-row"
        >
        <tr class="main-row">
          <td v-bind:key="col"
              v-for="col in rowInfo.data.data"
              :style="`background-color: ${tooltipColors[rowInfo.data.data.call_type]}`"
          >{{col}}</td>
        </tr>
        </tbody>
      </template>
      <DxColumn
        v-for="col in columns"
        v-bind:key="col"
        :cell-template="col.cellTemplate"
        :data-field="col.dataField"
        :caption="col.caption"
      ></DxColumn>
<!--      <DxColumn-->
<!--        cell-template="cellTemplate"-->
<!--        data-field="call_type"-->
<!--      ></DxColumn>-->
      <template #cellTemplate="cell">
        <div>
          <span :style="`color: ${tooltipColors[cell.data.value]}`"
          >&#9679;</span>&nbsp;{{cell.data.value}}
        </div>
      </template>
    </DxDataGrid>
  </div>
</template>

<script>
import TimeFormat from 'hh-mm-ss';
import {
  DxDataGrid,
  DxColumn,
  DxGrouping,
  DxGroupPanel,
  DxSearchPanel,
  DxPaging,
  // DxFormat,
  DxPager,
  // DxSummary,
  // DxGroupItem,
  // DxSortByGroupSummaryInfo,
  // DxTotalItem,
  DxFilterRow,
  DxHeaderFilter,
  DxExport,

} from 'devextreme-vue/data-grid';
import { locale, loadMessages } from 'devextreme/localization';
import ruMessages from 'devextreme/localization/messages/ru.json';

const numberWithCommas = (x, text) => {
  const formatted = Math.round(x.value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  return text ? `${text} ${formatted}` : formatted;
};
const formatSecondsAsHHMMSS = (e, text) => {
  let format = 'hh:mm:ss';
  if (e.value > 3600) {
    format = 'hh:mm:ss';
  } else {
    format = 'mm:ss';
  }
  let returnString = '';
  if (e.value > 0) {
    returnString = `${text ? `${text}: ` : ''}${TimeFormat.fromS(Math.round(e.value), format)}`;
  }
  return returnString;
};

export default {
  name: 'ordersTable',
  data() {
    return {
      // tooltipColors: {
      //   Входящий: 'rgba(151, 201, 92, 0.3)',
      //   Исходящий: 'rgba(30, 178, 245, 0.3)',
      //   Недозвон: 'rgba(245, 127, 33, 0.3)',
      //   Пропущенный: 'rgba(245, 86, 74, 0.3)',
      // },
      tooltipColors: {
        Входящий: '#97c95c',
        Исходящий: '#1db2f5',
        Недозвон: '#f57f21',
        Пропущенный: '#f5564a',
      },
      columns: [
        {
          dataField: 'start_day',
          caption: 'День',
          // groupIndex: 0,
          sortOrder: 'desc',
        }, {
          dataField: 'start_time',
          caption: 'Начало звонка',
          // groupIndex: 0
        }, {
          dataField: 'answer_time',
          caption: 'Скорость ответа',
          // groupIndex: 0
        }, {
          dataField: 'call_duration',
          caption: 'Длительность',
          customizeText(e) {
            return formatSecondsAsHHMMSS(e);
          },
          // groupIndex: 0
        }, {
          dataField: 'fail_time',
          caption: 'Длительность дозвона',
          // groupIndex: 0
        }, {
          dataField: 'call_type',
          caption: 'Тип звонка',
          groupIndex: 1,
          cellTemplate: 'cellTemplate',
        }, {
          dataField: 'person',
          caption: 'Сотрудник',
          groupIndex: 2,
        }, {
          dataField: 'client',
          caption: 'Клиент',
          // groupIndex: 0
        }, {
          dataField: 'line_number',
          caption: 'Линия',
          // groupIndex: 0
        }, {
          dataField: 'records',
          caption: 'Записи',
          // groupIndex: 0
        }],
    };
  },
  components: {
    DxColumn,
    DxGroupPanel,
    DxGrouping,
    DxPaging,
    DxSearchPanel,
    DxDataGrid,
    // DxFormat,
    DxPager,
    // DxSummary,
    // DxGroupItem,
    // DxSortByGroupSummaryInfo,
    // DxTotalItem,
    DxFilterRow,
    DxHeaderFilter,
    DxExport,

  },
  created() {
    loadMessages(ruMessages);
    locale('ru');
  },
  props: [
    'dataSource',
  ],
  methods: {
    formatSum(x) { return numberWithCommas(x, 'Сумма:'); },
    formatAvg(x) { return numberWithCommas(x, 'Средн:'); },
    formatCount(x) { return numberWithCommas(x, 'Кол-во:'); },
  },
};
</script>

<style scoped>

</style>
