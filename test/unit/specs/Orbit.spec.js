
import { mutations } from '../../../src/vuex/Store.js'

let chai = require('chai');
let should = chai.should();
let expect = chai.expect


const {create_orbit, create_node} = mutations
describe('node mutation', () => {
  const state = {
    usr: null,
    orbits: [],
    tag: null,
    score: 0
  }
  it('should create orbit', () => {
    create_orbit(state,
                {radius: 300, speed: 300, from: null})
    expect(state.orbits.length).to.equal(1)
  })

  it('should add node', () => {
    let node_data = {
      orbrad: 300,
      pos: 1,
      name: 'idk',
      time: 5000
    }
    for (let i = 0; i < 10; i++) {
      node_data.name = i
      create_node(state,{data:node_data})
    }
    expect(state.orbits[0].nodes.length).to.equal(10)
  })

  it('should mutate a single node', () => {
    update_node()
  })
})