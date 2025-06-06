<template>
    <button
        :type="type"
        class="inline-flex items-center px-4 py-2 bg-blush border border-transparent rounded-md font-semibold text-xs text-bg uppercase tracking-widest hover:bg-butter active:bg-grayMedium focus:outline-none focus:ring-2 focus:ring-blush focus:ring-offset-2 transition ease-in-out duration-150"
    >
        <slot />
    </button>
</template>

<script>
export default {
    name: 'NordButton',
    props: {
        type: {
            type: String,
            default: 'submit',
        },
    },
};
</script>
