
"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { DollarSign, Banknote, Bitcoin, ArrowRight, ShieldCheck, Info, CreditCard, Loader2, ArrowUpFromLine } from "lucide-react";
import { cn } from "@/lib/utils";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

// Inline SVG for Visa
const VisaIcon = () => (
  <svg width="38" height="24" viewBox="0 0 38 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="38" height="24" rx="3" fill="white"/>
    <path d="M10.414 17.53L8.517 6.47H11.055L12.952 17.53H10.414ZM18.913 14.218C19.292 15.025 19.992 15.566 20.92 15.566C21.605 15.566 22.022 15.208 22.022 14.787C22.022 14.022 21.042 13.765 19.875 13.267C18.227 12.566 17.327 11.926 17.327 10.66C17.327 9.26803 18.399 8.36203 19.885 8.36203C20.967 8.36203 21.818 8.83603 22.225 9.67003L20.101 10.571C19.887 10.077 19.489 9.81803 18.999 9.81803C18.601 9.81803 18.311 10.049 18.311 10.412C18.311 10.987 19.152 11.218 20.395 11.763C22.022 12.464 22.94 13.082 22.94 14.48C22.94 16.026 21.633 16.964 19.941 16.964C18.655 16.964 17.675 16.356 17.22 15.433L18.913 14.218ZM26.278 17.53H28.801L26.578 6.47H24.07L21.847 17.53H24.354L24.731 16.409H27.03L27.275 17.53H26.278ZM25.184 14.73L26.004 10.856L26.829 14.73H25.184ZM6.318 6.47L4 14.157L3.937 12.576C3.58 10.246 1.915 8.88403 0 8.53603V7.07803C0.819 7.18903 2.681 7.77203 3.432 10.67L5.401 6.47H6.318Z" fill="#1A1F71"/>
  </svg>
);

// Inline SVG for Mastercard
const MastercardIcon = () => (
  <svg width="38" height="24" viewBox="0 0 38 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="38" height="24" rx="3" fill="white"/>
    <circle cx="13.5" cy="12" r="6.5" fill="#EB001B"/>
    <circle cx="24.5" cy="12" r="6.5" fill="#F79E1B"/>
    <path d="M20.3951 12C20.3951 14.4914 19.2258 16.7118 17.482 18.1284C16.2876 17.2412 15.3644 16.0638 14.7987 14.7077C14.2453 13.3805 14.0646 11.9515 14.2734 10.5529C14.4822 9.15434 15.0742 7.8419 15.9793 6.74748C16.8022 7.67319 17.3848 8.79256 17.6674 10.0056C17.9499 11.2187 17.9225 12.4832 17.5889 13.6786" fill="#FF5F00"/>
  </svg>
);

// Inline SVG for PayPal
const PayPalIcon = () => (
 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#0070BA]">
    <path d="M3.41357 10.557C3.50587 10.0868 3.71866 9.67565 4.05771 9.3259C4.39676 8.97615 4.78868 8.73834 5.21029 8.61252L5.22072 8.60913C6.98379 8.13793 9.2475 8.21379 10.9136 9.34768C11.0044 9.40913 11.2068 9.52968 11.2539 9.56655C11.6765 9.86752 11.9774 10.261 12.1182 10.7196C12.154 10.8322 12.1836 10.9591 12.2068 11.0914C12.3322 11.8879 11.966 12.764 11.2507 13.2425C11.0629 13.3739 10.7798 13.5809 10.7076 13.6352C9.92634 14.2013 8.87063 14.4352 7.88408 14.2839C7.69254 14.2552 7.48655 14.2013 7.30534 14.1368C6.0388 13.6951 5.27749 12.5782 5.37298 11.257C5.38012 11.157 5.39441 11.0543 5.41587 10.9517M10.3136 7.10913L10.3032 7.11252C9.67941 6.55379 8.56641 6.01483 7.41696 6.04655C7.15109 6.05379 6.88523 6.07448 6.62254 6.10913L6.26096 6.15328C6.04161 6.1809 5.82543 6.22242 5.61254 6.27776L5.14441 6.40913C4.43925 6.60913 3.91696 7.17172 3.7475 7.83552C3.70034 8.01776 3.66408 8.20328 3.63793 8.39103V8.42572C3.43254 9.90103 4.67298 11.3125 6.1475 11.7164C6.27983 11.7562 6.40681 11.7932 6.52749 11.8278C6.60681 11.8522 6.69254 11.8809 6.78161 11.9125C6.83925 11.9333 6.89408 11.9543 6.9475 11.9745C7.02793 12.0052 7.11366 12.0352 7.20322 12.062C7.22072 12.0674 7.23812 12.0725 7.25534 12.0772C7.33254 12.101 7.41366 12.1239 7.4975 12.1459C7.51179 12.15 7.52609 12.1538 7.54023 12.1574C7.64161 12.1843 7.7475 12.2088 7.85661 12.2309C7.87075 12.2338 7.88474 12.2366 7.89874 12.2392C8.51696 12.362 9.2475 12.2239 9.82254 11.8602C10.0761 11.7025 10.2925 11.4817 10.4392 11.2204C10.6916 10.758 10.7136 10.1343 10.5032 9.64768C10.4456 9.51252 10.3775 9.38431 10.2991 9.26379L10.1182 9.00103C9.49128 8.00103 8.01357 7.44103 6.78161 7.77172M19.5403 9.90103L19.7475 8.78724C19.8269 8.32103 19.5574 7.83896 19.0947 7.72041L18.0947 7.47172C17.9816 7.44483 17.8632 7.42896 17.7416 7.42534L16.2539 7.38034C15.4761 7.36293 14.8447 7.91252 14.7903 8.69413C14.7832 8.80672 14.7761 8.91603 14.7689 9.02207L13.9802 14.1912C13.933 14.4955 14.1009 14.7919 14.3981 14.8595L15.0275 14.9745C15.1816 15.0021 15.3389 15.0179 15.4975 15.0179C16.262 15.0179 16.8761 14.4955 16.9603 13.7321L17.2307 11.6125L18.4392 11.757C19.217 11.8421 19.8202 11.2204 19.7832 10.4455C19.7761 10.271 19.7003 10.1031 19.5832 9.97172L19.5403 9.90103Z" fill="#0070BA"/>
    <path d="M12.6227 10.9745C12.482 10.181 12.8458 9.30776 13.5611 8.82914C13.7491 8.69776 14.0322 8.4919 14.1044 8.43759C14.8856 7.87138 15.9414 7.63759 16.9279 7.78879C17.1194 7.81759 17.3254 7.87138 17.5066 7.9359L17.5405 7.94759C18.807 8.38914 19.5683 9.50604 19.4728 10.8269C19.4656 10.9269 19.4514 11.0295 19.4298 11.1322C19.3044 11.9288 19.6702 12.8059 20.3856 13.2843C20.5734 13.4157 20.8564 13.6228 20.9287 13.677L21.1096 13.9398C21.7366 14.9398 20.5514 15.6854 20.0125 15.6164L19.5444 15.557C18.8392 15.357 18.3169 14.7945 18.1475 14.1307C18.1003 13.9484 18.0641 13.763 18.0379 13.5752V13.5405C17.8325 12.0652 16.592 10.6538 15.1175 10.2498C14.9851 10.2099 14.8581 10.173 14.7375 10.1372L12.6227 10.9745Z" fill="#002C8A"/>
</svg>
);


// Simplified Swift/Bank Transfer Icon
const BankTransferIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-muted-foreground">
    <path d="M2 8l2.95 2.95a1 1 0 0 0 1.414 0L10 7.242M22 8l-3-3-3.243 2.43M2 16l2.95-2.95a1 1 0 0 1 1.414 0L10 16.758M22 16l-3 3-3.243-2.43"/>
    <path d="M7.5 10.5h9M7.5 13.5h9"/>
    <path d="M2 12h20"/>
  </svg>
);

const paymentMethods = [
  { id: "card", label: "Credit/Debit Card", icon: <CreditCard className="h-6 w-6 text-primary" />, component: VisaIcon },
  { id: "paypal", label: "PayPal", icon: <PayPalIcon />, component: PayPalIcon },
  { id: "bank", label: "Bank Transfer (SWIFT)", icon: <BankTransferIcon />, component: BankTransferIcon },
];

export function WithdrawForm() {
  const { toast } = useToast();
  const [amount, setAmount] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(paymentMethods[0].id);
  const [cryptoAddress, setCryptoAddress] = useState("");
  const [network, setNetwork] = useState("BTC"); 
  const [isLoading, setIsLoading] = useState(false);

  const handleWithdraw = async () => {
    if (!amount) {
      toast({ variant: "destructive", title: "Amount Required", description: "Please enter an amount to withdraw." });
      return;
    }
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    toast({
      title: "Withdrawal Initiated (Demo)",
      description: `Your withdrawal of ${amount} DD Coins via ${selectedPaymentMethod} has been initiated. This is a demo.`,
    });
    setAmount("");
    setCryptoAddress("");
    setIsLoading(false);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-foreground">Withdraw Funds</CardTitle>
        <CardDescription className="text-muted-foreground">
          Securely withdraw your DD Coins. All transactions are simulated.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="amount" className="text-muted-foreground mb-1 block">Amount (DD Coins)</Label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              id="amount"
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="pl-10 text-lg font-mono"
            />
          </div>
          <p className="text-xs text-muted-foreground mt-1">Available Balance: 10,000 DD Coins (Demo)</p>
        </div>

        <div>
          <Label className="text-muted-foreground mb-2 block">Select Withdrawal Method</Label>
          <RadioGroup
            value={selectedPaymentMethod}
            onValueChange={setSelectedPaymentMethod}
            className="grid grid-cols-1 gap-3 sm:grid-cols-3"
          >
            {paymentMethods.map((method) => {
              const IconComponent = method.component;
              return (
                <Label
                  key={method.id}
                  htmlFor={`method-${method.id}`}
                  className={cn(
                    "flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer transition-all",
                    selectedPaymentMethod === method.id && "border-primary ring-2 ring-primary shadow-lg"
                  )}
                >
                  <RadioGroupItem value={method.id} id={`method-${method.id}`} className="sr-only" />
                  <IconComponent />
                  <span className="mt-2 block text-sm font-medium">{method.label}</span>
                </Label>
              )
            })}
          </RadioGroup>
        </div>

        {selectedPaymentMethod === "crypto" && ( // This value isn't in paymentMethods, example if we add it
          <>
            <div>
              <Label htmlFor="cryptoAddress" className="text-muted-foreground mb-1 block">Crypto Address</Label>
              <Input
                id="cryptoAddress"
                placeholder="Enter your destination address"
                value={cryptoAddress}
                onChange={(e) => setCryptoAddress(e.target.value)}
                className="font-mono"
              />
            </div>
            <div>
              <Label htmlFor="network" className="text-muted-foreground mb-1 block">Network</Label>
              <Select value={network} onValueChange={setNetwork}>
                <SelectTrigger>
                  <SelectValue placeholder="Select network" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="BTC">Bitcoin (BTC)</SelectItem>
                  <SelectItem value="ETH">Ethereum (ERC20)</SelectItem>
                  <SelectItem value="BSC">BNB Smart Chain (BEP20)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        )}

        <Alert variant="default" className="bg-primary/20 border-primary/50">
            <ShieldCheck className="h-5 w-5 text-primary" />
          <AlertTitle className="font-semibold text-foreground">Security Note</AlertTitle>
          <AlertDescription className="text-muted-foreground">
            Ensure your withdrawal details are correct. Transactions on the blockchain are irreversible. (This is a demo, no real transactions will occur).
          </AlertDescription>
        </Alert>

      </CardContent>
      <CardFooter className="flex flex-col gap-4 border-t pt-6">
        <Button onClick={handleWithdraw} className="w-full text-lg py-3" disabled={isLoading}>
          {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <ArrowUpFromLine className="mr-2 h-5 w-5" />}
          Withdraw DD Coins
        </Button>
        <Button variant="outline" className="w-full" onClick={() => toast({title: "Action (Demo)", description: "Limit increase request simulation for this demo."})}>
            <Info className="mr-2 h-4 w-4" />
            Increase withdrawal limit
        </Button>
      </CardFooter>
    </Card>
  );
}
