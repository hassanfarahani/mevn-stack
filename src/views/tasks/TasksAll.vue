<template>
    <div class="d-flex flex-column">
        <h1>Tasks</h1>
        <div class="mb-4">
            <router-link :to="{name: 'tasks-create'}" class="btn btn-success ml-2" exact>Create Task</router-link>
        </div>
        <div v-if="tasks && tasks.length > 0" class="d-flex flex-wrap justify-content-start">
            <div v-for="task in tasks" :key="task._id" class="card mb-2 ml-2 text-white bg-dark" style="width: 18rem;">
                <div class="card-body">
                    <div class="d-flex justify-content-between">
                        <h5 class="card-title">{{ task.title }}</h5>
                        <span :class="{ late: taskIsLate(task.dueDate) && !task.completed }" class="small">{{ formatDate(task.dueDate) }}</span>
                    </div>
                    <h6 class="card-title mb-2 text-muted">
                        Created by {{ task.author.username }}
                    </h6>
                    <p class="card-text">{{ task.body }}</p>
                    <div v-if="task.author._id === userId" class="form-group form-check">
                        <input
                            type="checkbox"
                            class="form-check-input"
                            v-model="task.completed"
                            :disabled="task.completed"
                            @click="markAsCompleted(task)">
                        <label for="form-check-label">Completed</label>
                    </div>
                    <div v-if="task.author._id === userId" class="d-flex justify-content-between">
                        <router-link
                            type="button"
                            tag="button"
                            :to="{ name: 'tasks-edit', params: { id: task._id }}"
                            class="card-link btn btn-primary" exact>Edit</router-link>
                        <a
                            v-on:click.prevent="currentTaskId=task._id"
                            class="card-link btn btn-danger"
                            v-b-modal.modal1>Delete</a>
                    </div>
                </div>
            </div>

            <div>
                <b-modal ref="modal" id="modal1" centered title="Delete Confirmation">
                    <p class="my-4">Are you sure you want to delete this task?</p>
                    <div slot="modal-footer" class="w-100 text-right">
                        <b-button slot="md" class="mr-1" variant="danger" @click="deleteTask">Delete</b-button>
                        <b-button slot="md" variant="secondary" @click="cancelModal">Cancel</b-button>
                    </div>
                </b-modal>
            </div>
        </div>
        <div v-if="tasks && tasks.length === 0" class="ml-2">
            <div class="alert alert-info">No tasks found!</div>
        </div>
    </div>
</template>

<script>
import * as taskService from '../../services/TaskService'
import { mapState } from 'vuex'
import moment from 'moment'

export default {
    name: 'tasks-all',
    computed: {
        ...mapState(['userId'])
    },
    data() {
        return {
            tasks: null,
            currentTaskId: null
        }
    },
    // beforeRouteEnter(to, from, next) {
    //     taskService.getAllTasks()
    //         .then(res => {
    //             console.log(res)
    //             next(vm => {
    //                 vm.tasks = res.data.tasks
    //             })
    //         })
    // },
    async created() {
        const response = await taskService.getAllTasks()
        this.tasks = response.data.tasks
    },
    methods: {
        taskIsLate(date) {
            return moment(date).isBefore()
        },
        cancelModal() {
            this.$refs.modal.hide()
            this.currentTaskId = null
        },
        async deleteTask() {
            this.$refs.modal.hide()
            await taskService.deleteTask(this.currentTaskId)
            const index = this.tasks.findIndex(task => task._id === this.currentTaskId)
            this.tasks.splice(index, 1)
            this.currentTaskId = null
        },
        markAsCompleted(task) {
            console.log('task tik clicked')
            task.completed = true
            const request = { task }
            taskService.updateTask(request)
        },
        formatDate(value) {
            if (!value) {
                return ''
            }
            return moment(value).format('MMM DD, YYYY')
        }
    }
}
</script>