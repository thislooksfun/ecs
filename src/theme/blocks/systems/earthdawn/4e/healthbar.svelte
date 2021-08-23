<script lang="ts">
  export let unconsciousness: number;
  export let death: number;
  export let damage: number;
  export let disabled = false;

  $: hitpointsUntilDead = death - damage;
  $: hitpointsUntilUnconscious = unconsciousness - damage;

  $: valid =
    !disabled && death > unconsciousness && unconsciousness > 0 && damage >= 0;
  $: alive = hitpointsUntilDead > 0;
  $: conscious = hitpointsUntilUnconscious > 0;

  $: deathDiff = death - unconsciousness;
  $: untilDeadWidth = (Math.min(hitpointsUntilDead, deathDiff) / death) * 100;
  $: maxUntilDeadWidth = (deathDiff / death) * 100;
  // Divide by death, not unconsciousness, to scale this along the whole width
  $: untilUnconsciousWidth = (hitpointsUntilUnconscious / death) * 100;
  $: maxUntilUnconsciousWidth = (unconsciousness / death) * 100;

  $: unconsciousThird = unconsciousness / 3;
  $: computedClassesUntilUnconscious =
    damage < unconsciousThird
      ? "health-ok" // green
      : damage < 2 * unconsciousThird
      ? "health-hurt" // yellow
      : "health-critical"; //red
</script>

<div class="health-wrapper">
  <div class="health" title="{damage} damage taken">
    <!-- TODO: Add aria? -->

    <div class="text-underlay gapless">
      {#if alive}
        <div class="health-bar" style="width: {maxUntilDeadWidth}%">
          {#if !conscious}
            <span class="hp-info"
              >Unconscious, {hitpointsUntilDead} hp until dead</span
            >
          {/if}
        </div>

        {#if conscious}
          <div
            class="health-bar until-unconscious"
            style="width: {maxUntilUnconsciousWidth}%"
          >
            <span class="hp-info"
              >{hitpointsUntilUnconscious} hp until unconscious</span
            >
          </div>
        {/if}
      {/if}
    </div>

    <div class="bars gapless">
      {#if !valid}
        <div
          class="health-bar invalid health-invalid striped"
          style="width: 100%"
        />
      {:else if alive}
        <div
          class="health-bar until-dead health-critical striped"
          class:animated={!conscious}
          style="width: {untilDeadWidth}%"
        >
          {#if !conscious}
            <span class="hp-info"
              >Unconscious, {hitpointsUntilDead} hp until dead</span
            >
          {/if}
        </div>
        {#if conscious}
          <div
            class="health-bar until-unconscious {computedClassesUntilUnconscious}"
            style="width: {untilUnconsciousWidth}%"
          >
            <span class="hp-info"
              >{hitpointsUntilUnconscious} hp until unconscious</span
            >
          </div>
        {/if}
      {:else}
        <div
          class="health-bar dead health-critical striped animated"
          style="width: 100%;"
        >
          <span>YOU DIED</span>
        </div>
      {/if}
    </div>
  </div>
</div>

<style lang="less">
  @argon-green: #2dce89;
  @argon-orange: #fb6340;
  @argon-red: #f5365c;

  @healthbar-height: 3em;
  @progress-height: 2em;
  @health-bar-animation-timing: 1s linear infinite;

  .gradient-striped(@color: rgba(white, 0.15), @angle: 45deg) {
    background-image: linear-gradient(
      @angle,
      @color 25%,
      transparent 25%,
      transparent 50%,
      @color 50%,
      @color 75%,
      transparent 75%,
      transparent
    );
  }
  @keyframes health-bar-stripes {
    from {
      background-position: 0 0;
    }
    to {
      background-position: @progress-height 0;
    }
  }

  .gapless {
    display: flex;
  }

  .health-invalid {
    background-color: #333;
  }
  .health-ok {
    background-color: @argon-green;
  }
  .health-hurt {
    background-color: @argon-orange;
  }
  .health-critical {
    background-color: @argon-red;
  }

  .health {
    position: relative;
    width: 100%;
    height: @healthbar-height;
    background-color: rgba(0, 0, 0, 0.15);

    border-radius: 0.5em;

    overflow: hidden;

    .text-underlay,
    .bars {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

    .text-underlay {
      .health-bar {
        overflow: visible;

        .hp-info {
          color: var(--text-primary);
        }
      }
    }

    .health-bar {
      display: inline-block;
      position: relative;
      top: 0;

      height: 100%;

      box-sizing: border-box;
      vertical-align: top;
      overflow: hidden;
      color: var(--color-light-1);

      &.health-ok {
        color: var(--color-light-1);
      }

      .hp-info {
        display: inline-block;
        font-size: 1.5em;
        line-height: 2em;
        white-space: nowrap;
        padding-left: 0.5em;
      }

      &.striped {
        .gradient-striped(rgba(255, 255, 255, 0.15), -45deg);
        background-size: @progress-height @progress-height;

        &.animated {
          animation: health-bar-stripes @health-bar-animation-timing;
        }
      }

      &.dead {
        position: relative;
        text-align: center;
        color: var(--background-primary);
        font-weight: bold;

        span {
          position: relative;
          display: inline-block;
          font-size: 2em;
          // This doesn't *quite* work on FireFox, and I can't figure out how to
          // fix it. It seems that FF calculates the center line from total
          // character height / 2, not top-to-baseline / 2 like other browsers.
          line-height: 1.5;
          height: 100%;
          vertical-align: middle;
        }
      }
    }
  }
</style>
