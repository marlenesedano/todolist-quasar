<template>
  <div class="q-pa-md">
    <div class="text-h5 q-mb-lg">Cadastro de planos streaming</div>
    <q-stepper v-model="step" header-nav ref="stepper" color="primary" animated>
      <q-step :name="1" title="Informe seus dados" icon="info" :done="done1">
        <label for="nome">Primeiro nome</label>
        <q-input
          class="input-form"
          outlined
          v-model="formData.name"
          label="Ex Marlene"
          required
        />
        <br />
        <label for="email">Endereço de email</label>
        <q-input
          outlined
          v-model="formData.email"
          placeholder="example@email.com"
          required
          :bottom-slots="!!errors['email']"
          :error="errors['email'] ? true : undefined"
        >
          <template v-slot:error>
            <div id="error-alert">E-mail inválido</div>
          </template>
        </q-input>
        <br />
        <label for="phone">Numero de telefone</label>
        <q-input
          outlined
          v-model="formData.phone"
          required
          mask="(##) #####-####"
          placeholder="(99) 99999-9999"
          :bottom-slots="!!errors['phone']"
          :error="errors['phone'] ? true : undefined"
        >
          <template v-slot:error>
            <div id="error-alert">Telefone inválido</div>
          </template>
        </q-input>

        <q-stepper-navigation>
          <q-btn
            :disable="isNextDisabled"
            @click="onContinueToSecondStep"
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
              <div class="plan__description">
                <span class="plan__description-title">Plano Prata</span>
                <ul>
                  <li>Acesso premium com anúncios</li>
                  <li>Funcionalidades avançadas</li>
                  <li>Suporte por e-mail</li>
                </ul>
              </div>
              <span class="plan__value">R$ 50,00/Mês</span>
            </div>

            <div class="plan__content">
              <div class="plan__description">
                <span class="plan__description-title">Plano Bronze</span>
                <ul>
                  <li>Acesso exclusivo sem anúncios.</li>
                  <li>Suporte 24/7 por e-mail, chat</li>
                  <li>Suporte por e-mail e chat</li>
                </ul>
              </div>
              <span class="plan__value">R$ 150,00/Mês</span>
            </div>

            <div class="plan__content">
              <div class="plan__description">
                <span class="plan__description-title">Plano Ouro</span>
                <ul>
                  <li>Suporte personalizado para questões familiares.</li>
                  <li>Acesso para equipes pequenas</li>
                  <li>Suporte por e-mail,chat e WhatsApp</li>
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
          <p v-if="formData.name">Nome: {{ formData.name }}</p>
          <p v-if="formData.email">Email: {{ formData.email }}</p>
          <p v-if="formData.phone">Telefone: {{ formData.phone }}</p>
          <p v-if="group != 'op1'">Plano escolhido: {{ group }}</p>
        </div>

        <q-stepper-navigation>
          <q-btn
            flat
            @click="step = 2"
            color="grey-7"
            label="Voltar"
            class="q-ml-sm"
          />
          <q-btn color="primary" @click="done3 = true" label="Finalizar" />
        </q-stepper-navigation>
      </q-step>
    </q-stepper>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { z, ZodError } from 'zod';

const step = ref(1);
const done1 = ref(false);
const done2 = ref(false);
const done3 = ref(false);

const errors = ref<Record<string, string>>({});
const formData = ref({ name: '', email: '', phone: '' });

const group = ref('op1');
const options = ref([
  {
    label: 'Bronze',
    value: 'Bronze , Valor: R$ 50,00/Mês',
  },
  {
    label: 'Prata',
    value: 'Prata, Valor: R$ 150,00/Mês',
  },
  {
    label: 'Ouro',
    value: 'Ouro , Valor: R$ 200,00/Mês',
  },
]);

const schema = z.object({
  email: z.string().email(),
  phone: z.string().min(15),
});

function validateForm() {
  try {
    errors.value = {};
    schema.parse(formData.value);
  } catch (error) {
    if (error instanceof ZodError) {
      error.errors.forEach((error) => {
        errors.value[error.path.join('.')] = error.message;
      });
    }
  }
}

const isNextDisabled = computed(() => {
  return !(formData.value.name && formData.value.email && formData.value.phone);
});

const isNextDisabledPlan = computed(() => {
  return group.value === 'op1';
});

function onContinueToSecondStep() {
  validateForm();

  if (Object.keys(errors.value).length === 0) {
    done1.value = true;
    step.value = 2;
  }
}
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
