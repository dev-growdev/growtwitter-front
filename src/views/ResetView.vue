<script setup lang="ts">

import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { resetPassword } from '@/services/api';
import { decryptEmailCesar } from '@/services/senderMail';

const password = ref<string>('');
const confirmPassword = ref<string>('');
const error = ref<string>('');
const validationErrors = ref<boolean>(false);
const visiblePass = ref<boolean>(false);
const visibleConfirm = ref<boolean>(false);
const router = useRouter();
const route = useRoute();
const email = ref<string>('');
const isLoading = ref<boolean>(false);

const updateUser = async () => {

    if (password.value !== confirmPassword.value) {
        validationErrors.value = true;
        error.value = "As senhas não coincidem";
        return;
    }
    isLoading.value = true;
    const response = await resetPassword({
        email: email.value,
        password: password.value,
        confirm_password: confirmPassword.value
    });
    if (response.status === 200) {
        isLoading.value = false;
        router.push('/login');
    } else {
        isLoading.value = false;
        error.value = response.data.msg;
    }

}
onMounted(async () => {
    email.value = await decryptEmailCesar(route.query.email as string, 7);
})

</script>

<template>

    <div class="background">
        <v-container>
            <v-card class="mx-auto mt-sm-6 pa-6 pa-md-12 pb-md-8" elevation="8" max-width="900" rounded="lg">
                <v-row class="d-flex align-center">
                    <v-col cols="12" sm="6" class="text bg-blue rounded py-15">
                        <v-card-title>Growtwitter</v-card-title>
                        <v-card-subtitle class="text-white">Trabalho final do bloco intermediário</v-card-subtitle>
                        <v-card-text>
                            O Growtwitter é a plataforma definitiva para todos os apaixonados por redes sociais
                            que buscam uma experiência familiar e poderosa, semelhante ao Twitter, mas com um
                            toque único. Seja parte desta comunidade que valoriza a liberdade de expressão, a
                            conexão com pessoas de todo o mundo e a disseminação de ideias.
                        </v-card-text>
                    </v-col>

                    <v-col cols="12" sm="6" class="bg-white rounded-e-lg pa-8">
                        <h1 class="pa-5 mb-5 text-center register-title">Redefinir sua senha</h1>


                        <v-text-field :append-inner-icon="visiblePass ? 'mdi-eye-off' : 'mdi-eye'"
                            :type="visiblePass ? 'text' : 'password'" density="compact"
                            placeholder="Crie uma senha forte" prepend-inner-icon="mdi-lock-outline" variant="outlined"
                            @click:append-inner="visiblePass = !visiblePass" v-model="password">
                        </v-text-field>

                        <v-text-field :append-inner-icon="visibleConfirm ? 'mdi-eye-off' : 'mdi-eye'"
                            :type="visibleConfirm ? 'text' : 'password'" density="compact"
                            placeholder="Confirme sua senha" prepend-inner-icon="mdi-lock-outline" variant="outlined"
                            @click:append-inner="visibleConfirm = !visibleConfirm"
                            v-model="confirmPassword"></v-text-field>

                        <div v-if="validationErrors" style="color: red; margin-bottom: 5px;">

                            {{ error }}

                        </div>

                        <v-btn @click="updateUser" class="mb-2" color="blue" size="large" variant="flat" block>{{
                            isLoading ? 'Carregando...' : 'Enviar' }}</v-btn>

                        <v-card-text class="text-center d-flex flex-column">

                            <RouterLink to="/login" class="text-blue text-decoration-none">
                                Voltar para o login <v-icon icon="mdi-chevron-right"></v-icon>
                            </RouterLink>
                        </v-card-text>

                    </v-col>
                </v-row>
            </v-card>
        </v-container>
    </div>
</template>

<style scoped>
.background {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f0f0f0;
}

@media (max-width: 600px) {
    .text {
        display: none;
    }
}

.keep-connected-container {
    display: flex;
    align-items: center;
    gap: 0.25rem;
}

span.error-message {
    text-align: center;
    color: red;
    margin: 0;
}
</style>
