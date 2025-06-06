<template>
    <div class="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-bg text-fg">
        <div>
            <Link href="/">
                <ApplicationLogo class="w-20 h-20 text-fg" />
            </Link>
        </div>

        <div
            class="w-full sm:max-w-md mt-6 px-6 py-4 bg-grayMedium shadow-md overflow-hidden sm:rounded-lg"
        >
            <slot />
        </div>
    </div>
</template>

<script>
import ApplicationLogo from '@/Components/ApplicationLogo.vue';
import { Link } from '@inertiajs/vue3';

export default {
    name: 'GuestLayout',
    components: {
        Link,
        ApplicationLogo,
    },
};
</script>
