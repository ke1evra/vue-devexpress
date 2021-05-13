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
                caption="Наш артикул"
            />
            <DxColumn
                data-field="shop_sky"
                caption="Артикул поставщика"
            />
            <DxColumn
                data-field="order_number"
                caption="Возрастная группа"
            />
            <DxColumn
                data-field="gender"
                caption="Для кого"
            />
            <DxColumn
                data-field="order_number"
                caption="Тип товара"
            />
            <DxColumn
                data-field="order_number"
                caption="Категория"
            />
            <DxColumn
                data-field="order_number"
                caption="Теги"
            />
            <DxColumn
                data-field="order_number"
                caption="Название товара"
            />
            <DxColumn
                data-field="order_number"
                caption="Остаток"
            />
            <DxColumn
                data-field="order_number"
                caption="Свободный остаток"
            />
            <DxColumn
                data-field="order_number"
                caption="Итого, шт."
            />
            <DxColumn
                data-field="order_number"
                caption="Итого, руб."
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
