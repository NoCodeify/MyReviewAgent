import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useDealPricing, useFormattedPrice } from "@/hooks/useDealPricing";

export default function DealDebug() {
  // Only show in development with debug param
  const isDebugMode = typeof window !== 'undefined' &&
    (window.location.search.includes('debug=true') || window.location.hostname === 'localhost');

  if (!isDebugMode) return null;

  const starterDeal = useDealPricing('STARTER');
  const professionalDeal = useDealPricing('PROFESSIONAL');
  const agencyDeal = useDealPricing('AGENCY');

  const starterPricing = useFormattedPrice('STARTER');
  const professionalPricing = useFormattedPrice('PROFESSIONAL');
  const agencyPricing = useFormattedPrice('AGENCY');

  const handleResetCookies = () => {
    if (typeof document !== 'undefined') {
      document.cookie = 'whatsagent_first_visit=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;';
      document.cookie = 'whatsagent_first_expired=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;';
      document.cookie = 'whatsagent_final_expired=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;';
      window.location.reload();
    }
  };

  const handleSetFirstExpired = () => {
    starterDeal.markFirstExpired();
  };

  const handleSetFinalExpired = () => {
    starterDeal.markFinalExpired();
  };

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 max-w-md mx-auto">
      <Card className="p-4 bg-yellow-50 dark:bg-yellow-950/50 border-yellow-200 dark:border-yellow-800">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Badge className="bg-yellow-500/10 text-yellow-600 border-yellow-500/20 text-xs">
              DEBUG MODE
            </Badge>
            <span className="text-sm font-semibold">Deal Status Debug</span>
          </div>

          <div className="space-y-2 text-xs">
            <div>
              <strong>URL:</strong> {typeof window !== 'undefined' ? window.location.search : 'N/A'}
            </div>
            <div>
              <strong>Deal Status:</strong>
              <Badge className={`ml-1 text-xs ${
                starterDeal.dealStatus === 'regular' ? 'bg-green-100 text-green-700' :
                starterDeal.dealStatus === 'first_expired' ? 'bg-orange-100 text-orange-700' :
                'bg-red-100 text-red-700'
              }`}>
                {starterDeal.dealStatus}
              </Badge>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <div className="font-semibold">Starter:</div>
                <div>{starterPricing.currentPrice}</div>
              </div>
              <div>
                <div className="font-semibold">Pro:</div>
                <div>{professionalPricing.currentPrice}</div>
              </div>
              <div>
                <div className="font-semibold">Agency:</div>
                <div>{agencyPricing.currentPrice}</div>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-1">
              <Button size="sm" variant="outline" className="text-xs h-6"
                onClick={() => window.location.href = '/'}>
                Regular
              </Button>
              <Button size="sm" variant="outline" className="text-xs h-6"
                onClick={() => window.location.href = '/?expired=first'}>
                First
              </Button>
              <Button size="sm" variant="outline" className="text-xs h-6"
                onClick={() => window.location.href = '/?expired=final'}>
                Final
              </Button>
              <Button size="sm" variant="outline" className="text-xs h-6"
                onClick={handleResetCookies}>
                Reset
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}