<template>
    <section class="space-y-6">
        <header>
            <h2 class="text-lg font-medium text-fg">Delete Account</h2>

            <p class="mt-1 text-sm text-grayLight">
                Once your account is deleted, all of its resources and data will be permanently deleted. Before deleting
                your account, please download any data or information that you wish to retain.
            </p>
        </header>

        <DangerButton @click="confirmUserDeletion">Delete Account</DangerButton>

        <Modal :show="confirmingUserDeletion" @close="closeModal">
            <div class="p-6 bg-grayMedium rounded-lg">
                <h2 class="text-lg font-medium text-fg">
                    Are you sure you want to delete your account?
                </h2>

                <p class="mt-1 text-sm text-grayLight">
                    Once your account is deleted, all of its resources and data will be permanently deleted. Please
                    enter your password to confirm you would like to permanently delete your account.
                </p>

                <div class="mt-6">
                    <InputLabel for="password" value="Password" class="sr-only" />

                    <TextInput
                        id="password"
                        ref="passwordInput"
                        v-model="form.password"
                        type="password"
                        class="mt-1 block w-3/4"
                        placeholder="Password"
                        @keyup.enter="deleteUser"
                    />

                    <InputError :message="form.errors.password" class="mt-2" />
                </div>

                <div class="mt-6 flex justify-end">
                    <SecondaryButton @click="closeModal">Cancel</SecondaryButton>

                    <DangerButton
                        class="ml-3"
                        :class="{ 'opacity-25': form.processing }"
                        :disabled="form.processing"
                        @click="deleteUser"
                    >
                        Delete Account
                    </DangerButton>
                </div>
            </div>
        </Modal>
    </section>
</template>

<script>
import DangerButton from '@/Components/DangerButton.vue';
import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import SecondaryButton from '@/Components/SecondaryButton.vue';
import TextInput from '@/Components/TextInput.vue';
import Modal from '@/Components/Modal.vue';

export default {
    name: 'DeleteUserForm',
    components: {
        DangerButton,
        InputError,
        InputLabel,
        SecondaryButton,
        TextInput,
        Modal,
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
        deleteUser() {
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
