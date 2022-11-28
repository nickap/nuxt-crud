<template>
  <Combobox v-slot="{ open }" multiple>
    <div class="relative">
      <ComboboxLabel class="label">
        Authors
      </ComboboxLabel>
      <div class="relative">
        <ComboboxInput placeholder="Search here..." class="input" :display-value="getDisplay" @change="query = $event.target.value" />
        <span class="absolute top-2 right-2">
          <ComboboxButton> <Icon class="transition-all duration-300" :class="[open ? 'rotate-180' : '']" name="fluent:chevron-down-24-regular" size="20" /> </ComboboxButton></span>
      </div>
      <ComboboxOptions class="absolute w-full bg-white border border-gray-100 rounded-md shadow-lg">
        <div v-if="filteredAuthors.length === 0 && query !== ''" class="relative px-2 py-4 text-center text-gray-500 cursor-default select-none">
          No Author Found
        </div>
        <!-- filtereed authors -->
        <ComboboxOption v-for="author in filteredAuthors" :key="author._id" as="template" :value="author._id">
          <li class="px-3 py-2.5 cursor-pointer ui-active:bg-primary-50 ui-selected:bg-primary ui-selected:text-white">
            <span class="block text-sm truncate ui-active:text-primary">
              {{ author.name }}
            </span>
          </li>
        </ComboboxOption>
      </ComboboxOptions>
    </div>
  </Combobox>
</template>

<script setup>
import { ComboboxLabel, Combobox, ComboboxInput, ComboboxOptions, ComboboxOption, ComboboxButton } from '@headlessui/vue';

const authorStore = useAuthorStore();
useAsyncData(() => authorStore.getAll(), { initialCache: false });
const query = ref('');

// Method used to display the text inside the input
const getDisplay = (authors) => {
  if (!authors.length) { return; }
  const firstAuthor = authorStore.authors.find(a => a._id === authors[0])?.name;
  if (authors.length > 1) {
    return `${firstAuthor} + ${authors.length - 1} more`;
  }
  return firstAuthor;
};

const filteredAuthors = computed(() =>
  query.value === ''
    ? authorStore.authors
    : authorStore.authors.filter((a) => {
      return a.name.toLowerCase().includes(query.value.toLowerCase());
    })
);
</script>
