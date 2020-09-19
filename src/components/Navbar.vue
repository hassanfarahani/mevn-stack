<template>
    <header>
        <nav class="navbar navbar-expand-md navbar-dark fixed-top custom-bg-dark">
            <router-link :to="{name: 'Home'}" class="navbar-brand">
                <img style="max-height: 25px;" alt="Vue logo" src="../assets/logo.png">
                Task Manager
            </router-link>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarCollapse">
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item">
                        <router-link :to="{name: 'Home'}" class="nav-link" exact>
                            Home
                        </router-link>
                    </li>
                    <li v-if="isLoggedIn" class="nav-item">
                        <router-link :to="{name: 'tasks-all'}" class="nav-link" exact>
                            Tasks
                        </router-link>
                    </li>
                    <li v-if="!isLoggedIn" class="nav-item">
                        <router-link :to="{name: 'register'}" class="nav-link" exact>
                            Register
                        </router-link>
                    </li>
                    <li v-if="!isLoggedIn" class="nav-item">
                        <router-link :to="{name: 'login'}" class="nav-link" exact>
                            Login
                        </router-link>
                    </li>
                    <li v-if="isLoggedIn" class="nav-item">
                        <a @click.prevent="logout()" class="nav-link" href="#">Logout</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">{{ username ? username : 'User' }}</a>
                    </li>
                </ul>
            </div>
        </nav>
    </header>
</template>

<script>
import { mapState } from 'vuex'
import * as auth from '../services/AuthService'

export default {
    name: 'Navbar',
    computed: {
        ...mapState(['username', 'isLoggedIn'])
    },
    methods: {
        logout() {
            auth.logout()
            this.$router.push({ name: 'Home' })
        }
    }
}
</script>