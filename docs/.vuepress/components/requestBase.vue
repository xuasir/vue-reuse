<template>
  <div>
    <div v-if="loading">loading....</div>
    <div v-else class="block">{{ data }}</div>
  </div>
</template>
<script>
// import { ref } from '@vue/composition-api'
import { service } from '../mock'
import { useRequest } from '@xus/vue-reuse'
export default {
  name: 'request-base',
  setup() {
    const { data, loading } = useRequest(service, {
      defaultParams: ['request result']
    })
    return {
      data,
      loading
    }
  }
}
</script>
