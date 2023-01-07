import { render } from '@testing-library/react'
import * as React from 'react'
import LoginPage from '../components/LoginPage'
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "../store.js";

describe('LoginPage', () => {
    it ('expected match snapshot', () => {
        const component = render(
            <Provider store={store}>
                <BrowserRouter>
                    <LoginPage />
                </BrowserRouter>
            </Provider>
        )
        expect(component).toMatchSnapshot()
    })

    it ('check if a text is in the document', () => {
        const component = render(
            <Provider store={store}>
                <BrowserRouter>
                    <LoginPage />
                </BrowserRouter>
            </Provider>
        )

        expect(component.getByText('Please select your Name:')).toBeInTheDocument()
    })
})