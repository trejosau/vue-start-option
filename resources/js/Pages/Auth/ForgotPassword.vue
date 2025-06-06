<template>
    <GuestLayout>
        <Head :title="'Forgot Password'" />

        <div class="mb-4 text-sm text-grayLight">
            Forgot your password? No problem. Just let us know your email address and we will email you a password reset
            link that will allow you to choose a new one.
        </div>

        <div v-if="status" class="mb-4 font-medium text-sm text-ice">
            {{ status }}
        </div>

        <form @submit.prevent="submit">
            <div>
                <NordInputLabel for="email" value="Email" />

                <NordTextInput
                    id="email"
                    type="email"
                    class="mt-1 block w-full"
                    v-model="form.email"
                    required
                    autofocus
                    autocomplete="username"
                />

                <NordInputError class="mt-2" :message="form.errors.email" />
            </div>

            <div class="flex items-center justify-end mt-4">
                <NordPrimaryButton :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
                    Email Password Reset Link
                </NordPrimaryButton>
            </div>
        </form>
    </GuestLayout>
</template>

<script>
import GuestLayout from '@/Layouts/GuestLayout.vue';
import NordInputError from '@/Components/NordInputError.vue';
import NordInputLabel from '@/Components/NordInputLabel.vue';
import NordPrimaryButton from '@/Components/NordPrimaryButton.vue';
import NordTextInput from '@/Components/NordTextInput.vue';
import { Head } from '@inertiajs/vue3';

export default {
    name: 'ForgotPassword',
    components: {
        GuestLayout,
        Head,
        NordInputError,
        NordInputLabel,
        NordPrimaryButton,
        NordTextInput,
    },
    props: {
        status: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            form: {
                email: '',
                errors: {},
                processing: false,
            },
        };
    },
    methods: {
        async submit() {
            this.form.processing = true;
            this.form.errors = {};

            try {
                await this.$inertia.post(route('password.email'), {
                    email: this.form.email,
                });
            } catch (error) {
                const serverErrors = this.$page.props.value.errors || {};
                this.form.errors = serverErrors;
            } finally {
                this.form.processing = false;
            }
        },
    },
};
</script>

