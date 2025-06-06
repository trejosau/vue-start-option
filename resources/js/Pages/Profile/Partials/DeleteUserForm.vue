<template>
    <section class="space-y-6">
        <header>
            <h2 class="text-lg font-medium text-fg">Delete Account</h2>

            <p class="mt-1 text-sm text-grayLight">
                Once your account is deleted, all of its resources and data will be permanently deleted. Before deleting
                your account, please download any data or information that you wish to retain.
            </p>
        </header>

        <NordDangerButton @click="confirmUserDeletion">Delete Account</NordDangerButton>

        <NordModal :show="confirmingUserDeletion" @close="closeModal">
            <div class="p-6 bg-grayMedium rounded-lg">
                <h2 class="text-lg font-medium text-fg">
                    Are you sure you want to delete your account?
                </h2>

                <p class="mt-1 text-sm text-grayLight">
                    Once your account is deleted, all of its resources and data will be permanently deleted. Please
                    enter your password to confirm you would like to permanently delete your account.
                </p>

                <div class="mt-6">
                    <NordInputLabel for="password" value="Password" class="sr-only" />

                    <NordTextInput
                        id="password"
                        ref="passwordInput"
                        v-model="form.password"
                        type="password"
                        class="mt-1 block w-3/4"
                        placeholder="Password"
                        @keyup.enter="deleteUser"
                    />

                    <NordInputError :message="form.errors.password" class="mt-2" />
                </div>

                <div class="mt-6 flex justify-end">
                    <NordSecondaryButton @click="closeModal">Cancel</NordSecondaryButton>

                    <NordDangerButton
                        class="ml-3"
                        :class="{ 'opacity-25': form.processing }"
                        :disabled="form.processing"
                        @click="deleteUser"
                    >
                        Delete Account
                    </NordDangerButton>
                </div>
            </div>
        </NordModal>
    </section>
</template>

<script>
import { ref } from 'vue';
import NordDangerButton from '@/Components/NordDangerButton.vue';
import NordInputError from '@/Components/NordInputError.vue';
import NordInputLabel from '@/Components/NordInputLabel.vue';
import NordSecondaryButton from '@/Components/NordSecondaryButton.vue';
import NordTextInput from '@/Components/NordTextInput.vue';
import NordModal from '@/Components/NordModal.vue';
import { useForm } from '@inertiajs/vue3';

export default {
    name: 'DeleteAccount',
    components: {
        NordDangerButton,
        NordInputError,
        NordInputLabel,
        NordSecondaryButton,
        NordTextInput,
        NordModal,
    },
    data() {
        return {
            confirmingUserDeletion: false,
            form: this.$inertia.form({
                password: '',
            }),
        };
    },
    methods: {
        confirmUserDeletion() {
            this.confirmingUserDeletion = true;
            this.$nextTick(() => {
                if (this.$refs.passwordInput) {
                    this.$refs.passwordInput.focus();
                }
            });
        },
        async deleteUser() {
            this.form.delete(route('profile.destroy'), {
                preserveScroll: true,
                onSuccess: () => this.closeModal(),
                onError: () => {
                    if (this.$refs.passwordInput) {
                        this.$refs.passwordInput.focus();
                    }
                },
                onFinish: () => this.form.reset(),
            });
        },
        closeModal() {
            this.confirmingUserDeletion = false;
            this.form.reset();
        },
    },
};
</script>

