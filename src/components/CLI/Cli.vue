<template>
  <form v-on:submit.prevent="startTimer()">
    <!--
    <div class="sub-main">
        <button type="submit" class="timerButton" v-if="timer_on==false">Start Timer</button>
    </div>
    -->
    <transition name="fade">
    <div class="timer" v-if="timer_on">
    <audio ref="timerDing" src="./timer.wav"></audio>

    <div class="block" v-if="hr != 0">
        <input type="number" id="hr" class="digit" v-model="hr" max="24" min="0" v-bind:readonly="timer_on">
        <p class="text">Hours</p>
    </div>
    <div class="block" v-if="min != 0">
        <input type="number" id="min" class="digit" v-model="min" max="59" min="0" v-bind:readonly="timer_on">
        <p class="text">Minutes</p>
    </div>
    <div class="block">
        <input type="number" id="sec" class="digit" v-model="sec" max="59" min="0" v-bind:readonly="timer_on">
        <p class="text">Seconds</p>
    </div>

    </div>
    </transition>
    <div>
      <input class="textInput" type="text" placeholder="what are you doing?" v-model="label" autofocus>
    </div>
    <div v-if="timer_on">
    <div class="sub-main">
      <button class="timerButton" v-on:click="Complete()" v-if="timer_on">Complete</button>
    </div>
    <div class="sub-main">
      <button class="timerButton" v-on:click="Pause()" v-if="paused == false">Pause</button>
      <button class="timerButton" v-on:click="Pause()" v-if="paused == true">Play</button>
    </div>
    <div class="sub-main">
      <button class="timerButton" v-on:click="resetTimer()">Reset</button>
    </div>
    </div>



  </form>

</template>
<script>

  import {mapActions} from 'vuex'
  export default {
    name: 'timer',
    data () {
      return {
        timer_on: false,
        node_count: 0,
        label: null,
        intervalId: null,
        totCount: 25 * 60,
        count: 0,
        paused: false
      }
    },
    computed: {

      hr: {
        get: function () {
          let tmp = Math.floor(this.count / 3600)
          return tmp
        },
        set: function (newval) {
          this.totCount = this.totCount - ((this.hr - newval) * 3600)
        }

      },
      min: {
        get: function () {
          let tmp = Math.floor((this.count % 3600) / 60)
          return tmp
        },
        set: function (newval) {
          this.totCount = this.totCount - ((this.min - newval) * 60)
        }

      },
      sec: {
        get: function () {
          let tmp = (this.count % 3600) % 60
          return tmp
        },
        set: function (newval) {
          this.totCount = this.totCount - (this.sec - newval)
        }
      }
    },
    methods: {
      ...mapActions(['createNode']),
      startTimer () {
        if (this.timer_on === false && this.totCount > 0) {
          this.timer_on = true
          this.intervalId = window.setInterval(() => {
            this.count += 1
            if (this.count % this.totCount === 0) { this._checkTimerOff() }
          }, 1000)
        }
      },
      _checkTimerOff () {
        this.playSound()
        // this.createNode({'name': this.label, 'due': this.nodecount, 'priority': 'med'})
        // this.resetTimer()
        // this.nodecount += 1
      },
      Complete () {
        let data = {
          lvl: 2,
          name: this.label,
          time: this.count,
          complete: true
        }
        this.createNode({data: data})
        this.resetTimer()
        this.nodecount += 1
      },
      Pause () {
        if (!this.paused) {
          window.clearInterval(this.intervalId)
          this.intervalId = null
          this.paused = true
        } else {
          this.timer_on = false
          this.paused = false
          this.startTimer()
        }
      },
      resetTimer () {
        this.min = 25
        this.sec = 0
        this.hr = 0
        this.timer_on = false
        this.count = 0
        window.clearInterval(this.intervalId)
      },
      playSound () {
        this.$refs.timerDing.play()
      }
    }
  }
</script>

<style>
  @import url(https://fonts.googleapis.com/css?family=Roboto+Condensed:400|Roboto:100);
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
}
input[type="number"] {
    -moz-appearance: textfield;
}


.textInput {
    color: white;
    font-size: 20px;
    font-weight: 2px;
    font-family: 'Roboto', serif;
    background: none;
    border: none;
    border-bottom: 2px solid white
}
.timer {
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-content: center;
}
.block {
    display: flex;
    flex-direction: column;
    margin-left: auto;
    margin-right: auto;
}

.text {
    color: #1abc9c;
    font-size: 10px;
    font-family: 'Roboto Condensed', serif;
    font-weight: 40;
    margin-top:20px;
    margin-bottom: 10px;
    text-align: center;
}

.digit {
    color: #ecf0f1;
    font-size: 50px;
    font-family: 'Roboto', serif;
    text-align: center;
    background: none;
    border: none;
}

.timerButton {
  color: #fff;
  text-decoration: none;
  margin-right: 10px;
  
  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
  border-radius: 5px;
  
  -webkit-box-shadow: 0 1px 0px rgba(255,255,255,0.1) inset, 0 0px 1px rgba(0,0,0,0.7);
  -moz-box-shadow: 0 1px 0px rgba(255,255,255,0.1) inset, 0 0px 1px rgba(0,0,0,0.7);
  box-shadow: 0 1px 0px rgba(255,255,255,0.1) inset, 0 0px 1px rgba(0,0,0,0.7);
  
  background: rgba(0,0,0,0.1); /* #191919 */
  border: 1px solid #141414;
  padding: 10px 25px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0
}
</style>
