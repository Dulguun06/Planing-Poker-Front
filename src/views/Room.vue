<template>

  <div v-if="formVisible" class="mt-5 container card bg-dark text-bg-dark"
       style="max-width: 18rem; min-width: 10rem; padding: 1rem;">
    <form>
      <div class="form-outline card-header">
        <h5> Joining {{ room.room_name }}</h5>
      </div>

      <div class="mb-3 card-body">
        <label class="form-label" for="username">Create Username</label>
        <input id="username" v-model="user.username" class="form-control" type="text">
        <label class="form-label" for="exampleInputPassword1">Room Password</label>
        <input id="exampleInputPassword1" v-model="room.password" class="form-control" type="password">
      </div>

      <div class="d-grid gap-2 card-footer">
        <button class="btn btn-success" type="button" @click.prevent="enterRoom">
          Join
        </button>

        <button class="btn btn-danger" type="button">
          <router-link style="text-decoration: none; color: white" to="/">Cancel</router-link>
        </button>
      </div>
    </form>
  </div>

  <div v-if="isVisible" class="container mt-3 p-2">
    <h2>Room {{ room.id }}</h2>

    <div class="row justify-content-between mt-2">
      <div class="col pt-2">
        <p>Welcome to {{ room.room_name }}</p>
      </div>

      <div class="col text-end">
        <button class="btn btn-danger " @click="removeFromRoom">Remove Task</button>
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
        <th class="text-center">
          <button class="btn btn-outline-info" data-bs-target="#voteModal" data-bs-toggle="modal" type="button">
            <i class="bi bi-clipboard-check"/>
          </button>
        </th>
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
          <table v-if="addableTasks.length>0" class="table table-dark table-striped table-bordered">
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
          <h5 v-if="addableTasks.length===0" class="text-warning">No Tasks to be added!</h5>
        </div>
        <div class=" modal-footer">
          <button class="btn btn-success" data-bs-dismiss="modal" type="button" @click="addToRoom">Add
          </button>
          <button class="btn btn-warning" data-bs-dismiss="modal" type="button">Cancel</button>
        </div>
      </div>
    </div>
  </div>

  <div id="voteModal" class="modal modal-xl" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content bg-dark">
        <div class="modal-header">
          <h5 class="modal-title text-white">Vote Task</h5>
        </div>

        <div class="modal-body">
          <!--Add Vote Form-->
          <div class="row row-cols-1 row-cols-md-5 g-2">
            <div class="col">
              <div class="card bg bg-dark">
                <div class="card-body btn btn-outline-light">
                  <img alt="#" class="card-img-top" src="../images/Mercury.png">
                </div>
              </div>
            </div>

            <div class="col">
              <div class="card bg bg-dark">
                <div class="card-body btn btn-outline-light">
                  <img alt="#" class="card-img-top" src="../images/Mercury.png">
                </div>
              </div>
            </div>

            <div class="col">
              <div class="card bg bg-dark">
                <div class="card-body btn btn-outline-light">
                  <img alt="#" class="card-img-top" src="../images/Mercury.png">
                </div>
              </div>
            </div>

            <div class="col">
              <div class="card bg bg-dark">
                <div class="card-body btn btn-outline-light">
                  <img alt="#" class="card-img-top" src="../images/Mercury.png">
                </div>
              </div>
            </div>

            <div class="col">
              <div class="card bg bg-dark">
                <div class="card-body btn btn-outline-light">
                  <img alt="#" class="card-img-top" src="../images/Mercury.png">
                </div>
              </div>
            </div>

            <div class="col">
              <div class="card bg bg-dark">
                <div class="card-body btn btn-outline-light">
                  <img alt="#" class="card-img-top" src="../images/Mercury.png">
                </div>
              </div>
            </div>

            <div class="col">
              <div class="card bg bg-dark">
                <div class="card-body btn btn-outline-light">
                  <img alt="#" class="card-img-top" src="../images/Mercury.png">
                </div>
              </div>
            </div>

            <div class="col">
              <div class="card bg bg-dark">
                <div class="card-body btn btn-outline-light">
                  <img alt="#" class="card-img-top" src="../images/Mercury.png">
                </div>
              </div>
            </div>

            <div class="col">
              <div class="card bg bg-dark">
                <div class="card-body btn btn-outline-light">
                  <img alt="#" class="card-img-top" src="../images/Mercury.png">
                </div>
              </div>
            </div>

            <div class="col">
              <div class="card bg bg-dark">
                <div class="card-body btn btn-outline-light">
                  <img alt="#" class="card-img-top" src="../images/Mercury.png">
                </div>
              </div>
            </div>

          </div>
        </div>

        <div class=" modal-footer">
          <button class="btn btn-success" data-bs-dismiss="modal" type="button" @click="vote(id)">Ok
          </button>
          <button class="btn btn-warning" data-bs-dismiss="modal" type="button">Cancel</button>
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
      username: '',
      voteModel: {
        username: this.username,
        task: '',
        estimation: ''
      },
      room: {
        room_name: '',
        url: ''
      },
      user: {
        username: ''
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
          await service.addUser(this.user);
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
    async getAddableTasks() {
      await service.getAddableTask().then((response) => {
        this.addableTasks = response.data;
      });
    },
    async addToRoom() {
      try {
        for (const i of this.checkedIds) {
          await service.addToRoom(i, this.id);
        }
        await this.getTasks();
        this.checkedIds = [];
      } catch (error) {
        console.error('Error adding to room and fetching tasks:', error);
      }
    },
    async removeFromRoom() {
      try {
        for (const i of this.removeIds) {
          await service.removeFromRoom(i);
        }
        await this.getTasks();
        this.removeIds = [];
      } catch (error) {
        console.error('Error removing from room: ', error);
      }
    },
    vote(id) {
      service.vote(id);
    }
  },
  mounted() {
    this.id = this.$route.params.id;
    this.getRoom();
  },
  // beforeUnmount() {
  //   service.deleteUser(this.user);
  // }
}
</script>