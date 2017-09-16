export class Node {
    /*
    name:string
    type:string
    complete:boolean
    due:number
    priority:string
    posx:string
    posy:string
    size:string
    orbit_radius:number
    id:number
    metadata:object
    */
  constructor (data, metadata = null) {
    // this.id = data.id
    this.orbrad = data.orbrad
    this.lvl = data.lvl
    this.pos = data.pos
    this.name = data.name
    this.complete = data.complete
    this.time = data.time
    this.intent_time = data.time
    this.point_to = data.point_to
    // to ensure the random number provide enough bits.
    var firstPart = (Math.random() * 46656) | 0
    var secondPart = (Math.random() * 46656) | 0
    firstPart = ('000' + firstPart.toString(36)).slice(-3)
    secondPart = ('000' + secondPart.toString(36)).slice(-3)
    this.id = firstPart + secondPart
    // internal metadata
    this.type = null
    this.metadata = metadata || {}
    if (this.metadata.created === undefined) { this.metadata.created = new Date() }
    // this.update()
  }
  toJSON () {
    return {
      // id: this.id,
      lvl: this.lvl,
      pos: this.pos,
      name: this.name,
      complete: this.complete,
      metadata: this.metadata,
      time: this.time,
      point_to: this.point_to,
      id: this.id
    }
  } /*
  update () {
    let angle = ((this.pos % 24) * (-6.28 / 12)) + (3.14 / 2)
    let nodeRadint = 10 // px
    switch (this.lvl) {
      case '3': {
        nodeRadint = 30 // px
        break
      }
      case '2': {
        nodeRadint = 20 // px
        break
      }
        // default to low priority
    }
    this.posx = (this.orbrad - nodeRadint + Math.cos(angle) * this.orbrad) + 'px'
    this.posy = (this.orbrad - nodeRadint - Math.sin(angle) * this.orbrad) + 'px'
    // this.posx = this.orbit_radius - nodeRadint + 'px'
    // this.posy = this.orbit_radius - nodeRadint + 'px'
    this.size = 2 * nodeRadint + 'px'
    this.style = {
      'height': this.size,
      'width': this.size,
      'top': this.posy,
      'left': this.posx,
      'transform-origin': nodeRadint + 'px ' + nodeRadint + 'px '
    }
  } */
}
