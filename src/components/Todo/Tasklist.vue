<template>
<div class="tasklist">
    <form v-if="show_form" v-on:submit.prevent="updateNode()">
      <input  name="name" v-model="sel_node.name"/>
      <input  name="due" type="number" v-model="sel_node.intent_time"/>
      <!-- <input name="priority" type="text" [(ngModel)]="selected_node.priority"/> -->
      <select type="text" name="priority" v-model="sel_node.priority">
        <option value="hi">high</option>
        <option value="med">med</option>
        <option value="low">low</option>
      </select>
      <input type="checkbox" name="delete" v-model="del_node"> delete node <br>
      <button @click="show_form = false">close</button>
      <button type="submit" style="display:none">hidden submit</button>
    </form>

    <h3> Adding a node this way will point to another orbit</h3>
    <form class="task_input" @submit.prevent="createNodePointer()">
    <input  type="text" name="task_name" placeholder="name" v-model="newtask.name">
    <button type="submit" style="display:none">hidden submit</button>
    </form>
    <ul class="todos" v-if="$store.state.orbits.length > 0">
        <li class="task" v-on:click="selectTask(node)" v-for="node in $store.state.orbits[0].nodes">
          <span class="task_name">Task Name: {{node.name}}</span>
          <button v-on:click="deleteNode({node:node})">DEL</button>
        </li>
    <!--
    <p class="task_time">Task Due (in hours): {{node.due}}</p>
    </li>
    -->
</ul>
</div>
</template>

<script>
  import {mapMutations, mapActions} from 'vuex'
  export default {
    name: 'tasklist',
    data () {
      return {
        sel_node: null,
        del_node: false,
        show_form: false,
        newtask: {
          complete: false
        }
      }
    },
    methods: {
      ...mapMutations(['update_node']),
      ...mapActions(['updatePersist', 'createNode', 'deleteNode']),
      selectTask (node) {
        this.sel_node = node
        this.show_form = true
      },
      createNodePointer () {
        console.log('new pointer')
        let data = {
          name: this.newtask.name,
          point_to: this.newtask.name
        }
        this.createNode({data: data})
      },
      updateNode () {
        this.show_form = false
        if (this.del_node) {
          this.deleteNode({node: this.sel_node}) // issue with multi orbit, change this later
          this.del_node = false
        } else {
          this.update_node({orbIdx: 0, obj: this.sel_node})
        }
        this.updatePersist()
      }
    }
  }
</script>

<style scoped>
  .todos{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        border-top:1px solid rgba(0, 200, 200, 0.8);
        color:white;
    }
  .tasklist{
    margin:auto;
    width:50%;
    padding-top: 5vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

</style>
