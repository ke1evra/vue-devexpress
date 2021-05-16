<template>
    <div class="row"
         v-if="orderNumber">
        <div class="col">
            <h4>Инфа по заказу № {{ orderNumber }}</h4>
            <p v-html="basic_info">
            </p>
            <h4>Клиент</h4>
            <p v-html="client_info">
            </p>
            <h4>Состав</h4>
            <p v-html="items">
            </p>
            <h4>Стоимость</h4>
            <p v-html="cost">
            </p>
            <h4>Доставка</h4>
            <p v-html="delivery">
            </p>
            <h4>Действия</h4>
            <p v-html="actions">
            </p>
            <h4>Звонки</h4>
            <p v-html="calls_info">
            </p>
        </div>
    </div>
</template>

<script>
import moment from 'moment';

const orderStatusIcons = require('../constants/OrderStatusIcons');
const itemStatusIcons = require('../constants/ItemStatusIcons');
const callTypeIcons = require('../constants/CallTypeIcons');

export default {
    name: 'ordersInfoRenderer',
    props: ['orderData', 'orderNumber'],
    methods: {
        render(orderData) {
            const data = orderData.orderInfo;
            const messageData = {};
            messageData.actions = [];
            messageData.items = [];
            data.forEach((item) => {
                if (!messageData.actions.includes(item.actions)) {
                    messageData.actions.push(item.actions);
                }
                if (!messageData.items.includes(item.items)) {
                    messageData.items.push(item.items);
                }
            });
            if (data[0].status || data[0].manager || data[0].date_of_registration) {
                // eslint-disable-next-line max-len
                let text = `Cтатус: ${orderStatusIcons[data[0].status]} ${data[0].status} ${data[0].otkaz_cause ? ` (${data[0].otkaz_cause})` : ''}<br>`;
                // eslint-disable-next-line max-len
                text += `Поступил: ${moment(data[0].date_of_registration).format('YYYY-MM-DD HH:mm:ss')}, обработан через ${data[0].processing_time}<br>`;
                text += `Менеджер: ${data[0].manager}<br>`;
                this.basic_info = text;
            }


            if (data[0].client_name || data[0].phone_key || data[0].email) {
                let text = '';
                text += `${data[0].client_name ? `${data[0].client_name}<br>` : ''}`;
                // eslint-disable-next-line max-len
                text += `${data[0].phone_key ? `${data[0].phone_key}${data[0].client_dop_phone ? ` (${data[0].client_dop_phone})<br>` : '<br>'}` : ''}`;
                text += `${data[0].email ? `${data[0].email}<br>` : ''}`;
                this.client_info = text;
            }

            if (messageData.items.length) {
                let message = '';
                // eslint-disable-next-line no-restricted-syntax
                for (let item of messageData.items) {
                    item = item.split('|');
                    // eslint-disable-next-line radix,max-len
                    message += `${parseInt(item[1])} ₽ (${parseInt(item[4])}) — ${item[0]} ${item[3]} (${item[5]}) ${itemStatusIcons[item[2]]} ${item[2]}<br>`;
                }
                this.items = message;
            }

            if (data[0].order_sum || data[0].delivery_price || data[0].dop_trata) {
                let text = '';
                text += `${data[0].dop_trata ? `${data[0].dop_trata} ₽ — Дополнительная трата<br>` : ''}`;
                text += `${data[0].order_sum ? `${data[0].order_sum} ₽ — Стоимость заказа<br>` : ''}`;
                text += `${data[0].delivery_price ? `${data[0].delivery_price} ₽ — Доставка<br>` : ''}`;
                // eslint-disable-next-line max-len
                text += `${data[0].delivery_price && data[0].order_sum ? `${+data[0].delivery_price + data[0].order_sum} ₽ — Стоимость заказа с доставкой<br>` : ''}`;
                this.cost = text;
            }

            if (data[0].address || data[0].courier_del_id || data[0].courier || data[0].location_name) {
                let text = '';
                if (data[0].location_name && data[0].address) {
                    if (data[0].address.includes(data[0].location_name)) {
                        text += `${data[0].address}<br>`;
                    } else {
                        text += `${data[0].location_name}, ${data[0].address}<br>`;
                    }
                } else {
                    text += `${data[0].address ? `${data[0].address}<br>` : ''}`;
                    text += `${data[0].location_name ? `${data[0].location_name}<br>` : ''}`;
                }
                // eslint-disable-next-line max-len
                text += `${data[0].courier_del_id ? `${data[0].courier_del_id}` : ''}${data[0].courier && data[0].courier_del_id ? ', ' : ''}${data[0].courier ? `${data[0].courier}` : ''}`;
                this.delivery = text;
            }
            if (messageData.actions.length) {
                let text = [];
                // eslint-disable-next-line no-restricted-syntax
                for (let action of messageData.actions) {
                    action = action.split('|');
                    text.push(`${action[1]} — ${action[0] !== 'null' ? action[0] : 'Система'}<br>${action[2]}`);
                }
                text = text.join('<br><br>');
                this.actions = text;
            }
            if (orderData.calls.length) {
                const text = [];
                // eslint-disable-next-line array-callback-return
                orderData.calls.map((item, index) => {
                    let res = '';
                    // eslint-disable-next-line max-len
                    res += `${index + 1}. ${item.start_day} ${item.start_time} ${callTypeIcons[item.call_type]} ${item.call_type}${(item.call_type === 'Входящий') || (item.call_type === 'Пропущенный') ? ` (${item.line_number})` : ''}<br>`;
                    res += `👤 ${item.person}<br>`;
                    res += (() => {
                        let result;
                        if (item.call_type === 'Входящий' || item.call_type === 'Исходящий') {
                            // eslint-disable-next-line max-len
                            result = `➡️${item.start_time} — 🕑${new Date(item.answer_time * 1000).toISOString().substr(11, 8)} → 🗣${moment.unix(item.answer).format('HH:mm:ss')} — 🕑${new Date(item.call_duration * 1000).toISOString().substr(11, 8)} → 🏁${moment.unix(item.finish).format('HH:mm:ss')}`;
                        } else if (item.call_type === 'Пропущенный' || item.call_type === 'Недозвон') {
                            // eslint-disable-next-line max-len
                            result = `➡️${moment.unix(item.start).format('HH:mm:ss')} — 🕑${new Date(moment.unix(item.finish).diff(moment.unix(item.start), 'seconds') * 1000).toISOString().substr(11, 8)} → 🏁${moment.unix(item.finish).format('HH:mm:ss')}`;
                        }
                        return result;
                    })();
                    text.push(res);
                });
                this.calls_info = text.join('<br><br>');
            }
        },
    },
    watch: {
        orderData(orderData) {
            this.render(orderData);
        },
    },
};
</script>

<style scoped>

</style>
