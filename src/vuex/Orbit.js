import { Node } from './Node'

export default class {
  // enter radius of orbit
  constructor (payload) {
    this.size = 2 * payload.radius + 'px'
    this.radius = payload.radius
    if (typeof (payload.speed) === 'number') {
      this.speed = 'spin ' + payload.speed + 's infinite linear'
    } else {
      this.speed = payload.speed
    }
    this.nodes = payload.nodes || []
    this.from = payload.from || null
  }
  createNode (data, metadata) {
    data.orbrad = this.radius
    this.nodes.push(new Node(data, metadata))
  } // need to add a toJSON function to filter unwanted props
  addNode (node) {
    this.nodes.push(node)
  }
  setNode (nodelist) {
    this.nodes = nodelist
  }
  setOrbit (obj) {
    this.radius = obj.radius
    this.size = 2 * obj.radius + 'px'
    this.speed = obj.speed
    this.tag = obj.tag

    for (var i = 0; i < obj.nodes.length; i++) {
      let tmp = obj.nodes[i]
      // prepare data in packages to deliver to functions
      let {metadata, ...data} = tmp
      this.createNode(data, metadata)
    }
  }

}
