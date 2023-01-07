import { fireEvent, render } from '@testing-library/react'
import * as React from 'react'
import NewQuestion from '../components/NewQuestion'
import { Provider } from "react-redux";
import { BrowserRouter, Form } from "react-router-dom";
import { store } from "../store.js";

describe('NewQuestion', () => {
    it ('expected match snapshot', () => {
        const component = render(
            <Provider store={store}>
                <BrowserRouter>
                    <NewQuestion />
                </BrowserRouter>
            </Provider>
        )
        expect(component).toMatchSnapshot()
    })

    it ('expected change first option when user type', () => {
        const component = render(
            <Provider store={store}>
                <BrowserRouter>
                    <NewQuestion />
                </BrowserRouter>
            </Provider>
        )

        const optionOne = component.getByTestId("option-one")
        fireEvent.change(optionOne, {target: {value: 'Red'}})
        
        expect(optionOne.value).toEqual('Red')
    })

    it ('expected change second option when user type', () => {
        const component = render(
            <Provider store={store}>
                <BrowserRouter>
                    <NewQuestion />
                </BrowserRouter>
            </Provider>
        )

        const optionTwo = component.getByTestId("option-two")
        fireEvent.change(optionTwo, {target: {value: 'Blue'}})
        
        expect(optionTwo.value).toEqual('Blue')
    })

    it ('find the button in the document', () => {
        const component = render(
            <Provider store={store}>
                <BrowserRouter>
                    <NewQuestion />
                </BrowserRouter>
            </Provider>
        )
        
        const button = component.getByTestId('submit-question')
        expect(button).toBeInTheDocument()
    })
})