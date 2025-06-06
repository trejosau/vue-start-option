<template>
    <GuestLayout>
        <Head :title="'Log in'" />

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

            <!-- Password Field -->
            <div class="mt-4">
                <InputLabel for="password" value="Password" />

                <TextInput
                    id="password"
                    type="password"
                    class="mt-1 block w-full"
                    v-model="form.password"
                    required
                    autocomplete="current-password"
                />

                <InputError class="mt-2" :message="form.errors.password" />
            </div>

            <!-- Remember Me Checkbox -->
            <div class="block mt-4">
                <label class="flex items-center">
                    <Checkbox name="remember" v-model:checked="form.remember" />
                    <span class="ml-2 text-sm text-fg">Remember me</span>
                </label>
            </div>

            <!-- Actions -->
            <div class="flex items-center justify-end mt-4">
                <NavLink
                    v-if="canResetPassword"
                    :href="route('password.request')"
                    class="underline text-sm text-ice hover:text-teal rounded-md focus:outline-none focus:ring-2 focus:ring-ice focus:ring-offset-2"
                >
                    Forgot your password?
                </NavLink>

                <PrimaryButton class="ml-4" :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
                    Log in
                </PrimaryButton>
            </div>
        </form>
    </GuestLayout>
</template>

<script>
import Checkbox from '@/Components/Checkbox.vue';
import GuestLayout from '@/Layouts/GuestLayout.vue';
import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import NavLink from '@/Components/NavLink.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import TextInput from '@/Components/TextInput.vue';
import { Head } from '@inertiajs/vue3';

export default {
    name: 'Login',
    components: {
        GuestLayout,
        Head,
        Checkbox,
        InputError,
        InputLabel,
        NavLink,
        PrimaryButton,
        TextInput,
    },
    props: {
        canResetPassword: {
            type: Boolean,
            default: false,
        },
        status: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            form: {
                email: '',
                password: '',
                remember: false,
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
                await this.$inertia.post(route('login'), {
                    email: this.form.email,
                    password: this.form.password,
                    remember: this.form.remember,
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
