import { loadStripe } from "@stripe/stripe-js"
import { studentEndpoints } from "../apis"
import { apiConnector } from "../apiconnector"
import { toast } from "react-hot-toast"

const { COURSE_PAYMENT_API } = studentEndpoints

const stripePromise = loadStripe("pk_test_51TR3wtRUcrr5vR1A3ZfkQj21mOCC0TW4UbHMwWojZq3OnzFtxz4YzXKFS0AF5rBuFsw2kDfAaykU3laey6IuF6aP007BNljyCs")

export async function buyCourse(token, courses, userDetails, navigate, dispatch) {
  const toastId = toast.loading("Redirecting to payment gateway...")

  try {
    const response = await apiConnector("POST", COURSE_PAYMENT_API, { courses }, {
      Authorization: `Bearer ${token}`
    })

    if (!response.data.success) {
      throw new Error(response.data.message)
    }

    const stripe = await stripePromise
    await stripe.redirectToCheckout({ sessionId: response.data.sessionId })

  } catch (error) {
    console.log("STRIPE PAYMENT ERROR:", error)
    toast.error("Could not initiate Stripe Checkout")
  }

  toast.dismiss(toastId)
}
