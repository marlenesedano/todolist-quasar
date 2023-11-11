<template>
  <q-card style="width: 100vw; padding: 10px">
    <q-card-section style="padding-bottom: 0">
      <div class="text-h6">Editar comentário</div>
    </q-card-section>

    <q-card-section>
      <q-form>
        <q-input
          class="q-mb-md"
          debounce="300"
          label="Nome"
          v-model="selectedComment.name"
        />
        <q-input
          class="q-mb-md"
          debounce="300"
          label="E-mail"
          v-model="selectedComment.email"
        />
        <q-input
          type="textarea"
          filled
          autogrow
          label="Conteúdo"
          v-model="selectedComment.body"
        />
      </q-form>
    </q-card-section>

    <q-card-actions align="right">
      <q-btn flat label="Cancelar" color="primary" v-close-popup />
      <q-btn label="SALVAR" color="primary" v-close-popup @click="onUpdate" />
    </q-card-actions>
  </q-card>
</template>

<script setup lang="ts">
import { inject, Ref } from 'vue';
import { Notify } from 'quasar';
import { Comment } from '../../../models/comment';
import { useCommentsStore } from 'src/stores/comments-store';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const { updateComment } = useCommentsStore();

const selectedComment = inject('selected-comment', {} as Ref<Comment>);

function onUpdate() {
  updateComment(selectedComment.value);

  Notify.create({
    message: t('commentSavedMessage'),
    icon: 'check_circle',
    color: 'green',
    timeout: 2500,
  });
}
</script>
