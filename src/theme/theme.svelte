<style lang="less" global>
  // TODO: Fine-tune the themes

  // Color palette
  :root {
    // Primary
    --color-primary: #13b6db;

    // Secondary
    --color-success: #2dce89;
    --color-warning: #fb6340;
    --color-danger: #f5365c;

    // Neutral

    --color-grey-d4: #101010;
    --color-grey-d3: #2d2d2d;
    --color-grey-d2: #4b4b4b;
    --color-grey-d1: #696969;
    --color-grey: #878787;
    --color-grey-l1: #a5a5a5;
    --color-grey-l2: #c3c3c3;
    --color-grey-l3: #e1e1e1;
    --color-grey-l4: #ffffff;

    // Accent (TODO)
    // --color-accent-1:
  }

  // Default light theme
  :root {
    // Text
    --color-text-primary: var(--color-grey-d4);
    --color-text-secondary: var(--color-grey-d3);
    // Background
    --color-bg-primary: var(--color-grey-l4);
    --color-bg-secondary: var(--color-grey-l3);

    --color-modal-overlay: rgba(0, 0, 0, 0.4);
  }

  // Dark theme
  @media (prefers-color-scheme: dark) {
    :root {
      // Text
      --color-text-primary: var(--color-grey-l4);
      --color-text-secondary: var(--color-grey-l3);
      // Background
      --color-bg-primary: var(--color-grey-d4);
      --color-bg-secondary: var(--color-grey-d3);
    }
  }

  // Apply the theme by default
  body {
    color: var(--color-text-primary);
    background-color: var(--color-bg-primary);
  }
</style>
