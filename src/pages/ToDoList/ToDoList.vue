<template>
  <q-card>
    <q-card-section>
      <div class="text-h4 q-mb-lg">To-Do List</div>

      <q-input
        v-model="userText"
        @keyup.enter="addTask"
        outlined
        placeholder="Descreva a tarefa e pressione a tecla enter"
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
        <q-item-section class="task-text" @click="onClickItem(task)">
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

function onClickItem(task: TodoItem) {
  task.done = !task.done;
}

const addTask = () => {
  if (userText.value?.trim()) {
    const taskFound = tasks.value.some((item) => item.text === userText.value);

    if (!taskFound) {
      tasks.value.push({ text: userText.value, done: false });
      Notify.create({
        message: `Tarefa <strong>${userText.value}</strong> foi cadastrada com sucesso!`,
        color: 'positive',
        icon: 'check',
        html: true,
      });
      userText.value = '';
    } else {
      Notify.create({
        message: `Atenção! a tarefa <strong>${userText.value}</strong> ja foi cadastrada!`,
        color: 'warning',
        icon: 'warning',
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
