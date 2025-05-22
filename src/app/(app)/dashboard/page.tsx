
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { PROMO_CODES_DATA, MOCK_PORTFOLIO_ASSETS_DATA } from "@/constants";
import type { PromoCode, PortfolioAsset } from "@/types";
import { DollarSign, Gift, Bell, CheckCircle, XCircle, ExternalLink, Loader2, Briefcase, ArrowUpRight, ArrowDownRight, ArrowDownToLine, ArrowUpFromLine } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WithdrawForm } from "@/components/dashboard/withdraw-form";
import { DepositForm } from "@/components/dashboard/deposit-form";
// ScrollArea import removed as it's no longer used here for WithdrawForm

const MOCK_ACCOUNT_BALANCE_KEY = 'cryptoDapperMockBalance';
const INITIAL_BALANCE = 10000; // DD Coins

export default function DashboardPage() {
  const [accountBalance, setAccountBalance] = useState(INITIAL_BALANCE);
  const [promoCode, setPromoCode] = useState("");
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const { toast } = useToast();
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);
  const [portfolioAssets, setPortfolioAssets] = useState<PortfolioAsset[]>([]);

  useEffect(() => {
    const storedBalance = localStorage.getItem(MOCK_ACCOUNT_BALANCE_KEY);
    if (storedBalance) {
      setAccountBalance(parseFloat(storedBalance));
    } else {
      localStorage.setItem(MOCK_ACCOUNT_BALANCE_KEY, String(INITIAL_BALANCE));
    }
    setPortfolioAssets(MOCK_PORTFOLIO_ASSETS_DATA);
  }, []);

  const handleApplyPromoCode = async () => {
    setIsApplyingPromo(true);
    await new Promise(resolve => setTimeout(resolve, 700)); 

    const foundCode = PROMO_CODES_DATA.find(p => p.code.toUpperCase() === promoCode.toUpperCase());
    if (foundCode) {
      const newBalance = accountBalance * foundCode.value;
      setAccountBalance(newBalance);
      localStorage.setItem(MOCK_ACCOUNT_BALANCE_KEY, String(newBalance));
      toast({
        title: "Promo Code Applied!",
        description: foundCode.message,
        action: <CheckCircle className="text-green-500" />,
      });
      setPromoCode("");
    } else {
      toast({
        variant: "destructive",
        title: "Invalid Promo Code",
        description: "The promo code you entered is not valid. Please try again.",
        action: <XCircle className="text-red-500" />,
      });
    }
    setIsApplyingPromo(false);
  };

  const handleNotificationToggle = (enabled: boolean) => {
    setNotificationsEnabled(enabled);
    toast({
      title: `Notifications ${enabled ? "Enabled" : "Disabled"}`,
      description: `Real-time crypto event alerts are now ${enabled ? "on" : "off"}. (Simulated)`,
    });
  };
  
  const totalPortfolioValue = portfolioAssets.reduce((sum, asset) => sum + asset.valueUsd, 0);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
          <TabsTrigger value="deposit">
            <ArrowDownToLine className="mr-2 h-4 w-4" /> Deposit
          </TabsTrigger>
          <TabsTrigger value="withdraw">
            <ArrowUpFromLine className="mr-2 h-4 w-4" /> Withdraw
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="card-border-gold">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">DD Coin Balance</CardTitle>
                <DollarSign className="h-5 w-5 text-gold-accent" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gold-accent">
                  {accountBalance.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} DD Coins
                </div>
                <p className="text-xs text-muted-foreground pt-1">
                  Platform-specific mock currency.
                </p>
              </CardContent>
            </Card>

            <Card className="col-span-1 lg:col-span-2 card-border-silver">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <Gift className="mr-2 h-6 w-6 text-accent" />
                  Redeem DD Coin Promo
                </CardTitle>
                <CardDescription>
                  Enter a promo code to receive bonus DD Coins.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex space-x-2">
                  <Input
                    id="promoCode"
                    placeholder="Enter promo code (e.g., DAPPER10)"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="font-mono"
                  />
                  <Button onClick={handleApplyPromoCode} className="btn-silver" disabled={isApplyingPromo}>
                    {isApplyingPromo ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Apply"}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Available demo codes: DAPPER10, CRYPTOFUN, WELCOME24
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <Bell className="mr-2 h-6 w-6 text-accent" />
                  Notifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="notifications-toggle"
                    checked={notificationsEnabled}
                    onCheckedChange={handleNotificationToggle}
                    className="data-[state=checked]:bg-gold-accent"
                  />
                  <Label htmlFor="notifications-toggle" className="text-muted-foreground">
                    Enable real-time crypto event alerts (simulated)
                  </Label>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Quick Links</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                <Button variant="outline" asChild className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                  <Link href="/education/tutorials">Tutorials <ExternalLink className="ml-2 h-4 w-4" /></Link>
                </Button>
                <Button variant="outline" asChild className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                  <Link href="/education/faqs">FAQs <ExternalLink className="ml-2 h-4 w-4" /></Link>
                </Button>
                <Button variant="outline" asChild className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                  <Link href="/education/blog">Blog <ExternalLink className="ml-2 h-4 w-4" /></Link>
                </Button>
                <Button variant="outline" asChild className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                  <Link href="/events">Crypto Events <ExternalLink className="ml-2 h-4 w-4" /></Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="portfolio">
           <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Briefcase className="mr-2 h-6 w-6 text-accent" />
                  <CardTitle className="text-xl">Mock Crypto Portfolio</CardTitle>
                </div>
                <div className="text-right">
                    <p className="text-sm text-muted-foreground">Total Value</p>
                    <p className="text-2xl font-bold text-foreground">
                        ${totalPortfolioValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                </div>
              </div>
              <CardDescription>
                Overview of your simulated cryptocurrency holdings. This data is for demonstration only.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]"></TableHead>
                    <TableHead>Asset</TableHead>
                    <TableHead>Symbol</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead className="text-right">Price (USD)</TableHead>
                    <TableHead className="text-right">Value (USD)</TableHead>
                    <TableHead className="text-right">24h Change</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {portfolioAssets.map((asset) => (
                    <TableRow key={asset.id}>
                      <TableCell>
                        <Image src={asset.iconUrl} alt={`${asset.name} icon`} width={32} height={32} className="rounded-full" data-ai-hint={asset.dataAiHint} />
                      </TableCell>
                      <TableCell className="font-medium text-foreground">{asset.name}</TableCell>
                      <TableCell className="text-muted-foreground">{asset.symbol}</TableCell>
                      <TableCell className="text-right font-mono">{asset.amount.toLocaleString()}</TableCell>
                      <TableCell className="text-right font-mono">${asset.currentPriceUsd.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                      <TableCell className="text-right font-mono text-foreground">${asset.valueUsd.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                      <TableCell className={cn(
                          "text-right font-mono flex items-center justify-end",
                          asset.change24h >= 0 ? "text-green-500" : "text-red-500"
                        )}>
                          {asset.change24h >= 0 ? <ArrowUpRight className="h-4 w-4 mr-1" /> : <ArrowDownRight className="h-4 w-4 mr-1" />}
                          {asset.change24h.toFixed(1)}%
                        </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="deposit">
          <DepositForm />
        </TabsContent>

        <TabsContent value="withdraw">
          {/* ScrollArea removed from here */}
          <WithdrawForm />
        </TabsContent>

      </Tabs>
    </div>
  );
}

    