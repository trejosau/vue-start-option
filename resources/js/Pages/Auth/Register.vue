<template>
    <GuestLayout>
        <Head :title="'Register'" />

        <form @submit.prevent="submit">
            <!-- Name Field -->
            <div>
                <NordInputLabel for="name" value="Name" />

                <NordTextInput
                    id="name"
                    type="text"
                    class="mt-1 block w-full"
                    v-model="form.name"
                    required
                    autofocus
                    autocomplete="name"
                />

                <NordInputError class="mt-2" :message="form.errors.name" />
            </div>

            <!-- Email Field -->
            <div class="mt-4">
                <NordInputLabel for="email" value="Email" />

                <NordTextInput
                    id="email"
                    type="email"
                    class="mt-1 block w-full"
                    v-model="form.email"
                    required
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
                <NordNavLink
                    :href="route('login')"
                    class="underline text-sm text-ice hover:text-teal rounded-md focus:outline-none focus:ring-2 focus:ring-ice focus:ring-offset-2"
                >
                    Already registered?
                </NordNavLink>

                <NordPrimaryButton
                    class="ml-4"
                    :class="{ 'opacity-25': form.processing }"
                    :disabled="form.processing"
                >
                    Register
                </NordPrimaryButton>
            </div>
        </form>
    </GuestLayout>
</template>

<script>
import GuestLayout from '@/Layouts/GuestLayout.vue';
import NordInputError from '@/Components/NordInputError.vue';
import NordInputLabel from '@/Components/NordInputLabel.vue';
import NordNavLink from '@/Components/NordNavLink.vue';
import NordPrimaryButton from '@/Components/NordPrimaryButton.vue';
import NordTextInput from '@/Components/NordTextInput.vue';
import { Head } from '@inertiajs/vue3';

export default {
    name: 'Register',
    components: {
        GuestLayout,
        Head,
        NordInputError,
        NordInputLabel,
        NordNavLink,
        NordPrimaryButton,
        NordTextInput,
    },
    data() {
        return {
            form: {
                name: '',
                email: '',
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
                await this.$inertia.post(route('register'), {
                    name: this.form.name,
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
