<template>
    <Head :title="'Dashboard'" />

    <AuthenticatedLayout>
        <template #header>
            <h2 class="font-semibold text-xl text-fg leading-tight">Dashboard</h2>
        </template>

        <div class="py-12">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div class="bg-grayMedium overflow-hidden shadow-sm sm:rounded-lg">
                    <div class="p-6 text-fg">You're logged in!</div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>

<script>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head } from '@inertiajs/vue3';

export default {
    name: 'Dashboard',
    components: {
        Head,
        AuthenticatedLayout,
    },
};
</script>
