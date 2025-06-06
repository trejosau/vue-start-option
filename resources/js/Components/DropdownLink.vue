<template>
    <Link
        v-bind="$attrs"
        class="block w-full px-4 py-2 text-left text-sm leading-5 text-fg hover:bg-grayMedium focus:outline-none focus:bg-grayMedium transition duration-150 ease-in-out"
    >
        <slot />
    </Link>
</template>

<script>
import { Link } from '@inertiajs/vue3';

export default {
    name: 'NordDropdownLink',
    components: { Link },
    inheritAttrs: true, // Para que `href` u otros atributos pasen automáticamente al <Link>
};
</script>
