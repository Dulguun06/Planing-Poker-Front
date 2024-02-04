<template>
  <div class="container mt-5">
    <header class="row">
      <h1 class="col"> Task List</h1>
    </header>

    <table class="table border-black table-striped table-bordered">
      <thead>
      <tr>
        <th>Title</th>
        <th class="col-2">Due-Date</th>
        <th class="col-1">Estimation</th>
        <th class="text-center col-1">
          <button class="btn btn-outline-success" data-bs-target="#addTaskModal" data-bs-toggle="modal" type="button">
            <i class="bi bi-plus-square"></i>
          </button>
        </th>
      </tr>
      </thead>

      <tbody>
      <tr v-for="task in tasks" :key="task.id">
        <th> {{ task.title }}</th>
        <th> {{ task.due }}</th>
        <th class="text-center"> {{ task.estimation }}</th>
        <th class="taskShowBtn text-center" data-bs-target="#taskModal" data-bs-toggle="modal"
            @click="getTask(task.id)">
          <i class="bi bi-info-circle " style="font-size: 1rem;"></i>
        </th>
      </tr>
      </tbody>
    </table>
  </div>

  <div id="taskModal" class="modal fade " tabindex="-1">
    <div class=" modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ selectedTask ? selectedTask.title : "" }}</h5>
          <p class="modal-title"> Due : {{ selectedTask ? selectedTask.due : "" }}</p>
        </div>
        <div class="modal-body">
          <p>{{ selectedTask ? selectedTask.description : "" }}</p>
        </div>
        <div class="modal-footer">
          <p>Created by: {{ selectedTask ? selectedTask.userName : "" }}</p>
          <p style="padding-right: 1rem">Estimation: {{ selectedTask ? selectedTask.estimation : 0 }}</p>
          <button class="btn btn-danger" data-bs-dismiss="modal" type="button">Close</button>
        </div>
      </div>
    </div>
  </div>

  <div id="addTaskModal" class="modal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Add Task</h5>
        </div>
        <div class="modal-body">
          <!--Add task Form-->
          <form id="newTask" class="row g-3">
            <div class="col-md-6">
              <label class="form-label" for="title">Title</label>
              <input id="title" v-model="formData.title" class="form-control" placeholder="Title of your task"
                     type="text">
            </div>
            <div class="col-md-6">
              <label class="form-label" for="date">Due date</label>
              <input id="date" v-model="formData.due" class="form-control" type="date">
            </div>

            <div class="col-12">
              <label class="form-label" for="description">Description</label>
              <input id="description" v-model="formData.description" class="form-control"
                     placeholder="Describe your task"
                     type="text">
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button class="btn btn-success" type="button" @click="this.addTask()">Add</button>
          <button class="btn btn-danger" data-bs-dismiss="modal" type="button">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import service from "@/services/service.js";

export default {
  name: "Tasks",
  data() {
    return {
      tasks: [],
      selectedTask: null,
      formData: {
        title: '',
        description: '',
        username: 'john_doe',
        due: '',
        estimation: null,
        room_id: null
      },
    }
  },
  methods: {
    getTasks() {
      service.getTasks().then((response) => {
        this.tasks = response.data;
      })
    },
    getTask(taskId) {
      service.getTask(taskId).then((response) => {
        this.selectedTask = response.data;
      });
    },
    async addTask() {
      try {
        await service.addTask(this.formData);
        console.log("formData: " + JSON.stringify(this.formData));
        this.formData = {
          title: '',
          description: '',
          userName: 'john_doe',
          due: '',
          estimation: null,
          room_id: null
        };
        // Refresh the task list
        this.getTasks();
      } catch (error) {
        console.error("Error adding task:", error);
      }
    }
  },
  created() {
    this.getTasks();
  }
}
</script>

<style scoped>
h1 {
  color: #202020;
}

.taskShowBtn:hover {
  color: orange;
  text-shadow: 1px 1px orangered;
  cursor: pointer;
}
</style>