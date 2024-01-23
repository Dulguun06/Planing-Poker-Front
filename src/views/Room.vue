<template>
  <div class="text-center">

    <h1>Room {{ room.id }}</h1>
    <!-- Other content specific to the room -->
    <p>Welcome to {{room.room_name}}
    </p>
    <button class="btn btn-danger" @click="getRoom">Here</button>
  </div>
</template>

<script>
import service from "@/services/service.js";

export default {
  data() {
    return {
      room: {
        room_name:'',
        url:''
      },
      id: '',
    }
  },
  methods:{
    getRoom() {
      service.getRoom(this.id).then((response) => {
        this.room = response.data;
      });
    },
  },
  created() {
    this.id = this.$route.params.id;
    this.getRoom();
  }
};
</script>
