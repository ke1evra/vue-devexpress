<template>
    <div>
        <DxDataGrid
            v-if="dataSource"
            :show-borders="true"
            :allow-column-reordering="true"
            :data-source="dataSource"
            :hover-state-enabled="true"
            @selection-changed="selectionChanged"
        >
            <DxSelection mode="single"/>
            <DxColumnChooser
                :enabled="true"
            />
            <DxExport
                :enabled="true"
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
            <DxColumn
                data-field="id"
                caption="id"
            />
            <DxColumn
                data-field="shop_sky"
                caption="shop_sky"
            />
            <DxColumn
                data-field="supplier_sky"
                caption="supplier_sky"
            />
            <DxColumn
                data-field="manufacture_sky"
                caption="manufacture_sky"
            />
            <DxColumn
                data-field="shop"
                caption="shop"
            />
            <DxColumn
                data-field="brand"
                caption="brand"
            />
            <DxColumn
                data-field="age_group"
                caption="age_group"
            />
            <DxColumn
                data-field="gender"
                caption="gender"
            />
            <DxColumn
                data-field="item_kind"
                caption="item_kind"
            />
            <DxColumn
                data-field="title"
                caption="title"
            />
            <DxColumn
                data-field="tags"
                caption="tags"
            />
            <DxColumn
                data-field="currient_quantity"
                caption="currient_quantity"
            />
            <DxColumn
                data-field="free_quantity"
                caption="free_quantity"
            />
            <DxColumn
                data-field="slug"
                caption="slug"
            />
            <DxColumn
                data-field="created_at"
                caption="created_at"
            />
            <DxColumn
                data-field="ordered_at"
                caption="ordered_at"
            />
            <DxColumn
                data-field="last_supply_at"
                caption="last_supply_at"
            />
            <DxColumn
                data-field="invoice"
                caption="invoice"
            />
            <DxColumn
                data-field="sebestoimost"
                caption="sebestoimost"
            />
            <DxColumn
                data-field="opt_price"
                caption="opt_price"
            />
            <DxColumn
                data-field="old_price"
                caption="old_price"
            />
            <DxColumn
                data-field="max_price"
                caption="max_price"
            />
            <DxColumn
                data-field="wholesale_price"
                caption="wholesale_price"
            />
            <DxColumn
                data-field="prime_cost_currency"
                caption="prime_cost_currency"
            />
            <DxColumn
                data-field="avg_discount"
                caption="avg_discount"
            />
            <DxColumn
                data-field="sum_discount"
                caption="sum_discount"
            />
            <DxColumn
                data-field="sum_price"
                caption="sum_price"
            />
            <DxColumn
                data-field="cnt_sold"
                caption="cnt_sold"
            />
        </DxDataGrid>
    </div>
</template>

<script>
import {
    DxDataGrid,
    DxColumn,
    DxColumnChooser,
    DxSearchPanel,
    DxFilterRow,
    DxHeaderFilter,
    DxExport,
    DxSelection,

} from 'devextreme-vue/data-grid';
import { locale, loadMessages } from 'devextreme/localization';
import ruMessages from 'devextreme/localization/messages/ru.json';
import { formatSecondsAsHHMMSS } from '../methods/chartHelpers';

const numberWithCommas = (x, text) => {
    const formatted = Math.round(x.value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    return text ? `${text} ${formatted}` : formatted;
};

export default {
    name: 'buyersTable',
    components: {
        DxColumn,
        DxColumnChooser,
        DxSearchPanel,
        DxDataGrid,
        DxFilterRow,
        DxHeaderFilter,
        DxExport,
        DxSelection,
    },
    data() {
        return {
            orderColors: {
                Отказ: '#f5564a',
                'Взят на сборку': '#73C3D9',
                'Не обработан': '#bbb',
                'Передан на склад': '#6491e8',
                Забронирован: '#6491e8',
                'Заказ отгружен': '#97c95c',
                'Заказ собран и готов к выдаче': '#73C3D9',
                Продажа: '#fbce25',
            },
        };
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
        formatSecondsAsHHMMSS,
        defineProceedTimeColors(val) {
            if (val < 1800) { // полчаса
                return 'success';
            } if (val < 7200) {
                return 'warning';
            }
            return 'danger';
        },
        selectionChanged(e) {
            e.component.collapseAll(-1);
            e.component.expandRow(e.currentSelectedRowKeys[0]);
        },
    },
};
</script>

<style scoped>
</style>
