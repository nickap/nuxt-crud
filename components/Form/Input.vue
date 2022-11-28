<template>
  <div class="w-full">
    <label class="label" :for="$attrs.id">{{ label }}</label>
    <input v-model="value" class="input" v-bind="$attrs">
    <div class="mt-1 text-xs text-red-500">
      <span class="text-transparent">.</span>
      <span>
        {{ errorMessage }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { toRef } from 'vue';
import { useField } from 'vee-validate';
const props = defineProps({
  name: { type: String, required: true },
  label: {
    type: String,
    required: true
  },
  // whenever we use v-model, modelValue prop passed to the child
  // https://v3-migration.vuejs.org/breaking-changes/v-model.html#_3-x-syntax
  modelValue: [String, Number]
});

// Need 'toRef' to achieve reactivity with vee-validate
const name = toRef(props, 'name');
const modelValue = toRef(props, 'modelValue');

// undefined for rules because we validate on Form-Level
const { value, errorMessage } = useField(name, undefined, {
  initialValue: modelValue
});
</script>

<script>
// stop component from inheriting attrs
export default {
  inheritAttrs: false
};
</script>

<style></style>
