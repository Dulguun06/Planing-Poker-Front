import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

class Service {
    constructor() {
        this.taskApi = `${API_BASE_URL}/task`;
        this.roomApi = `${API_BASE_URL}/room`;
        this.userApi = `${API_BASE_URL}/user`;
        this.voteApi = `${API_BASE_URL}/vote`;
    }

    // Tasks Endpoints
    async getTasks() {
        return await axios.get(this.taskApi);
    }

    async getTask(id) {
        return await axios.get(`${this.taskApi}/${id}`);
    }

    async addTask(model) {
        return await axios.post(this.taskApi, model);
    }

    async getAddableTasks() {
        return await axios.get(`${this.taskApi}/noRoom`);
    }

    async addToRoom(taskId, roomId) {
        return await axios.put(`${this.taskApi}/addToRoom/${taskId}/${roomId}`);
    }

    async removeFromRoom(taskId) {
        return await axios.put(`${this.taskApi}/removeFromRoom/${taskId}`);
    }

    async estimateTask(id) {
        return await axios.put(`${this.taskApi}/estimate/${id}`);
    }

    // Rooms Endpoints
    async getRooms() {
        return await axios.get(this.roomApi);
    }

    async getRoom(id) {
        return await axios.get(`${this.roomApi}/${id}`);
    }

    async addRoom(model) {
        return await axios.post(this.roomApi, model);
    }

    async checkPass(id, password) {
        return await axios.post(`${this.roomApi}/check-pass`, { roomId: id, password });
    }

    async getTasksByRoomId(id) {
        return await axios.get(`${this.roomApi}/${id}/tasks`);
    }

    async removeUserFromRoom(roomId, username) {
        return await axios.post(`${this.roomApi}/${roomId}/remove-user/${username}`);
    }

    // Users Endpoints
    async addUser(roomId, user) {
        await axios.post(this.userApi, user);
        await axios.post(`${this.roomApi}/${roomId}/users/${user.username}`);
    }

    // Votes Endpoints
    async vote(model) {
        return await axios.post(this.voteApi, model);
    }

    async getVoteByTaskId(taskId) {
        return await axios.get(`${this.voteApi}/task/${taskId}`);
    }

    async getVoteByUsername(username) {
        return await axios.get(`${this.voteApi}/voted/${username}`);
    }

    // Other Endpoints
    async getCards() {
        return await axios.get(`${API_BASE_URL}/card`);
    }
}

export default new Service();