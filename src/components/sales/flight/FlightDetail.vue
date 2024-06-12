<template>
  <div class="modal-overlay" v-if="showModal">
    <div class="modal-content">
      <div class="modal-header">
        <h1>{{ flightDetail.flight_code ? "✈️ Edit" : "✈️ New" }}</h1>
      </div>
      <form @submit.prevent="submitForm">
        <div>
          <label for="flight_number">항공번호</label>
          <input
            type="text"
            id="flight_number"
            v-model="flightDetail.flight_number"
            required
          />
        </div>
        <div>
          <label for="airline">항공편</label>
          <input
            type="text"
            id="airline"
            v-model="flightDetail.airline"
            required
          />
        </div>
        <div>
          <label for="phone">전화번호</label>
          <input type="text" id="phone" v-model="flightDetail.phone" required />
        </div>
        <div>
          <label for="departure">출발지</label>
          <input
            type="text"
            id="departure"
            v-model="flightDetail.departure"
            required
          />
        </div>
        <div>
          <label for="departure_time">출발시간</label>
          <input
            type="text"
            id="departure_time"
            v-model="flightDetail.departure_time"
            required
          />
        </div>
        <div>
          <label for="destination">도착지</label>
          <input
            type="text"
            id="destination"
            v-model="flightDetail.destination"
            required
          />
        </div>
        <div>
          <label for="arrival_time">도착시간</label>
          <input
            type="text"
            id="arrival_time"
            v-model="flightDetail.arrival_time"
            required
          />
        </div>
        <div>
          <label for="price">가격</label>
          <input type="text" id="price" v-model="flightDetail.price" required />
        </div>
        <div>
          <label for="is_used">사용유무</label>
          <input
            type="text"
            id="is_used"
            v-model="flightDetail.is_used"
            required
          />
        </div>
        <div class="button-container">
          <button type="button" class="btn-update" @click="submitForm">
            {{ flightDetail.flight_code ? "수정" : "등록" }}
          </button>
          <button type="button" class="btn-close" @click="handleClose">닫기</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, watch } from "vue";
import { useStore } from "vuex";

export default {
  name: "FlightDetail",
  props: {
    flight: {
      type: Object,
      default: null,
    },
  },
  setup(props, { emit }) {
    const store = useStore();
    const showModal = ref(true);
    const flightDetail = ref({
      flight_number: "",
      airline: "",
      phone: "",
      departure: "",
      departure_time: "",
      destination: "",
      arrival_time: "",
      price: "",
      is_used: "",
    });

    watch(
      () => props.flight,
      (newFlight) => {
        if (newFlight) {
          flightDetail.value = { ...newFlight };
        } else {
          flightDetail.value = {
            flight_code: "",
            flight_number: "",
            airline: "",
            phone: "",
            departure: "",
            departure_time: "",
            destination: "",
            arrival_time: "",
            price: "",
            is_used: "",
          };
        }
      },
      { immediate: true }
    );

    const submitForm = async () => {
      if (flightDetail.value.flight_code) {
        await store.dispatch("flight/updateFlight", flightDetail.value);
        emit("close");
      } else {
        await store.dispatch("flight/addFlight", flightDetail.value);
        emit("close");
      }
    };

    const handleClose = () => {
      emit("close");
      showModal.value = false;
    };

    return {
      flightDetail,
      submitForm,
      handleClose,
      showModal,
    };
  },
};
</script>

<style src="./FlightDashboard.css"></style>

