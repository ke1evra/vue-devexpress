<template>
  <div>
    <DxDataGrid
      v-if="dataSource"
      :show-borders="true"
      :allow-column-reordering="true"
      :data-source="dataSource"
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

export default {
  name: 'ordersTable',
  components: {
    DxColumn,
    DxGroupPanel,
    DxGrouping,
    DxPaging,
    DxSearchPanel,
    DxDataGrid,
    DxFormat,
  },
  created() {
    loadMessages(ruMessages);
    locale('ru');
  },
  props: [
    'dataSource',
  ],
};
</script>

<style scoped>

</style>
