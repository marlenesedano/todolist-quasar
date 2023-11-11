<template>
  <q-table
    :title="$t('commentaries')"
    row-key="name"
    :rows="comments"
    :columns="columns"
    :rows-per-page-options="[5, 10, 15]"
    :pagination="pagination"
    wrap-cells
    :pagination-label="
      (first, last, total) => t('paginationLabel', { first, last, total })
    "
    :rows-per-page-label="$t('rowsPerPageLabel')"
  >
  </q-table>
</template>

<script setup lang="ts">
import { fetchComments } from 'src/services/comments_service';
import { Comment } from 'src/models/comment';
import { onMounted } from 'vue';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { computed } from 'vue';
import { QTableProps } from 'quasar';

const comments = ref<Comment[]>([]);

const { t } = useI18n();

const pagination = { page: 1, rowsPerPage: 10 };

const columns = computed<QTableProps['columns']>(() => [
  {
    name: 'name',
    label: t('name'),
    field: 'name',
    align: 'left',
    sortable: true,
  },
  {
    name: 'email',
    label: t('email'),
    field: 'email',
    align: 'left',
    sortable: true,
  },
  {
    name: 'body',
    label: t('content'),
    field: 'body',
    align: 'left',
    sortable: true,
  },
]);

onMounted(() => {
  fetchComments().then((items) => {
    comments.value = items;
  });
});
</script>
