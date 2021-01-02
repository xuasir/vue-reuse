<template>
  <div class="wrap">
    <div class="left">
      <div
        :class="{ drop: true, hover: isHovering }"
        @dragover="dropProps.onDragOver"
        @dragenter="dropProps.onDragEnter"
        @dragleave="dropProps.onDragLeave"
        @drop="dropProps.onDrop"
        @paste="dropProps.onPaste"
      >
        ---- {{ isHovering ? 'hovering' : 'Drop to here ' }} ----
      </div>
      <span
        class="drag-item"
        v-for="item in [1, 2, 3, 4, 5]"
        :key="dragProps.key(item)"
        :draggable="dragProps.draggable"
        @dragstart="(e) => dragProps.onDragStart(item)(e)"
        >item {{ item }}</span
      >
    </div>
    <div class="right">{{ msg }}</div>
  </div>
</template>
<script>
import { ref } from '@vue/composition-api'
import { useDrag, useDrop } from '@xus/vue-reuse'
export default {
  name: 'use-drop',
  setup() {
    const msg = ref('')
    const dragProps = useDrag()()
    const [dropProps, isHovering] = useDrop({
      onDom(content) {
        msg.value = `custom: item ${content} dropped`
      },
      onText(text) {
        msg.value = `text: ${text} dropped`
      },
      onFiles(files) {
        let str = ''
        files.forEach((file, index) => {
          str += `file${index + 1}: ${JSON.stringify(file)}` + '\n'
        })
        msg.value = str
      },
      onUri(uri) {
        msg.value = uri
        window.open(uri)
      }
    })
    return {
      dragProps,
      dropProps,
      isHovering,
      msg
    }
  }
}
</script>
<style scoped>
.right {
  color: #3eaf7c;
  font-weight: 500;
}
.drop {
  margin: 20px 5px;
  width: 390px;
  padding: 20px 0;
  border: 1px solid #3eaf7c;
  border-radius: 4px;
  text-align: center;
}
.hover {
  border: 1px dashed #3eaf7c;
  color: gray;
}
.drag-item {
  display: inline-block;
  box-sizing: border-box;
  width: 70px;
  padding: 10px;
  margin: 5px;
  border-radius: 4px;
  border: 1px solid #3eaf7c;
  text-align: center;
}
</style>
