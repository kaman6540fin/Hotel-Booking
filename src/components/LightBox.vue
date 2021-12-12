<template>
  <div>
    <div class="lightBox" @touchmove.prevent @mousewheel.prevent>
      <div class="btn-left" @click.stop="leftImg()">〈</div>
      <div class="imgBox">
        <img :src="mainImg()" />
      </div>
      <div class="btn-right" @click.stop="rightImg()">〉</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "lightBox",
  data() {
    return {
      index: 0,
    };
  },
  props: {
    imgArr: {
      type: Array,
    },
  },

  methods: {
    mainImg() {
      if (this.index >= this.imgArr.length) {
        this.index = 0;
      }

      if (this.index < 0) {
        this.index = this.imgArr.length - 1;
      }
      return this.imgArr[this.index];
    },
    leftImg() {
      this.index--;
      this.mainImg();
      console.log(this.index);
    },
    rightImg() {
      this.index++;
      this.mainImg();
      console.log(this.index);
    },
    goback() {
      this.$router.back();
    },
  },
};
</script>

<style scoped>
.lightBox {
  position: fixed;
  width: 100vw;
  top: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.lightBox .btn-left,
.lightBox .btn-right {
  margin: 0 5vw;
  text-align: center;
  font-size: 4vw;
  color: #fff;
  font-weight: 300;
  cursor: pointer;
}

.lightBox .imgBox {
  width: 70vw;
  height: 40vw;
  background-color: #fff;
}

.lightBox .imgBox img {
  display: block;
  margin: 0 auto;
  height: 100%;
}

@media screen and (max-width: 768px) {
  .lightBox .btn-left {
    position: absolute;
    left: 0;
    font-size: 40px;
    margin: 0;
  }

  .lightBox .btn-right {
    position: absolute;
    right: 0;
    font-size: 40px;
    margin: 0;
  }

  .lightBox .imgBox {
    width: 100vw;
    height: 60vh;
    object-position: center center;
  }

  .lightBox .imgBox img {
    width: 100%;
    height: 60vh;
    object-fit: cover;
    object-position: center center;
  }
}
</style>
