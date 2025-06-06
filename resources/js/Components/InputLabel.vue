<template>
    <label class="block font-medium text-sm text-fg">
        <span v-if="value">{{ value }}</span>
        <span v-else><slot /></span>
    </label>
</template>

<script>
export default {
    name: 'NordInputLabel',
    props: {
        value: {
            type: String,
            default: '',
        },
    },
};
</script>
