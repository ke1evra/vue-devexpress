<template>
  <div>
    <DxDataGrid
      :show-borders="true"
      :allow-column-reordering="true"
      data-source="http://194.58.98.118:3000/orders?date_from=2020-01-03 00:00:00&date_to=2020-01-03 23:59:59"
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
        format="currency"
        currency="RUB"
      />
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
} from 'devextreme-vue/data-grid';


import 'devextreme/localization/globalize/currency';


export default {
  components: {
    DxColumn,
    DxGroupPanel,
    DxGrouping,
    DxPaging,
    DxSearchPanel,
    DxDataGrid,
  },
  data() {
    return {
      autoExpandAll: true,
    };
  },
};
</script>
