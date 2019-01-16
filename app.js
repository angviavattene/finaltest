var vue = new Vue({
    el: '#app',
    data: {
        todos: [],
        users: [],
        name: "",
        id: "",
        description: "",
        completed:false,
        assignedTo: ""
    },
    
    methods: {

        newTodo: function() {
            var newTodo = {
                name: this.name,
                description: this.description,
                assignedTo: this.assignedTo,
            }
            var url = 'http://localhost:3000/modify/addtodo/?token=3';
            this.$http.post(url, newTodo).then(response => {
                console.log("response: ", response);
            })        
        },

        getTodo: function() {
            var url = 'http://localhost:3000/todo';
            this.$http.get(url).then(response => {
                console.log("response:", JSON.stringify(response.body));
                this.todos = response.body.toDoList;
                return this.todos;
            });
        },

        showUsers: function() {
            var url = 'http://localhost:3000/users';
            this.$http.get(url).then(response => {
                console.log("users:", JSON.stringify(response.body));
                this.users = response.body;
                return this.users;
            })
        },

        getTodoByUser: function() {
            var user = "caio";
            var url = 'http://localhost:3000/todo/?token=3&user=' + user;
            this.$http.get(url).then(response => {
                this.todos = response.body.message;
                return this.todos.message;
            });
        },

        deleteTodo: function() {
            var url = 'http://localhost:3000/modify/' +this.id+ '/?token=3';
            this.$http.delete(url).then(response => {
                console.log("delete todo:", JSON.stringify(response.body));
            })
            this.state = response.body;
            return this.state;
        },

    },

    created: function() {
        this.getTodo();
        this.showUsers();
        this.deleteTodo();
        this.getTodoByUser();
    }
})
