<!--
针对 /sellerPage而显示出来，配置一条路由规则，真正展示的内容是在components中seller.vue
-->
<template>
<div class="com-page">
  <Seller></Seller>
</div>
</template>

<script>
import Seller from "@/components/Seller";
export default {
  name: "SellerPage",
  components: {Seller},
}
</script>

<style scoped>

</style>