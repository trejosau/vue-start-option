<template>
    <GuestLayout>
        <Head :title="'Reset Password'" />

        <form @submit.prevent="submit">
            <!-- Email Field -->
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

            <!-- Password Field -->
            <div class="mt-4">
                <NordInputLabel for="password" value="Password" />

                <NordTextInput
                    id="password"
                    type="password"
                    class="mt-1 block w-full"
                    v-model="form.password"
                    required
                    autocomplete="new-password"
                />

                <NordInputError class="mt-2" :message="form.errors.password" />
            </div>

            <!-- Confirm Password Field -->
            <div class="mt-4">
                <NordInputLabel for="password_confirmation" value="Confirm Password" />

                <NordTextInput
                    id="password_confirmation"
                    type="password"
                    class="mt-1 block w-full"
                    v-model="form.password_confirmation"
                    required
                    autocomplete="new-password"
                />

                <NordInputError
                    class="mt-2"
                    :message="form.errors.password_confirmation"
                />
            </div>

            <!-- Actions -->
            <div class="flex items-center justify-end mt-4">
                <NordPrimaryButton
                    :class="{ 'opacity-25': form.processing }"
                    :disabled="form.processing"
                >
                    Reset Password
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
    name: 'ResetPassword',
    components: {
        GuestLayout,
        Head,
        NordInputError,
        NordInputLabel,
        NordPrimaryButton,
        NordTextInput,
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
