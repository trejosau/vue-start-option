<template>
    <GuestLayout>
        <Head :title="'Email Verification'" />

        <div class="mb-4 text-sm text-grayLight">
            Thanks for signing up! Before getting started, could you verify your email address by clicking on the link
            we just emailed to you? If you didn't receive the email, we will gladly send you another.
        </div>

        <div v-if="verificationLinkSent" class="mb-4 font-medium text-sm text-ice">
            A new verification link has been sent to the email address you provided during registration.
        </div>

        <form @submit.prevent="submit">
            <div class="mt-4 flex items-center justify-between">
                <PrimaryButton :class="{ 'opacity-25': form.processing }" :disabled="form.processing">
                    Resend Verification Email
                </PrimaryButton>

                <NavLink
                    :href="route('logout')"
                    method="post"
                    as="button"
                    class="underline text-sm text-ice hover:text-teal rounded-md focus:outline-none focus:ring-2 focus:ring-ice focus:ring-offset-2"
                >
                    Log Out
                </NavLink>
            </div>
        </form>
    </GuestLayout>
</template>

<script>
import GuestLayout from '@/Layouts/GuestLayout.vue';
import NavLink from '@/Components/NavLink.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import { Head } from '@inertiajs/vue3';

export default {
    name: 'VerifyEmail',
    components: {
        GuestLayout,
        Head,
        NavLink,
        PrimaryButton,
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
                errors: {},
                processing: false,
            },
        };
    },
    computed: {
        verificationLinkSent() {
            return this.status === 'verification-link-sent';
        },
    },
    methods: {
        async submit() {
            this.form.processing = true;
            try {
                await this.$inertia.post(route('verification.send'));
            } catch (error) {
                // Handle errors if necessary
            } finally {
                this.form.processing = false;
            }
        },
    },
};
</script>
