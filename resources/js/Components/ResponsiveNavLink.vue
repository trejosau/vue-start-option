<template>
    <Link :href="href" :class="classes">
        <slot />
    </Link>
</template>

<script>
import { computed } from 'vue';
import { Link } from '@inertiajs/vue3';

export default {
    name: 'NordResponsiveNavLink',
    components: { Link },
    props: {
        href: {
            type: String,
            required: true,
        },
        active: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        classes() {
            if (this.active) {
                return [
                    'block w-full pl-3 pr-4 py-2 border-l-4',
                    'border-ice',
                    'text-left text-base font-medium',
                    'text-ice bg-grayDark',
                    'focus:outline-none focus:text-teal focus:bg-grayMedium focus:border-teal',
                    'transition duration-150 ease-in-out',
                ].join(' ');
            } else {
                return [
                    'block w-full pl-3 pr-4 py-2 border-l-4 border-transparent',
                    'text-left text-base font-medium',
                    'text-grayLight hover:text-ice',
                    'hover:bg-grayMedium hover:border-grayMedium',
                    'focus:outline-none focus:text-ice focus:bg-grayMedium focus:border-grayMedium',
                    'transition duration-150 ease-in-out',
                ].join(' ');
            }
        },
    },
};
</script>
