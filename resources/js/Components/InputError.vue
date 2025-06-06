<template>
    <div v-if="message">
        <p class="text-sm text-blush">
            {{ message }}
        </p>
    </div>
</template>

<script>
export default {
    name: 'InputError',
    props: {
        message: {
            type: String,
            default: '',
        },
    },
};
</script>
