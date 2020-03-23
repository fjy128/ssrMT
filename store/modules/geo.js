const state = () =>({position:{}})

const mutations = {
  setPosition(state,val){
    console.log(val,333300000)
    debugger
    state.position = val
  },
}

const actions = {
  setPosition:({
    commit
  },position)=>{
    console.log(position,444440000)
    debugger
    commit('setPosition', position)
  }
}

export default {
  namespaced:true,
  state,
  mutations,
  actions
}