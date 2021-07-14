import Vue from "vue";
import Vuex from "vuex";

import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    todos: [],
  },
  getters: {
    doneTodos: (state) => state.todos.filter((todo) => todo.completed),
    progress: (state) => {
      const doneTodos = state.todos.filter((todo) => todo.completed);
      return Math.round((doneTodos.length / state.todos.length) * 100);
    },
  },
  mutations: {
    set_todos(state, todos) {
      state.todos = todos;
    },
    delete_todo(state, todoId) {
      state.todos = state.todos.filter((todo) => todo.id !== todoId);
    },
    add_todo(state, newTodo) {
      state.todos.push(newTodo);
    },
    markComplete(state, todoId) {
      state.todos.map((todo) => {
        if (todo.id === todoId) {
          todo.completed = !todo.completed;
        }
        return state.todos;
      });
    },
    edit_todo(state, idEdit, newTitle) {
      state.todos.map((todo) => {
        if (todo.id === idEdit) {
          todo.title = newTitle;
        }
      });
    },
  },
  actions: {
    async getTodos({ commit }) {
      try {
        const response = await axios.get("http://localhost:3000/todos");
        commit("set_todos", response.data);
      } catch (error) {
        console.log(error);
      }
    },
    async deleteTodo({ commit }, todoId) {
      try {
        await axios.get(`http://localhost:3000/todos/${todoId}`);
        commit("delete_todo", todoId);
      } catch (error) {
        console.log(error);
      }
    },
    async addTodo({ commit }, newTodo) {
      try {
        await axios.post(`http://localhost:3000/todos`, newTodo);
        commit("add_todo", newTodo);
      } catch (error) {
        console.log(error);
      }
    },
    async editTodo({ commit }, idEdit, newTodo) {
      try {
        await axios.put(`http://localhost:3000/todos/2`, newTodo);
        commit("edit_todo", idEdit, newTodo);
      } catch (error) {
        console.log(error);
      }
    },
  },
  modules: {},
});
