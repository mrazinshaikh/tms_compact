<template>
  <div class="px-3">
    <div v-if="!selected_user">
      <div class="flex justify-center items-center h-screen">
        <div class="max-w-md mx-auto">
          <select v-model="selected_user_id" class="w-full mb-4 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:ring-blue-500">
            <option value="" disabled selected>Select user email</option>
            <option v-for="user in users" :value="user.id" :key="user.id">{{ user.email }}</option>
          </select>
          <button @click="selectUser" class="block w-full px-4 py-2 rounded-lg text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500">
            Next
          </button>
        </div>
      </div>
    </div>
    <div v-else>
        <div class="border-b border-gray-500 p-4">
            <h1 class="text-xl text-center">TMS Compact</h1>
        </div>
      <div class="mb-4 mt-4 float-right">
        <button @click="showTaskForm = true" class="px-4 py-2 rounded-lg text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-500">
          Add Task
        </button>
      </div>
      <table class="w-full border-collapse border border-gray-300 text-center">
        <thead>
          <tr class="bg-gray-100">
            <th class="px-4 py-2">ID</th>
            <th class="px-4 py-2">Title</th>
            <th class="px-4 py-2">Start Time</th>
            <th class="px-4 py-2">End Time</th>
            <th class="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody v-if="!isTableLoading">
          <tr v-for="task in selected_user_tasks" :key="task.id">
            <td class="px-4 py-2">{{ task.id }}</td>
            <td class="px-4 py-2">{{ task.title }}</td>
            <td class="px-4 py-2">{{ task.start_time ? formatDate(task.start_time) : '-' }}</td>
            <td class="px-4 py-2">{{ task.end_time ? formatDate(task.end_time) : '-' }}</td>
            <td class="px-4 py-2">
              <button v-if="task.end_time !== null" @click="endTask(task)" class="px-4 py-2 rounded-lg text-white bg-red-500">
                Stop
              </button>
              <button v-else @click="startTask(task)" class="px-4 py-2 rounded-lg text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500">
                Start
              </button>
              <button @click="showTaskLogs(task.id)" class="px-4 py-2 rounded-lg text-white bg-red-500 ml-4">
                Logs
              </button>
            </td>
          </tr>
        </tbody>
        <tfoot v-else>
            <tr>
                <td colspan="5">
                    <div class="p-3 mx-auto w-max">
                        <div role="status">
                            <svg aria-hidden="true" class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                            </svg>
                            <span class="sr-only">Loading...</span>
                        </div>
                    </div>
                </td>
            </tr>
        </tfoot>
      </table>
      <div v-if="showTaskForm" class="fixed top-0 left-0 w-full h-screen bg-gray-500 bg-opacity-50 flex justify-center items-center">
        <div class="bg-white rounded-lg shadow-lg p-8">
          <h2 class="text-lg font-medium mb-4">Add Task</h2>
          <form @submit.prevent="addTask">
            <div class="mb-4">
              <label class="block text-gray-700 font-medium mb-2" for="title">
                Title
              </label>
              <input v-model="newTask.title" class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:ring-blue-500" type="text" id="title" name="title" required>
            </div>
            <div class="mb-4">
                <button type="submit" class="block w-full px-4 py-2 rounded-lg text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500">
                    Add
                </button>
            </div>
        </form>
      <button @click="showTaskForm = false" class="absolute top-0 right-0 px-2 py-1 text-gray-700 hover:text-gray-900 focus:outline-none">
        <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  </div>
</div>

</div>
</template>

<script>
import { v4 as uuidV4 } from 'uuid';

export default {
  data() {
    return {
      selected_user_id: 1,
      selected_user: {"id":1,"email":"test@email.com"},
      users: [],
      tasks: [],
      task_logs: [],
      showTaskForm: false,
      newTask: { title: '' },
      allData: {},
      isTableLoading: true,
    }
  },
  async mounted() {
    await nextTick();
    const allData = await this.getAlldata()
    this.updateLocalData(allData);
    this.isTableLoading = false;
  },
  methods: {
    showTaskLogs(){
        const allData = this.getAlldata();
    },
    formatDate(dateString){
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = date.getDate();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        const formatted = (year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds);

        return formatted;
    },
    async currentTime(){
        const {data: fetchApi} = await useFetch('http://worldtimeapi.org/api/timezone/Asia/Kolkata');
        const datetime = new Date(Date.parse(fetchApi.value.datetime))
        // const nowStr = new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
        // const now = new Date(Date.parse(nowStr));
        // console.log(now);
        return datetime.toString();
    },
    updateLocalData(allData) {
        this.users = allData.users
        this.tasks = allData.tasks
        this.task_logs = allData.task_logs
        this.allData = allData
    },
    async getAlldata() {
        return (await useFetch('/api/tasks/')).data.value
    },
    async updateAlldata(alldata) {
        const response = await useFetch('/api/tasks/', { 
            method: 'POST', 
            body: alldata 
        });
        const allData = response.data.value;
        if(allData){
            this.updateLocalData(allData);
        }
        return response.data.value;
    },
    selectUser() {
      const selected_user = this.users.find(u => u.id === parseInt(this.selected_user_id))
      if (selected_user) {
        this.selected_user = selected_user
      }
    },
    async startTask(task) {
      const uuid = uuidV4();
      const now = (await this.currentTime())
      console.log(now);
      const task_log = {
        id: uuid,
        task_id: task.id,
        start_time: now,
      }
      const alldata = await this.getAlldata()
      alldata.task_logs.push(task_log)
      await this.updateAlldata(alldata)
    },
    async addTask() {
        const user_tasks_index = this.tasks.findIndex(t => t[this.selected_user_id])
        const new_task = {
            user_id: this.selected_user.id,
            title: this.newTask.title,
        }
        const alldata = await this.getAlldata()
        const maxId = Math.max(...this.selected_user_tasks.map(task => task.id));

        const task = {
          id: maxId + 1,
          user_id: new_task.user_id,
          title: new_task.title,
        }
        this.tasks[user_tasks_index][this.selected_user_id].push(task);
        alldata.tasks = this.tasks;
        await this.updateAlldata(alldata)
        this.newTask.title = ''
        this.showTaskForm = false
    },
    async endTask(task) {
        const task_log_index = this.task_logs.findIndex(t => t.id == task.task_log_id);
        if(typeof task_log_index === 'number'){
            const now = (await this.currentTime())
            this.task_logs[task_log_index].end_time = now;
            this.allData.task_logs = this.task_logs;
            await this.updateAlldata(this.allData);
        }
        else{
            return;
        }
    },
  },
  computed: {
    selected_user_tasks() {
      const user_tasks = this.tasks.find(t => t[this.selected_user_id])
      if (user_tasks) {
        return user_tasks[this.selected_user_id].map(task => {
          const task_log = this.task_logs.find(log => log.task_id === task.id && !log.end_time)
          return {
            ...task,
            start_time: task_log ? task_log.start_time : null,
            end_time: task_log ? task_log.end_time : null,
            task_log_id: task_log ? task_log.id : null
          }
        })
      }
      return []
    },
  },
}
</script>
