<template>
  <div>
    <div class="master-detail-caption">История звонков по номеру {{ client }}</div>
    <DxDataGrid
      :data-source="dataSource"
      :show-borders="true"
      :column-auto-width="true"
    >
      <DxColumn
        v-bind:key="col"
        v-for="col in columns"
        :data-field="col.dataField"
        :caption="col.caption"
      />
    </DxDataGrid>
  </div>
</template>
<script>

import { DxDataGrid, DxColumn } from 'devextreme-vue/data-grid';


export default {
  name: 'DetailTemplate',
  components: { DxDataGrid, DxColumn },
  props: [
    'client',
  ],
  data() {
    return {
      dataSource: `http://185.176.25.157:3000/calls/client?number=${this.client}`,
      columns: [{
        dataField: 'start_day',
        caption: 'День',
      }, {
        dataField: 'start_time',
        caption: 'Время',
      }, {
        dataField: 'call_type',
        caption: 'Тип звонка',
      }, {
        dataField: 'person',
        caption: 'Менеджер',
      }, {
        dataField: 'answer_time',
        caption: 'Скорость ответа',
      }, {
        dataField: 'call_duration',
        caption: 'Продолжительность звонка',
      }, {
        dataField: 'line_number',
        caption: 'Входящая линия',
      }],
    };
  },

};
</script>
<style>
  .master-detail-caption {
    padding: 0 0 5px 10px;
    font-size: 14px;
    font-weight: bold;
  }</style>
