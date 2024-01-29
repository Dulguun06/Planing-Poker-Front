import axios from 'axios';

const TASK_API_BASE_URL = 'http://localhost:8080/api/task';
const ROOM_API_BASE_URL = 'http://localhost:8080/api/room';

class Service {

    async getTasks() {
        return axios.get(TASK_API_BASE_URL);
    }

    async getTask(id) {
        return axios.get(`${TASK_API_BASE_URL}/${id}`);
    }

    async addTask(model) {
        await axios.post(`${TASK_API_BASE_URL}`, model)
    }

    async getRooms() {
        return axios.get(ROOM_API_BASE_URL);
    }

    async getRoom(id) {
        return axios.get(`${ROOM_API_BASE_URL}/${id}`);
    }

    async addRoom(model) {
        await axios.post(`${ROOM_API_BASE_URL}`, model)
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
        return await axios.get(`${ROOM_API_BASE_URL}/${id}/tasks`)
    }

    async updateRoom(id, roomId ) {
        return await axios.put(`${TASK_API_BASE_URL}/addToRoom/${id}/${roomId}`)
    }
}

export default new Service();