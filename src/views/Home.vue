<template>
  <div class="container my-5">
    <header class="row">
      <h1 class="col"> Room List</h1>
    </header>
    <table class="table table-dark table-striped table-bordered">
      <thead>
      <tr>
        <th class="col-1">#</th>
        <th class="col-6">Room Name</th>
        <th class="col-1 text-center"></th>
        <th class="col-1 text-center">
          <button class="btn btn-dark" data-bs-target="#addRoomModal" data-bs-toggle="modal" type="button">
            <i class="bi bi-plus-square"></i>
          </button>
        </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="room in rooms" :key="room.id">
        <th>{{ room.id }}</th>
        <th> {{ room.room_name }}</th>
        <th class="roomShowBtn text-center" data-bs-target="#roomDetailModal" data-bs-toggle="modal"
            @click="getRoom(room.id)">
          <i class="bi bi-eye"></i>
        </th>
        <th class="roomShowBtn text-center" data-bs-target="#roomEnterModal" data-bs-toggle="modal"
            @click="func(room.id)">
          <i class="bi bi-door-open"></i>
        </th>
      </tr>
      </tbody>
    </table>
  </div>

  <div id="roomDetailModal" class="modal fade " tabindex="-1">
    <div class=" modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ selectedRoom ? selectedRoom.room_name : "" }}</h5>
        </div>
        <div class="modal-body">
          <p><a href="{{selectedRoom.url}}">{{ selectedRoom ? selectedRoom.url : "" }}</a></p>
        </div>
        <div class="modal-footer">
          <button class="btn btn-danger" data-bs-dismiss="modal" type="button">Close</button>
        </div>
      </div>
    </div>
  </div>

  <div id="addRoomModal" class="modal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
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

  <div id="roomEnterModal" class="modal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title"> Joining {{ joiningRoom.name }}</h5>
        </div>
        <div class="modal-body">
          <!--Join Room Form-->
          <form id="newRoom" class="row g-3">
            <div class="col-md-12">
              <label class="form-label" for="joinPassword">Password</label>
              <input id="joinPassword" v-model="joiningRoom.password" class="form-control" type="password">
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button class="btn btn-success" data-bs-dismiss="modal" type="button"
                  @click.prevent="enterRoom">
            Join
          </button>
          <button class="btn btn-danger" data-bs-dismiss="modal" type="button">Cancel</button>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import service from "@/services/service.js";
import router from "@/services/router.js";

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
      joiningRoom: {
        room_name: "",
        password: "",
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
    func(roomId) {
      service.getRoom(roomId).then((response) => {
        this.joiningRoom = response.data;
      })
    },
    async addRoom() {
      this.formData.url = `http://localhost:5173/room/`;
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
    async enterRoom() {
      try {
        const response = await service.checkPass(this.joiningRoom.id, this.joiningRoom.password);
        console.log('Response Data:', response.data);
        if (response.status === 200) {
          console.log('Password Correct');
          await router.push({ name: 'Room', params: { id: this.joiningRoom.id} });
        } else {

        }
      } catch (error) {
        console.error('Error checking password:', error.response.data);
      }
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