<script lang="ts">
  import "./tailwind.css";
  import MainNavigator from "./components/navigators/MainNavigator.svelte";
  import {setContext} from "svelte";
  import Router from "svelte-spa-router";
  import {MessageStore} from "./reader-lib/message-store";
  import Home from "./pages/Home.svelte";

  setContext("store", new MessageStore());

  let routes = {
    "/": Home,
  };
</script>

<div class="tutors-container">
  <MainNavigator/>
  <Router {routes}/>
</div>
