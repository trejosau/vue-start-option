<template>
    <section>
        <header>
            <h2 class="text-lg font-medium text-fg">Update Password</h2>
            <p class="mt-1 text-sm text-grayLight">
                Ensure your account is using a long, random password to stay secure.
            </p>
        </header>

        <form @submit.prevent="updatePassword" class="mt-6 space-y-6">
            <!-- Current Password Field -->
            <div>
                <NordInputLabel for="current_password" value="Current Password" />

                <NordTextInput
                    id="current_password"
                    ref="currentPasswordInput"
                    v-model="form.current_password"
                    type="password"
                    class="mt-1 block w-full"
                    autocomplete="current-password"
                />

                <NordInputError :message="form.errors.current_password" class="mt-2" />
            </div>

            <!-- New Password Field -->
            <div>
                <NordInputLabel for="password" value="New Password" />

                <NordTextInput
                    id="password"
                    ref="passwordInput"
                    v-model="form.password"
                    type="password"
                    class="mt-1 block w-full"
                    autocomplete="new-password"
                />

                <NordInputError :message="form.errors.password" class="mt-2" />
            </div>

            <!-- Confirm Password Field -->
            <div>
                <NordInputLabel for="password_confirmation" value="Confirm Password" />

                <NordTextInput
                    id="password_confirmation"
                    v-model="form.password_confirmation"
                    type="password"
                    class="mt-1 block w-full"
                    autocomplete="new-password"
                />

                <NordInputError :message="form.errors.password_confirmation" class="mt-2" />
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
import { ref } from 'vue';
import NordInputError from '@/Components/NordInputError.vue';
import NordInputLabel from '@/Components/NordInputLabel.vue';
import NordPrimaryButton from '@/Components/NordPrimaryButton.vue';
import NordTextInput from '@/Components/NordTextInput.vue';
import { useForm } from '@inertiajs/vue3';

export default {
    name: 'UpdatePassword',
    components: {
        NordInputError,
        NordInputLabel,
        NordPrimaryButton,
        NordTextInput,
    },
    data() {
        return {
            form: this.$inertia.form({
                current_password: '',
                password: '',
                password_confirmation: '',
            }),
        };
    },
    methods: {
        async updatePassword() {
            this.form.processing = true;
            this.form.errors = {};

            try {
                await this.form.put(route('password.update'), {
                    preserveScroll: true,
                    onSuccess: () => this.form.reset(),
                    onError: () => {
                        if (this.form.errors.password) {
                            this.form.reset('password', 'password_confirmation');
                            this.$refs.passwordInput.focus();
                        }
                        if (this.form.errors.current_password) {
                            this.form.reset('current_password');
                            this.$refs.currentPasswordInput.focus();
                        }
                    },
                });
            } catch (error) {
                // No additional handling needed; Inertia sets form.errors
            } finally {
                this.form.processing = false;
            }
        },
    },
};
</script>

