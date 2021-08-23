<script lang="ts">
  type Type = "default" | "primary" | "success" | "warning" | "danger";
  type Size = "sm" | "lg" | "x-lg";
  type Fill = true | "w" | "h";

  export let type: Type = "default";
  export let text: string | undefined = undefined;

  export let block = false;
  export let fill: Fill | undefined = undefined;
  export let outline = false;
  export let size: Size | undefined = undefined;
  export let fontSize: string | undefined = undefined;
  export let padding: string | undefined = undefined;
  export let allCap = true;

  function computeClasses(): string {
    let classes = [];

    if (fill) {
      if (fill === "w") {
        classes.push("fillw");
      } else if (fill === "h") {
        classes.push("fillh");
      } else {
        classes.push("fill");
      }
    }
    if (outline) classes.push("outlined");
    if (type) classes.push(type);
    if (block) classes.push("block");
    if (size) classes.push(size);
    if (allCap) classes.push("upper");

    return classes.join(" ");
  }

  $: classes = computeClasses();
  $: buttonStyles = padding ? `padding: ${padding}` : "";
  $: textStyles = fontSize ? `font-size: ${fontSize}` : "";
</script>

<button class="btn {classes}" style={buttonStyles} on:click>
  <span class="text" style={textStyles}>
    <slot>{text}</slot>
  </span>
</button>

<style lang="less">
  // General
  .btn {
    position: relative;
    transition: all 0.2s ease-in-out;
    will-change: transform;
    letter-spacing: 0.025em;
    font-size: 0.875em;

    background-color: var(--color-bg-accent);
    color: var(--color-text-primary);
    border: 0;
    margin: 0;
    padding: 0.25em 0.75em;
    border-radius: 0.25em;
    cursor: pointer;

    &:hover {
      box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1),
        0 3px 6px rgba(0, 0, 0, 0.08);
      transform: translateY(-1px);
    }

    &:not(:last-child) {
      margin-right: 0.5rem;
    }
  }

  .upper {
    text-transform: uppercase;
  }

  // Positioning
  .block {
    display: block;
  }
  .fillw {
    width: 100%;
  }
  .fillh {
    height: 100%;
  }
  .fill {
    .fillw();
    .fillh();
  }

  // Sizes
  .sm {
    font-size: 0.75em;
  }
  .lg {
    font-size: 1em;
  }
  .x-lg {
    font-size: 1.5em;
  }

  // Solid colors
  :not(.outlined) {
    &.default {
      color: var(--color-text-primary);
    }
    &.primary {
      background-color: var(--color-primary);
      color: var(--grey-l2);
    }
    &.success {
      background-color: var(--color-success);
      color: var(--grey-l2);
    }
    &.warning {
      background-color: var(--color-warning);
      color: var(--grey-l2);
    }
    &.danger {
      background-color: var(--color-danger);
      color: var(--grey-l2);
    }
  }

  // Outlined colors
  .outlined {
    border: 1px solid;
    background-color: #0000;

    &.default {
      color: var(--color-text-primary);
    }
    &.primary {
      border-color: var(--color-primary);
      color: var(--color-primary);
    }
    &.success {
      border-color: var(--color-success);
      color: var(--color-success);
    }
    &.warning {
      border-color: var(--color-warning);
      color: var(--color-warning);
    }
    &.danger {
      border-color: var(--color-danger);
      color: var(--color-danger);
    }
  }
</style>
