<template>
  <div>
    <DxDataGrid
      v-if="dataSource"
      :show-borders="true"
      :allow-column-reordering="true"
      :data-source="dataSource"
      :hover-state-enabled="true"
    >
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
      <template #cellTemplate="{ data }">
        <a target="_blank"
           :href="'https://ec-crm.ru/orders/filter_template?orders_numbers='+data.value"
           :title="'Перейти к заказу №'+ data.value"
        >
          {{data.value}}
        </a>
      </template>
      <DxColumn
        data-field="order_number"
        caption="Номер заказа"
        cell-template="cellTemplate"
      />
      <DxColumn
        name="month"
        data-field="month"
        caption="Месяц"
      />
      <DxColumn
        data-field="created_day"
        caption="День"
        sort-order="desc"
      />
      <DxColumn
        data-field="created_time"
        caption="День"
        sort-order="desc"
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
        data-field="otkaz_title"
        caption="Причина отказа"
      />
      <DxColumn
        data-field="email"
        caption="Емейл"
      />
      <DxColumn
        data-field="phone_key"
        caption="Телефон"
      />
      <DxColumn
        data-field="courier"
        caption="Курьер"
      />
      <DxColumn
        data-field="samovivoz"
        caption="Самовывоз"
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
      <DxGrouping
        expand-mode="rowClick"
        :auto-expand-all="false"
      />
      <DxPaging :page-size="10"/>
      <DxPager
        :show-page-size-selector="true"
        :allowed-page-sizes="[10, 25, 50, 100]"
      ></DxPager>
      <DxSummary>
        <DxGroupItem
          column="order_number"
          summary-type="count"
          show-in-column="month"
          :customize-text="formatCount"
          :show-in-group-footer="false"
          :align-by-column="true"
        />
        <DxGroupItem
          column="order_sum"
          summary-type="sum"
          :show-in-group-footer="false"
          :align-by-column="true"
          :customize-text="formatSum"
        />
        <DxGroupItem
          column="order_sum"
          summary-type="avg"
          :show-in-group-footer="false"
          :align-by-column="true"
          :customize-text="formatAvg"
        />
        <DxTotalItem
          column="order_number"
          summary-type="count"
        />
        <DxTotalItem
          column="order_sum"
          summary-type="sum"
          :customize-text="formatSum"
        />
      </DxSummary>
      <DxSortByGroupSummaryInfo summary-item=""/>
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
  DxPager,
  DxSummary,
  DxGroupItem,
  DxSortByGroupSummaryInfo,
  DxTotalItem,
  DxFilterRow,
  DxHeaderFilter,

} from 'devextreme-vue/data-grid';
import { locale, loadMessages } from 'devextreme/localization';
import ruMessages from 'devextreme/localization/messages/ru.json';

const numberWithCommas = (x, text) => {
  const formatted = Math.round(x.value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  return text ? `${text} ${formatted}` : formatted;
};

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
    DxPager,
    DxSummary,
    DxGroupItem,
    DxSortByGroupSummaryInfo,
    DxTotalItem,
    DxFilterRow,
    DxHeaderFilter,

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
