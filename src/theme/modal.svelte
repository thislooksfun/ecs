<script lang="ts">
  let isOpen = false;

  const open = () => (isOpen = true);
  const close = () => (isOpen = false);

  function keypress(e: KeyboardEvent) {
    if (isOpen && e.key === "Escape") {
      e.stopPropagation();
      close();
    }
  }
</script>

<svelte:window on:keypress={keypress} />

<slot name="trigger" {open}>
  <!-- fallback trigger to open the modal -->
  <button on:click={open}>Open</button>
</slot>

{#if isOpen}
  <div class="modal">
    <div class="backdrop" on:click={close} />

    <div class="content-wrapper">
      <div class="content">
        <slot name="content" {close} />
      </div>
    </div>
  </div>
{/if}

<style>
  .modal {
    z-index: 9999;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;

    display: flex;
    justify-content: center;
    align-items: flex-start;
    opacity: 1;
  }

  .backdrop {
    z-index: -1;
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: var(--color-modal-overlay);
  }

  .content-wrapper {
    max-width: 70vw;
    margin-top: 10vh;
    border-radius: 0.3em;
    background-color: var(--color-bg-primary);
    overflow: hidden;
    text-align: center;
  }

  @media (max-width: 767px) {
    .content-wrapper {
      max-width: 100vw;
    }
  }

  .content {
    max-height: calc(100vh - 4em);
    overflow: auto;
    padding: 1.5em;
  }

  @media (max-height: 400px) {
    .modal {
      align-items: center;
    }

    .content-wrapper {
      max-width: 100vw;
      margin-top: 0;
    }

    .content {
      max-height: 100vh;
    }
  }
</style>
