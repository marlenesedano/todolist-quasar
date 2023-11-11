<template>
  <div class="q-pa-md">
    <!-- <q-btn
      label="Reset"
      push
      color="white"
      text-color="primary"
      @click="reset"
      class="q-mb-md"
    /> -->

    <q-stepper v-model="step" header-nav ref="stepper" color="primary" animated>
      <q-step :name="1" title="Informe seus dados" icon="info" :done="done1">
        <label for="nome">Primeiro nome</label>
        <q-input
          class="input-form"
          outlined
          v-model="name"
          label="Ex Marlene"
          required
        />
        <br />
        <label for="email">Endereço de email</label>
        <q-input outlined v-model="email" label="Ex marlene@gmail" required />
        <br />
        <label for="phone">Numero de telefone</label>
        <q-input outlined v-model="phone" label="Ex (99)9999-9999" required />

        <q-stepper-navigation>
          <q-btn
            :disable="isNextDisabled"
            @click="
              () => {
                done1 = true;
                step = 2;
              }
            "
            color="primary"
            label="Continue"
          />
        </q-stepper-navigation>
      </q-step>

      <q-step
        :name="2"
        title="Selecione seu plano"
        icon="create_new_folder"
        :done="done2"
      >
        <div class="types-plan">
          <div class="plan">
            <div class="plan__content">
              <!-- <div class="q-pa-md">
              <q-checkbox v-model="service" />
            </div> -->

              <div class="plan__description">
                <span class="plan__description-title">Plano Prata</span>
                <ul>
                  <li>Acesso premium sem anúncios</li>
                  <li>Funcionalidades avançadas</li>
                  <li>Suporte prioritário por e-mail, chat e telefone</li>
                </ul>
              </div>
              <span class="plan__value">R$ 50,00/Mês</span>
            </div>

            <div class="plan__content">
              <!-- <div class="q-pa-md">
              <q-checkbox v-model="storage" />
            </div> -->
              <div class="plan__description">
                <span class="plan__description-title">Plano Bronze</span>
                <ul>
                  <li>Acesso exclusivo sem anúncios.</li>
                  <li>Suporte 24/7 por e-mail, chat e telefone</li>
                  <li>Suporte por e-mail e chat</li>
                </ul>
              </div>
              <span class="plan__value">R$ 150,00/Mês</span>
            </div>

            <div class="plan__content">
              <!-- <div class="q-pa-md">
              <q-checkbox v-model="customizeProfile" />
            </div> -->
              <div class="plan__description">
                <span class="plan__description-title">Plano Ouro</span>
                <ul>
                  <li>Suporte personalizado para questões familiares.</li>
                  <li>Acesso para equipes pequenas</li>
                  <li>Suporte por e-mail e chat</li>
                </ul>
              </div>
              <span class="plan__value">R$ 200,00/Mês</span>
            </div>
          </div>

          <div class="q-pa-lg">
            <q-option-group
              v-model="group"
              :options="options"
              color="primary"
              inline
            />
          </div>
        </div>
        <q-stepper-navigation>
          <q-btn
            flat
            @click="step = 1"
            color="grey-7"
            label="Voltar"
            class="q-ml-sm"
          />
          <q-btn
            :disable="isNextDisabledPlan"
            @click="
              () => {
                done2 = true;
                step = 3;
              }
            "
            color="primary"
            label="Continue"
          />
        </q-stepper-navigation>
      </q-step>

      <q-step :name="3" title="Resumo" icon="add_comment" :done="done3">
        <div class="resume">
          <h2 class="resume__title">Informações dos dados e plano</h2>
          <p v-if="name">Nome: {{ name }}</p>
          <p v-if="email">Email: {{ email }}</p>
          <p v-if="phone">Telefone: {{ phone }}</p>
          <p v-if="group">Plano escolhido: {{ group }}</p>
        </div>

        <q-stepper-navigation>
          <q-btn
            flat
            @click="step = 2"
            color="grey-7"
            label="Voltar"
            class="q-ml-sm"
          />
          <q-btn color="primary" @click="done3 = true" label="Finish" />
        </q-stepper-navigation>
      </q-step>
    </q-stepper>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const step = ref(1);
const done1 = ref(false);
const done2 = ref(false);
const done3 = ref(false);

const name = ref('');
const email = ref('');
const phone = ref('');

const group = ref('op1');
const options = ref([
  {
    label: 'Bronze',
    value: 'Bronze',
  },
  {
    label: 'Prata',
    value: 'Prata',
  },
  {
    label: 'Ouro',
    value: 'Ouro',
  },
]);

const isNextDisabled = computed(() => {
  return !(name.value && email.value && phone.value);
});

const isNextDisabledPlan = computed(() => {
  return group.value === 'op1';
});
</script>

<style scoped>
.input-form {
  padding: 0;
}

.types-plan {
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.plan {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
}

.plan__content {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid blue;
  border-radius: 4px;
  padding: 16px;
  gap: 10px;
}

.plan__description-title {
  font-weight: 700;
}

.resume {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.resume__title {
  font-size: 18px;
  font-weight: 600;
}

ul {
  list-style: none;
  padding: 0;
}
</style>
