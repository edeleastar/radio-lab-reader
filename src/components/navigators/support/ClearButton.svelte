<script lang="ts">
  import { MessageStore } from "../../../reader-lib/message-store";
  import { getContext } from "svelte";

  const messageStore: MessageStore = getContext("store");

  function clearMessages() {
    messageStore.clearAllMessages();
  }
</script>

<button class="btn btn-accent" on:click|once={clearMessages}>Clear</button>
