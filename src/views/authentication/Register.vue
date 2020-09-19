<template>
    <div>
        <h1>Register</h1>
        <form class="custom-form" @submit.prevent="onSubmit">
            <div class="form-group">
                <label for="username">First Name</label>
                <input v-model="first" type="text" class="form-control" id="first" placeholder="First Name" />
            </div>
            <div class="form-group">
                <label for="username">Last Name</label>
                <input v-model="last" type="text" class="form-control" id="last" placeholder="Last Name" />
            </div>
            <div class="form-group">
                <label for="username">Username</label>
                <input v-model="username" type="text" class="form-control" id="username" placeholder="Username" />
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input v-model="password" type="password" class="form-control" id="password" placeholder="Password" />
            </div>
            <div class="form-group">
                <button type="submit" class="btn btn-secondary">Register</button>
            </div>
        </form>
    </div>
</template>

<script>
import * as auth from '../../services/AuthService'

export default {
    name: 'register',
    data() {
        return {
            username: '',
            password: '',
            first: '',
            last: ''
        }
    },
    methods: {
        async onSubmit() {
            const user = {
                username: this.username,
                password: this.password,
                first: this.first,
                last: this.last
            }
            const registerPromise = auth.registerUser(user)
            const loginPromise = auth.login(user)
            await Promise.all([registerPromise, loginPromise])
            this.$router.push({ name: 'Home' })
        }
    }
}
</script>