<template>
  <q-table
    :title="$t('commentaries')"
    row-key="name"
    :rows="filterComments()"
    :columns="columns"
    :rows-per-page-options="[5, 10, 15]"
    :pagination="pagination"
    wrap-cells
    :pagination-label="
      (first, last, total) => t('paginationLabel', { first, last, total })
    "
    :rows-per-page-label="$t('rowsPerPageLabel')"
    :loading="loading"
    :loading-label="$t('loadingLabel')"
  >
    <template v-slot:top-right>
      <q-input
        borderless
        dense
        debounce="300"
        v-model="filter"
        :placeholder="$t('search')"
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </template>
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

const filter = ref<string>('');
const comments = ref<Comment[]>([]);
const loading = ref<boolean>(true);

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

function filterComments() {
  if (!filter.value) return comments.value;

  return comments.value.filter((comment) => {
    return Object.values(comment).some((fieldValue) => {
      return typeof fieldValue === 'string'
        ? fieldValue.toLowerCase().includes(filter.value)
        : false;
    });
  });
}

onMounted(() => {
  fetchComments().then((items) => {
    setTimeout(() => {
      comments.value = items;
      loading.value = false;
    }, 500);
  });
});
</script>
