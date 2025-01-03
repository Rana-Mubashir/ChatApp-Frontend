import React from 'react'
import CheckoutForm from './components/CheckoutForm'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

function StripePayment() {

    const stripePromise = loadStripe('pk_test_51QbNFjGWuPv4JbNjl7lOHazzZkqO3p6SRLeS2P8FoNB7s8AgCrXXUG1U8ACLQS8KQ6RBMtRKNfFoWL4QksN83N6C00eEPRypwy')

    return (

        <div>
            <Elements stripe={stripePromise}>
                <CheckoutForm />
            </Elements>
        </div>
    )
}

export default StripePayment
