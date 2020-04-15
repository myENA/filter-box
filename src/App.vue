<template>
  <div id="app">
    <div class="w-25">
      <filter-box
        v-model="selectedOptions"
        drop-id="first"
        :options="options"
        :search="true"
        :multiple="true"
        :is-expanded="true"
        panel-header="First Options"
        :texts="optionsTexts"
        :sort-selected-first="true"
        :display-max="15"
        />
    </div>
  </div>
</template>

<script>
import FilterBox from './components/FilterBox.vue';

export default {
  name: 'App',
  components: {
    FilterBox,
  },
  data() {
    return {
      optionsTexts: {
        showMore: 'Show more options',
        searchText: 'Search for options...',
        empty: 'No results',
      },
      selectedOptions: [],
      options: [{
        text: 'Option 1',
        value: 'option1',
        count: 12,
      }, {
        text: 'Option 2',
        value: 'option2',
        count: 65,
      }, {
        text: 'Option 3',
        value: 'option3',
        count: 10,
      }, {
        text: 'A Option 1',
        value: 'aoption1',
        count: 65,
      }, {
        text: 'A Option 2',
        value: 'aoption2',
        count: 34,
      }, {
        text: 'Option 4',
        value: 'option4',
        count: 12,
      }, {
        text: 'B Option 1',
        value: 'boption1',
        count: 52,
      }, {
        text: 'B Option 2',
        value: 'boption2',
        count: 10,
      }, {
        text: 'B Option 3',
        value: 'boption3',
        count: 65,
      }, {
        text: 'Z Option 1',
        value: 'zoption1',
        count: 29,
      }, {
        text: 'Z Option 2',
        value: 'zoption2',
        count: 53,
      }, {
        text: 'A Option 3',
        value: 'aoption3',
        count: 29,
      }, {
        text: 'A Option 4',
        value: 'aoption4',
        count: 9,
      }, {
        text: 'A Option 5',
        value: 'aoption5',
        count: 29,
      }, {
        text: 'A Option 6',
        value: 'aoption6',
        count: 10,
      }, {
        text: 'A Option 7',
        value: 'aoption7',
        count: 5,
      }, {
        text: 'A Option 8',
        value: 'aoption8',
        count: 8,
      }, {
        text: 'A Option 9',
        value: 'aoption9',
        count: 87,
      }, {
        text: 'A Option 10',
        value: 'aoption10',
        count: 19,
      }, {
        text: 'A Option 11',
        value: 'aoption11',
        count: 52,
      }, {
        text: 'A Option 12',
        value: 'aoption12',
        count: 10,
      }],
    };
  },
};
</script>

<style lang="less">

body {
  font-family: "Roboto", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 14px;
  padding: 20px;
}

a {
  color: #0098C8;
  text-decoration: none;
}

.w-25 {
  width: 25%;
  float: left;
}
::-webkit-scrollbar-thumb {
  border-radius: 4px;
  background-color: #919EAB;
  -webkit-box-shadow: 0 0 1px rgba(255, 255, 255, 0.5);
  box-shadow: 0 0 1px rgba(255, 255, 255, 0.5);
}
::-webkit-scrollbar {
  -webkit-appearance: none;
  width: 8px;
  background-color: #ECEFF1;
}
* {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

/* Button styles */
.btn {
  display: inline-block;
  margin-bottom: 0;
  font-weight: normal;
  text-align: center;
  vertical-align: middle;
  -ms-touch-action: manipulation;
  touch-action: manipulation;
  cursor: pointer;
  background-image: none;
  border: 1px solid transparent;
  white-space: nowrap;
  padding: 6px 10px;
  font-size: 14px;
  line-height: 1.42857143;
  border-radius: 3px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.btn-link {
  color: #0098C8;
  font-weight: normal;
  border-radius: 0;
}
.btn-primary {
    color: #fff;
    background-color: #019EE1;
    border-color: #019EE1;
}
.btn-link, .btn-link:active, .btn-link.active, .btn-link[disabled], fieldset[disabled] .btn-link {
    background-color: transparent;
    -webkit-box-shadow: none;
    box-shadow: none;
}
.btn-link, .btn-link:hover, .btn-link:focus, .btn-link:active {
    border-color: transparent;
}
</style>
