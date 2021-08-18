<template>
    <div class="image-container__item">
        <div class="image-area">
            <a href="javascript:;">
                <img :src="image.urls.thumb" :alt="image.alt_description" />
            </a>
        </div>
        <div>
            <ul class="image-info">
                <li class="image-info__name">
                    <span class="name">{{image.user.name}}</span>
                </li>
                <li :class="(image.liked_by_user) ? 'image-info__like active' : 'image-info__like'" @click="likeImageAction(image.id)">
                    <a href="javascript:;">
                        <i class="like"></i>
                        {{image.likes}}
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    props : {
        image: {
            type: Object,
            required: true
        }
    },
    methods : {
        likeImageAction(id) {
            this.$store.dispatch('unsplash/likeImageAction', id);
        }
    }
}
</script>