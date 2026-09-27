const mongoose = require("mongoose")
const Schema = mongoose.Schema

const Agent = new Schema({
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true }
})

const Admin = new Schema({
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true }
})

const Organization = new Schema({
    name: { type: String, unique: true, required: true },
    description: { type: String, required: true },
    members: { type: Number, default: 0 },
    admin: { type: Schema.Types.ObjectId, ref: "admins", required: true }
})

const Boards = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    adminId: { type: Schema.Types.ObjectId, ref: "admins", required: true },
    organizationId: { type: Schema.Types.ObjectId, ref: "organizations", required: true }
})

const Tasks = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    boardId: { type: Schema.Types.ObjectId, ref: "boards", required: true },
    status: { type: String, enum: ["todo", "in-progress", "done"], default: "todo" }
})

const agentModel = mongoose.model("agents", Agent)
const adminModel = mongoose.model("admins", Admin)
const orgModel = mongoose.model("organizations", Organization)
const boardModel = mongoose.model("boards", Boards)
const taskModel = mongoose.model("tasks", Tasks)

module.exports = {
    agentModel,
    adminModel,
    orgModel,
    boardModel,
    taskModel
}