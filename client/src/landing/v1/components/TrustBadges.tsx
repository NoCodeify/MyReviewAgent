import { Badge } from "@/components/ui/badge";
import { ShieldCheckIcon, LockClosedIcon, CreditCardIcon } from "@heroicons/react/24/outline";
import { Visa, Mastercard, Amex, Paypal, Applepay, Discover } from "react-pay-icons";

export default function TrustBadges() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 pt-6">
      {/* Security Badges */}
      <div className="flex items-center gap-2">
        <Badge variant="outline" className="bg-background/50 backdrop-blur-sm border-green-500/30 px-3 py-1.5">
          <ShieldCheckIcon className="w-4 h-4 mr-2 text-green-400" />
          <span className="text-xs font-medium">30-Day Guarantee</span>
        </Badge>

        <Badge variant="outline" className="bg-background/50 backdrop-blur-sm border-green-500/30 px-3 py-1.5">
          <LockClosedIcon className="w-4 h-4 mr-2 text-green-400" />
          <span className="text-xs font-medium">SSL Secure</span>
        </Badge>
      </div>

      {/* Payment Methods */}
      <div className="flex items-center gap-1.5 bg-white px-2.5 py-1 rounded">
          <Paypal style={{ width: 40, height: 'auto' }} />
          <div className="flex items-center gap-0.5 text-[#635BFF] font-bold text-sm">
            <CreditCardIcon className="w-4 h-4" />
            <span>Stripe</span>
          </div>
          <Visa style={{ width: 35, height: 'auto' }} />
          <Mastercard style={{ width: 30, height: 'auto' }} />
          <Amex style={{ width: 30, height: 'auto' }} />
      </div>
    </div>
  );
}