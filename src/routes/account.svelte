<script lang="ts" context="module">
  import type { Load } from "@sveltejs/kit";
  import { get } from "$lib/util";

  export const load: Load = async ({ fetch }) => {
    const me = await get(fetch, "/api/v1/me");
    return { props: { me } };
  };
</script>

<script lang="ts">
  interface Account {
    email: string;
  }

  export let me: Account;
</script>

<h1>Your Account</h1>

<!-- TODO: allow changing email -->
<span>email: {me.email}</span>
