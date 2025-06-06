<template>
    <div v-if="message">
        <p class="text-sm text-blush">
            {{ message }}
        </p>
    </div>
</template>

<script>
export default {
    name: 'NordInputError',
    props: {
        message: {
            type: String,
            default: '',
        },
    },
};
</script>
