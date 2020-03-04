<template>
    <div>
        <DxDataGrid
            v-if="dataSource"
            :show-borders="true"
            :data-source="dataSource"
            :hover-state-enabled="true"
        >
            <DxExport
                :enabled="true"
                :allow-export-selected-data="true"
            />
            <DxPaging :page-size="10"/>
            <DxPager
                :show-page-size-selector="true"
                :allowed-page-sizes="[10, 25, 50, 100]"
            ></DxPager>
        </DxDataGrid>
    </div>
</template>

<script>

import {
    DxDataGrid,
    DxPaging,
    DxPager,
    DxExport,

} from 'devextreme-vue/data-grid';
import { locale, loadMessages } from 'devextreme/localization';
import ruMessages from 'devextreme/localization/messages/ru.json';

export default {
    name: 'SimpleDataGrid',
    data() {
        return {
            data: null,
        };
    },
    components: {
        DxPaging,
        DxDataGrid,
        DxPager,
        DxExport,

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
