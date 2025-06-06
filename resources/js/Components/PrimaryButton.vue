<template>
    <button
        :type="type"
        class="inline-flex items-center px-4 py-2 bg-grayMedium border border-transparent rounded-md font-semibold text-xs text-fg uppercase tracking-widest hover:bg-grayDark active:bg-bg focus:outline-none focus:ring-2 focus:ring-ice focus:ring-offset-2 transition ease-in-out duration-150"
    >
        <slot />
    </button>
</template>

<script>
export default {
    name: 'PrimaryButton',
    props: {
        type: {
            type: String,
            default: 'submit',
        },
    },
};
</script>
