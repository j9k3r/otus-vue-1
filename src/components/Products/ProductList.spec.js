import {describe, it, expect, beforeEach, vi} from "vitest"

import component from "@/components/Products/ProductList.vue"
import {shallowMount} from "@vue/test-utils";
import {createPinia, setActivePinia} from "pinia";

import { useRoute } from "vue-router"

import ProductsApi from "@/components/services/productsApi";

vi.mock('vue-router')
// vi.mock('@/components/services/productsApi')
describe("ProductList order component", () => {
    const mockProductsData = JSON.parse( `[
            {
                "id": 1,
                "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
                "price": 109.95,
                "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
                "category": "men's clothing",
                "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
                "rating": {
                    "rate": 3.9,
                    "count": 120
                }
            },
            {
                "id": 2,
                "title": "Mens Casual Premium Slim Fit T-Shirts ",
                "price": 22.3,
                "description": "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
                "category": "men's clothing",
                "image": "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
                "rating": {
                    "rate": 4.1,
                    "count": 259
                }
            },
            {
                "id": 3,
                "title": "Mens Cotton Jacket",
                "price": 55.99,
                "description": "great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.",
                "category": "men's clothing",
                "image": "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
                "rating": {
                    "rate": 4.7,
                    "count": 500
                }
            }]`)
    // const mockOrderData = `[
    //     {"id": 1, "quantity": 1},
    //     {"id": 2, "quantity": 1},
    //     {"id": 3, "quantity": 1}
    // ]`

    beforeEach( () => {
        setActivePinia(createPinia())
        ProductsApi.getProducts = vi.fn().mockResolvedValue(mockProductsData)
    })

    it('Check mount', async () => {
        const wrapper = shallowMount(component, {
            propsData: {
                rawProducts: mockProductsData,
            },
            global: {
                stubs: ['RouterLink'],
            }
        })

        expect(wrapper.exists()).toBe(true)
    });

    it('initializing a component with data', async () => {
        const wrapper = shallowMount(component, {
            propsData: {
                rawProducts: mockProductsData,
                title: '',
                price: 0.00
            },
            global: {
                stubs: ['RouterLink'],
            }
        })

        const productElementsRendered = wrapper.findAll('#product-list > ul > li')

        expect(productElementsRendered.length).toBe(3)

        // wrapper.findAll('#product-list > ul > li').at(0).element.remove() // удаление первого элемента для проверки снапшота
        expect(wrapper.html()).toMatchSnapshot()

        // console.log(wrapper.html())
        // console.log(productElementsRendered.at(0).element.outerHTML)
        // productElementsRendered.forEach(wrapper => console.log(wrapper.html()))
        // console.log([...productElementsRendered.map(wrapper => wrapper.html())])
    })

    it('Check filter title', async () => {
        const wrapper = shallowMount(component, {
            propsData: {
                rawProducts: mockProductsData,
                title: '',
                price: 0.00
            },
            global: {
                stubs: ['RouterLink'],
            }
        })

        await wrapper.setProps({ title: 'Fjallraven' })

        const productElementsRendered = wrapper.findAll('#product-list > ul > li')

        expect(productElementsRendered.length).toBe(1)
        expect(wrapper.html()).not.toMatchSnapshot()

        await wrapper.setProps({ title: '' })
        expect(wrapper.html()).toMatchSnapshot()
    });

    it('Check filter price', async () => {
        const wrapper = shallowMount(component, {
            propsData: {
                rawProducts: mockProductsData,
                title: '',
                price: 0.00
            },
            global: {
                stubs: ['RouterLink'],
            }
        })

        await wrapper.setProps({ price: 60 })

        const productElementsRendered = wrapper.findAll('#product-list > ul > li')

        expect(productElementsRendered.length).toBe(2)
        expect(wrapper.html()).not.toMatchSnapshot()

        await wrapper.setProps({ price: 0.00 })
        expect(wrapper.html()).toMatchSnapshot()
    });

    it('Check filter price and title', async () => {
        const wrapper = shallowMount(component, {
            propsData: {
                rawProducts: mockProductsData,
                title: '',
                price: 0.00
            },
            global: {
                stubs: ['RouterLink'],
            }
        })

        await wrapper.setProps({ price: 60,  title: 'Mens Casual Premium'})

        const productElementsRendered = wrapper.findAll('#product-list > ul > li')

        expect(productElementsRendered.length).toBe(1)
        expect(wrapper.html()).not.toMatchSnapshot()

        await wrapper.setProps({ price: 0.00,  title: ''})
        expect(wrapper.html()).toMatchSnapshot()
    });

})