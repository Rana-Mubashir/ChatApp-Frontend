import React from 'react'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

function CheckoutForm() {

    const stripe = useStripe()
    const elements = useElements()

    async function submitPayment() {
        try {
            const cardElement = elements.getElement(CardElement)

            const res = await axios.post('/api/payment/createpaymentintent', {
                amount: 1000,
                currency: 'usd'
            })

            const clientSecret = res?.clientSecret

            const res2 = await stripe.confirmCardPayment(clientSecret, {
                payment_method: { card: cardElement }
            })

            if (res2?.paymentIntent?.status === 'succeeded') {
                console.log("Payment done")
            }
            else {
                console.log("error in payment", res2.error)
            }

        } catch (error) {
            console.log("error in submit payment", error)
        }
    }

    async function createCheckoutSession(){
        try {
            const res=await axios.post('/api/payment/createsessioncheckout')
            if(res){
                const url=res?.data?.url
                window.location.href=url
            }
        } catch (error) {
            console.log("error in creating checkout session",error)
        }
    }

    return (
        <div>
            {/* <form onSubmit={submitPayment()}>
                <CardElement />
                <button type='submit'>Pay</button>
            </form> */}
            <button onClick={() => createCheckoutSession()}>Pay</button>
        </div>
    )
}

export default CheckoutForm
