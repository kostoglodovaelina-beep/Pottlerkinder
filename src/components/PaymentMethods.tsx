import shopPay from "@/assets/payments/shopify_pay.svg"
import visa from "@/assets/payments/visa.svg"
import mastercard from "@/assets/payments/master.svg"
import americanExpress from "@/assets/payments/american_express.svg"
import maestro from "@/assets/payments/maestro.svg"
import unionPay from "@/assets/payments/unionpay.svg"
import applePay from "@/assets/payments/apple_pay.svg"
import googlePay from "@/assets/payments/google_pay.svg"
import "../styles/components/footer-updates.css"

const methods = [
  { name: "Shop Pay", logo: shopPay },
  { name: "Visa", logo: visa },
  { name: "Mastercard", logo: mastercard },
  { name: "American Express", logo: americanExpress },
  { name: "Maestro", logo: maestro },
  { name: "UnionPay", logo: unionPay },
  { name: "Apple Pay", logo: applePay },
  { name: "Google Pay", logo: googlePay },
]

export default function PaymentMethods() {
  return (
    <ul className="payment-methods" aria-label="Zahlungsmethoden">
      {methods.map((method) => (
        <li className="payment-method" key={method.name}>
          <img src={method.logo} alt="" width="38" height="24" loading="lazy" />
          <span className="sr-only">{method.name}</span>
        </li>
      ))}
    </ul>
  )
}
