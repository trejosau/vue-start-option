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
                <InputLabel for="email" value="Email" />

                <TextInput
                    id="email"
                    type="email"
                    class="mt-1 block w-full"
                    v-model="form.email"
                    required
                    autofocus
                    autocomplete="username"
                />

                <InputError class="mt-2" :message="form.errors.email" />
            </div>

            <div class="flex items-center justify-end mt-4">
                <PrimaryButton :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
                    Email Password Reset Link
                </PrimaryButton>
            </div>
        </form>
    </GuestLayout>
</template>

<script>
import GuestLayout from '@/Layouts/GuestLayout.vue';
import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import TextInput from '@/Components/TextInput.vue';
import { Head } from '@inertiajs/vue3';

export default {
    name: 'ForgotPassword',
    components: {
        GuestLayout,
        Head,
        InputError,
        InputLabel,
        PrimaryButton,
        TextInput,
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
