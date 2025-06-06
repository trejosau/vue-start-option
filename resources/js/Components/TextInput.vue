<template>
    <input
        ref="input"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        class="w-full px-3 py-2 bg-grayDark border border-grayMedium rounded-md shadow-sm text-fg focus:border-ice focus:ring-ice focus:ring-opacity-50 focus:outline-none transition ease-in-out duration-150"
    />
</template>

<script>
export default {
    name: 'TextInput',
    props: {
        modelValue: {
            type: String,
            default: '',
        },
    },
    emits: ['update:modelValue'],
    mounted() {
        if (this.$refs.input.hasAttribute('autofocus')) {
            this.$refs.input.focus();
        }
    },
    methods: {
        focus() {
            this.$refs.input.focus();
        },
    },
};
</script>
