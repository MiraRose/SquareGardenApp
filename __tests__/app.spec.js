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

    test('makes suggestions in adjacent squares', async () => {
        const option = wrapper.find('select').find('option')
        await option.setSelected()

        expect(wrapper.find('option:checked').element.value).toBe('Asparagus')
        expect(wrapper.vm.plots[0][0].suggestion).toBe('none')
        expect(wrapper.vm.plots[0][1].suggestion).toBe('Dill, tomatoes, basil')
        expect(wrapper.vm.plots[1][0].suggestion).toBe('Dill, tomatoes, basil')
        expect(wrapper.vm.plots[1][1].suggestion).toBe('Dill, tomatoes, basil')
        expect(wrapper.vm.plots[2][1].suggestion).toBe('none')
        expect(wrapper.html()).toContain('Dill, tomatoes, basil')
    })

    test('counts list items correctly', async () => {
        const selects = wrapper.findAll('select')
        const firstSelect = selects.at(0).find('option')
        const secondSelect = selects.at(1).find('option')

        await firstSelect.setSelected()
        await secondSelect.setSelected()

        expect(wrapper.find('option:checked').element.value).toBe('Asparagus')
        expect(wrapper.vm.listOfVeggies["Asparagus"]).toBe(2)
        expect(wrapper.html()).toContain('Asparagus: 2')
        
    })
})