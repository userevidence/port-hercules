<template>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.43759 17.7498C7.71681 16.0781 9.7325 15 12 15C14.2675 15 16.2832 16.0781 17.5624 17.7498C17.8055 17.5146 18.0336 17.2642 18.2454 17C16.7793 15.1711 14.5264 14 12 14C9.47363 14 7.22076 15.1711 5.75464 17C5.96639 17.2642 6.19456 17.5146 6.43759 17.7498Z" :fill="color1" />
        <path fill-rule="evenodd" clip-rule="evenodd" d="M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12H0C0 18.6274 5.37258 24 12 24C18.6274 24 24 18.6274 24 12H23Z" :fill="color1" />
        <path fill-rule="evenodd" clip-rule="evenodd" d="M12 9C13.6569 9 15 7.65685 15 6C15 4.34315 13.6569 3 12 3C10.3431 3 9 4.34315 9 6C9 7.65685 10.3431 9 12 9ZM12 10C14.2091 10 16 8.20914 16 6C16 3.79086 14.2091 2 12 2C9.79086 2 8 3.79086 8 6C8 8.20914 9.79086 10 12 10Z" :fill="color1" />
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