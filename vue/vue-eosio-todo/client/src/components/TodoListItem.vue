<template>
    <li class="list-group-item" @click="toggle()" :class="{done: done}">{{name}}</li>
</template>

<script>
export default {
    props: {
        id: {
            type: Number,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        done: {
            type: Boolean,
            required: true
        }
    },
    methods: {
        toggle() {
            console.log("call toggleitem");
            this.$emit("toggle", this.id);
        }
    }
}
</script>

<style scoped>
    .done {
        text-decoration: line-through
    }
</style>