<!-- <template>
  <q-page>
    <ToDoList />
  </q-page>
</template> -->

<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar>
          Projeto Teste
        </q-toolbar-title>
      </q-toolbar>

      <q-tabs align="left">
        <q-route-tab to="/to-do-list" label="To-Do List" />
        <!-- <q-route-tab to="/page2" label="Page Two" />
        <q-route-tab to="/page3" label="Page Three" /> -->
      </q-tabs>
    </q-header>

    <q-page-container>
      <router-view />
      <!-- <ToDoList /> -->
      <IteractiveForm />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import IteractiveForm from 'src/components/IteractiveForm/IteractiveForm.vue';
// import ToDoList from '../components/ToDoList/ToDoList.vue';
</script>
