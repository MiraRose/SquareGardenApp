import { mount } from '@vue/test-utils'
import App from '../src/App.vue'

describe('App', () => {
    // Inspect the raw component options
    it('has data', () => {
      expect(typeof App.data).toBe('function')
    })
  })

  describe('Mounted App', () => {
    const wrapper = mount(App);
  
    test('is a Vue instance', () => {
      expect(wrapper.exists()).toBeTruthy()
    })

    test('makes suggestions in adjacent square', async () => {
        const options = wrapper.find('select').findAll('option')
        await options.at(0).setSelected()

        expect(wrapper.find('option:checked').element.value).toBe('Asparagus')
      })
  })