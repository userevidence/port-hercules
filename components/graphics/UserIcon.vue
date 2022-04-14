<template>
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="6" cy="2" r="2" fill='hsl(200, 24%, 80%)' />
        <path d="M1 12V10C1 7.79086 2.79086 6 5 6H7C9.20914 6 11 7.79086 11 10V12H1Z" fill='hsl(200, 24%, 80%)' />
    </svg>
</template>
<script>
export default {
    props: ['brand_color_1'],
    computed: {
        color1() {
            return this.brand_color_1 || '#850AFF'
        }
    }
}
</script>
<style lang='sass' scoped>
</style>