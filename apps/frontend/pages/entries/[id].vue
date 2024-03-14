<script setup lang="ts">
import * as yup from "yup";
import type { EntryUpdate } from "@shared/types/EntriesTypes";
const route = useRoute();

const routeId = ref<number>(route.params.id);

const { data } = await getEntry(routeId.value);

const schema = yup.object({
  title: yup.string(),
  api: yup.string(),
  description: yup.string(),
  auth: yup.string(),
  https: yup.boolean(),
  cors: yup.string(),
  category: yup.string(),
  link: yup.string(),
});

const onSubmit = async (values: EntryUpdate) => {
  const comparedDate = compareAndClearObject(values, data.value);
  if (comparedDate && Object.keys(comparedDate).length > 0) {
    await updateEntry(routeId.value, comparedDate);
  }
};
</script>

<template>
  <div
    v-if="data"
    class="flex flex-col text-center justify-center h-screen pt-10"
  >
    <h1 class="text-4xl font-bold mb-10">Update Entry N°{{ routeId }}</h1>
    <Form :validation-schema="schema" @submit="onSubmit">
      <div class="inline-block">
        <div class="m-5 flex flex-col w-96">
          <Field name="title" placeholder="title" :value="data.title" />
          <ErrorMessage name="title" />
        </div>

        <div class="m-5 flex flex-col w-96">
          <Field name="api" placeholder="api" :value="data.api" />
          <ErrorMessage name="api" />
        </div>

        <div class="m-5 flex flex-col w-96">
          <Field
            name="description"
            placeholder="description"
            :value="data.description"
          />
          <ErrorMessage name="description" />
        </div>

        <div class="m-5 flex flex-col w-96">
          <Field name="auth" placeholder="auth" :value="data.auth" />
          <ErrorMessage name="auth" />
        </div>
      </div>

      <div class="inline-block">
        <div class="m-5 flex flex-col w-96">
          <Field
            name="https"
            type="checkbox"
            :unchecked-value="false"
            placeholder="https"
            :value="data.https"
          />
          <ErrorMessage name="https" />
        </div>

        <div class="m-5 flex flex-col w-96">
          <Field name="cors" placeholder="cors" :value="data.cors" />
          <ErrorMessage name="cors" />
        </div>

        <div class="m-5 flex flex-col w-96">
          <Field
            name="category"
            placeholder="category"
            :value="data.category"
          />
          <ErrorMessage name="category" />
        </div>

        <div class="m-5 flex flex-col w-96">
          <Field name="link" placeholder="link" :value="data.link" />
          <ErrorMessage name="link" />
        </div>
      </div>
      <button class="block w-fit mx-auto mt-5" type="submit">Submit</button>
    </Form>
  </div>
  <div v-else>
    <p>Loading ...</p>
  </div>
</template>
../../utils/function/compareAndClearObject
