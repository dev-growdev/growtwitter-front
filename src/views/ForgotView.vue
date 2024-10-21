<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { encryptEmailCesar, sendMailReset } from '@/services/senderMail';
const email = ref<string>('');
const router = useRouter();
const forgotEmail = async () => {
    const templateParams = {
        email: email.value,
        to_email: email.value,
        reset_link: 'http://localhost:5173/reset/?email=' + await encryptEmailCesar(email.value, 7) // O destinatário é o email do usuário
    };
    const response = await sendMailReset(templateParams);
    console.log(response);
    if (response == undefined) {
        alert("Email enviado com sucesso!");
        router.push('/login');
    }

}
</script>
<template>
    <div class="background">
        <v-container>
            <v-card class="mx-auto mt-sm-6 pa-6 pa-md-12 pb-md-8" elevation="8" max-width="900" rounded="lg" role="region" aria-labelledby="cardTitle"
            >
                <v-row class="d-flex align-center">
                    <v-col cols="12" sm="6" class="text bg-blue rounded py-15" role="region" aria-labelledby="growtwitterTitle">
                        <v-card-title id="growtwitterTitle">Growtwitter</v-card-title>
                        <v-card-subtitle class="text-white">Trabalho final do bloco intermediário</v-card-subtitle>
                        <v-card-text>
                            O Growtwitter é a plataforma definitiva para todos os apaixonados por redes sociais
                            que buscam uma experiência familiar e poderosa, semelhante ao Twitter, mas com um
                            toque único. Seja parte desta comunidade que valoriza a liberdade de expressão, a
                            conexão com pessoas de todo o mundo e a disseminação de ideias.
                        </v-card-text>
                    </v-col>
                    <v-col cols="12" sm="6" class="bg-white rounded-e-lg pa-8" role="region" aria-labelledby="resetPasswordTitle">
                        <h1 id="resetPasswordTitle" class="pa-5 mb-5 text-center register-title">Redefinir sua senha</h1>
                        <v-text-field density="compact" placeholder="Digite seu endereço de e-mail"
                            prepend-inner-icon="mdi-email-outline" variant="outlined" v-model="email"  aria-label="Digite seu endereço de e-mail"
              aria-required="true"></v-text-field>
                        <v-btn @click="forgotEmail" class="mb-2" color="blue" size="large" variant="flat"
                            block aria-label="Enviar e-mail para redefinir senha">Enviar</v-btn>
                        <v-card-text class="text-center d-flex flex-column">
                            <RouterLink to="/login" class="text-blue text-decoration-none" aria-label="Voltar para a página de login">
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
