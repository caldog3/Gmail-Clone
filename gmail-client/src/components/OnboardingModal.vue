<template>

<main v-cloak>
  <p><button class="accent" @click="toggleModal()">Onboard Me!</button></p>
   
  <!--  The Modal -->
  <boardal v-if="modal.isOpen" :has-mask="modal.hasMask" :can-click-mask="modal.canClickMask" :has-x="modal.hasX" @toggle="toggleModal">
    <article v-cloak>
      <section :ref="mySection">
        <h3>Welcome!</h3>
        <p>You are about to experience data collection bliss.</p>
        <p>Here at [company_name], we pride our selves on collecting your pertient personal information and meta details in order to <del>track</del> fascilitate you doing just about anything.</p>
        <p><button class="accent" @click="skip(1)">Let's Get Started</button></p>
        <p><label><input type="checkbox" v-model="showDots" /> show dots</label></p>
        <p>
          <b>movement</b><br />
          <label><input type="radio" v-model="orientation" value="row" /> horizontal</label><br />
          <label><input type="radio" v-model="orientation" value="column" /> vertical</label>
        </p>
<!--         <p><label><input type="checkbox" v-model="xray" :true-value="'visible'" :false-value="'hidden'" /> X-ray Vision</label></p> -->
      </section>
      <section>
        <h3>Step 2: Yay!</h3>
        <p>Alright! You made it to step 2... Now you have some more choices... progressing to the next screen, or skipping right to the end and missing all the things.</p>
        <p><button class="primary" @click="goToStep(5)">skip to the end</button></p>
        <p><button class="primary" @click="toggleModal">Bail Out!</button></p>
        <p><button class="primary" @click="skip(1)">Next...</button></p>
      </section>
      <section>
        <h3>Step 3: Bonus!</h3>
        <p>Offal scenester vape, art party tumblr hexagon listicle. Banh mi vinyl offal +1 chia williamsburg, vice organic letterpress vexillologist knausgaard flannel biodiesel. Street art kitsch typewriter cornhole put a bird on it pickled. Before they sold out literally copper mug craft beer tote bag dreamcatcher, stumptown portland bicycle rights gluten-free keytar slow-carb vinyl ethical man bun. Tumeric vaporware before they sold out, retro try-hard microdosing raclette roof party neutra pabst tacos. Hashtag street art occupy, kitsch drinking vinegar master cleanse af coloring book enamel pin salvia venmo messenger bag. Disrupt PBR&B pug slow-carb salvia asymmetrical activated charcoal organic live-edge.</p>
        
        <p><a href="https://hipsum.co/?paras=2&type=hipster-centric" target="_blank">All the Hispter You can take...</a><p>

        <h4>Yay! Scrolling Content!</h4>
        
        <p>Selfies poke blue bottle, tousled portland actually cred PBR&B gastropub wayfarers kitsch skateboard pitchfork. Organic art party enamel pin disrupt post-ironic, meggings tilde. Kombucha YOLO craft beer, fam hot chicken knausgaard meggings. Vice fanny pack gluten-free, butcher brunch church-key before they sold out cronut single-origin coffee tilde vegan iPhone umami godard biodiesel. Bushwick live-edge poke freegan, hammock cred small batch. Cardigan before they sold out shabby chic sriracha, selvage affogato flexitarian everyday carry kinfolk meggings ugh la croix freegan bitters. Post-ironic PBR&B crucifix, iceland woke craft beer iPhone tilde tofu pug.</p>
        
        <h4>More Squid Pork Fries</h4>

        <p>XOXO typewriter pork belly sriracha quinoa flannel hot chicken. Squid pork belly selfies, tacos kitsch humblebrag taxidermy air plant pug bespoke hell of gluten-free brunch post-ironic irony. Raclette 8-bit tattooed, lo-fi VHS selvage tote bag whatever gochujang freegan. Organic butcher tbh woke fam, 8-bit yr hexagon. Polaroid thundercats man braid hell of, chia shoreditch viral skateboard man bun irony fashion axe chambray. Banjo fingerstache lumbersexual edison bulb kinfolk kombucha. Offal tousled plaid, kitsch master cleanse man braid DIY hexagon.</p>

        <p>Unicorn poke gastropub, blog messenger bag snackwave poutine tote bag whatever pork belly thundercats leggings kickstarter. Cray art party green juice hammock small batch. Biodiesel chartreuse semiotics, ethical umami venmo literally glossier hell of fap thundercats. Hoodie disrupt tote bag, four dollar toast cred meggings letterpress man braid art party readymade offal actually locavore cliche roof party. Microdosing poutine mixtape tilde, kinfolk blog air plant VHS brunch cornhole ennui bicycle rights ugh. Unicorn master cleanse slow-carb, health goth cornhole irony sriracha umami DIY pork belly. Before they sold out kinfolk vegan activated charcoal af.</p>

        <p>Small batch photo booth slow-carb, VHS kickstarter sartorial hot chicken actually quinoa yr. Street art snackwave flexitarian copper mug disrupt post-ironic. Knausgaard gochujang occupy, bushwick vinyl truffaut intelligentsia pop-up umami. La croix thundercats plaid hella poutine stumptown. Fixie readymade actually enamel pin, crucifix mixtape tacos migas raw denim la croix hell of. La croix chartreuse schlitz, flexitarian biodiesel gastropub fam asymmetrical brunch gentrify ethical. Chicharrones tousled VHS, seitan gluten-free whatever iPhone glossier cornhole portland kombucha +1 vice fingerstache.</p>
      </section>
      <section>
        <h3>Step 4: Magic</h3>
        <p><button @click="reset()">Rewind</button></p>
      </section>
      <section>
        <h3>Step 5: Bonus!</h3>
      </section>
    </article>
    <footer>
      <div class="forward-actions">
<!--         <button class="secondary skip" :disabled="isLastStep" v-show="!isLastStep" @click="skip(2)">Skip</button> -->
        <button class="primary next" :disabled="isLastStep" v-show="!isLastStep" @click="skip(1)"><i class="fa fa-fw fa-lg" :class="nextIcon"></i></button>
        <button class="accent save" :disabled="!isLastStep" v-show="isLastStep" @click="finish"><i class="fa fa-fw fa-lg fa-check"></i></button>
      </div>
      <div class="step-dots" v-if="hasDots">
        <div class="step-dot" v-for="n in max" :class="{active: n == step}" v-bind:key="n" @click="goToStep(n)"></div>
      </div>
      <div class="back-actions">
        <button class="secondary cancel prev" :disabled="isFirstStep" xv-show="!isFirstStep" @click="skip(-1)"><i class="fa fa-fw fa-lg" :class="backIcon"></i></button>
      </div>
    </footer>
  </boardal>
</main>

</template>

<script>
  //imports go up here
  export default {
    name: 'Boardal',
    data() {
      return {
        modal: {
          isOpen: false,
          hasMask: true,
          canClickMask: false,
          hasX: false
        },
        step: 1,
        max: 1,
        showDots: true,
        orientation: 'row',
        // xray: 'hidden'
      };
    },
    template: `
      <transition name="boardal">
        <div class="boardal">
          <div class="boardal__mask" v-if="hasMask" @click="clickMask"></div>
          <div class="boardal__wrapper">
            <slot></slot>
            <div class="boardal__x" v-if="hasX" @click="clickX">&times;</div>
          </div>
        </div>
      </transition>
    `,
    props: [
      'hasX',
      'hasMask',
      'canClickMask'
    ],
    computed: {
      isFirstStep: function(){
        return (this.step === 1)
      },
      isLastStep: function(){
        return (this.step === this.max)
      },
      hasDots: function(){
        return (this.max > 1 && this.showDots)
      },
      x_multiplier: function(){
        return (this.orientation === 'row' ? -1 : 0)
      },
      y_multiplier: function(){
        return (this.orientation === 'row' ? 0 : -1)
      },
      axis: function() {
        return (this.orientation === 'row' ? 'row' : 'column')
      },
      axisReverse: function() {
        return (this.orientation === 'row' ? 'row-reverse' : 'column-reverse')
      },
      cross: function() {
        return (this.orientation === 'row' ? 'column' : 'row')
      },
      crossReverse: function() {
        return (this.orientation === 'row' ? 'column-reverse' : 'row-reverse')
      },
      nextIcon: function() {
        return (this.orientation === 'row' ? 'fa-arrow-right' : 'fa-arrow-down')
      },
      backIcon: function() {
        return (this.orientation === 'row' ? 'fa-arrow-left' : 'fa-arrow-up')
      },
      
    },
    watch: {
      orientation: 'setCssVars',
      // xray: 'setCssVars'
    },
    methods: {
      toggleModal: function(step) {
        step = step || 1
        this.modal.isOpen = !this.modal.isOpen
        if(this.modal.isOpen) {
          let self = this
          setTimeout(function(){
            self.$sections = self.$el.querySelectorAll('section')
            self.max = self.$sections.length
            self.goToStep(step)
          }, 1)
        }
      },
      setCssVars: function(){
        console.log("IN setCssVars");
        console.log(this.$el);
        this.$el.style.setProperty('--x', (((this.step * 100) - 100) * this.x_multiplier) + '%')
        this.$el.style.setProperty('--y', (((this.step * 100) - 100) * this.y_multiplier) + '%')
        this.$el.style.setProperty('--axis', this.axis)
        this.$el.style.setProperty('--axis-reverse', this.axisReverse)
        this.$el.style.setProperty('--cross', this.cross)
        this.$el.style.setProperty('--cross-reverse', this.crossReverse)
        // this.$el.style.setProperty('--vision', this.xray)
      },
      goToStep: function(step){
        this.step = step > this.max ? this.max : step < 1 ? 1 : step
        this.currentSection = this.$sections[this.step-1]
        console.log(this.$refs);
        // const demoTag = this.$refs.getElementsByTagName('section');
        // console.log("DemoTag: ", demoTag);
        console.log("This.sections", this.$sections);
        this.$sections.forEach(function(section){
          section.classList.remove('current') //error here currently for classList;kgvqa
        })
        this.currentSection.classList.add('current')
        this.currentSection.scrollTop = 0
        this.setCssVars()
      },
      skip: function(step){
        this.step+=step
        this.goToStep(this.step)
      },
      reset: function(){
        this.goToStep(1)
      },
      finish: function(){
        this.toggleModal()
      },
      clickX: function(){
        this.$emit('toggle')
      },
      clickMask: function(){
        if(this.canClickMask) {
          this.$emit('toggle')
        }
      }
    }
  }

  // let vm = new Vue({
  //   el: 'main',
  //   name: 'OnboardingModal',
  //   data: {
  //     modal: {
  //       isOpen: false,
  //       hasMask: true,
  //       canClickMask: false,
  //       hasX: false
  //     },
  //     step: 1,
  //     max: 1,
  //     showDots: true,
  //     orientation: 'row',
  //     // xray: 'hidden'
  //   },
  //   computed: {
  //     isFirstStep: function(){
  //       return (this.step === 1)
  //     },
  //     isLastStep: function(){
  //       return (this.step === this.max)
  //     },
  //     hasDots: function(){
  //       return (this.max > 1 && this.showDots)
  //     },
  //     x_multiplier: function(){
  //       return (this.orientation === 'row' ? -1 : 0)
  //     },
  //     y_multiplier: function(){
  //       return (this.orientation === 'row' ? 0 : -1)
  //     },
  //     axis: function() {
  //       return (this.orientation === 'row' ? 'row' : 'column')
  //     },
  //     axisReverse: function() {
  //       return (this.orientation === 'row' ? 'row-reverse' : 'column-reverse')
  //     },
  //     cross: function() {
  //       return (this.orientation === 'row' ? 'column' : 'row')
  //     },
  //     crossReverse: function() {
  //       return (this.orientation === 'row' ? 'column-reverse' : 'row-reverse')
  //     },
  //     nextIcon: function() {
  //       return (this.orientation === 'row' ? 'fa-arrow-right' : 'fa-arrow-down')
  //     },
  //     backIcon: function() {
  //       return (this.orientation === 'row' ? 'fa-arrow-left' : 'fa-arrow-up')
  //     },
      
  //   },
  //   watch: {
  //     orientation: 'setCssVars',
  //     // xray: 'setCssVars'
  //   },
  //   methods: {
  //     toggleModal: function(step) {
  //       step = step || 1
  //       this.modal.isOpen = !this.modal.isOpen
  //       if(this.modal.isOpen) {
  //         let self = this
  //         setTimeout(function(){
  //           self.$sections = self.$el.querySelectorAll('section')
  //           self.max = self.$sections.length
  //           self.goToStep(step)
  //         }, 1)
  //       }
  //     },
  //     setCssVars: function(){
  //       this.$el.style.setProperty('--x', (((this.step * 100) - 100) * this.x_multiplier) + '%')
  //       this.$el.style.setProperty('--y', (((this.step * 100) - 100) * this.y_multiplier) + '%')
  //       this.$el.style.setProperty('--axis', this.axis)
  //       this.$el.style.setProperty('--axis-reverse', this.axisReverse)
  //       this.$el.style.setProperty('--cross', this.cross)
  //       this.$el.style.setProperty('--cross-reverse', this.crossReverse)
  //       // this.$el.style.setProperty('--vision', this.xray)
  //     },
  //     goToStep: function(step){
  //       this.step = step > this.max ? this.max : step < 1 ? 1 : step
  //       this.currentSection = this.$sections[this.step-1]
  //       this.$sections.forEach(function(section){
  //         section.classList.remove('current')
  //       })
  //       this.currentSection.classList.add('current')
  //       this.currentSection.scrollTop = 0
  //       this.setCssVars()
  //     },
  //     skip: function(step){
  //       this.step+=step
  //       this.goToStep(this.step)
  //     },
  //     reset: function(){
  //       this.goToStep(1)
  //     },
  //     finish: function(){
  //       this.toggleModal()
  //     }
  //   } 
  // })

</script>

<style scoped>
  :root {
    --accent: #8fd1f2;
  }
  [v-cloak] {
    display: none;
  }
  .boardal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .boardal__mask {
    background: rgba(0, 0, 0, .65);
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
  }
  .boardal__wrapper {
    position: relative;
    width: 65vw;
    max-width: 60em;
    min-width: 30em;
    max-height: 65vh;
    height: 30em;
    background: #fff;
    color: #333;
    display: flex;
    flex-direction: var(--cross, column);
    border-radius: 0.2em;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, .2), 0 1em 2em -1em;
  }
  .boardal__x {
    cursor: pointer;
    font-size: 2em;
    line-height: 0.5;
    opacity: 0.15;
  }
  .boardal__x:hover {
    opacity: 0.65;
  }
  .boardal-enter-active, .boardal-leave-active {
    transition: opacity 0.25s;
  }
  .boardal-enter, .boardal-leave-to {
    opacity: 0;
  }
  article {
    flex: 1 1 100%;
    height: 100%;
    display: flex;
    flex-direction: var(--axis, row);
    overflow: hidden;
  }
  section {
    width: 100%;
    visibility: hidden;
    flex: 0 0 100%;
    padding: 2em;
    overflow: auto;
    will-change: transform;
    transform: translate(var(--x, 0%), var(--y, 0%));
    transition: transform 300ms ease-out;
    position: relative;
  }
  section h2, section h3, section h4 {
    margin-top: 0;
  }
  section.current {
    visibility: visible;
  }
  footer {
    position: relative;
    text-align: right;
    display: flex;
    flex-direction: var(--axis-reverse, row-reverse);
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, .1);
    background: rgba(0, 0, 0, .05);
  }
  footer:not(:empty) {
    padding: 1em;
  }
  .step-dots {
    display: flex;
    flex-direction: var(--axis, row);
  }
  .step-dot {
    cursor: pointer;
    width: 1em;
    height: 1em;
    margin: 0.5ch;
    border-radius: 1em;
    background: currentColor;
    opacity: 0.2;
    transition: transform 100ms ease-out, opacity 150ms linear;
  }
  .step-dot.active {
    opacity: 0.7;
    box-shadow: 0 0 1em -0.25em;
  }
  .step-dot:hover {
    transform: scale(1.2);
  }
  .forward-actions, .back-actions {
    flex: 1;
    display: flex;
    flex-direction: var(--axis, row);
  }
  .forward-actions {
    justify-content: flex-end;
  }
  .back-actions {
    justify-content: flex-start;
  }
  *, *::before, *::after {
    box-sizing: border-box;
  }
  a {
    color: var(--accent);
  }
  del {
    color: #ca1e34;
    font-style: italic;
  }
  p {
    line-height: 1.5;
  }
  body {
    margin: 0;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: sans-serif;
    background: snow;
    color: #333;
  }
  button {
    outline: none;
    font: inherit;
    line-height: 1;
    cursor: pointer;
    padding: 0.5em 1em;
    border-radius: 0.35em;
    color: rgba(0, 0, 0, .7);
    background: rgba(0, 0, 0, .1);
    border: 2px solid rgba(0, 0, 0, .05);
    text-shadow: 0 1px 0 rgba(255, 255, 255, .4);
    transition: transform 50ms ease-out;
    will-change: transform;
  }
  button:active {
    transform: scale(0.95);
  }
  button:focus {
    border-color: var(--accent);
    box-shadow: 0 0 1em 0 var(--accent);
  }
  button[disabled] {
    opacity: 0.2;
    cursor: not-allowed;
  }
  button.primary {
    border-color: transparent;
    background: transparent;
    font-weight: bold;
  }
  button.primary:not([disabled]) {
    color: var(--accent);
  }
  button.accent {
    background: var(--accent);
  }
  button.accent:not([disabled]) {
    color: #fff;
  }
  button.secondary {
    border-color: transparent;
    background: transparent;
  }
  button.secondary:not([disabled]) {
    color: rgba(0, 0, 0, .4);
  }
  button.cancel:not([disabled]) {
    color: var(--accent);
  }

</style>