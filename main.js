
const app = new Vue({
  el: "#app",
  data: {
    editMode: null,
    addMode: false,
    friends: []
  },
  methods: {
    deleteFriend(id, i) {
      fetch("http://rest.learncode.academy/api/nstanford/friends/" + id, {
        method: "DELETE"
      })
      .then(() => {
        this.friends.splice(i,1);
      })      
    },
    addFriend(friend) {
      fetch("http://rest.learncode.academy/api/nstanford/friends/", {
        body: JSON.stringify(friend),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })        
      .then(() => {
        this.addMode = false;
      }) 
      },
    updateFriend(friend) {
    fetch("http://rest.learncode.academy/api/nstanford/friends/" + friend.id, {
      body: JSON.stringify(friend),
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(() => {
      this.editMode = null;
    }) 
  }
},
mounted() {
    fetch("http://rest.learncode.academy/api/nstanford/friends")
    .then(response => response.json())
    .then((data) => {
      this.friends = data;
    })
  },
  template: `
  <div>
    <div v-if="addMode === false">
      <button @click="addMode = true">New Friend</button>
    </div>
    <div v-else>
      Name: <input name="name">
      <button @click="addFriend(this.name)">Save</button>  
    </div>

    <li v-for="friend, i in friends">
      <div v-if="editMode === friend.id">
        <input v-on:keyup.13="updateFriend(friend)" v-model="friend.name" />
        <button @click="updateFriend(friend)">Save</button>  
      </div>
      <div v-else>
        <button @click="editMode = friend.id">Edit</button> 
        {{friend.name}}
        <button @click="deleteFriend(friend.id, i)">X</button> 
      </div>
    </li>
  </div>
  `
})