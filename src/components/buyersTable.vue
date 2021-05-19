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
                data-field="shop_sky"
                caption="Артикул магазина"
            />
            <DxColumn
                data-field="supplier_sky"
                caption="Артикул поставщика"
            />
            <DxColumn
                data-field="manufacture_sky"
                caption="Артикул производителя"
            />
            <DxColumn
                data-field="shop"
                caption="Магазин"
            />
            <DxColumn
                data-field="brand"
                caption="Бренд"
            />
            <DxColumn
                data-field="age_group"
                caption="Возрастная группа"
            />
            <DxColumn
                data-field="gender"
                caption="Для кого"
            />
            <DxColumn
                data-field="item_kind"
                caption="Категория товара"
            />
            <DxColumn
                data-field="title"
                caption="Название товара"
            />
            <DxColumn
                data-field="tags"
                caption="Теги"
            />
            <DxColumn
                data-field="currient_quantity"
                caption="Текущий остаток"
            />
            <DxColumn
                data-field="free_quantity"
                caption="Свободный остаток"
            />
            <DxColumn
                data-field="slug"
                caption="Для построения ссылки"
            />
            <DxColumn
                data-field="created_at"
                caption="Дата добавления на сайт"
            />
            <DxColumn
                data-field="ordered_at"
                caption="Дата заказа"
            />
            <DxColumn
                data-field="last_supply_at"
                caption="Дата последнего поступления"
            />
            <DxColumn
                data-field="invoice"
                caption="Инвойс"
            />
            <DxColumn
                data-field="sebestoimost"
                caption="Себестоимость"
            />
            <DxColumn
                data-field="opt_price"
                caption="Оптовая цена"
            />
            <DxColumn
                data-field="old_price"
                caption="Розничная цена (старая цена)"
            />
            <DxColumn
                data-field="max_price"
                caption="Максимальная цена"
            />
            <DxColumn
                data-field="wholesale_price"
                caption="wholesale_price"
            />
            <DxColumn
                data-field="prime_cost_currency"
                caption="Себестоимость в валюте"
            />
            <DxColumn v-for="(value, name) in dateCols" :key="value"
                      v-bind:value="value"
                      v-bind:name="name"
                      :visible="false"
            >
                <DxColumn
                    :data-field="name"
                    :caption="value"
                />
            </DxColumn>

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
        'dataSource', 'dateCols', 'dates',
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
