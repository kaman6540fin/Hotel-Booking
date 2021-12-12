import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";

Vue.use(Vuex);

const headers = {
  "Accept": "application/json",
  "Content-Type": "application/json",
  "Authorization":
    "Bearer TJuqfa4z35u3GSBwQmNPxem2FceIJ21SuuFH260t46KnYmIvJQ8v5qseeWz4",
};

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== "production",
  state: {
    headers: headers,
    rooms: [],
    currentRoomInfo: {
      disabledDates: [],
    },
    reservation: {
      roomName: "",
      roomId: "",
      date: [],
      checkIn: "",
      checkOut: "",
      nightArr: [],
      holiday: 0,
      normalday: 0,
      total: 0,
      date: [],
    },
    reservationDetail: {},
  },
  mutations: {
    setRoomsInfo(state, val) {
      state.rooms = val;
    },
    setCurrRoomInfo(state, val) {
      state.currentRoomInfo = val;
    },
    setReservationDate(state, val) {
      console.log("setReservationDate", val);

      if (val.roomId) state.reservation.roomId = val.roomId;
      if (val.roomName) state.reservation.roomName = val.roomName;
      if (val.date && val.date.length > 1) state.reservation.date = val.date;
      if (val.name) state.reservation.name = val.name;
      if (val.phone) state.reservation.phone = val.phone;
    },
    setReservationDetail(state, payload) {
      state.reservation.checkIn = payload.checkIn;
      state.reservation.checkOut = payload.checkOut;
      state.reservation.nights = payload.nights;
      state.reservation.holiday = payload.holiday;
      state.reservation.normalday = payload.normalday;
      state.reservation.total = payload.total;
      state.reservation.date = payload.date;
    },
  },
  actions: {
    getRoomsInfo({ commit }) {
      // 取得所有房型簡介
      Axios.get("https://challenge.thef2e.com/api/thef2e2019/stage6/rooms", {
        headers,
      }).then((res) => {
        if (res.data.success) {
          commit("setRoomsInfo", res.data.items);
        }
      });
    },
    getRoomDetail({ commit }, obj) {
      // 取得單一房型資訊
      Axios.get(
        "https://challenge.thef2e.com/api/thef2e2019/stage6/room/" + obj.roomId,
        { headers }
      ).then((res) => {
        if (res.data.success) {
          console.log(res.data);

          const room = res.data.room[0];
          if (res.data.booking.length > 0) {
            room.disabledDates = res.data.booking.map((d) => d.date);
          }

          console.log(room.disabledDates);
          commit("setCurrRoomInfo", room);
        }
      });
    },
    roomBooking({ commit, state }, obj) {
      const vm = this;
      // 預約房型
      Axios.request({
        url: `https://challenge.thef2e.com/api/thef2e2019/stage6/room/${obj.roomId}`,
        method: "post",
        headers: headers,
        data: {
          name: obj.name,
          tel: obj.phone,
          date: obj.date,
        },
      })
        .then((res) => {
          console.log(res);
          if (res.data.success) {
            commit("setReservationDate", obj);
          }
        })
        .catch((error) => {
          if (error.response) {
            alert(error.response.data.message);
          }
        });
    },
  },
});
