<template>
  <div class="container my-5">
    <header class="row">
      <h1 class="col"> Room List</h1>
    </header>
    <table class="table table-dark table-striped table-bordered">
      <thead>
      <tr>
        <th class="col-1 text-center">#</th>
        <th class="col-8">Room Name</th>
        <th class="col-1 text-center">
          <button class="btn btn-outline-danger"><i class="bi bi-trash"></i></button>
        </th>
        <th class="col-1 text-center">
          <button class="btn btn-outline-success" data-bs-target="#addRoomModal" data-bs-toggle="modal" type="button">
            <i class="bi bi-house-add"></i>
          </button>
        </th>
      </tr>
      </thead>

      <tbody>
      <tr v-for="room in rooms" :key="room.id">
        <th class="text-center">{{ room.id }}</th>
        <th> {{ room.room_name }}</th>
        <th class=" text-center" @click="getRoom(room.id)">
          <button class="roomShowBtn btn btn-outline-warning" data-bs-target="#roomDetailModal" data-bs-toggle="modal">
            <i class=" bi bi-eye"></i>
          </button>

        </th>
        <th class="text-center">
          <button class="btn btn-outline-primary roomShowBtn">
            <router-link :to="{ name: 'room', params: { id: room.id } }">
              <i class="bi bi-door-open"/>
            </router-link>
          </button>
        </th>
      </tr>
      </tbody>
    </table>
  </div>

  <div id="roomDetailModal" class="modal fade" tabindex="-1">
    <div class="  modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="bg-dark modal-content">
        <div class="modal-header text-bg-dark">
          <h5 class="modal-title">Invite people to
            <span class="text-primary"> {{ selectedRoom ? selectedRoom.room_name : "" }} </span>
          </h5>
        </div>
        <div class="modal-body row">
          <label class="col-7 text-primary align-self-center" type="url">{{
              selectedRoom ? selectedRoom.url : ""
            }}</label>
          <button class="col-5 btn btn-outline-primary" @click="copy(selectedRoom.url)">
            Copy invitation link
          </button>
        </div>
        <div class="modal-footer">
          <button class="btn btn-danger" data-bs-dismiss="modal" type="button">Close</button>
        </div>
      </div>
    </div>
  </div>

  <div id="addRoomModal" class="modal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="bg-dark text-bg-dark modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Create Room</h5>
        </div>
        <div class="modal-body">
          <!--Add room Form-->
          <form class="row g-3">
            <div class="col-md-12">
              <label class="form-label" for="name">Room Name</label>
              <input id="name" v-model="formData.room_name" class="form-control" placeholder="Name of your room"
                     type="text">
            </div>
            <div class="col-md-12">
              <label class="form-label" for="password">Password</label>
              <input id="password" v-model="formData.password" class="form-control" type="password">
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button class="btn btn-success" data-bs-dismiss="modal" type="button" @click="this.addRoom()">Add</button>
          <button class="btn btn-danger" data-bs-dismiss="modal" type="button">Cancel</button>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import service from "@/services/service.js";

export default {
  name: "Home",
  data() {
    return {
      rooms: [],
      selectedRoom: {
        room_name: '',
        url: '',
        id: null,
      },
      formData: {
        room_name: '',
        url: '',
        password: '',
      },
    }
  },
  methods: {
    getRooms() {
      service.getRooms().then((response) => {
        this.rooms = response.data;
      })
    },
    getRoom(roomId) {
      service.getRoom(roomId).then((response) => {
        this.selectedRoom = response.data;
      });
    },
    async addRoom() {
      try {
        await service.addRoom(this.formData);
        this.formData = {
          room_name: '',
          url: '',
          password: '',
        };
        this.getRooms();
      } catch (error) {
        console.error("Error adding room:", error);
      }
    },
    copy(url) {
      navigator.clipboard.writeText(url);

    }
  },
  created() {
    this.getRooms();
  }
}
</script>

<style scoped>
/* Add any custom styles specific to the About component */
</style>