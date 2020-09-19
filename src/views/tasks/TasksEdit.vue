<template>
    <div>
        <h1>Edit Task</h1>
        <form class="custom-form" @submit.prevent="onSubmit">
            <div class="form-group">
                <label for="title">Title</label>
                <input v-model="task.title" name="title" type="text" class="form-control" id="title" placeholder="Title" />
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <textarea v-model="task.body" name="body" class="form-control" id="body" cols="30" rows="10" placeholder="Body"></textarea>
            </div>
            <div class="form-group">
                <label for="title">Due Date</label>
                <input v-model="task.dueDate" name="due-date" type="date" class="form-control" id="due-date" placeholder="Due Date" />
            </div>
            <div class="form-group">
                <button type="submit" class="btn btn-secondary">Save Changes</button>
            </div>
        </form>
    </div>
</template>

<script>
import * as taskService from '../../services/TaskService'
import moment from 'moment'

export default {
    name: 'tasks-edit',
    data() {
        return {
            task: {
                title: '',
                body: '',
                dueDate: ''
            }
        }
    },
    beforeRouteEnter(to, from, next) {
        taskService.getTaskById(to.params.id)
            .then(response => {
                if (!response) {
                    next('/tasks')
                } else {
                    next(vm => {
                        const task = response.data.task
                        console.log('res:', response)
                        task.dueDate = moment(task.dueDate).format('YYYY-MM-DDD')
                        vm.task = task
                    })
                }
            })
    },
    methods: {
        async onSubmit() {
            const request = {
                task: this.task
            }
            await taskService.updateTask(request)
            this.$router.push({ name: 'tasks-all' })
        }
    }
}
</script>