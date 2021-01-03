<template>
  <div>
    <p>Effects：{{ state }}</p>
    <p>
      <button type="button" @click="changeState">
        Toggle
      </button>
      <button type="button" @click="setFalse">
        Set false
      </button>
      <button type="button" @click="setTrue">
        Set true
      </button>
      <button type="button" @click="changeOptions(0)">
        Options(第一次为true，第二次为false)
      </button>
    </p>
  </div>
</template>
<script>
import { useBoolean } from '@xus/vue-reuse'
import { reactive } from '@vue/composition-api';
export default {
  name: 'use-boolean',
  setup() {
    let options = reactive({
      0: true
    });
    
    const [state, { changeState, setTrue, setFalse }] = useBoolean(true, options)

    function changeOptions(val) {
      changeState(val);
      options[0] = false;
    }

    return {
      state,
      changeState,
      setTrue,
      setFalse,
      changeOptions
    }
  }
}
</script>
