<template>
  <TransitionRoot :show="open">
    <!-- For dialog(modal) code check here: https://headlessui.com/vue/dialog -->
    <Dialog as="div" class="relative z-20" @close="closeModal">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-60" />
      </TransitionChild>

      <!-- Full-screen scrollable container -->
      <div class="fixed inset-0 overflow-y-auto">
        <!-- Container to center the panel -->
        <div class="flex items-center justify-center min-h-full p-4">
          <!-- The actual dialog panel -->
          <TransitionChild
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel class="w-full min-w-[360px] p-5 bg-white shadow-lg rounded-2xl">
              <div class="flex items-center justify-between">
                <!-- Conditional rendering for text -->
                <DialogTitle class="text-xl font-medium text-gray-700">
                  {{ book._id ? "Update" : "Create" }} Book
                </DialogTitle>
              </div>
              <p class="mt-1 text-sm text-gray-500">
                {{ book._id ? "Update this book" : "Create a new book here" }}
              </p>

              <form class="mt-5" @submit="submitBook">
                <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div class="col-span-full">
                    <FormInput
                      id="title"
                      v-model="book.title"
                      name="title"
                      type="text"
                      label="Book Title"
                      placeholder="Book Title"
                    />
                  </div>
                  <div class="mb-4 col-span-full">
                    <FormMultiAuthorsInput v-model="authors" />
                  </div>
                  <div class="col-span-1">
                    <FormInput
                      id="published"
                      v-model="book.published"
                      name="published"
                      type="date"
                      label="Published Date"
                      placeholder="Select a date"
                    />
                  </div>
                  <div class="col-span-1">
                    <FormInput
                      id="isbn"
                      v-model="book.isbn"
                      name="isbn"
                      type="text"
                      label="ISBN"
                      placeholder="ISBN"
                    />
                  </div>
                  <div class="col-span-1">
                    <FormInput
                      id="pageCount"
                      v-model="book.pageCount"
                      name="pageCount"
                      type="number"
                      min="0"
                      label="Page Count"
                      placeholder="Page Count"
                    />
                  </div>
                </div>
                <!-- Form buttons -->
                <div class="flex items-center justify-end space-x-3 mt-7">
                  <button type="button" class="px-4 text-sm bg-gray-100 py-2.5 rounded-md" @click="closeModal()">
                    Cancel
                  </button>
                  <button type="submit" class="btn submit" :disabled="!meta.dirty">
                    {{ book._id ? "Update" : "Create" }}
                  </button>
                </div>
              </form>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { Dialog, DialogPanel, DialogTitle, TransitionRoot, TransitionChild } from '@headlessui/vue';
import { useForm } from 'vee-validate';

const authorStore = useAuthorStore();
useAsyncData(() => authorStore.getAll(), { initialCache: false });
const bookStore = useBookStore();

const book = ref({});
const authors = ref([]);

const schema = {
  title: 'required|min:3',
  published: 'required',
  isbn: 'required|min:3',
  pageCount: 'required|min_value:0'
};
const onInvalidSubmit = () => {
  const submitBtn = document.querySelector('.btn.submit');
  submitBtn.classList.add('shake');
  setTimeout(() => {
    submitBtn.classList.remove('shake');
  }, 1000);
};

const { handleSubmit, meta, resetForm } = useForm({
  validationSchema: schema
});

const submitBook = handleSubmit(async (values) => {
  if (!book.value._id) {
    await bookStore.create({ ...values, authors: authors.value });
    closeModal();
  } else {
    bookStore.update(book.value._id, { ...values, authors: authors.value });
    closeModal();
  }
}, onInvalidSubmit);

const open = ref(false);
const openModal = (item) => {
  // The Form will get registerd and validated on setup function.
  // So it will be invalid before we open the modal. Thus, we have to reset it here.
  // See: https://github.com/logaretm/vee-validate/discussions/3646
  resetForm();

  if (item) {
    book.value = JSON.parse(JSON.stringify({ ...item, published: item.published.substring(0, 10) }));
    authors.value = item.authors.map(a => a._id);
  } else {
    book.value = {};
    authors.value = [];
  }
  open.value = true;
};

const closeModal = () => {
  open.value = false;
};

defineExpose({
  openModal,
  closeModal
});
</script>

<style>

</style>
