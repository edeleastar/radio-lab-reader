<script lang="ts">
  import {getContext} from "svelte";
  import {MessageStore} from "../reader-lib/message-store";
  import * as animateScroll from "svelte-scrollto";
  const messageStore: MessageStore = getContext("store");

  interface MessageType {
    text: string;
    from: string;
    time:string;
  };

  let messageList:MessageType[] = [];

  function messageUpdate(msg:any) {
    const messages:MessageType[] = [];
    for (const key in msg) {
      const obj = msg[key];
      const message = `From: ${obj.msg.from}: Message: ${obj.msg.data.text}`;
      messages.push({
        text:obj.msg.data.text,
        from:obj.msg.from,
        time:obj.msg.timestamp
      })
     // messages.push(message);
      console.log(messages);
    }
    messageList = [...messages]
    animateScroll.scrollTo({delay: 200, element: "#bottom"});
  }

  messageStore.startMessageService(messageUpdate);

  function getTime(time:string):string {
    let obj = new Date(time * 1000);

    var hh = obj.getHours();
    var mm = obj.getMinutes();
    var ss = obj.getSeconds()
    return `${hh}:${mm}:${ss}`
  }
</script>
{#each messageList as message}
  <div class="alert alert-info shadow-lg m-1">
    <div>
      <span class="text-xs">{message.from}:</span>
      <span> {message.text}</span>
    </div>
    <div class="flex-none">
      <span class="text-xs">{getTime(message.time)}</span>
    </div>
  </div>

{/each}
<div id="bottom"></div>




