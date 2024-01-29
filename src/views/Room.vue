<template>

  <div v-if="formVisible" class=" container text-center card"
       style="width: 18rem; background-color: #fca311; padding: 2rem;">
    <form>


      <div class="form-outline">
        <h5> Joining {{ room.room_name }}</h5>
      </div>

      <div class="mb-3">
        <label class="form-label" for="exampleInputPassword1">Password</label>
        <input id="exampleInputPassword1" v-model="room.password" class="form-control" type="password">
      </div>

      <div class="">
        <button class="btn btn-success" type="button" @click.prevent="enterRoom">
          Join
        </button>
        <button class="btn btn-danger" data-bs-dismiss="modal" type="button">Cancel</button>
      </div>


    </form>
  </div>

  <div v-if="isVisible" class="container">
    <h2></h2>

    <p></p>

    <h2 class="mb-4">Room {{ room.id }}</h2>
    <div class="row">
      <div class="col-md-4">
        <p>Welcome to {{ room.room_name }}</p>
      </div>
      <div class="col-md-8">
        <button class="btn btn-danger" @click="removeFromRoom">Remove Task from Room</button>
      </div>
    </div>

    <table class="table table-dark table-striped table-bordered">
      <thead>
      <tr>
        <th></th>
        <th>Title</th>
        <th>Description</th>
        <th class="col-2">Due-Date</th>
        <th class="col-1">Estimation</th>
        <th class="text-center col-1">
          <button class="btn btn-dark" data-bs-target="#addTaskModal" data-bs-toggle="modal" type="button">
            <i class="bi bi-plus-square" @click="getAddableTasks"></i>
          </button>
        </th>
      </tr>
      </thead>

      <tbody>
      <tr v-for="task in tasks" :key="task.id">
        <th><input id="{{task.id}}"
                   v-model="removeIds"
                   :value="task.id"
                   class="form-check-input"
                   type="checkbox"/></th>
        <th> {{ task.title }}</th>
        <th> {{ task.description }}</th>
        <th> {{ task.due }}</th>
        <th class="text-center"> {{ task.estimation }}</th>
        <th></th>
      </tr>
      </tbody>
    </table>
  </div>


  <!--  Add task Modal-->
  <div id="addTaskModal" class="modal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content bg-dark">
        <div class="modal-header">
          <h5 class="modal-title text-white">Add Task</h5>
        </div>
        <div class="modal-body">
          <!--Add task Form-->
          <table class="table table-dark table-striped table-bordered">
            <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Due</th>
              <th></th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="addableTask in addableTasks" :key="addableTask.id">
              <th>{{ addableTask.title }}</th>
              <th>{{ addableTask.description }}</th>
              <th>{{ addableTask.due }}</th>
              <th>
                <input v-if="addableTask.room_id !== room.id"
                       id="{{addableTask.id}}"
                       v-model="checkedIds"
                       :value="addableTask.id"
                       class="form-check-input"
                       type="checkbox"/>
              </th>
            </tr>
            </tbody>
          </table>
        </div>
        <div class=" modal-footer">
          <button class="btn btn-success" data-bs-dismiss="modal" type="button" @click="addToRoom">Add</button>
          <!--          <button class="btn btn-danger" data-bs-dismiss="modal" type="button">Cancel</button>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import service from "@/services/service.js";

export default {
  name: "Room",
  data() {
    return {
      tasks: [],
      addableTasks: [],
      room: {
        room_name: '',
        url: ''
      },
      id: '',
      isVisible: false,
      formVisible: true,
      checkedIds: [],
      removeIds: [],
    }
  },
  methods: {
    async getRoom() {
      try {
        const response = await service.getRoom(this.id);
        this.room = response.data;
      } catch (error) {
        console.error('Error fetching room:', error);
      }
    },
    async enterRoom() {
      try {
        const response = await service.checkPass(this.room.id, this.room.password);

        if (response.status === 200) {

          this.isVisible = true;
          this.formVisible = false;
          this.getTasks();
        }
      } catch (error) {
        console.error("Error: " + error);
      }
    },
    getTasks() {
      service.getTasksByRoomId(this.room.id).then((response) => {
        this.tasks = response.data;
      });
    },
    getAddableTasks() {
      service.getTasks().then((response) => {
        this.addableTasks = response.data;
      });
    },
    async addToRoom() {

      try {
        for (const i of this.checkedIds) {
          await service.updateRoom(i, this.id);
        }
        await this.getTasks();
        this.checkedIds = null;
      } catch (error) {
        console.error('Error adding to room and fetching tasks:', error);
      }
    },
    async removeFromRoom() {
      try {
        for (const i of this.removeIds) {
          // let params = {"type": "remove"}
          await service.updateRoom(i, null);
        }
        await this.getTasks();
        this.checkedIds = null;
      } catch (error) {
        console.error('Error removing from room: ', error);
      }
    }

  },
  mounted() {
    this.id = this.$route.params.id;
    this.getRoom();
  },
}
</script>