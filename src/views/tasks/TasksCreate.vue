<template>
    <div>
        <h1>Create Task</h1>
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
                <button type="submit" class="btn btn-secondary">Create</button>
            </div>
        </form>
    </div>
</template>

<script>
import * as taskService from '../../services/TaskService'

export default {
    name: 'task-create',
    data() {
        return {
            task: {
                title: '',
                body: '',
                dueDate: ''
            }
        }
    },
    methods: {
        async onSubmit() {
            const request = {
                task: this.task
            }
            await taskService.createTask(request)
            this.$router.push({ name: 'tasks-all' })
        }
    }
}
</script>