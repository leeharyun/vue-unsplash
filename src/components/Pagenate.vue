<template>
  <!-- 자동으로 정렬 -->
  <ul :class="containerClass">
    <li v-if="firstLastButton" :class="[pageClass, firstPageSelected() ? disabledClass : '']">
      <a @click="selectFirstPage()" @keyup.enter="selectFirstPage()" :class="pageLinkClass" v-html="firstButtonText"></a>
    </li>

    <li v-if="!(firstPageSelected())" :class="[prevClass, firstPageSelected() ? disabledClass : '']">
      <a @click="prevPage()" @keyup.enter="prevPage()" :class="prevLinkClass" v-html="prevText"></a>
    </li>

    <li v-for="(page, index) in pages" :key="index" :class="[pageClass, page.selected ? activeClass : '', page.disabled ? disabledClass : '', page.breakView ? breakViewClass: '']">
      <a v-if="page.disabled" :class="pageLinkClass" >{{ page.content }}</a>
      <a v-else @click="handlePageSelected(page.index + 1)" @keyup.enter="handlePageSelected(page.index + 1)" :class="pageLinkClass" >{{ page.content }}</a>
    </li>

    <li v-if="!(lastPageSelected())" :class="[nextClass, lastPageSelected() ? disabledClass : '']">
      <a @click="nextPage()" @keyup.enter="nextPage()" :class="nextLinkClass" v-html="nextText"></a>
    </li>

    <li v-if="firstLastButton" :class="[pageClass, lastPageSelected() ? disabledClass : '']">
      <a @click="selectLastPage()" @keyup.enter="selectLastPage()" :class="pageLinkClass" v-html="lastButtonText"></a>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    value: {      // 선택 페이지 
      type: Number
    },
    pageCount: {  // 총 페이지 수
      type: Number,
      required: true
    },
    currentPage: {  // 선택 페이지
      type: Number
    },
    clickHandler: { // 클릭 시 작동되는 함수
      type: Function,
      default: () => { }
    },
    pageRange: {    // 보여지는 페이지 범위 
      type: Number,
      default: 3
    },
    marginPages: {  // 한번에 표여질 페이징 아이템 개수
      type: Number,
      default: 1
    },
    prevText: {     // 이전 버튼에 들어갈 문자
      type: String,
      default: 'Prev'
    },
    nextText: {     // 다음 버튼에 들어갈 문자
      type: String,
      default: 'Next'
    },
    containerClass: {  // 컨테이너에 지정될 클래스
      type: String
    },
    pageClass: {      // 페이징 li 태그에 지정될 클래스 
      type: String
    },
    pageLinkClass: {  // 페이징 li >a 태그에 지정될 클래스
      type: String
    },
    prevClass: {    // 이전 li 태그에 지정될 클래스
      type: String
    },
    prevLinkClass: {  // 이전 li > a 태그에 지정될 클래스
      type: String
    },
    nextClass: {    // 다음 li 태그에 지정될 클래스
      type: String
    },
    nextLinkClass: {  // 이전 li > a 태그에 지정될 클래스
      type: String
    },
    activeClass: {    // active 설정 클래스 (기본값은 active)
      type: String,
      default: 'active'
    },
    disabledClass: {  // disabled 설정 클래스 (기본값은 active)
      type: String,
      default: 'disabled'
    },
    firstLastButton: {  // 처음 또는 마지막 페이지로 갈 버튼
      type: Boolean,
      default: true
    },
    firstButtonText: {  // 처음 페이지로 갈 버튼에 지정될 문자
      type: String,
      default: '<<'
    },
    lastButtonText: { // 마지막 페이지로 갈 버튼에 지정될 문자
      type: String,
      default: '>>'
    }
  },
  beforeUpdate() {
    if (this.currentPage === undefined) return;
    if (this.currentPage !== this.selected) {
      this.selected = this.currentPage;
    }
  },
  computed: {
    selected: {
      get: function() {
        return this.value || this.innerValue;
      },
      set: function(newValue) {
        this.innerValue = newValue;
      }
    },
    pages: function () {
      let items = {};
      if (this.pageCount <= this.pageRange) {     // 총 페이지 수가 페이지 범위보다 작을 경우
        for (let index = 0; index < this.pageCount; index++) {
          let page = {
            index: index,
            content: index + 1,
            selected: index === (this.selected - 1)
          }
          items[index] = page;
        }
      } else {                                  // 총 페이지 수가 페이지 범위보다 클 경우
        let setPageItem = index => {
          let page = {
            index: index,
            content: index + 1,
            selected: index === (this.selected - 1)
          }

          items[index] = page;
        }
        this.pageLoop = (this.selected > this.pageLoop) ? this.pageLoop + this.marginPages : 
                        (this.startNum >= this.marginPages) ? this.pageLoop : this.marginPages;
                        
        for (let i = this.startNum; i < this.pageCount && i < this.pageLoop; i++) {
          setPageItem(i);
        }
      }
      return items;
    }
  },
  data() {
    return {
      innerValue: 1,
      pageLoop : 0,
      startNum : 0,
    }
  },
  methods: {
    handlePageSelected(selected) {
      if (this.selected === selected) return;

      this.innerValue = selected;
      this.$emit('input', selected);
      this.clickHandler(selected);
    },
    prevPage() {
      if (this.selected <= 1) return

      if(this.pageCount > this.marginPages && this.selected > this.marginPages){
        var prevNum = this.startNum - this.marginPages;
        this.startNum = prevNum;
        
        this.pageLoop = this.startNum + this.marginPages;
        this.handlePageSelected(prevNum + 1);
      }
      else{
        this.startNum = 0;
        this.handlePageSelected(1);
      }

    },
    nextPage() {
      if (this.selected >= this.pageCount) return;
      
      if(this.pageCount > this.marginPages && this.selected + this.marginPages < this.pageCount){
        this.startNum = (this.marginPages >= this.pageCount) ? this.startNum : this.startNum + this.marginPages;
        this.handlePageSelected(this.startNum + 1);
      }
      else{
        this.selectLastPage();
      }
    },
    firstPageSelected() {
      return this.selected === 1;
    },
    lastPageSelected() {
      return (this.selected === this.pageCount) || (this.pageCount === 0);
    },
    // 첫페이지로 이동
    selectFirstPage() {
      if (this.selected <= 1) return;
      
      this.startNum = 0;
      this.handlePageSelected(1);
    },
    // 마지막 페이지로 이동
    selectLastPage() {
      if (this.selected >= this.pageCount) return;
      
      var remainder = this.pageCount % this.marginPages;
      this.startNum = (this.marginPages >= this.pageCount) ? this.startNum : 
                      (this.pageCount - remainder === this.pageCount) ? this.pageCount - this.marginPages : this.pageCount - remainder;
      this.pageLoop = this.pageCount;
      this.handlePageSelected(this.pageCount)
    }
  }
}
</script>

<style lang="css" scoped>
    a {
        cursor: pointer;
    }
    .disabled {
        pointer-events: none;
    }
    .disabled a {
        background-color: #F6F6F6 !important;
    }
</style>