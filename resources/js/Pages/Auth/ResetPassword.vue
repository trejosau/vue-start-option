<template>
    <GuestLayout>
        <Head :title="'Reset Password'" />

        <form @submit.prevent="submit">
            <!-- Email Field -->
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

            <!-- Password Field -->
            <div class="mt-4">
                <InputLabel for="password" value="Password" />

                <TextInput
                    id="password"
                    type="password"
                    class="mt-1 block w-full"
                    v-model="form.password"
                    required
                    autocomplete="new-password"
                />

                <InputError class="mt-2" :message="form.errors.password" />
            </div>

            <!-- Confirm Password Field -->
            <div class="mt-4">
                <InputLabel for="password_confirmation" value="Confirm Password" />

                <TextInput
                    id="password_confirmation"
                    type="password"
                    class="mt-1 block w-full"
                    v-model="form.password_confirmation"
                    required
                    autocomplete="new-password"
                />

                <InputError
                    class="mt-2"
                    :message="form.errors.password_confirmation"
                />
            </div>

            <!-- Actions -->
            <div class="flex items-center justify-end mt-4">
                <PrimaryButton
                    :class="{ 'opacity-25': form.processing }"
                    :disabled="form.processing"
                >
                    Reset Password
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
    name: 'ResetPassword',
    components: {
        GuestLayout,
        Head,
        InputError,
        InputLabel,
        PrimaryButton,
        TextInput,
    },
    props: {
        email: {
            type: String,
            required: true,
        },
        token: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            form: {
                token: this.token,
                email: this.email,
                password: '',
                password_confirmation: '',
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
                await this.$inertia.post(route('password.store'), {
                    token: this.form.token,
                    email: this.form.email,
                    password: this.form.password,
                    password_confirmation: this.form.password_confirmation,
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
