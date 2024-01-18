
import axios from 'axios';

const TASK_API_BASE_URL = 'http://localhost:8080/api/task';
const ROOM_API_BASE_URL = 'http://localhost:8080/api/room';
class Service{

    async getTasks(){
        return axios.get(TASK_API_BASE_URL);
    }

    async getTask(tabReqId) {
        return axios.get(`${TASK_API_BASE_URL}/${tabReqId}`);
    }
    async addTask( model) {
        await axios.post(`${TASK_API_BASE_URL}`, model)
    }

    async getRooms(){
        return axios.get(ROOM_API_BASE_URL);
    }

    async getRoom(tabReqId) {
        return axios.get(`${ROOM_API_BASE_URL}/${tabReqId}`);
    }
    async addRoom( model) {
        await axios.post(`${ROOM_API_BASE_URL}`, model)
    }
}

export default new Service();