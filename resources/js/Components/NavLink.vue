<template>
    <Link :href="href" :class="navClasses">
        <slot />
    </Link>
</template>

<script>
import { computed } from 'vue';
import { Link } from '@inertiajs/vue3';

export default {
    name: 'NordNavLink',
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
        navClasses() {
            if (this.active) {
                return [
                    'inline-flex items-center px-1 pt-1 border-b-2',
                    'border-ice',
                    'text-sm font-medium leading-5',
                    'text-ice',
                    'focus:outline-none focus:border-teal',
                    'transition duration-150 ease-in-out',
                ].join(' ');
            } else {
                return [
                    'inline-flex items-center px-1 pt-1 border-b-2',
                    'border-transparent',
                    'text-sm font-medium leading-5',
                    'text-grayLight hover:text-ice hover:border-grayMedium',
                    'focus:outline-none focus:text-ice focus:border-grayMedium',
                    'transition duration-150 ease-in-out',
                ].join(' ');
            }
        },
    },
};
</script>

