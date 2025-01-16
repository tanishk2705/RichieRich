
import HeroSection from "@/components/hero";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { featuresData, howItWorksData, statsData } from "@/data/landing";
import Link from "next/link";


export default function Home() {
  return (
    <div className="mt-40">
      <HeroSection/>

      <section className="py-20 bg-cyan-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {statsData.map((s, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl font-bold text-bold text-cyan-600 mb-2">{s.value}</div>
                  <div className="text-gray-600">{s.label}</div>
                </div>
            ))}
          </div>
        </div>
      </section>


      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Everything you need to manage your finances
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuresData.map((feature,index)=>(
              <Card key={index} className="py-6">
              <CardContent className="space-y-4 pt-4">
                {feature.icon}
                <h3 className="text-xl font-semibold">{feature.title} </h3>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
            ))}
          </div>
        </div>
      </section>


      <section className="py-20 bg-cyan-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorksData.map((step,index)=>(
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-cyan-200 rounded-full flex items-center justify-center mx-auto mb-6">{step.icon}</div>
                <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      <section className="py-20 bg-cyan-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to take Control of Your Finances?
          </h2>
          <p className="text-cyan-100 mb-8 max-w-2xl mx-auto">
               Join thousands of users who are already managing their finance smarter with RichieRich
          </p>
          <Link href="/dashboard">
             <Button size="lg" className="bg-white text-cyan-600 hover:bg-cyan-50 animate-bounce" >
              Start Free Trial
             </Button>
          </Link>
        </div>
      </section>
    </div>
      
  );
}
