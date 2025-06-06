<template>
    <input
        type="checkbox"
        :value="value"
        v-model="proxyChecked"
        class="rounded border-grayMedium text-ice shadow focus:ring-ice focus:ring-opacity-50 bg-grayDark"
    />
</template>

<script>
export default {
    name: 'Checkbox',
    props: {
        checked: {
            type: [Array, Boolean],
            default: false,
        },
        value: {
            default: null,
        },
    },
    emits: ['update:checked'],
    computed: {
        proxyChecked: {
            get() {
                return this.checked;
            },
            set(val) {
                this.$emit('update:checked', val);
            },
        },
    },
};
</script>
