import Link from "next/link";

export default function RefundPolicy() {
  return (
    <div className="min-h-screen bg-black text-white">
      <header className="border-b border-zinc-800">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <img src="/logo.png" alt="Quickfolio" className="w-8 h-8" />
            Quickfolio
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-8">Refund & Cancellation Policy</h1>
        
        <div className="space-y-6 text-zinc-300">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Refund Policy</h2>
            <p className="mb-4">
              At Quickfolio, we strive to provide the best service. If you are not satisfied with your purchase, 
              we offer refunds under the following conditions:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Refund requests must be made within 7 days of purchase</li>
              <li>Service must not have been fully utilized</li>
              <li>Refunds will be processed within 7-10 business days</li>
              <li>Refunds will be credited to the original payment method</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Cancellation Policy</h2>
            <p className="mb-4">You may cancel your subscription at any time:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Cancellations can be made from your dashboard</li>
              <li>No refund for the current billing period</li>
              <li>Access continues until the end of the paid period</li>
              <li>No charges after cancellation</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Contact Us</h2>
            <p>
              For refund or cancellation requests, contact:{" "}
              <a href="mailto:support@quickfolio.in" className="text-blue-400 hover:underline">
                support@quickfolio.in
              </a>
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
