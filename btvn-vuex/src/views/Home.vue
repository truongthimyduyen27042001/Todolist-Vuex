<template>
  <div class="home">
    <!-- modal -->
    <div
      id="myModal"
      class="modal"
      :style="isEditing ? 'display:block' : 'display:none'"
    >
      <!-- Modal content -->
      <div class="modal-content text-start">
        <span @click="isEditing = false" class="close">&times;</span>
        <h2 class="text-center">YOU ARE EDITTING TITLE</h2>
        <form class="form-edit" @submit="handleEdit">
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label"
              >Enter new title</label
            >
            <input
              type="text"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
    <!-- end modal -->
    <div class="todo-title">
      <h1>List To Do</h1>
      <h3>Count: 3</h3>
    </div>
    <div class="todo-list">
      <form @submit="onSubmit">
        <input type="text" class="form-control" v-model="title" />
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
      <ul>
        <li
          v-for="todo in todos"
          :key="todo.id"
          class="d-flex"
          :class="todo.completed ? 'completed' : ''"
        >
          <div class="work d-flex">
            <h5>{{ todo.title }}</h5>
            <input
              type="checkbox"
              :checked="todo.completed"
              @change="markComplete(todo.id)"
            />
          </div>
          <div class="todo-control">
            <button
              type="button"
              @click="editTitle()"
              class="btn btn-outline-success"
            >
              Edit
            </button>
            <button
              type="button"
              @click="deleteTodo(todo.id)"
              class="btn btn-outline-danger"
            >
              Delete
            </button>
          </div>
        </li>
      </ul>
      <div class="todo-done">
        <h1>Done</h1>
        <ul>
          <li v-for="todo in doneTodos" :key="todo.id">{{ todo.title }}</li>
        </ul>
      </div>
      <p class="progress-bar">Progress : {{ progress }} %</p>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

import { mapActions, mapMutations, mapGetters } from "vuex";
import { v4 as uuidv4 } from "uuid";
export default {
  name: "Home",
  data() {
    return {
      title: "",
      isEditing: false,
      editID: "",
    };
  },
  created() {
    this.getTodos();
  },
  computed: {
    todos() {
      return this.$store.state.todos;
    },
    ...mapGetters(["doneTodos"]),
    ...mapGetters(["progress"]),
  },
  methods: {
    ...mapActions(["getTodos"]),
    ...mapActions(["deleteTodo"]),
    ...mapMutations(["markComplete"]),
    ...mapActions(["addTodo"]),
    ...mapActions(["editTodo"]),
    onSubmit(event) {
      event.preventDefault();
      this.addTodo({
        id: uuidv4(),
        title: this.title,
        completed: false,
      });
      this.title = "";
    },
    editTitle(id) {
      (this.isEditing = true), (this.editID = id);
    },
    handleEdit() {
      this.isEditing = false;
    },
  },
};
</script>
<style scoped>
.home {
  padding-top: 50px;
}
.todo-list form input {
  width: 90%;
}
.todo-list {
  width: 50%;
  margin: auto;
}
.todo-list ul {
  padding: 0px;
  list-style: none;
}
.todo-list li {
  padding: 10px;
  cursor: pointer;
  margin: 10px 0px;
  border-radius: 4px;
  background: rgb(240, 240, 240);
  color: black;
  justify-content: space-between;
}
.todo-list li button:nth-child(1) {
  margin-right: 10px;
}
.work {
  justify-content: center;
  align-items: center;
}
.work h5 {
  padding-right: 20px;
}
button:focus {
  box-shadow: none !important;
}
.todo-list li input[type="checkbox"] {
  -ms-transform: scale(2); /* IE */
  -moz-transform: scale(2); /* FF */
  -webkit-transform: scale(2); /* Safari and Chrome */
  -o-transform: scale(2); /* Opera */
  transform: scale(2);
  padding: 10px;
  float: right;
}

.todo-list li.completed {
  background: rgb(119, 218, 243);
}
form {
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
}

form input:focus {
  box-shadow: none !important;
}
.progress-bar {
  padding: 5px;
  text-align: center;
  background: rgb(106, 248, 118);
  color: black;
}
/* modal */
.modal {
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  padding-top: 100px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
}

/* Modal Content */
.modal-content {
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 60%;
}

/* The Close Button */
.close {
  color: #aaaaaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}
.form-edit {
  display: flex;
  flex-direction: column;
}
.modal span {
  text-align: right;
}
.modal button {
  width: fit-content;
  margin: auto;
}
</style>
