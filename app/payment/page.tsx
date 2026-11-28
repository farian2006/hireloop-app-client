import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { FaRegArrowAltCircleLeft, FaRegGem } from "react-icons/fa"
import { CiLock } from "react-icons/ci"
import { Info } from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"

const PLAN_PRICE_BDT = "BDT 2,553.33"
const PLAN_PRICE_USD = "$20.00"

export default async function PaymentPage({
  searchParams,
}: {
  searchParams: Promise<{ canceled?: string; currency?: string }>
}) {
  const { canceled, currency: currencyParam } = await searchParams
  if (canceled) {
    toast.error("Payment Failed", {
      description: "Your Payment Has Been Failed !!",
    })
    return
  }

  const currency: "BDT" | "USD" = currencyParam === "USD" ? "USD" : "BDT"

  const handlePay = () => {
    // TODO: integrate Stripe Checkout redirect here
    console.log("Proceed to Stripe:", {
      amount: currency === "BDT" ? PLAN_PRICE_BDT : PLAN_PRICE_USD,
    })
  }

  return (
    <div className="mt-20 min-h-screen bg-zinc-950 text-zinc-200">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <div className="flex items-center gap-2">
          <button className="text-zinc-400 hover:text-zinc-200">
            <FaRegArrowAltCircleLeft className="size-6" />
          </button>
          <div className="flex items-center gap-1">
            <div className="flex items-center justify-center rounded border border-zinc-800 text-[10px] text-zinc-400">
              <CiLock className="size-6" />
            </div>
          </div>
        </div>
        <span className="text-xs text-zinc-500">SANDBOX</span>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="space-y-6">
            <div>
              <p className="text-md mt-2 mb-2 tracking-wider text-white uppercase">
                Choose a currency
              </p>
              <div className="flex gap-2">
                <Link
                  href="/payment?currency=BDT"
                  className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
                    currency === "BDT"
                      ? "border-zinc-800 bg-zinc-900 text-zinc-200"
                      : "border-zinc-800 text-zinc-500 hover:border-zinc-600 hover:text-zinc-200"
                  }`}
                >
                  <Image
                    src="/assests/bangladesh.png"
                    alt="flag icon"
                    height={20}
                    width={20}
                    className="mb-1"
                  />
                  {currency === "BDT" ? "2,553.33" : ""}
                </Link>

                <Link
                  href="/payment?currency=USD"
                  className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
                    currency === "USD"
                      ? "border-zinc-800 bg-zinc-900 text-zinc-200"
                      : "border-zinc-800 text-zinc-500 hover:border-zinc-600 hover:text-zinc-200"
                  }`}
                >
                  <Image
                    src="/assests/us.png"
                    alt="flag icon"
                    height={20}
                    width={20}
                    className="mb-1"
                  />
                  USD {currency === "USD" ? "20.00" : ""}
                </Link>
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-xl font-semibold text-foreground">
                Hireloop Pro Plan
              </p>
              <p className="text-xs text-zinc-500">Access to all features</p>
            </div>

            <div className="text-2xl font-bold text-foreground">
              {currency === "BDT" ? PLAN_PRICE_BDT : PLAN_PRICE_USD}
            </div>
            <p className="text-xl flex gap-2 items-center justify-center text-blue-500">
               Unlock unlimited job applications with Hireloop Pro
                <FaRegGem  size={20}/>
            </p>
          </div>
          <div className="space-y-6">
            <div>
              <button className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-lg bg-[#00D17A] px-4 py-2.5 text-black transition-colors hover:bg-[#00BD6E]">
                <span className="flex items-center gap-1.5 text-base font-semibold">
                  <Info size={15} fill="black" className="text-[#00D17A]" />
                  link
                </span>

                <span className="h-6 w-px bg-black/30" />

                <span className="rounded bg-[#1434CB] px-2 py-0.5 text-xs font-bold text-white">
                  VISA
                </span>

                <span className="text-sm font-medium">4242</span>
              </button>
            </div>
            <p className="flex justify-center">Or</p>
            <div className="space-y-3">
              <p className="text-sm font-medium text-white">
                Contact information
              </p>
              <Input
                type="email"
                placeholder="email@example.com"
                className="dark:bg-zinc-900/50"
              />
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-white">Payment method</p>
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/50 p-2">
                <svg
                  className="h-5 w-5 text-zinc-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H5z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 21h2a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2z"
                  />
                </svg>
                <span className="text-sm text-zinc-200">Card</span>
              </div>
            </div>
            <div className="space-y-3">
              <p className="text-xs font-medium text-white uppercase">
                Card information
              </p>
              <Input
                type="text"
                placeholder="1234 1234 1234 1234"
                maxLength={19}
                className="dark:bg-zinc-900/50"
              />
              <div className="grid grid-cols-2 gap-3">
                <Input
                  type="text"
                  placeholder="MM / YY"
                  maxLength={5}
                  className="dark:bg-zinc-900/50"
                />
                <Input
                  type="text"
                  placeholder="CVC"
                  maxLength={3}
                  className="dark:bg-zinc-900/50"
                />
              </div>
              <Input
                type="text"
                placeholder="Full name on card"
                className="dark:bg-zinc-900/50"
              />
              <select className="h-9 w-full rounded-lg border border-zinc-800 bg-zinc-900/50 px-2.5 py-1 text-sm text-zinc-200 outline-none focus:border-blue-500">
                <option value="Bangladesh">Bangladesh</option>
              </select>
            </div>
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                className="mt-1 h-4 w-4 rounded border-zinc-800 bg-zinc-900 text-blue-600 focus:ring-blue-500"
              />
              <div className="text-sm leading-relaxed text-zinc-300">
                Save my information for faster checkout
                <br />
                <span className="text-xs text-zinc-500">
                  Pay securely on this site everywhere Link is accepted.
                </span>
              </div>
            </div>
            <form action="/api/checkout_sessions" method="POST">
              <input type="hidden" name="currency" value={currency} />
              <section>
                <Button
                  type="submit"
                  role="link"
                  className="w-full bg-blue-600 py-3 text-lg text-white hover:bg-blue-500"
                >
                  Pay
                </Button>
              </section>
            </form>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-auto max-w-7xl border-t border-zinc-900 px-4 py-8">
        <div className="flex flex-col items-center gap-2 text-center">
          <p className="text-xs text-zinc-500">Powered by Stripe</p>
          <div className="flex gap-4">
            <a href="#" className="text-xs text-zinc-500 hover:text-zinc-200">
              Terms
            </a>
            <a href="#" className="text-xs text-zinc-500 hover:text-zinc-200">
              Privacy
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
