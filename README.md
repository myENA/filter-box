# filter-box

## What's this
This component renders a list of elements which can be searched.

## Project setup
```
npm install @myena/filter-box
```

### Dependences

- Vue 2


### Demo
TBD

### Usage
Options can be passed as props
```html
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
    :display-max="150"
    />
```

```javascript
import FilterBox from 'advanced-select';

export default {
  components: {
    FilterBox,
  },
  data: () => ({
    options: [{ 
        value: 1, 
        text: 'One', 
        count: 20, 
        disabled: true, 
        icon: '<i class="fa fa-laptop"></i>' 
    }, { 
        value: 2, 
        text: 'Two', 
        count: 11 
    }],
    optionsTexts: {
        showMore: 'Show more options',
        searchText: 'Search for options...',
        empty: 'No results',
    },
    selectedOptions: [],
  }),
};
```

## Props

Prop | Type | Default | Description
-------|------|---------|-------------
`v-model` | any | `null` | Pass `v-model` to the component to have the reference to the current selected value
`:options` | Array | `[]` | The options to display. A list of objects in the form: `{ value: 1, text: 'One', count: 10, icon: '<i class="fa fa-laptop"></i>'}`.
`:search` | Boolean | `false` | Show or not a search field to filter the options
`:multiple` | Boolean | `true` | Single or multiple select
`:displayMax` | Number | `20` | How many selected items to display on the initial list. If there are more options that 'displayMax', a popup will be available with all of the option grouped by first letter.
`:dropdownClass` | String | `''` | Class to use for the dropdown menu. EG: `'dropdown-menu-right'`
`:texts` | Object | `{ searchText: 'Search',empty: 'No results',showMore: 'Show more',collapsedIcon: '-',collapseIcon: '+', }` | Texts used
`:panelHeader` | String | `''` | Text for the panel header
`:dropId` | String | `key` | A unique id for the filter elements
`:isExpanded` | Boolean | `false` | Boolean to control if panel is expanded by default
`:sortSelectedFirst` | Boolean | `false` | Boolean to move the selected option on top of the list.
