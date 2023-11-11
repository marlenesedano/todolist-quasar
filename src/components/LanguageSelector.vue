<template>
  <q-select
    v-model="selectedLanguage"
    :options="languages"
    :label="$t('selectLanguage')"
    filled
    :option-label="(opt) => i18n.t(opt)"
    class="q-pa-md"
    style="width: 300px"
  >
    <template v-slot:prepend>
      <q-icon name="language" @click.stop.prevent />
    </template>
  </q-select>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

const i18n = useI18n();
const languages = ['pt-BR', 'en-US'];
const selectedLanguage = ref('pt-BR');

watch(selectedLanguage, () => {
  i18n.locale.value = selectedLanguage.value;
});
</script>
