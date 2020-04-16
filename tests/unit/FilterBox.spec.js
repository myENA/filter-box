import { mount } from '@vue/test-utils';
import FilterBox from '@/components/FilterBox.vue';

const options = [{
  text: 'Option 1',
  value: 'option1',
  count: 12,
  icon: '<i class="fa fa-trash"></i>',
  disabled: true,
}, {
  text: 'Option 2',
  value: 'option2',
  count: 65,
  icon: '<b>+</b>',
}, {
  text: 'Option 3',
  value: 'option3',
  count: 10,
}];

describe('FilterBox.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(FilterBox, {
      propsData: {
        options,
        value: [],
      },
    });
  });

  it('renders all the options when passed', () => {
    const optionItems = wrapper.findAll('.simple-label input[type=checkbox]');
    expect(optionItems.length).toBe(options.length);

    // Check for first disabled item
    const disabledItems = wrapper.findAll('.simple-label input[type=checkbox]:disabled');
    expect(disabledItems.length).toBe(1);
  });

  it('renders the search input field', async () => {
    wrapper.setProps({
      search: true,
    });
    await wrapper.vm.$nextTick();

    const searchBox = wrapper.findAll('.search-box input');
    expect(searchBox.length).toBe(1);
  });

  it('renders the Show more link', async () => {
    wrapper.setProps({
      displayMax: 2,
      search: false,
    });
    await wrapper.vm.$nextTick();

    const optionItems = wrapper.findAll('.dropdown-menu .simple-label input[type=checkbox]');
    expect(optionItems.length).toBe(2);

    const searchBox = wrapper.findAll('.search-box input');
    expect(searchBox.length).toBe(0);

    const showMoreLink = wrapper.findAll('.showMoreLink');
    expect(showMoreLink.length).toBe(1);

    // Checks for big box
    const bigBox = wrapper.findAll('.big-popup');
    expect(bigBox.length).toBe(1);
    const boxItems = wrapper.findAll('.big-popup .simple-label input[type=checkbox]');
    expect(boxItems.length).toBe(options.length);
  });

  it('renders all the options as radio buttons when multiple is false', async () => {
    wrapper.setProps({
      multiple: false,
    });
    await wrapper.vm.$nextTick();

    const optionItems = wrapper.findAll('.simple-label input[type=radio]');
    expect(optionItems.length).toBe(options.length);
  });

  it('check if search is working on elements', async () => {
    wrapper.setData({
      filter: '2',
    });
    await wrapper.vm.$nextTick();

    const optionItems = wrapper.findAll('.simple-label input[type=checkbox]');
    expect(optionItems.length).toBe(1);
  });
});
