<template>
  <ClientOnly>
    <button
      @click="handleColorMode"
      :data-umami-event="umamiEvent"
      :class="buttonClass"
      :aria-label="ariaLabel"
      :title="ariaLabel"
    >
      <IconsIconSun v-if="currentMode === 'light'" />
      <IconsIconMoon v-else-if="currentMode === 'dark'" />
      <IconsIconSystem v-else />
    </button>
  </ClientOnly>
</template>

<script setup lang="ts">
type ColorMode = 'light' | 'dark' | 'system';

const props = defineProps<{
  buttonClass?: string;
}>();

const colorMode = useColorMode();

const defaultButtonClass = 'themeBtn hover:bg-gray-100 dark:hover:bg-zinc-700 rounded-full p-2 transition-all';

const buttonClass = computed(() => props.buttonClass ?? defaultButtonClass);

const currentMode = computed<ColorMode>(() => {
  const p = colorMode.preference;
  if (p === 'dark') return 'dark';
  if (p === 'light') return 'light';
  return 'system';
});

const nextMode = computed<ColorMode>(() => {
  if (currentMode.value === 'light') return 'dark';
  if (currentMode.value === 'dark') return 'system';
  return 'light';
});

const labels: Record<ColorMode, string> = {
  light: 'Switch to dark mode',
  dark: 'Switch to system mode',
  system: 'Switch to light mode',
};

const umamiEvents: Record<ColorMode, string> = {
  light: 'changeColorModeToDark',
  dark: 'changeColorModeToSystem',
  system: 'changeColorModeToLight',
};

const ariaLabel = computed(() => labels[currentMode.value]);
const umamiEvent = computed(() => umamiEvents[currentMode.value]);

const handleColorMode = () => {
  colorMode.preference = nextMode.value;
};
</script>
