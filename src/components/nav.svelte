<script lang="ts">
  import { session } from "$app/stores";
</script>

<nav>
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/systems">Systems</a></li>
    {#if $session.loggedIn}
      <li><a href="/account">Account</a></li>
    {/if}
  </ul>
</nav>

<style lang="less">
  nav {
    padding: 0.5em;
  }

  li {
    &::before {
      content: "> ";
    }
  }

  a {
    color: var(--color-text-primary);
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  // Wide (desktop) layout
  @media (min-width: 500px) {
    nav {
      li {
        display: inline-block;

        &::before {
          content: "| ";
        }

        &:first-child::before {
          content: "";
        }
      }
    }
  }
</style>
