<template>
  <div>
    <div class="room" v-if="roomInfo.name">
      <div class="logo" @click="goback()">
        <img src="./../assets/index_icon/logo_block.svg" />
      </div>
      <div class="room-imgs" @click.stop="boxToggle()">
        <div class="img-big">
          <img :src="roomInfo.imageUrl[0]" />
        </div>
        <div class="img-side">
          <div class="top"><img :src="roomInfo.imageUrl[1]" /></div>
          <div class="bottom"><img :src="roomInfo.imageUrl[2]" /></div>
        </div>
      </div>

      <div class="room-information">
        <div class="room-text-box">
          <div class="room-name">
            {{ roomInfo.name }}
          </div>
          <div class="descriptionShort">
            <div class="guest">
              房客人數限制：
              {{ roomInfo.descriptionShort.GuestMin }}～{{
                roomInfo.descriptionShort.GuestMax
              }}
              人
            </div>
            <div class="bed">床型：{{ roomInfo.descriptionShort.Bed[0] }}</div>
            <div class="beth">
              衛浴數量：{{ roomInfo.descriptionShort["Private-Bath"] }}間
            </div>
            <div class="footage">
              房間大小：{{ roomInfo.descriptionShort.Footage }}坪
            </div>
          </div>
          <div class="description">
            <p>{{ roomInfo.description }}</p>
          </div>
          <div class="br">＼＼＼</div>
          <div class="check">
            <div class="check-in">
              <h6>Check-in</h6>
              <p>
                {{ roomInfo.checkInAndOut.checkInEarly }} —
                {{ roomInfo.checkInAndOut.checkInLate }}
              </p>
            </div>
            <div class="check-out">
              <h6>Check-out</h6>
              <p>{{ roomInfo.checkInAndOut.checkOut }}</p>
            </div>
          </div>
          <div class="amenities">
            <ul class="amenities-list">
              <li :class="{ active: roomInfo.amenities['Wi-Fi'] }">
                <img src="./../assets/info_icon/wifi.svg" /> Wi-Fi
              </li>
              <li :class="{ active: roomInfo.amenities['Television'] }">
                <img src="./../assets/info_icon/phone.svg" /> Phone
              </li>
              <li :class="{ active: roomInfo.amenities['Great-View'] }">
                <img src="./../assets/info_icon/mountain-range.svg" /> great
                view
              </li>
              <li :class="{ active: roomInfo.amenities['Breakfast'] }">
                <img src="./../assets/info_icon/breakfast.svg" /> breakfast
              </li>
              <li :class="{ active: roomInfo.amenities['Air-Conditioner'] }">
                <img src="./../assets/info_icon/breeze.svg" /> air conditioner
              </li>
              <li :class="{ active: roomInfo.amenities['Smoke-Free'] }">
                <img src="./../assets/info_icon/no-smoke-symbol.svg" /> smoke
                free
              </li>
              <li :class="{ active: roomInfo.amenities['Mini-Bar'] }">
                <img src="./../assets/info_icon/bar.svg" /> mini bar
              </li>
              <li :class="{ active: roomInfo.amenities['Refrigerator'] }">
                <img src="./../assets/info_icon/refIcon.svg" /> refrigerator
              </li>
              <li :class="{ active: roomInfo.amenities['Child-Friendly'] }">
                <img src="./../assets/info_icon/crawling-baby-silhouette.svg" />
                child-friendly
              </li>
              <li :class="{ active: roomInfo.amenities['Room-Service'] }">
                <img src="./../assets/info_icon/room_service.svg" /> room
                service
              </li>
              <li :class="{ active: roomInfo.amenities['Sofa'] }">
                <img src="./../assets/info_icon/sofaIcon.svg" /> sofa
              </li>
              <li :class="{ active: roomInfo.amenities['Pet-Friendly'] }">
                <img src="./../assets/info_icon/dog.svg" /> pet-friendly
              </li>
            </ul>
          </div>
        </div>
        <div class="room-information-block"></div>
        <div class="price">
          <div class="normalPrice">
            NT.{{ roomInfo.normalDayPrice }}
            <p class="sub">平日（一～四）</p>
          </div>
          <div class="holidayPrice">
            NT.{{ roomInfo.holidayPrice }} &thinsp;
            <p class="sub">假日（五～日）</p>
          </div>
        </div>
        <div class="reservation">
          <date-picker
            v-model="checkInOutArray"
            value-type="format"
            inline
            range
            :disabled-date="disabledBeforeToday"
            :lang="lang"
          ></date-picker>
          <div class="reservation-confirm-btn" @click="reservation">
            預約時段
          </div>
          <div
            class="reservation-confirm-btn float-right"
            @click.prevent="clearAPI" 
            v-if="false"
          >
            清除預約日期
          </div>
        </div>
      </div>

      <router-view></router-view>
    </div>

    <transition name="lightBox">
      <div class="lightBox" v-if="isOpen" @click.stop="boxToggle()">
        <LightBox :imgArr="roomInfo.imageUrl" />
      </div>
    </transition>
    <Loading v-if="!roomInfo.name || isLoading" />
  </div>
</template>

<script>
import Axios from "axios";
import store from "@/store";
import Loading from "@/components/Loading.vue";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import "vue2-datepicker/locale/zh-cn";
import LightBox from "../components/LightBox.vue";

export default {
  name: "room",
  data() {
    return {
      isOpen: false,
      lang: {
        formatLocale: {
          firstDayOfWeek: 1,
        },
        yearFormat: "YYYY",
        monthFormat: "MM",
      },
      isLoading: false,
      roomId: this.$route.params.id,
      currImageIdx: 0,
      checkInOutArray: [],
    };
  },
  created() {
    this.isLoading = true;
    // get room details.
    store.dispatch("getRoomDetail", { roomId: this.roomId }).then(() => {
      setTimeout(() => {
        this.isLoading = false;
      }, 1700);
    });
  },
  computed: {
    roomInfo() {
      return store.state.currentRoomInfo;
    },

    headers() {
      return store.state.currentRoomInfo;
    },
    getcheckInDay() {
      const checkInDay = this.checkInOutArray[0];

      return checkInDay;
    },
    getcheckOutDay() {
      const checkOutDay = this.checkInOutArray[1];
      return checkOutDay;
    },
  },
  methods: {
    clearAPI() {
      Axios.delete(
        "https://challenge.thef2e.com/api/thef2e2019/stage6/rooms",
        store.state.headers
      )
        .then((response) => {
          alert("已清除！");
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    boxToggle() {
      this.isOpen = !this.isOpen;
    },
    reservation() {
      const checkIn = this.getcheckInDay;
      const checkOut = this.getcheckOutDay;
      const nights = this.calNights();
      const holiday = this.calNights()[0];
      const normalday = this.calNights()[1];
      const roomId = this.roomId;
      const roomName = this.roomInfo.name;
      const total =
        this.roomInfo.normalDayPrice * normalday +
        this.roomInfo.holidayPrice * holiday;
      let date = [];
      date.push(checkIn, checkOut);
      store.commit("setReservationDetail", {
        checkIn,
        checkOut,
        nights,
        holiday,
        normalday,
        total,
        roomId,
        roomName,
        date,
      });
      this.$router.push(`/room/${this.roomId}/reservation`);
    },

    calNights() {
      const checkInDay = new Date(this.checkInOutArray[0]);
      const checkOutDay = new Date(this.checkInOutArray[1]);

      const nightsTimeStamp = checkOutDay - checkInDay;
      const nights = nightsTimeStamp / (24 * 60 * 60 * 1000);
      const nightArr = [];
      let holidays = 0;
      let normaldays = 0;

      for (let i = 1; i <= nights; i++) {
        let day = new Date(
          this.converter(checkInDay.getTime() + 1000 * 60 * 60 * 24 * i)
        );

        day.getDay() === 0 || day.getDay() === 6
          ? (holidays += 1)
          : (normaldays += 1);
      }

      nightArr.push(holidays, normaldays);

      return nightArr;
    },
    disabledBeforeToday(date) {
      const day = new Date(date).getTime();
      const today = new Date();
      // const day1 = new Date(this.roomInfo.disabledDates);
      // console.log(this.roomInfo.disabledDates);

      return (
        day < today || day > new Date(today.getTime() + 90 * 24 * 3600 * 1000)
      );
      // const day = new Date(date).getDay();
      // return day === 0 || day === 6;
    },
    converter(value) {
      const dt = new Date(value);
      const month =
        dt.getMonth() + 1 < 10
          ? `0${String(dt.getMonth() + 1)}`
          : dt.getMonth() + 1;
      const date =
        dt.getDate() < 10 ? `0${String(dt.getDate())}` : dt.getDate();
      return `${dt.getFullYear()}-${month}-${date}`;
    },
    goback() {
      this.$router.push("/");
    },
  },
  components: {
    Loading,
    DatePicker,
    LightBox,
  },
};
</script>

<style scoped>
@import "./Room.css";
</style>
