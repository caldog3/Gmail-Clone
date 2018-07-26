/* eslint-disable */
<template>
  <div id="body">
    <div class="flexboxSubject">
      <div class="lockIcon">
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAKPSURBVGhD7dpNiE5RHMfxh/FSIiQbCwsjZcOGvMZGUWM32xGJBQuiWLCyEDtJlCIUWTE1WVhQJuWlJGQlrykpZlJeSl6/v8VTt+N/nznnPHPOGdP86rM793/Of57n3nvuc6eRKQtxANfxBl/xB4N4jIvYjOkYkVmJm9CifXzBMczCiMgkHMdvWAseynusR9FMQcinUOcntqJYrsJaWAw1swHZswnWgqqeoR/XcAcfYY1reousF4HZqFvUL5zAPLjpwFqoKetYOYlsOQhrEd+xEUNlHM6irob+UMkzHi9hLWIXfKNP5y6sOvuQPCtgTf4UWlxIlsGq9RDJsxfW5LsRk0dwa+kKNhVJcxnuxDIfMTkCq54uCknzAO6kuoLFphtuPdmOpHkOd1J9PWJTd57sR9J8gDvpLcRmAdx6oq9c0nyCO6nu3LGZC7eenELSjJpGZmCmo51LpW6wbj3RzjpZJsCaNIVh3zzqwWkP9Jga+/AUS4/JfViOtqK/ym1Yk+SkO33IPu6fXIFVuAR9G6IevJbCKliSdhXBOQSrWGlzEJRzsAqVFnziX4JVqLTVCMpYI4kVaeQVDkNPj+fxA9a4ENkb6cU0VLMEA7DG+8rayDtov2RFv8Rbx/jK2shp1GUy9NuVdZyPrI3odUGrfIN1nI+sjdxHXRbDOsZX9pO9B24m4gas8b6yN6KtdxeqGY7ddPZGZAeqeQJrXIixRtoxahrZiWr+20bOoBnd6T/DGheiSCPN13DboHuLNSZUkUZSCG7kAqxCpa1CUI7CKlSa9ba4ZdbBKlSSXsIGR6+Q78EqWMoWREU/+b+GVTS3Vs84XtHLe90Pmv93ldsLRH8SVvS+YhF07uSwBp1w0mj8BYxi/ufuYUtEAAAAAElFTkSuQmCC">
      </div>
      <h4 class="leftAlign">{{messages[0].subject}}</h4>
      <h4 class="rightAlign"><font-awesome-icon style="text-align=right;" class="Icon" icon="print" /></h4>
    </div>

    <div v-for="message in messages" :key="message.messageId">
      <div class="flexboxSubject">
        <div class="leftAlign">
          <hr>
          <b>{{message.detailedFrom}}</b>
        </div>
        <div class="rightAlign">
          {{message.time}} (some hours ago idk)
          <span class="highlightArea">
            <input class="star" v-on:click="starredLabelToggle(message)" type="checkbox" :checked="message.starred" title="bookmark page">
          </span> 
          <font-awesome-icon class="Icon" icon="reply" />
          <font-awesome-icon class="Icon" icon="ellipsis-v" />
        </div>
      </div>
      <div class="leftAlign">
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

.leftAlign {
  text-align: left;
  margin-left: 2%;
}
.rightAlign {
  text-align: right;
}
.flexboxSubject {
  display:flex;
  justify-content: space-between;
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
import { markAsStarred, unMarkAsStarred } from './../store-utility-files/gmail-api-calls';


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
    starredLabelToggle(thread) {
      thread.starred = !thread.starred;
      if(thread.starred === true) {
        markAsStarred(thread.threadId);
      }
      else {
        unMarkAsStarred(thread.threadId);
      }

    },
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