<template>
  <div class="container my-5">
    <header class="row">
      <h1 class="col"> Room List</h1>
    </header>
    <table class="table border-black table-striped table-bordered shadow">
      <thead>
      <tr>
        <th class="col-1 text-center">#</th>
        <th class="col-8">Room Name</th>
        <th class="ol-2">Capacity</th>
        <th class="col-1 text-center">
          <button class="btn btn-danger"><i class="bi bi-trash"></i></button>
        </th>
        <th class="col-1 text-center">
          <button class="btn btn-success" data-bs-target="#addRoomModal" data-bs-toggle="modal" type="button">
            <i class="bi bi-house-add"></i>
          </button>
        </th>
      </tr>
      </thead>

      <tbody>
      <tr v-for="room in rooms" :key="room.id">
        <th class="text-center">{{ room.id }}</th>
        <th> {{ room.room_name }}</th>
        <th class="text-center">
          {{ room.joinedUsers }} / {{ room.capacity }}
        </th>
        <th class=" text-center" @click="getRoom(room.id)">
          <button class="roomShowBtn btn btn-custom" data-bs-target="#roomDetailModal" data-bs-toggle="modal">
            <i class=" bi bi-eye"></i>
          </button>
        </th>

        <th class="text-center">
          <button class="btn btn-custom roomShowBtn">
            <router-link :to="{ name: 'room', params: { id: room.id } }">
              <i style="color: white !important" class="bi bi-door-open"/>
            </router-link>
          </button>
        </th>
      </tr>
      </tbody>
    </table>
  </div>

  <div id="roomDetailModal" class="modal fade" tabindex="-1">
    <div class="  modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="bg-light modal-content">
        <div class="modal-header text-bg-light">
          <h5 class="modal-title">Invite people to
            <em> {{ selectedRoom ? selectedRoom.room_name : "" }}</em>
          </h5>
        </div>
        <div class="modal-body row">
          <label class="col-10 align-self-center" type="url">{{
              selectedRoom ? selectedRoom.url : ""
            }}</label>
          <button class="col-2 btn btn-light" @click="copy(selectedRoom.url)">
            <i class="bi bi-copy"></i>
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
      <div class="bg-light text-bg-light modal-content">
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
              <label class="form-label" for="capacity">Room Capacity</label>
              <input id="capacity" v-model="formData.capacity" class="form-control" placeholder="Team members"
                     type="number">
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
        capacity: '',
      },
      formData: {
        room_name: '',
        password: '',
        capacity: '',
      },
    }
  },
  methods: {
    async getRooms() {
      await service.getRooms().then((response) => {
        this.rooms = response.data;
      })
    },
    async getRoom(roomId) {
      await service.getRoom(roomId).then((response) => {
        this.selectedRoom = response.data;
      });
    },
    async addRoom() {
      try {
        await service.addRoom(this.formData);
      } catch (error) {
        console.error("Error adding room:", error);
      }
      this.formData = {
        room_name: '',
        password: '',
        capacity: '',
      };
      await this.getRooms();
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

<style >
/* Add any custom styles specific to the About component */
.btn-custom{
  background-color: #1f4e6a;
  color: white;
}
</style>