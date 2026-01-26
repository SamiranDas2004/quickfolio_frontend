import Link from "next/link";

export default function Terms() {
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
        <h1 className="text-4xl font-bold mb-8">Terms & Conditions</h1>
        
        <div className="space-y-6 text-zinc-300">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Acceptance of Terms</h2>
            <p>
              By accessing and using Quickfolio, you accept and agree to be bound by these Terms and Conditions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Use of Service</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>You must be at least 18 years old to use this service</li>
              <li>You are responsible for maintaining account security</li>
              <li>You must not use the service for illegal purposes</li>
              <li>You must not violate any laws in your jurisdiction</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">User Content</h2>
            <p className="mb-4">You retain ownership of content you upload. By uploading content, you grant us:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>License to use, store, and display your content</li>
              <li>Right to process your content with AI</li>
              <li>Permission to create your portfolio</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Payment Terms</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Subscription fees are billed in advance</li>
              <li>All payments are processed securely via Razorpay</li>
              <li>Prices are subject to change with notice</li>
              <li>No refunds except as stated in our Refund Policy</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Limitation of Liability</h2>
            <p>
              Quickfolio is provided "as is" without warranties. We are not liable for any damages 
              arising from your use of the service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Contact Us</h2>
            <p>
              For questions about these terms, contact:{" "}
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
