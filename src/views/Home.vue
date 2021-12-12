<template>
  <div>
    <div class="home">
      <div class="home-background">
        <transition name="backgroundResolve" mode="out-in">
          <img :src="imgSrc()" :key="imgSrc()" />
        </transition>
      </div>

      <div class="logo-box">
        <img
          src="./../assets/index_icon/logo_white.svg"
          @click="changeImegeTimer()"
        />
      </div>

      <div class="menu" @click="showFn()">
        <img
          class="cancel"
          src="./../assets/index_icon/cancel-icon.svg"
          v-if="this.isShow"
        />
        <svg viewBox="0 0 100 80" v-if="!this.isShow">
          <rect width="100" height="5"></rect>
          <rect y="30" width="100" height="5"></rect>
          <rect y="60" width="100" height="5"></rect>
        </svg>
      </div>

      <div class="rooms-block" :class="{ hide: !this.isShow }">
        <ul v-if="rooms">
          <!-- 綁定class 如果傳進去的index === currentImg 就active -->
          <li
            class="room-btn"
            :class="{ active: activeBtn(index) }"
            v-for="(room, index) in rooms"
            :key="index"
            @click.prevent="onRoomClick(room.id)"
            @mouseenter="onEnterRoom(index, room.name)"
          >
            {{ room.name }}
          </li>
        </ul>
      </div>

      <div class="room-num" v-if="rooms">
        <transition name="backgroundResolve" mode="out-in">
          <p class="num" :key="this.menuKey">{{ this.menuKey }}</p>
        </transition>
        <transition name="backgroundResolve" mode="out-in">
          <div class="room-intro" :key="this.roomName">
            {{ this.roomName }}
          </div>
        </transition>
      </div>
      <div class="hotel-info">
        <div class="social-network">
          <div class="fb">
            <img src="./../assets/index_icon/facebook-square-brands.svg" />
          </div>
          <div class="ig">
            <img src="./../assets/index_icon/instagram-brands.svg" />
          </div>
        </div>
        <div class="info-content">
          <div class="phone">
            <img src="./../assets/index_icon/phone-alt-solid.svg" />
            <p>02-12345678</p>
          </div>
          <div class="email">
            <img src="./../assets/index_icon/envelope-solid.svg" />
            <p>kaman6540fin@gmail.com.tw</p>
          </div>
          <div class="address">
            <img src="./../assets/index_icon/home-solid.svg" />
            <p>台北市信義區信義路000號</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from "@/store";

export default {
  name: "home",
  data() {
    return {
      isShow: false,
      currentImg: 0,
      index: 0,
      timer: null,
      roomImageUrl: "",
      roomName: "Single Room",
      menuKey: "01",
      loading: false,
    };
  },
  created() {
    store.dispatch("getRoomsInfo");
  },
  mounted() {
    this.startTimer();
  },
  computed: {
    rooms() {
      return store.state.rooms;
    },
    urlArray() {
      //把所有圖片連結都放在一個array
      let url = [];
      this.rooms.forEach((room) => {
        url.push(room.imageUrl);
      });
      return url;
    },

    nameArray() {
      //把所有圖片連結都放在一個array
      let name = [];
      this.rooms.forEach((room) => {
        name.push(room.name);
      });
      return name;
    },
  },
  methods: {
    showFn() {
      this.isShow = !this.isShow;
    },
    activeBtn(index) {
      // console.log(index)
      if (this.currentImg === index) {
        return true;
      } else {
        return false;
      }
    },

    imgSrc() {
      //控制顯示圖片 return this.roomImageUrl;
      if (this.index > this.urlArray.length - 1) {
        this.index = 0;
      }

      this.currentImg = this.index;

      if (!this.roomImageUrl) {
        this.roomImageUrl = this.urlArray[0];
      }

      let display = this.index + 1;
      if (display < 10) {
        this.menuKey = "0" + display;
      } else {
        this.menuKey = display;
      }

      this.roomName = this.nameArray[this.index];

      this.roomImageUrl = this.urlArray[this.index];
      return this.roomImageUrl;
    },
    update() {
      //控制更新
      this.index++;

      //調用imgSrc() return roomImageUrl
      this.imgSrc();
      // ;
    },
    stopTimer() {
      //關閉自動播放背景
      // console.log("closed");
      window.clearInterval(this.timer); //關閉自動播放背景
      this.timer = null;
    },
    startTimer() {
      //開啟自動播放背景
      if (!this.timer) {
        this.timer = window.setInterval(() => {
          this.update();
        }, 3000);
      }
    },
    onRoomClick(roomId) {
      this.$router.push({ name: "room", params: { id: roomId } });
    },
    onEnterRoom(index, name) {
      let display = index + 1;
      this.stopTimer();

      this.index = index;
      this.imgSrc();

      //顯示index在畫面,並補0
      if (display < 10) {
        this.menuKey = "0" + display;
      } else {
        this.menuKey = display;
      }

      this.roomName = name;
      this.startTimer();
      // console.log(roomImageUrl, index);
    },
  },
};
</script>

<style scoped>
@import "./Home.css";
</style>
