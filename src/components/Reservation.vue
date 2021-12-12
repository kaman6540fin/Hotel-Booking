<template>
  <div class="reservationBg" @touchmove.prevent @mousewheel.prevent>
    <div class="reservationBox">
      <h2 class="title">預約時段</h2>
      <div class="br">＼＼＼</div>
      <label>
        <div class="name">姓名</div>
        <input v-model.trim="name" type="text" placeholder="Name" />
      </label>

      <label>
        <div class="phone">電話</div>
        <input v-model.trim="phone" type="text" placeholder="Phone Number" />
      </label>

      <label>
        <div class="date">預約起迄</div>
        <input
          class="startDay"
          type="text"
          v-model="this.reservation.checkIn"
          disabled
        />
        <span>~</span>
        <input
          class="endDay"
          type="text"
          v-model="this.reservation.checkOut"
          disabled
        />
      </label>

      <div class="countDays">
        <div>
          平日時段
          <span class="normalDayBooking">{{ this.reservation.normalday }}</span
          >晚
        </div>
        <div>
          假日時段
          <span class="HolidayBooking">{{ this.reservation.holiday }}</span
          >晚
        </div>
      </div>

      <div class="bookingPrice">
        <span>=</span>NT.<span class="money">{{ this.reservation.total }}</span>
      </div>

      <div class="button-box">
        <div class="reset" @click.prevent="goback">取消</div>
        <div class="confirm" @click="reserveRoom()">確認預訂</div>
      </div>
    </div>
  </div>
</template>

<script>
import store from "@/store";

export default {
  name: "reservation",
  data() {
    return {
      roomId: this.$route.params.id,
      name: "",
      phone: "",
    };
  },
  computed: {
    reservation() {
      return store.state.reservation;
    },
    dateArr() {
      let dateArr = [];
      dateArr.push(this.reservation.checkIn, this.reservation.checkOut);
      return dateArr;
    },
  },
  methods: {
    reserveRoom() {
      console.log(this.reservation.date);
      store.dispatch("roomBooking", {
        roomId: this.roomId,
        roomName: this.reservation.roomName,
        name: this.name,
        phone: this.phone,
        date: this.reservation.date,
      });
      this.$router.push(`/room/${this.roomId}/reservation/success`);
    },
    goback() {
      this.$router.back();
    },
  },
};
</script>

<style scoped>
@import "./Reservation.css";
</style>
