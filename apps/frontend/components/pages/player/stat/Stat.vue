<script setup lang="ts">
const stat = defineProps({
  stat: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});

const color = computed(() => {
  if (stat.stat < 40) return "hsl(5, 85%, 50%)";
  if (stat.stat < 65) return "hsl(42, 100%, 60%)";
  return "hsl(120, 70%, 40%)";
});
</script>

<template>
  <div class="flex items-center flex-col gap-4">
    <Typo format="bold" tag="p" class="Stat-title">{{ title }}</Typo>
    <div class="Stat" :style="`--percentage: ${stat.stat}; --fill: ${color}`">
      {{ stat.stat }}
    </div>
  </div>
</template>

<style scoped lang="scss">
.Stat {
  --percentage: 0;
  --fill: #ff0;
  width: 150px;
  height: 75px;
  position: relative;
  font-size: 22px;
  font-weight: 600;
  overflow: hidden;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  box-sizing: border-box;
  &:after {
    content: "";
    width: 150px;
    height: 150px;
    border: 8px solid;
    border-color: rgba(0, 0, 0, 0.15) rgba(0, 0, 0, 0.15) var(--fill)
      var(--fill);
    position: absolute;
    border-radius: 50%;
    left: 0;
    top: 0;
    box-sizing: border-box;
    transform: rotate(calc(1deg * (-45 + var(--percentage) * 1.8)));
    animation: fillAnimation 1s ease-in;
  }
}
</style>
