<template>
auth
</template>
<script>
export default {
    created(){
        if(this.$route.query.code) {
            let code = this.$route.query.code;
            this.$store.dispatch('unsplash/setToken', code).then((res) => {
                console.log(res);
            });
        }
    },
}
</script>