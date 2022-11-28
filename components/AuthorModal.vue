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
          <!-- The Dialog Panel -->
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
                <DialogTitle class="text-xl font-medium text-gray-700">
                  {{ author._id ? "Update" : "Create" }} Author
                </DialogTitle>
              </div>
              <p class="mt-1 text-sm text-gray-500">
                {{ author._id ? "Update this author" : "Create a new author here" }}
              </p>
              <!-- Form -->
              <form class="mt-5" @submit="submitAuthor">
                <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div class="col-span-full">
                    <FormInput
                      id="name"
                      v-model="author.name"
                      name="name"
                      type="text"
                      label="Name"
                      placeholder="Author's Name"
                    />
                  </div>
                </div>
                <!-- Form buttons -->
                <div class="flex items-center justify-end space-x-3 mt-7">
                  <button type="button" class="px-4 text-sm bg-gray-100 py-2.5 rounded-md" @click="closeModal()">
                    Cancel
                  </button>
                  <button type="submit" class="btn submit" :disabled="!meta.dirty">
                    {{ author._id ? "Update" : "Create" }}
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
const author = ref({});
const schema = {
  name: 'required|min:3'
};

// Get function used to handle form submission and set validation schema
const { handleSubmit, meta, resetForm } = useForm({
  validationSchema: schema
});

const onInvalidSubmit = () => {
  const submitBtn = document.querySelector('.btn.submit');
  submitBtn.classList.add('shake');
  setTimeout(() => {
    submitBtn.classList.remove('shake');
  }, 1000);
};

const submitAuthor = handleSubmit(async (values) => {
  if (!author.value._id) {
    await authorStore.create(values.name);
    closeModal();
  } else {
    authorStore.update(author.value._id, values.name);
    closeModal();
  }
}, onInvalidSubmit);

const open = ref(false);
const openModal = (item) => {
  // The Form will get registerd and validated on setup function.
  // So it will be invalid before we open the modal. Thus, we have to reset it here.
  // See: https://github.com/logaretm/vee-validate/discussions/3646
  resetForm();
  if (item) { author.value = JSON.parse(JSON.stringify(item)); } else { author.value = {}; }
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

<style></style>
