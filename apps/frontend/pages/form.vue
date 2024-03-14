<script setup lang="ts">
import type { Entry } from "@shared/types/EntriesTypes";
import * as yup from "yup";

const schema = yup.object({
  title: yup.string().required(),
  api: yup.string().required(),
  description: yup.string().required(),
  auth: yup.string().required(),
  https: yup.boolean().required(),
  cors: yup.string().required(),
  category: yup.string().required(),
  link: yup.string().required(),
});

const onSubmit = async (values: Entry, { resetForm }: any) => {
  await createEntry(values);
  resetForm();
};
</script>

<template>
  <div class="flex flex-col text-center justify-center h-screen pt-10">
    <h1 class="text-4xl font-bold mb-10">Add a new Entrie</h1>
    <Form :validation-schema="schema" @submit="onSubmit">
      <div class="inline-block">
        <div class="m-5 flex flex-col w-96">
          <Field name="title" placeholder="title" />
          <ErrorMessage name="title" />
        </div>

        <div class="m-5 flex flex-col w-96">
          <Field name="api" placeholder="api" />
          <ErrorMessage name="api" />
        </div>

        <div class="m-5 flex flex-col w-96">
          <Field name="description" placeholder="description" />
          <ErrorMessage name="description" />
        </div>

        <div class="m-5 flex flex-col w-96">
          <Field name="auth" placeholder="auth" />
          <ErrorMessage name="auth" />
        </div>
      </div>

      <div class="inline-block">
        <div class="m-5 flex flex-col w-96">
          <Field
            name="https"
            type="checkbox"
            :value="true"
            :unchecked-value="false"
            placeholder="https"
          />
          <ErrorMessage name="https" />
        </div>

        <div class="m-5 flex flex-col w-96">
          <Field name="cors" placeholder="cors" />
          <ErrorMessage name="cors" />
        </div>

        <div class="m-5 flex flex-col w-96">
          <Field name="category" placeholder="category" />
          <ErrorMessage name="category" />
        </div>

        <div class="m-5 flex flex-col w-96">
          <Field name="link" placeholder="link" />
          <ErrorMessage name="link" />
        </div>
      </div>
      <button class="block w-fit mx-auto mt-5" type="submit">Submit</button>
    </Form>
  </div>
</template>
