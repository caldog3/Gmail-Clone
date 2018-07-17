/* eslint-disable */
<template>
  <div id="body">
    <h4>{{messages[0].subject}}
    &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
    <font-awesome-icon class="Icon" icon="print" /></h4> 

    <div v-for="message in messages" :key="message.messageId">
      <div class="leftAlign">
        <hr>
        <b>{{message.from}}</b> 
        <!-- we need to style this over to the right -->
        &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
        {{message.time}} (some hours ago idk)
        <span class="highlightArea">
          <input class="star" type="checkbox" :checked="message.starred" title="bookmark page">
        </span> 
        <font-awesome-icon class="Icon" icon="reply" />
        <font-awesome-icon class="Icon" icon="ellipsis-v" />
        <p>to {{message.to}}</p>
      </div>
      <div v-html="message.body" class="leftAlign"></div>
    </div>
    <div class="response-buttons"> 
      <button type="button"><font-awesome-icon class="Icon" icon="reply" /> Reply</button>
      &emsp;
      <span v-bind:class="ifGroupMessage()">
        <button type="button"><font-awesome-icon class="Icon" icon="reply-all" /> ReplyAll</button>
      &emsp;
      </span>
      <button type="button"><font-awesome-icon class="Icon" icon="long-arrow-alt-right" /> Forward</button>
    </div>
  </div>

</template>

<style scoped>
a:link {
  color: purple;
}
.leftAlign {
  text-align: left;
  margin-left: 2%;
}
.response-buttons {
  padding: 40px;
  text-align: left;
  margin-left: 2%;
  /* padding-bottom: 40px; */
}
h4 {
  padding-top: 15px;
}
.group-message {
  display: inline;
}
.not-group-message {
  display: none;
}
#body {
  background-color: white !important;
  padding-top: 2%;
  padding-left: 5%;
  padding-right: 1%;
}
.star {
  visibility: hidden;
  font-size: 20px;
  cursor: pointer;
  position: relative;
  left: 5px;
  top: 1px;
  width: 30px;
  height: 30px;
}
.star:before {
  content: "\2606";
  position: absolute;
  visibility:visible;
}
.star:checked:before {
  content: "\2605";
  position: absolute;
}

</style>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import { sortBy } from 'lodash'

export default {
  name: 'EmailBody',
  components: {
    FontAwesomeIcon
  },
  computed: {
    messages(){
      let messages = this.$store.state.threadMessages;
      const threadMessages = messages[this.$route.params.id];
      return sortBy(threadMessages, m => m.unixTime);
      // return threadMessages;
    }
  },
  methods: {
    ifGroupMessage() {
      let to = this.messages[0].to;
      //console.log(to);
      var theClass = 'not-group-message';
      //console.log(message.unread);
      if(to.includes(",")){
          theClass = 'group-message';
      }
      return theClass;
    },
  },
  created() {
    console.log("THE THING IM LOOKING FOR");
    console.log(this.$store.state.labelNextPageTokens);
  }
}
</script>