import axios from 'axios';

const TASK_API_BASE_URL = 'http://localhost:8080/api/task';
const ROOM_API_BASE_URL = 'http://localhost:8080/api/room';
const USER_API_BASE_URL = 'http://localhost:8080/api/user';
const VOTE_API_BASE_URL = 'http://localhost:8080/api/vote';

class Service {

    async getTasks() {
        return axios.get(TASK_API_BASE_URL);
    }

    async getTask(id) {
        return axios.get(`${TASK_API_BASE_URL}/${id}`);
    }

    async addTask(model) {
        await axios.post(`${TASK_API_BASE_URL}`, model);
    }

    async addUser(user) {
        await axios.post(`${USER_API_BASE_URL}`, user);
    }
    async deleteUser(user){
        await  axios.delete(`${USER_API_BASE_URL}/${user.username}`);
    }

    async getRooms() {
        return axios.get(ROOM_API_BASE_URL);
    }

    async getRoom(id) {
        return axios.get(`${ROOM_API_BASE_URL}/${id}`);
    }

    async addRoom(model) {
        await axios.post(`${ROOM_API_BASE_URL}`, model);
    }

    async checkPass(id, password) {
        try {
            return await axios.post(`${ROOM_API_BASE_URL}/check-pass`, {
                roomId: id, password: password,
            });
        } catch (error) {
            console.error('Error checking password:', error);
            throw error;
        }
    }

    async getTasksByRoomId(id) {
        return await axios.get(`${ROOM_API_BASE_URL}/${id}/tasks`);
    }

    async getAddableTask() {
        return await axios.get(`${TASK_API_BASE_URL}/noRoom`);
    }

    async addToRoom(id, roomId) {
        return await axios.put(`${TASK_API_BASE_URL}/addToRoom/${id}/${roomId}`);
    }

    async removeFromRoom(id) {
        return await axios.put(`${TASK_API_BASE_URL}/removeFromRoom/${id}`);
    }

    async vote(id) {
        return await axios.put(`${VOTE_API_BASE_URL}/`)
    }
}

export default new Service();