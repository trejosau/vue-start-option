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
            <div>
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

            <!-- Unverified Email Notice -->
            <div v-if="mustVerifyEmail && !user.email_verified_at">
                <p class="text-sm mt-2 text-grayLight">
                    Your email address is unverified.
                    <NordNavLink
                        :href="route('verification.send')"
                        method="post"
                        as="button"
                        class="underline text-sm text-ice hover:text-teal rounded-md focus:outline-none focus:ring-2 focus:ring-ice focus:ring-offset-2"
                    >
                        Click here to re-send the verification email.
                    </NordNavLink>
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
                <NordPrimaryButton :disabled="form.processing">Save</NordPrimaryButton>

                <Transition enter-from-class="opacity-0" leave-to-class="opacity-0" class="transition ease-in-out">
                    <p v-if="form.recentlySuccessful" class="text-sm text-grayLight">Saved.</p>
                </Transition>
            </div>
        </form>
    </section>
</template>

<script>
import { usePage } from '@inertiajs/vue3';
import { ref } from 'vue';
import NordInputError from '@/Components/NordInputError.vue';
import NordInputLabel from '@/Components/NordInputLabel.vue';
import NordNavLink from '@/Components/NordNavLink.vue';
import NordPrimaryButton from '@/Components/NordPrimaryButton.vue';
import NordTextInput from '@/Components/NordTextInput.vue';

export default {
    name: 'UpdateProfile',
    components: {
        NordInputError,
        NordInputLabel,
        NordNavLink,
        NordPrimaryButton,
        NordTextInput,
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
            } catch (error) {
            } finally {
                this.form.processing = false;
            }
        },
    },
};
</script>

