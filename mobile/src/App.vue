<template>
  <div @click="exitfnc">
    EXIT
  </div>
  <div style="border: 1px solid #999;width: 90vw;">{{ info }}</div>
</template>

<script setup lang="js">
import { ref, onMounted } from 'vue'
import { App } from '@capacitor/app';
import { TextZoom } from '@capacitor/text-zoom';
import { WebSocket } from '@wahr/capacitor-websocket-client';
import { StatusBar } from '@capacitor/status-bar';
import ReconnectingWebSocket from 'reconnecting-websocket';

const info = ref('')
const base = import.meta.env.VITE_WS_URL
const store = ref({ ws: null })

onMounted(() => {
  let flag = import.meta.env.VITE_MODE
  if (flag == 'prod') {
    TextZoom.set({ value: 1 })
    StatusBar.hide()
  }
  ws_init()
})

const ws_init = async function ws_init() {
  let flag = import.meta.env.VITE_MODE
  if (flag == 'dev') {
    if (store.ws) {
      store.ws.close()
    }
    store.ws = new ReconnectingWebSocket(base + '/ws/test');
    store.ws.addEventListener('message', (e) => {
      info.value += 'on_message'
    })
    store.ws.addEventListener('error', (e) => {
      info.value += 'on_error'
    })
  } else {
    if (store.ws) {
      store.ws.close()
    }
    store.ws = WebSocket
    store.ws.connect({ url: base + '/ws/test' });
    store.ws.onMessage({}, (e) => {
      let data = JSON.parse(e.data)
      info.value += 'on_message'
    })
    store.ws.onOpen({}, (e) => {
      // window.notice.success(JSON.stringify(e))
      info.value += 'on_open'
    })
    store.ws.onClose({}, (e) => {
      info.value += 'on_close'
      // window.notice.success(JSON.stringify(e))
    })
    store.ws.onError({}, (e) => {
      info.value += 'on_error'
    })
  }
}
function exitfnc() {
  App.exitApp();
}

</script>
<style lang="less">
* {
  padding: 0;
  margin: 0;
}

div {
  padding: 20px;
}

#app {
  width: 100vw;
  height: 100vh;
  // flex-direction: column;
  overflow: hidden;
  color: #333;
}
</style>
