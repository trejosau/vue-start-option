<template>
    <Head :title="'Profile'" />

    <AuthenticatedLayout>
        <template #header>
            <h2 class="font-semibold text-xl text-fg leading-tight">Profile</h2>
        </template>

        <div class="py-12">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                <div class="p-4 sm:p-8 bg-grayMedium shadow sm:rounded-lg">
                    <UpdateProfileInformationForm
                        :must-verify-email="mustVerifyEmail"
                        :status="status"
                        class="max-w-xl"
                    />
                </div>

                <div class="p-4 sm:p-8 bg-grayMedium shadow sm:rounded-lg">
                    <UpdatePasswordForm class="max-w-xl" />
                </div>

                <div class="p-4 sm:p-8 bg-grayMedium shadow sm:rounded-lg">
                    <DeleteUserForm class="max-w-xl" />
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>

<script>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import UpdateProfileInformationForm from '@/Pages/Profile/Partials/UpdateProfileInformationForm.vue';
import UpdatePasswordForm from '@/Pages/Profile/Partials/UpdatePasswordForm.vue';
import DeleteUserForm from '@/Pages/Profile/Partials/DeleteUserForm.vue';
import { Head } from '@inertiajs/vue3';

export default {
    name: 'ProfileIndex',
    components: {
        Head,
        AuthenticatedLayout,
        UpdateProfileInformationForm,
        UpdatePasswordForm,
        DeleteUserForm,
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
};
</script>
