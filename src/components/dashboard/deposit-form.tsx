
"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"; // Temporarily remove
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"; // Use RadioGroup instead
import { Label } from "@/components/ui/label"; // For RadioGroup
import { useToast } from "@/hooks/use-toast";
import { Bitcoin, CreditCard, MessageCircle, ChevronDown, Info } from "lucide-react";
import { cn } from "@/lib/utils";

// Moved DollarSign component definition before its use in mockCryptoAssets
const DollarSign = ({className}: {className?:string}) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
);

const mockCryptoAssets = [
  {
    id: "btc",
    name: "Bitcoin",
    symbol: "BTC",
    icon: <Bitcoin className="h-6 w-6 mr-2 text-orange-400" />,
    balance: "0.000000 BTC",
    valueUsd: "≈ 0.00$",
    networks: ["BTC", "ERC-20", "BEP-20"],
    iconUrl: "https://placehold.co/32x32/orange/white.png?text=B"
  },
  {
    id: "eth",
    name: "Ethereum",
    symbol: "ETH",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 mr-2 text-gray-400"><path d="M12 22V12M12 12V2L6 8l6 4 6-4-6-4zM6 12l6 4 6-4M6 12v6l6 4 6-4v-6"/></svg>,
    balance: "0.000000 ETH",
    valueUsd: "≈ 0.00$",
    networks: ["ERC-20", "BEP-20"],
    iconUrl: "https://placehold.co/32x32/gray/white.png?text=E"
  },
  {
    id: "usdt",
    name: "USDT",
    symbol: "USDT",
    icon: <DollarSign className="h-6 w-6 mr-2 text-green-500" />,
    balance: "0.00 USDT",
    valueUsd: "≈ 0.00$",
    networks: ["ERC-20", "TRC-20", "BEP-20"],
    iconUrl: "https://placehold.co/32x32/green/white.png?text=U"
  },
];

const StepIndicator = ({ number, label, isActive }: { number: number; label: string; isActive?: boolean }) => (
  <div className="flex items-center space-x-3 mb-3">
    <div className={cn(
      "flex items-center justify-center w-8 h-8 rounded-full border-2",
      isActive ? "bg-gold-accent border-gold-accent text-gold-accent-foreground" : "bg-muted border-border text-muted-foreground"
    )}>
      {number}
    </div>
    <span className={cn("text-lg font-medium", isActive ? "text-gold-accent" : "text-foreground")}>{label}</span>
  </div>
);


export function DepositForm() {
  const { toast } = useToast();
  const [selectedCrypto, setSelectedCrypto] = useState(mockCryptoAssets[0].id);
  const [selectedNetwork, setSelectedNetwork] = useState(mockCryptoAssets[0].networks[0]);

  const currentAsset = mockCryptoAssets.find(asset => asset.id === selectedCrypto) || mockCryptoAssets[0];

  const handleBuyWithCard = () => {
    toast({
      title: "Action Triggered (Mock)",
      description: "Buy BTC with card functionality would be initiated here.",
    });
  };
  

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-xl card-border-silver">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-foreground">Deposit Funds</CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        <Alert className="bg-primary/20 border-primary/50 text-foreground">
          <Info className="h-5 w-5 text-gold-accent" />
          <AlertTitle className="text-gold-accent">Welcome Promotion!</AlertTitle>
          <AlertDescription>
            Make your first deposit and receive a <span className="font-bold">190 USDT Bonus!</span> (Demo offer)
          </AlertDescription>
        </Alert>

        <div className="space-y-4">
          <StepIndicator number={1} label="Select crypto to deposit" isActive />
          <Select 
            value={selectedCrypto} 
            onValueChange={(value) => {
              setSelectedCrypto(value);
              const newAsset = mockCryptoAssets.find(a => a.id === value);
              if (newAsset && newAsset.networks.length > 0) {
                setSelectedNetwork(newAsset.networks[0]);
              }
            }}
          >
            <SelectTrigger className="w-full h-auto py-3 px-4 text-left bg-muted/30 hover:bg-muted/50 transition-colors">
              <SelectValue>
                <div className="flex items-center">
                  <Image src={currentAsset.iconUrl} alt={currentAsset.name} width={32} height={32} className="rounded-full mr-3" data-ai-hint={`${currentAsset.name} logo`} />
                  <div>
                    <div className="font-semibold text-foreground">{currentAsset.symbol} {currentAsset.name}</div>
                    <div className="text-sm text-muted-foreground font-mono">{currentAsset.balance} {currentAsset.valueUsd}</div>
                  </div>
                  <ChevronDown className="ml-auto h-5 w-5 text-muted-foreground" />
                </div>
              </SelectValue>
            </SelectTrigger>
            <SelectContent className="bg-popover">
              {mockCryptoAssets.map((asset) => (
                <SelectItem key={asset.id} value={asset.id} className="py-3">
                  <div className="flex items-center">
                    <Image src={asset.iconUrl} alt={asset.name} width={24} height={24} className="rounded-full mr-3" data-ai-hint={`${asset.name} logo`} />
                    <div>
                      <div className="font-semibold">{asset.symbol} {asset.name}</div>
                       <div className="text-xs text-muted-foreground font-mono">{asset.balance}</div>
                    </div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-3">
          <StepIndicator number={2} label="Select network" isActive={!!selectedCrypto} />
          {/* Temporarily using RadioGroup instead of ToggleGroup */}
          <RadioGroup
            value={selectedNetwork}
            onValueChange={(value) => { if (value) setSelectedNetwork(value); }}
            className="grid grid-cols-2 sm:grid-cols-3 gap-3"
            disabled={!selectedCrypto}
          >
            {currentAsset.networks.map((network) => (
              <div key={network} className="flex items-center">
                <RadioGroupItem value={network} id={`network-${network}`} className="peer sr-only" />
                <Label
                  htmlFor={`network-${network}`}
                  className={cn(
                    "flex-1 text-center cursor-pointer rounded-md border-2 border-muted bg-popover p-3 hover:bg-accent hover:text-accent-foreground",
                    "peer-data-[state=checked]:border-gold-accent peer-data-[state=checked]:ring-2 peer-data-[state=checked]:ring-gold-accent peer-data-[state=checked]:bg-gold-accent/10 peer-data-[state=checked]:text-gold-accent"
                  )}
                >
                  {network}
                </Label>
              </div>
            ))}
          </RadioGroup>
          <p className="text-xs text-muted-foreground">
            The `ToggleGroup` component is missing. Please add it using `npx shadcn-ui@latest add toggle-group` for the intended styling. Radio buttons are used as a temporary fallback.
          </p>
        </div>
        
        {/* The "Don't have cryptocurrency?" section has been removed. */}

      </CardContent>
      <CardFooter className="flex flex-col gap-4 border-t pt-6">
        <Button className="w-full btn-gold" onClick={handleBuyWithCard}>
          <CreditCard className="mr-2 h-5 w-5" />
          Buy {currentAsset.symbol} with card (Mock)
        </Button>
         <Button variant="outline" className="w-full border-accent text-accent hover:bg-accent hover:text-accent-foreground relative">
          <MessageCircle className="mr-2 h-5 w-5" />
          Live support
           <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-accent opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-gold-accent text-xs items-center justify-center text-primary">1</span>
          </span>
        </Button>
      </CardFooter>
    </Card>
  );
}

