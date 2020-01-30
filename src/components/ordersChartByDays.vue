<!--<template>-->
<!--  <div>-->
<!--    {{calcData()}}-->
<!--    {{ dataSource}}-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--const calcOrdersByHour = (ordersData) => {-->
<!--  const ordersByHours = [];-->
<!--  const returnArray = [];-->
<!--  ordersData.keys();-->
<!--  for (const order of ordersData) {-->
<!--    const hour = moment(order.created_at).format('H');-->
<!--    // console.log(`час: `,hour);-->
<!--    if (!ordersByHours[hour]) ordersByHours[hour] = {};-->
<!--    if (!ordersByHours[hour][order.order_status_title]) {-->
<!--      ordersByHours[hour][order.order_status_title] = 0;-->
<!--    }-->
<!--    ordersByHours[hour][order.order_status_title]++;-->
<!--  }-->
<!--  console.log('ordersByHours', ordersByHours);-->
<!--  for (const i in ordersByHours) {-->
<!--    ordersByHours[i].hour = i * 1;-->
<!--    returnArray.push(ordersByHours[i]);-->
<!--  }-->
<!--  console.log('ordersByHours returnArray', returnArray);-->
<!--  return returnArray;-->
<!--};-->

<!--export default {-->
<!--  name: 'ordersChartByDays',-->
<!--  props: ['dataSource'],-->
<!--  data() {-->
<!--    return {-->
<!--      dataContainer: this.dataSource.length,-->
<!--    };-->
<!--  },-->
<!--  methods: {-->
<!--    calcData() {-->
<!--      return this.dataSource.length;-->
<!--    },-->
<!--  },-->
<!--};-->
<!--</script>-->

<!--<style scoped>-->

<!--</style>-->
