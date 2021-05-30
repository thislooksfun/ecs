<script lang="ts">
  import AuthModal from "$components/auth/authModal.svelte";
  import { post, session, updateSession } from "$lib/clientUtil";

  async function logout() {
    await post("/api/v1/auth/signout", {});
    updateSession(s => (s.loggedIn = false));
  }
</script>

<svelte:head>
  <title>ecs</title>
</svelte:head>

<h1>Welcome to SvelteKit</h1>
<p>
  Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation
</p>

{#if $session.loggedIn}
  <button on:click={logout}>Log Out</button>
{:else}
  <AuthModal />
{/if}
