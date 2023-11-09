<template>
  <q-page>
    <q-card>
      <q-card-section>
        <h1 class="q-mb-md">To-Do List</h1>
        <q-input
          v-model="userText"
          @keyup.enter="addTask"
          outlined
          placeholder="Adicionar uma tarefa"
        />
      </q-card-section>

      <q-list bordered>
        <q-item
          v-for="(task, index) in tasks"
          :key="index"
          clickable
          :class="{ 'done-task': task.done }"
        >
          <q-item-section>
            <q-checkbox v-model="task.done" color="blue-10" />
          </q-item-section>
          <q-item-section class="task-text">
            {{ task.text }}
          </q-item-section>
          <q-item-section side>
            <q-btn
              flat
              round
              color="blue-10"
              icon="delete"
              @click="removeTask(task)"
            ></q-btn>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { Notify } from 'quasar';
import { ref } from 'vue';

type TodoItem = {
  text: string;
  done: boolean;
};

const userText = ref<string | undefined>();
const tasks = ref<TodoItem[]>([]);

const addTask = () => {
  if (userText.value?.trim()) {
    const taskFound = tasks.value.some((item) => item.text === userText.value);

    if (!taskFound) {
      tasks.value.push({ text: userText.value, done: false });
      Notify.create({
        message: `Tarefa <strong>${userText.value}</strong> foi cadastrada com sucesso!`,
        color: 'positive',
        icon: 'check',
        position: 'top-right',
        html: true,
      });
      userText.value = '';
    } else {
      Notify.create({
        message: `Atenção! a tarefa <strong>${userText.value}</strong> ja foi cadastrada!`,
        color: 'warning',
        icon: 'warning',
        position: 'top-right',
        html: true,
      });
      userText.value = '';
    }
  }
};

const removeTask = (task: TodoItem) => {
  tasks.value = tasks.value.filter((item) => item.text !== task.text);
};
</script>

<style lang="scss" scoped>
@import './ToDoList';
</style>
