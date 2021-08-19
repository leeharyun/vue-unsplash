<template>
로그인 중 입니다.
</template>
<script>
export default {
    created(){
        if(this.$route.query.code) {
            let code = this.$route.query.code;
            this.$store.dispatch('unsplash/setToken', code);
        }
    },
}
</script>