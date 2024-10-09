<template>

  <div v-if="formVisible" class="mt-5 container card"
       style="max-width: 18rem; min-width: 10rem; padding: 1rem;">
    <form>
      <div class="form card-header">
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

        <router-link class="btn btn-danger" style="text-decoration: none; color: white" to="/" type="button">
          Cancel
        </router-link>

      </div>
    </form>
  </div>

  <div v-if="isVisible" class="container mt-3 p-2">
    <div class="row justify-content-between mt-2">
      <div class="col-8 pt-2">
        <h3>Welcome to room : {{ room.room_name }}</h3>
      </div>

      <div class="col-4">

      </div>

    </div>

    <table class="table border-dark table-striped table-bordered shadow">
      <thead>
      <tr>
        <th></th>
        <th>Title</th>
        <th>Description</th>
        <th class="col-2">Due-Date</th>
        <th class="col-1">Estimation</th>
        <th class="text-center col-1">
          <button class="btn btn-danger" @click="removeFromRoom">
            <i class="bi bi-dash-square"></i>
          </button>
        </th>
        <th class="text-center col-1">
          <button class="btn btn-success" data-bs-target="#addTaskModal" data-bs-toggle="modal" type="button">
            <i class="bi bi-plus-square" @click="getAddableTasks"></i>
          </button>
        </th>
      </tr>
      </thead>

      <tbody>
      <tr v-for="task in tasks" :key="task.id">
        <th class="text-center"><input
            id="{{task.id}}"
            v-model="removeIds"
            :value="task.id"
            class="form-check-input"
            type="checkbox"
        /></th>
        <th> {{ task.title }}</th>
        <th> {{ task.description }}</th>
        <th> {{ task.due }}</th>
        <th class="text-center"> {{ task.estimation }}</th>
        <th class="text-center">
          <button :disabled="isVoted[task.id]"
                  class="btn btn-custom"
                  data-bs-target="#voteModal"
                  data-bs-toggle="modal"
                  type="button"
                  @click="voteModel.taskId = task.id">
            <i class="bi bi-clipboard-check"/>
          </button>
        </th>
        <th class="text-center">
          <button class="btn btn-custom"
                  data-bs-target="#taskVoteModal"
                  data-bs-toggle="modal"
                  type="button" @click="getVoteByTaskId(task.id)">
            <i class="bi bi-info-square"></i>
          </button>
        </th>
      </tr>
      </tbody>
    </table>
  </div>


  <!--  Add task Modal-->
  <div id="addTaskModal" class="modal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content ">
        <div class="modal-header">
          <h5 class="modal-title">Add Task</h5>
        </div>
        <div class="modal-body">
          <!--Add task Form-->
          <table v-if="addableTasks.length>0" class="table table-striped table-bordered shadow">
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
      <div class="modal-content ">
        <div class="modal-header">
          <h5 class="modal-title">Vote Task</h5>
        </div>

        <div class="modal-body">
          <!--Add Vote Form-->
          <div class="row row-cols-1 row-cols-md-5 g-2">
            <div v-for="card in cards" :key="card.id" class="col">
              <div class="card flex-column shadow">
                <div class="card-body btn btn-custom" @click="selectCard(card.id)">
                  <h2 class="mb-0">{{ card.id }}</h2>
                </div>
              </div>
            </div>
          </div>

        </div>

        <div class=" modal-footer">
          <button class="btn btn-success" data-bs-dismiss="modal" type="button" @click="vote()">Ok
          </button>
          <button class="btn btn-danger" data-bs-dismiss="modal" type="button">Cancel</button>
        </div>
      </div>
    </div>
  </div>

  <div id="taskVoteModal" class="modal modal-xl" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content ">
        <div class="modal-header">
          <h5 class="modal-title">Votes of Task</h5>
        </div>

        <div class="modal-body">
          <!--Add Vote Form-->
          <table class="table table-striped">
            <thead>
            <tr>
              <th>User</th>
              <th>Estimation</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="taskVote in taskVotes" :key="taskVote.id">
              <th>{{ taskVote.username }}</th>
              <th>{{ taskVote.estimation }}</th>
            </tr>
            </tbody>
          </table>
        </div>

        <div class=" modal-footer">
          <button class="btn btn-success" data-bs-dismiss="modal" type="button">Ok</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import service from "@/services/service.js";
import {isDisabled} from "bootstrap/js/src/util/index.js";

export default {
  name: "Room",
  data() {
    return {
      tasks: [],
      taskVotes: [],
      cards: [],
      addableTasks: [],
      votedTasks: [],
      votes: '',
      voteModel: {
        username: '',
        taskId: '',
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
    isDisabled,
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
          await service.addUser(this.id, this.user);
          this.isVisible = true;
          this.formVisible = false;
          await this.getTasks();
          this.voteModel.username = this.user.username;
          await this.getVoteByUsername();
        }
      } catch (error) {
        console.error("Error: " + error);
      }
    },
    async getTasks() {
      try {
        const response = await service.getTasksByRoomId(this.room.id);
        this.tasks = response.data;
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    },
    async getAddableTasks() {
      try {
        const response = await service.getAddableTasks();
        this.addableTasks = response.data;
      } catch (error) {
        console.error('Error fetching addable tasks:', error);
      }
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
    async getCards() {
      try {
        const response = await service.getCards();
        this.cards = response.data;
      } catch (error) {
        console.error('Error fetching cards:', error);
      }
    },
    async selectCard(est) {
      this.voteModel.estimation = est;
    },
    async vote() {
      try {
        await service.vote(this.voteModel);
        await this.getVoteByTaskId(this.voteModel.taskId);
        await this.getVoteByUsername();
        if (this.isVoteFull()) {
          await service.estimateTask(this.voteModel.taskId);
          await this.getTasks();
        }
      } catch (error) {
        console.error('Error voting:', error);
      }
    },
    async getVoteByTaskId(taskId) {
      try {
        const response = await service.getVoteByTaskId(taskId);
        this.taskVotes = response.data;
        this.votes = Object.keys(this.taskVotes).length;
      } catch (error) {
        console.error('Error fetching votes by task ID:', error);
      }
    },
    async getVoteByUsername() {
      try {
        const response = await service.getVoteByUsername(this.user.username);
        this.votedTasks = response.data;
      } catch (error) {
        console.error('Error fetching votes by username:', error);
      }
    },

    isVoteFull() {
      return this.votes >= this.room.capacity;
    }
  },
  computed: {
    isVoted(taskId) {
      return this.votedTasks.includes(taskId);
    },
  },
  mounted() {
    this.id = this.$route.params.id;
    this.getRoom();
    this.getCards();
  },
  unmounted() {
    service.removeUserFromRoom(this.id, this.user.username);
  }
}
</script>
<style scoped>

</style>