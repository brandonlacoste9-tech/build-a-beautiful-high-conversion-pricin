
interface PricingTier {
  name: string;
  price: { monthly: number; yearly: number };
  description: string;
  features: string[];
  popular?: boolean;
  cta: string;
}

const tiers: PricingTier[] = [
  {
    name: "Free",
    price: { monthly: 0, yearly: 0 },
    description: "Perfect for side projects and testing",
    features: ["1 project", "Basic analytics", "Community support", "1GB storage"],
    cta: "Get started free",
  },
  {
    name: "Pro",
    price: { monthly: 20, yearly: 192 },
    description: "For growing teams and serious builders",
    features: ["Unlimited projects", "Advanced analytics", "Priority support", "100GB storage", "Custom domains"],
    popular: true,
    cta: "Start 14-day trial",
  },
  {
    name: "Enterprise",
    price: { monthly: 99, yearly: 950 },
    description: "For large organizations with custom needs",
    features: ["Everything in Pro", "SSO & SAML", "Dedicated manager", "Unlimited storage", "Custom SLAs"],
    cta: "Talk to sales",
  },
];

function Component() {
  const [isYearly, setIsYearly] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const handleSelect = (plan: string) => {
    setSelectedPlan(plan);
    setTimeout(() => setSelectedPlan(null), 2200);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* Navbar */}
      <nav className="border-b border-white/10 bg-[#0a0a0f]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-violet-600" />
            <span className="font-semibold tracking-tight text-xl">Lumina</span>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <a href="#" className="text-white/70 hover:text-white transition">Docs</a>
            <a href="#" className="text-white/70 hover:text-white transition">Blog</a>
            <button className="px-4 py-1.5 rounded-xl border border-white/20 hover:bg-white/5 transition">Log in</button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <div className="max-w-3xl mx-auto text-center pt-20 pb-12 px-6">
        <div className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs tracking-widest mb-4">PRICING</div>
        <h1 className="text-6xl font-bold tracking-tighter">Simple pricing.<br />Powerful features.</h1>
        <p className="mt-4 text-xl text-white/60">Choose the plan that scales with you.</p>

        {/* Billing Toggle */}
        <div className="mt-8 inline-flex items-center bg-white/5 border border-white/10 rounded-2xl p-1">
          <button
            onClick={() => setIsYearly(false)}
            className={`px-6 py-2 rounded-xl text-sm transition ${!isYearly ? 'bg-white text-black' : 'text-white/70'}`}
          >
            Monthly
          </button>
          <button
            onClick={() => setIsYearly(true)}
            className={`px-6 py-2 rounded-xl text-sm transition flex items-center gap-2 ${isYearly ? 'bg-white text-black' : 'text-white/70'}`}
          >
            Yearly
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500 text-black font-medium">Save 20%</span>
          </button>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-6xl mx-auto px-6 pb-24 grid md:grid-cols-3 gap-6">
        {tiers.map((tier) => {
          const price = isYearly ? tier.price.yearly : tier.price.monthly;
          const period = isYearly ? "/year" : "/month";

          return (
            <div
              key={tier.name}
              className={`group relative flex flex-col rounded-3xl border p-8 transition-all bg-white/5 border-white/10 backdrop-blur-xl hover:border-white/20 ${tier.popular ? 'ring-1 ring-violet-600/50' : ''}`}
            >
              {tier.popular && (
                <div className="absolute -top-3 right-6">
                  <div className="px-4 py-1 text-xs font-medium tracking-wider bg-violet-600 text-white rounded-full animate-pulse">
                    MOST POPULAR
                  </div>
                </div>
              )}

              <div>
                <div className="font-semibold text-2xl tracking-tight">{tier.name}</div>
                <div className="mt-6 flex items-baseline">
                  <span className="text-6xl font-bold tracking-tighter">${price}</span>
                  <span className="ml-1 text-white/60">{period}</span>
                </div>
                <p className="mt-2 text-sm text-white/60">{tier.description}</p>
              </div>

              <ul className="mt-8 space-y-3 text-sm flex-1">
                {tier.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-white/80">
                    <div className="w-1.5 h-1.5 rounded-full bg-violet-500" />
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleSelect(tier.name)}
                className={`mt-8 w-full py-3 rounded-2xl font-medium transition active:scale-[0.985] ${tier.popular ? 'bg-white text-black' : 'border border-white/20 hover:bg-white/5'}`}
              >
                {tier.cta}
              </button>
            </div>
          );
        })}
      </div>

      {/* Success Toast */}
      {selectedPlan && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-white/10 border border-white/20 backdrop-blur-xl px-6 py-3 rounded-2xl text-sm flex items-center gap-3">
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
          Thanks! We’ll email you about the {selectedPlan} plan.
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 text-center text-xs text-white/50">
        30-day money-back guarantee • Cancel anytime • Questions? <span className="underline cursor-pointer">hello@lumina.dev</span>
      </footer>
    </div>
  );
}

export default Component;
