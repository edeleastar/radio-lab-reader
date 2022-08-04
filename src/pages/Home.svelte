<script lang="ts">
  import { getContext } from "svelte";
  import { MessageStore } from "../reader-lib/message-store";
  import * as animateScroll from "svelte-scrollto";
  import {getKeys} from "../environment";

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
      if (obj.msg?.data?.url) {
        message.imageCaption = obj.msg?.data?.caption
        message.imageUrl = obj.msg?.data?.url
      }
      messages.push(message)
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
      {#if message.imageUrl}
        <div class="bg-indigo-300 ...">
          <img class="object-cover h-48 w-96" src="{message.imageUrl}">
        </div>
        {#if message.imageCaption}
          <span> {message?.imageCaption}</span>
        {/if}
      {/if}
    </div>
    <div class="flex-none">
      <span class="text-xs">{getTime(message.time)}</span>
    </div>
  </div>
{/each}
<div id="bottom"></div>




