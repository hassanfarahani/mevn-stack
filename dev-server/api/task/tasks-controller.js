import User from '../../model/user-model'
import Task from '../../model/task-model'
import moment from 'moment'
import * as auth from '../../services/auth-service'

export function index(req, res) {
    // find all tasks
    Task.find({}, (error, tasks) => {
        if (error) {
            return res.status(500).json()
        }
        return res.status(200).json({ tasks })
        // grab other properties (username) for the author property and from the user schema  that way when we pull in tasks, We also have what user created
    }).populate('author', 'username', 'user')
}

export function create(req, res) {
    // create task : 201 === task created
    const id = auth.getUserId(req)
    User.findOne({ _id: id }, (error, user) => { // find the user by id
        if (error && !user) {
            return res.status(500).json()
        }
        const task = new Task(req.body.task)
        task.author = user._id
        task.dueDate = moment(task.dueDate)

        // save into db
        task.save(error => {
            if (error) {
                return res.status(500).json()
            }
            return res.status(201).json()
        })
    })
    return res.status(201).json()
}

export function update(req, res) {
    // update task : 204 === we are not sending anything back
    // grab the user from the database with that id
    // we want to make sure that the user that's updating this task is the one that created it
    const id = auth.getUserId(req)

    User.findOne({ _id: id }, (error, user) => {
        if (error) {
            return res.status(500).json()
        }
        if (!user) {
            return res.status(404).json()
        }
        const task = new Task(req.body.task)
        task.author = user._id
        task.dueDate = moment(task.dueDate)
        Task.findByIdAndUpdate({ _id: task._id}, task, error => {
            if (error) {
                return res.status(500).json()
            }
            return res.status(204).json()
        })
    })
}

export function remove(req, res) {
    // delete a task
    const id = auth.getUserId(req); // user id
    Task.findOne({ _id: req.params.id }, (error, task) => {
        if (error) {
            return res.status(500).json()
        }
        if (!task) {
            return res.status(404).json()
        }
        if (task.author._id.toString() !== id) { // we'll compare the id of that task to the id of the user that's trying to delete this task
            return res.status(403).json({ message: 'Not allowed to delete another user\'s task!' })
        }
        Task.deleteOne({ _id: req.params.id }, error => {
            if (error) {
                return res.status(500).json()
            }
            return res.status(204).json()
        })
    })
}

export function show(req, res) {
    // get task by id
    Task.findOne({ _id: req.params.id }, (error, task) => {
        if (error) {
            console.log('error in:', error)
            return res.status(500).json()
        }
        if (!task) {
            console.log('error task:', task)
            return res.status(404).json()
        }
        return res.status(200).json({ task: task })
    })
}