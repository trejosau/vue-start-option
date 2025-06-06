<template>
    <section>
        <header>
            <h2 class="text-lg font-medium text-fg">Profile Information</h2>
            <p class="mt-1 text-sm text-grayLight">
                Update your account's profile information and email address.
            </p>
        </header>

        <form @submit.prevent="submit" class="mt-6 space-y-6">
            <!-- Name Field -->
            <div>
                <InputLabel for="name" value="Name" />

                <TextInput
                    id="name"
                    type="text"
                    class="mt-1 block w-full"
                    v-model="form.name"
                    required
                    autofocus
                    autocomplete="name"
                />

                <InputError class="mt-2" :message="form.errors.name" />
            </div>

            <!-- Email Field -->
            <div>
                <InputLabel for="email" value="Email" />

                <TextInput
                    id="email"
                    type="email"
                    class="mt-1 block w-full"
                    v-model="form.email"
                    required
                    autocomplete="username"
                />

                <InputError class="mt-2" :message="form.errors.email" />
            </div>

            <!-- Unverified Email Notice -->
            <div v-if="mustVerifyEmail && !user.email_verified_at">
                <p class="text-sm mt-2 text-grayLight">
                    Your email address is unverified.
                    <NavLink
                        :href="route('verification.send')"
                        method="post"
                        as="button"
                        class="underline text-sm text-ice hover:text-teal rounded-md focus:outline-none focus:ring-2 focus:ring-ice focus:ring-offset-2"
                    >
                        Click here to re-send the verification email.
                    </NavLink>
                </p>

                <div
                    v-show="status === 'verification-link-sent'"
                    class="mt-2 font-medium text-sm text-ice"
                >
                    A new verification link has been sent to your email address.
                </div>
            </div>

            <!-- Actions -->
            <div class="flex items-center gap-4">
                <PrimaryButton :disabled="form.processing">Save</PrimaryButton>

                <Transition enter-from-class="opacity-0" leave-to-class="opacity-0" class="transition ease-in-out">
                    <p v-if="form.recentlySuccessful" class="text-sm text-grayLight">Saved.</p>
                </Transition>
            </div>
        </form>
    </section>
</template>

<script>
import { usePage } from '@inertiajs/vue3';
import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import NavLink from '@/Components/NavLink.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import TextInput from '@/Components/TextInput.vue';

export default {
    name: 'UpdateProfileInformationForm',
    components: {
        InputError,
        InputLabel,
        NavLink,
        PrimaryButton,
        TextInput,
    },
    props: {
        mustVerifyEmail: {
            type: Boolean,
            default: false,
        },
        status: {
            type: String,
            default: '',
        },
    },
    data() {
        const user = usePage().props.auth.user;
        return {
            user,
            form: this.$inertia.form({
                name: user.name,
                email: user.email,
            }),
        };
    },
    methods: {
        async submit() {
            this.form.processing = true;
            this.form.errors = {};

            try {
                await this.form.patch(route('profile.update'));
            } finally {
                this.form.processing = false;
            }
        },
    },
};
</script>
