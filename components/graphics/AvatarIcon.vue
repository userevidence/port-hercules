<template>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.43758 17.7498C7.7168 16.0781 9.73249 15 12 15C14.2675 15 16.2832 16.0781 17.5624 17.7498C17.8054 17.5146 18.0336 17.2642 18.2454 17C16.7792 15.1711 14.5264 14 12 14C9.47361 14 7.22074 15.1711 5.75462 17C5.96638 17.2642 6.19455 17.5146 6.43758 17.7498Z" fill="#FF5500" />
        <path fill-rule="evenodd" clip-rule="evenodd" d="M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12H0C0 18.6274 5.37258 24 12 24C18.6274 24 24 18.6274 24 12H23Z" fill="#FF5500" />
        <circle cx="12" cy="6" r="3.5" stroke="#FF5500" />
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