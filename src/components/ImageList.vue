<template>
    <div class="serach-box">
        <ul>
            <li class="search-area">
                <input type="text" class="search-input" v-model="keyword"/>
            </li>
            <li class="search" data-type="on-search" @click="serachAction()">
                <a href="javascript:;">
                    <i class="ic-search"></i>
                </a>
            </li>
        </ul>
    </div>
    <div class="image-container">
        <Image :image="image" v-for="image in Images.images" :key="image.id" @onlikeImageAction="likeImageAction(id)"/>
    </div>
    <div class="paging" v-if="Images.totalImages > 1">
        <Pagenate
        v-model="currentPage"
            :page-count="Math.floor(Images.totalImages / Images.per_page)"
            :margin-pages="Images.totalImages > marginPage ? marginPage : Images.totalImages"
            :prev-text="'<'"
            :next-text="'>'"
            :container-class="'pagination'"
            :forcePage="currentPage"
            :page-class="'page-item'"
            :page-link-class="'page-link-item'"
            :prev-class="'prev-item'"
            :prev-link-class="'prev-link-item'"
            :next-class="'next-item'"
            :next-link-class="'next-link-item'"
            :disabled-class="'disabled'"
            :click-handler="pageAction"
        ></Pagenate>
    </div>
</template>
<script>
import Image from './Image.vue';
import Pagenate from './Pagenate.vue'; 

export default {
    components : {
        Image,
        Pagenate,
    },
    data(){
        return {
            keyword : null, 
            currentPage : 1,
            marginPage : 5
        }
    },
    computed: {
        Images(){
            return this.$store.state.unsplash;
        }
    },
    watch : {
        keyword(newKeyword){
            console.log(newKeyword);
            this.serachAction();
        }
    },
    created(){
        this.getImages();
    },
    methods : {
        pageAction(currentPage){
            this.currentPage = currentPage;
            if(this.keyword) {
                this.serachAction();
            }
            else {
                this.getImages();
            }

            document.scrollingElement.scrollTop = 0
        },
        getImages(){
            this.$store.dispatch('unsplash/getImages', { page : this.currentPage });
        },
        serachAction(){
            if(!this.keyword) {
                this.getImages();
                return;
            }
            this.$store.dispatch('unsplash/getSearchImages', { page : this.currentPage, query: this.keyword });
        },
    }
}
</script>