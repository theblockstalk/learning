<template>
    <div>
        <h1>Heading</h1>
        <ul>
            <li>item 1</li>
            <li>{{quote}}</li>
        </ul>
    </div>  
</template>

<script>
export default {
    name: "EventCard",
    data() {
        return {
            quote: "this is a quote"
        }
    }

}
</script>

<style>

</style>