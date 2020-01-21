<template>
    <li>{{name}}</li>
</template>

<script>
export default {
    props: {
        name: {
            type: String,
            required: true
        }
    }
}
</script>

<style>

</style>