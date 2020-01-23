<template>
    <li :class="{done: done}">{{name}}</li>
</template>

<script>
export default {
    props: {
        name: {
            type: String,
            required: true
        },
        done: {
            type: Boolean,
            required: true
        }
    }
}
</script>

<style scoped>
    .done {
        text-decoration: line-through
    }
</style>