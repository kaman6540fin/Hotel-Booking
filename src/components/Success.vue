<template>
  <div class="reservationBg" @touchmove.prevent @mousewheel.prevent>
    <div class="reservationBox">
      <h2 class="title">預約成功</h2>
      <div class="br">＼＼＼</div>
      <div class="success">
        <img src="./../assets/info_icon/tick-inside-circle.svg" alt="" />
      </div>
      <div class="goBack" @click.prevent="goback">回頁面</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "success",
  data() {
    return {
      roomId: this.$route.params.id,
    };
  },
  methods: {
    goback() {
      this.$router.push(`/room/${this.roomId}`);
    },
  },
};
</script>

<style scoped>
@import "./Reservation.css";

.success {
  width: 5vw;
  height: 5vw;
  margin: 0 auto;
}

.success img {
  width: 100%;
}

.goBack {
  box-sizing: border-box;
  background-color: #484848;
  color: #fff;
  width: 23%;
  text-align: center;
  padding: 1vw 0;
  cursor: pointer;
  float: right;
  margin-top: 2vw;
}

@media screen and (max-width: 768px) {
  .success {
    width: 15vw;
    height: 15vw;
  }

  .goBack {
    margin-top: 8vw;
    width: 28vw;
    padding: 12px;
    font-size: 14px;
  }
}
</style>
