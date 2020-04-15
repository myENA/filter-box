<template>
  <div class="filter-box-container">
    <div class="panel panel-default">
      <div class="panel-heading">
        <a
          ref="panel-collapse"
          :href="'#panel-expanded-'+dropId"
          :class="{
            'collapsed': toggled,
          }"
          role="button"
          data-toggle="panel-collapse"
          class="panel-toggle"
          >
          {{ panelHeader }}
          <span
            class="toggle-sign"
            v-html="toggled ? escapedColapsedIcon : escapedColapseIcon">
          </span>
        </a>
      </div>

      <div
        :id="'panel-expanded-'+dropId"
        ref="panel-body"
        class="panel-collapse collapsed"
        >
        <div class="panel-body">
          <div>
            <div
              v-if="search"
              class="search-box"
              >
              <input
                v-model="filter"
                class="form-control"
                :placeholder="mergedTexts.searchText"
                autofocus="autofocus"
                >
            </div>

            <span
              v-if="emptyResults"
              :class="$style.empty"
              class="text-muted"
              >
              {{ mergedTexts.empty }}
            </span>

            <ul
              v-else
              :class="[$style['dropdown-menu'], 'dropdown-menu', $style.items]"
              >
              <li
                v-for="option in filtered.sort(sortSelectedFirstFunction)
                  .slice(0, Math.min(linearOptions.length, displayMax))"
                :key="option.value || option.header"
                :data-value="option.value"
                :class="{
                  'dropdown-header': option.header,
                  active: !multiple && !!selected[option.value],
                  disabled: option.disabled,
                  'has-header': !!option.parentHeader,
                }"
                >
                <span
                  class="selectable-option"
                  >
                  <label
                    :for="dropId + '-' + option.value"
                    class="simple-label"
                    >
                    <input
                      :id="dropId + '-' + option.value"
                      :type="multiple ? 'checkbox' : 'radio'"
                      :disabled="option.disabled"
                      :checked="multiple ? value.indexOf(option.value) > -1 :
                        value === option.value"
                      @change="select($event, option.value)"
                      >
                    <span
                      v-if="option.icon"
                      class="icon-container"
                      v-html="escapeTextSafe(option.icon)">
                    </span>{{ option.text }}
                    <span
                      v-if="option.count !== undefined"
                      class="pull-right p-0 text-note"
                      >({{ option.count }})</span>
                  </label>
                </span>
              </li>
            </ul>
            <a
              v-if="linearOptions.length > displayMax"
              href="#"
              class="showMoreLink"
              @click.prevent.stop="togglePopup"
              >{{ mergedTexts.showMore }} ({{ linearOptions.length }})</a>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="linearOptions.length > displayMax"
      :class="{ [$style['big-popup']]: true, 'big-popup': true, open: isOpen }"
      >
      <div class="popup-header">
        {{ panelHeader }}
        <button
          type="button"
          class="close"
          aria-label="Close"
          @click="closePopup"
          >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="popup-body">
        <div
          v-if="search"
          class="popup-search-box"
          >
          <input
            v-model="filter"
            class="form-control"
            :placeholder="mergedTexts.searchText"
            autofocus="autofocus"
            >
        </div>
        <span
          v-if="emptyResults"
          :class="$style.empty"
          class="text-muted"
          >
          {{ mergedTexts.empty }}
        </span>
        <div
          v-else
          class="letters-container"
          >
          <div
            v-for="key in Object.keys(groupedOptions)"
            :key="key"
            >
            <h4>{{ key }}</h4>
            <div class="letter-elements">
              <div
                v-for="item in groupedOptions[key]"
                :key="item.value"
                class="letter-item"
                >
                <label
                  :for="dropId + '-popup-item-' + item.value"
                  class="simple-label"
                  >
                  <input
                    :id="dropId + '-popup-item-' + item.value"
                    :type="multiple ? 'checkbox' : 'radio'"
                    :disabled="item.disabled"
                    :checked="multiple ? popupSelected.indexOf(item.value) > -1 :
                      popupSelected === item.value"
                    @change="selectFromPopup($event, item.value)"
                    >
                  <span
                    v-if="item.icon"
                    class="icon-container"
                    v-html="escapeTextSafe(item.icon)">
                  </span>{{ item.text }}
                  <span
                    v-if="item.count !== undefined"
                    class="text-note"
                    >({{ item.count }})</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="popup-footer text-right">
        <button
          type="button"
          class="btn btn-link"
          @click="removeFilters"
          >
          Remove filters
        </button>
        <button
          type="button"
          class="btn btn-primary"
          @click="applyFilters"
          >
          Apply filters
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">

input[type="checkbox"],
input[type="radio"] {
  margin-top: 0;
  margin-right: 5px;
}
.filter-box-container {
  position: relative;
}

.simple-label {
  font-weight: normal;
  width: 100%;
  margin-bottom: 0;
  cursor: pointer;
  font-size: 14px;
  line-height: 26px;
}

.selectable-option {
  span {
    display: inline;
  }
}

.pull-right {
  float: right;
}

.text-right {
  text-align: right;
}

.panel {
  border-top: 1px solid #ffffff;
  border-left: 1px solid #ffffff;
  box-shadow: 0 0 12px 2px #E1EDF2;
  color: #37474F;
  border-radius: 3px;

  .panel-heading {
    border-bottom: none;
    padding-top: 7px;
    padding-bottom: 5px;
    border-top-right-radius: 3px;
    border-top-left-radius: 3px;
    color: #263238;
    background-color: #ffffff;
    padding: 10px 20px;

    a {
      font-size: 16px;
      color: #516373;
    }

    .panel-toggle {
      width: 100%;
      display: inline-block;
      text-decoration: none;
      text-align: left;

      .toggle-sign {
        float: right;
        color: #516373;
      }
    }

  }

  .panel-collapse {
    overflow: visible;

    &.collapsed {
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.2s ease-out;
    }

    .panel-body {
      border-bottom-right-radius: 3px;
      border-bottom-left-radius: 3px;
      padding: 10px 0 20px 20px;
    }
  }
}

.form-control {
  display: block;
  width: 100%;
  height: 34px;
  padding: 6px 10px;
  font-size: 14px;
  line-height: 1.42857143;
  color: #37474F;
  background-color: #fff;
  background-image: none;
  border: 1px solid #C4CDD5;
  border-radius: 3px;
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  -webkit-transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
  -webkit-transition: border-color ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;
  transition: border-color ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;
  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s,
        -webkit-box-shadow ease-in-out 0.15s;
  box-sizing: border-box;
}

.search-box {
  margin-bottom: 10px;
  padding-right: 20px;
}

.p-0 {
  padding: 0;
  line-height: normal;
}

.text-note {
  color: #516373;
  font-size: 12px;
}

.dropdown-menu {
  padding-right: 13px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;

  > li {
    margin-bottom: 5px;
    > span {
      padding-left: 0;
      padding-right: 0;
    }
  }
}

.showMoreLink {
  margin-top: 5px;
  float: left;
}

.open {
  display: block;
}
.icon-container > :first-child {
  margin-right: 5px;
}
.popup-header {
  border-bottom: 1px solid #C4CDD5;
  padding: 10px 20px;
  font-size: 16px;

  button.close {
    float: right;
    font-size: 38px;
    font-weight: normal;
    line-height: 20px;
    color: #37474F;
    text-shadow: 0 1px 0 #fff;
    padding: 0;
    cursor: pointer;
    background: transparent;
    border: 0;
    -webkit-appearance: none;
  }
}

.popup-body {
  padding: 10px 0 0 0;

  .popup-search-box {
    padding-right: 20px;
    padding-left: 20px;
    padding-bottom: 10px;
    border-bottom: 1px solid #C4CDD5;

    input {
      width: 60%;
      min-width: 200px;
    }
  }

  .letters-container {
    max-height: 350px;
    overflow-y: auto;
    padding-left: 20px;
  }

  .letter-elements {
    display: flex;
    flex-flow: row wrap;
    text-align: left;
  }

  .letter-item {
    width: 32%;
    margin-right: 1%;
    margin-bottom: 10px;
  }

  .letter-item:nth-child(3) {
    margin-right: 0;
  }
}

.popup-footer {
  border-top: 1px solid #C4CDD5;
  padding: 10px 20px;
}
.btn + .btn {
  margin-left: 20px;
}
</style>

<style lang="less" module>
.big-popup {
  position: absolute;
  top: 0;
  left: 0;
  width: 720px;
  display: none;
  z-index: 1001;
  background-color: #FFFFFF;
  border: 1px solid #C4CDD5;
  border-radius: 3px;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-shadow: 0 0 12px 2px #E1EDF2;
}
.dropdown-menu {
  margin-top: 20px;
  width: 100%;
  > li {
    > a {
      position: relative;
      padding-right: 26px;
      text-overflow: ellipsis;
      overflow: hidden;
      > i {
        position: absolute;
        top: 6px;
        right: 6px;
      }
    }
    > span {
      text-overflow: ellipsis;
      overflow: hidden;
      display: block;
      position: relative;
      > a {
        position: absolute;
        right: 0;
      }
    }
  }
}
> .dropdown-menu {
  min-width: 302px;
}

.empty {
  padding: 10px 0;
  width: 100%;
  float: left;
}

.big-popup {
  .empty {
    padding: 20px;
    float:none;
    display: block;
  }
}

.items {
  display: block;
  position: relative;
  padding: 0;
  margin: 0;
  border: 0;
  box-shadow: none;
  width: 100%;
  max-height: 155px;
  overflow-y: auto;
  overflow-x: hidden;
  background-color: transparent;
  > li {
    margin-right: 2px;
  }
}
</style>

<script type="text/javascript">

const sorter = new Intl.Collator('en', { sensitivity: 'base', numeric: true });

const safeTags = ['b', 'i', 'em', 'strong'];
function escapeHtml(str) {
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

export default {
  inheritAttrs: false,
  props: {
    value: {
      default: null,
      type: [String, Array],
    },
    multiple: {
      default: true,
      type: Boolean,
    },
    search: {
      default: false,
      type: Boolean,
    },
    controls: {
      default: false,
      type: Boolean,
    },
    collapseHeaders: {
      default: false,
      type: Boolean,
    },
    displayMax: {
      default: 20,
      type: Number,
    },
    dropdownClass: {
      default: '',
      type: String,
    },
    options: {
      default() {
        return [];
      },
      type: Array,
    },
    texts: {
      default: () => ({}),
      type: Object,
    },
    panelHeader: {
      default: '',
      type: String,
    },
    dropId: {
      default: 'key',
      type: String,
    },
    isExpanded: {
      default: false,
      type: Boolean,
    },
    sortSelectedFirst: {
      default: false,
      type: Boolean,
    },
  },
  data() {
    return {
      myValue: this.getDefaultValue(),
      filter: '',
      dropup: false,
      isOpen: false,
      popupSelected: [],
      toggled: false,
    };
  },
  computed: {
    mergedTexts() {
      return {
        searchText: 'Search',
        empty: 'No results',
        showMore: 'Show more',
        collapsedIcon: '-',
        collapseIcon: '+',
        ...this.texts,
      };
    },
    escapedColapsedIcon() {
      return this.escapeTextSafe(this.mergedTexts.collapsedIcon);
    },
    escapedColapseIcon() {
      return this.escapeTextSafe(this.mergedTexts.collapseIcon);
    },
    optionsMap() {
      // For the optionsMap, use all options, not just the filtered ones
      // so that selecting values searches entire list
      return this.getOptionsMap(this.linearOptions);
    },
    selected() {
      let selected = {};
      if (this.myValue != null) {
        let { myValue } = this;
        if (!this.multiple) {
          myValue = [this.myValue];
        }
        selected = myValue.reduce((s, v) => {
          if (this.optionsMap[v]) {
            Object.assign(s, {
              [v]: this.optionsMap[v],
            });
          }
          return s;
        }, {});
      }
      return selected;
    },
    groupedOptions() {
      const groups = this.filtered.reduce((r, e) => {
        const group = e.text ? e.text[0].toLowerCase() : '*';
        if (!r[group]) {
          // eslint-disable-next-line no-param-reassign
          r[group] = [e];
        } else {
          r[group].push(e);
        }
        return r;
      }, {});
      const sortedGroups = {};
      Object.keys(groups).sort().forEach((g) => {
        sortedGroups[g.toUpperCase()] = groups[g];
      });
      return sortedGroups;
    },
    /**
     * Create a list of the filtered options; i.e. those that match the search
     */
    filtered() {
      return this.linearOptions.filter(this.optionMatch);
    },
    /**
     * Create a linear list of all the options (headers included)
     */
    linearOptions() {
      return this.options.reduce((f, o) => {
        if (o.options) {
          // push the header
          f.push({
            header: o.label,
          });
          f.push(...o.options.map((opt) => Object.assign(opt, { parentHeader: o.label })));
        } else {
          // it's an item without group, push it to the list
          f.push(o);
        }
        return f;
      }, []);
    },
    emptyResults() {
      return this.search && this.filtered.length === 0 && this.filter;
    },
    filterRegExp() {
      return new RegExp(`${this.filter}`, 'ig');
    },
  },
  watch: {
    myValue(newVal) {
      // emit the change event with the new value
      this.$emit('input', newVal);
    },
    value(value) {
      this.myValue = value;
    },
    options: {
      immediate: true,
      handler() {
        this.validateOptions(this.options);
        this.$nextTick(() => {
          // Set height if expanded by default
          const content = this.$refs['panel-body'];
          if (this.isExpanded && content) {
            content.style.maxHeight = `${content.scrollHeight}px`;
          }
        });
      },
    },
    filter() {
      this.$emit('filter', this.filter);
    },
  },
  mounted() {
    document.addEventListener('click', (event) => {
      // If user clicks inside the element, do nothing
      if (event.target.closest('.filter-box-container')) return;

      // If user clicks outside the element, hide it!
      this.closePopup();
    });

    // Init panels
    const panel = this.$refs['panel-collapse'];
    const content = this.$refs['panel-body'];
    panel.addEventListener('click', (e) => {
      e.preventDefault();
      if (content.style.maxHeight) {
        content.style.maxHeight = null;
        this.toggled = true;
      } else {
        content.style.maxHeight = `${content.scrollHeight}px`;
        this.toggled = false;
      }
    });
  },
  methods: {
    escapeTextSafe(nonEscapedText) {
      let text = escapeHtml(nonEscapedText);
      text = text.replace(/&lt;br(\s\/)?&gt;/ig, '<br>');
      safeTags.forEach((t) => {
        text = text.replace(new RegExp(`&lt;${t}( class=".*")?&gt;`, 'ig'), `<${t}$1>`);
        text = text.replace(new RegExp(`&lt;/${t}&gt;`, 'ig'), `</${t}>`);
      });
      return text;
    },
    sortSelectedFirstFunction(a, b) {
      if (!this.sortSelectedFirst) {
        return 0;
      }
      const aIsSelected = (this.value.indexOf(a.value) === -1) + a.text;
      const bIsSelected = (this.value.indexOf(b.value) === -1) + b.text;
      return sorter.compare(aIsSelected, bIsSelected);
    },
    getOptionsMap(options, map = {}) {
      return options.reduce((m, o) => {
        if (!o.header) {
          Object.assign(m, { [o.value]: o });
        }
        return m;
      }, map);
    },
    optionMatch(o) {
      const textMatches = this.textMatch(o.text || o.header);
      return textMatches;
    },
    textMatch(text) {
      return text ? text.match(this.filterRegExp) !== null : true;
    },
    select(e, val) {
      e.preventDefault();
      if (this.optionsMap[val].disabled) {
        e.stopPropagation();
        return;
      }
      let newVal;
      // for multiple, don't close the menu
      if (this.multiple) {
        e.stopPropagation();
        // update the new selected items
        newVal = Object.keys(this.selected).map((k) => this.selected[k].value);
        if (this.selected[val]) {
          // remove it
          newVal = newVal.filter((k) => k !== val);
        } else {
          // add it
          newVal.push(val);
        }
      } else {
        // for single mode, just set it directly
        newVal = val;
      }
      this.popupSelected = this.multiple ? [...newVal] : newVal;
      this.myValue = newVal;
    },
    selectFromPopup(e, val) {
      e.preventDefault();
      if (this.optionsMap[val].disabled) {
        e.stopPropagation();
        return;
      }
      // for multiple, don't close the menu
      if (this.multiple) {
        e.stopPropagation();
        // update the new selected items
        if (this.popupSelected.indexOf(val) === -1) {
          // add it
          this.popupSelected.push(val);
        } else {
          // remove it
          this.popupSelected = this.popupSelected.filter((k) => k !== val);
        }
      } else {
        // for single mode, just set it directly
        this.popupSelected = val;
      }
    },
    selectNone() {
      this.myValue = [];
    },
    togglePopup() {
      this.isOpen = !this.isOpen;
      this.filter = '';
    },
    closePopup() {
      this.isOpen = false;
      this.filter = '';
      this.popupSelected = this.multiple ? [...this.myValue] : this.myValue;
    },
    validateOptions(options, l = 0) {
      options.forEach((o, i) => {
        if (o.options) {
          if (!o.label) {
            console.warn(`No label specified for entry at position ${i}, level ${l}`);
          }
          this.validateOptions(o.options, l + 1);
        } else if (!o.text) {
          console.warn(`No text specified for entry at position ${i}, level ${l}`);
        }
      });
    },
    getDefaultValue() {
      if (this.value !== null) {
        return this.value;
      }
      if (this.multiple) {
        return [];
      }
      return null;
    },
    removeFilters() {
      this.selectNone();
      this.closePopup();
    },
    applyFilters() {
      this.myValue = this.multiple ? [...this.popupSelected] : this.popupSelected;
      this.closePopup();
    },
  },
};
</script>
