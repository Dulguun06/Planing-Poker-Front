
import axios from 'axios';

const TASK_API_BASE_URL = 'http://localhost:8080/api/task';

class TaskService{

    getTasks(){
        return axios.get(TASK_API_BASE_URL);
    }

    async getTask(tabReqId) {
        return axios.get(`${TASK_API_BASE_URL}/${tabReqId}`);
    }
    async addTask( model) {
        console.log("model: " + JSON.stringify(model));
        await axios.post(`${TASK_API_BASE_URL}`, model).then(response =>{
            console.log("response: " + response.data);
        });
    }
}

export default new TaskService();