<template>
  <q-dialog v-model="displayEdit" v-if="displayEdit">
    <edit-comment />
  </q-dialog>

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

    <template v-slot:body-cell-actions="props">
      <q-td :props="props">
        <q-btn
          icon="mode_edit"
          size="10px"
          padding="6px 8px"
          @click="onEdit(props.row)"
        ></q-btn>
      </q-td>
    </template>
  </q-table>
</template>

<script setup lang="ts">
import EditComment from './EditComment/EditComment.vue';
import { fetchComments } from 'src/services/comments_service';
import { Comment } from 'src/models/comment';
import { onMounted } from 'vue';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { computed } from 'vue';
import { QTableProps } from 'quasar';
import { provide } from 'vue';
import { useCommentsStore } from 'src/stores/comments-store';

const filter = ref<string>('');
const loading = ref<boolean>(true);
const displayEdit = ref<boolean>(false);
const selectedComment = ref<Comment>({} as Comment);

const commentsStore = useCommentsStore();
const comments = computed(() => commentsStore.comments);

provide('selected-comment', selectedComment);

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
  {
    name: 'actions',
    label: t('edit'),
    field: 'action',
    align: 'left',
    sortable: false,
  },
]);

function onEdit(comment: Comment) {
  displayEdit.value = true;
  selectedComment.value = { ...comment };
}

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
  fetchComments().then((items: Comment[]) => {
    // timeout used to simulate slowness and highlight loading
    setTimeout(() => {
      commentsStore.populateComments(items);
      loading.value = false;
    }, 500);
  });
});
</script>
