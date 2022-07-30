<script lang="ts">
  import { getContext } from "svelte";
  import { MessageStore } from "../reader-lib/message-store";
  import * as animateScroll from "svelte-scrollto";
  import {getKeys} from "../environment";

  console.log(getKeys());
  const defaultOptions = {
    headers: {
      'Authorization' : `Bearer ${getKeys().facebookToken}`    },
  };

  const imageEndpoint = "https://graph.facebook.com/v14.0"
  const messageStore: MessageStore = getContext("store");

  interface MessageType {
    from: string;
    time:string;
    textMessage?: string;
    imageId?:string;
    imageUrl?:string;
    imageCaption?:string;
  };

  let messageList = [];

  async function messageUpdate(msg: any) {
    const messages = [];
    for (const key in msg) {
      const obj = msg[key];
      let message:MessageType = {
        from:obj.msg.from,
        time:obj.msg.timestamp,
      };
      if (obj.msg?.data?.text) {
        message.textMessage = obj.msg?.data?.text
      }
      if (obj.msg?.data?.mime_type === "image/jpeg") {
        message.imageId = obj.msg?.data?.id;
        message.imageCaption = obj.msg?.data?.caption;
        const endpoint = `${imageEndpoint}/${message.imageId}`
        const imgData = await fetch(endpoint, defaultOptions);
        const img = await imgData.json();
        message.imageUrl = img.url;
      }
      messages.push(message)
      // console.log(messages);
    }
    messageList = [...messages];
    animateScroll.scrollTo({ delay: 200, element: "#bottom" });
  }

  messageStore.startMessageService(messageUpdate);

  function getTime(time: string): string {
    let obj = new Date(time * 1000);
    return obj.toLocaleString();
  }
</script>
{#each messageList as message}
  <div class="alert alert-info shadow-lg m-1">
    <div>
      <span class="text-xs">{message.from}:</span>
      {#if message.textMessage}
      <span> {message.textMessage}</span>
      {/if}
      {#if message.imageId}
        <img src="{message.imageUrl}">
        <span> {message.imageCaption}</span>
      {/if}
    </div>
    <div class="flex-none">
      <span class="text-xs">{getTime(message.time)}</span>
    </div>
  </div>
{/each}
<div id="bottom"></div>




