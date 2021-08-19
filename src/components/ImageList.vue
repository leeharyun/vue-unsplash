<template>
    <div class="serach-box">
        <ul>
            <li class="search-area">
                <input type="text" class="search-input" v-model="keyword" @keyup.enter="serachAction(0)"/>
            </li>
            <li class="search" data-type="on-search" @click="serachAction(0)">
                <a href="javascript:;">
                    <i class="ic-search"></i>
                </a>
            </li>
        </ul>
    </div>
    <div class="loader" v-if="Images.loadState === LOAD_STATE.LOADING"></div>

    <div class="image-container" v-if="Images.loadState === LOAD_STATE.SUCCESS">
        <Image :image="image" v-for="image in Images.images" :key="image.id" />
    </div>
    
    <div class="paging">
        <Pagenate
        v-model="currentPage"
            :page-count="Math.floor(Images.totalImages / Images.per_page)"
            :margin-pages="Images.totalImages > marginPage ? marginPage : Images.totalImages"
            :prev-text="'<'"
            :next-text="'>'"
            :container-class="'pagination'"
            :currentPage="currentPage"
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
import partials from '@/store/partials'

export default {
    components : {
        Image,
        Pagenate,
    },
    data(){
        return {
            keyword : null, 
            currentPage : 1,
            marginPage : 5,
            ...partials
        }
    },
    computed: {
        Images(){
            return this.$store.state.unsplash;
        }
    },
    // 검색창에서 @keyup과 동일한 효과를 원하시면 주석을 해제해주세요
    /*watch : {
        keyword(newKeyword){
            this.serachAction();
        }
    },*/
    created(){
        this.getImages();
    },
    methods : {
        pageAction(currentPage){
            this.currentPage = currentPage;
            if(this.keyword) {
                this.serachAction(1);
            }
            else {
                this.getImages();
            }

            document.scrollingElement.scrollTop = 0;
        },
        getImages(){
            this.$store.dispatch('unsplash/getImages', { page : this.currentPage });
        },
        serachAction(type = 0){
            ((type) ? '' : this.currentPage = 1);

            if(!this.keyword) {
                this.currentPage = 1;
                this.getImages();
                return;
            }
            this.$store.dispatch('unsplash/getSearchImages', { page : this.currentPage, query: this.keyword });
        },
    }
}
</script>