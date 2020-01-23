<template>
    <li>{{name}}</li>
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

<style>

</style>