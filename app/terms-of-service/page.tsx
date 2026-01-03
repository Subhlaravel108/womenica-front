import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { contactInfo } from "@/lib/global_variables";

export const metadata: Metadata = {
  title: `Terms of Service - ${contactInfo.websiteName}`,
  description: "Read Womanica's terms of service to understand the rules and regulations for using our website.",
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 xl:px-12 py-12 md:py-16">
          {/* Hero Section */}
          <div className="text-center mb-12 md:mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6">
              Terms of Service
            </h1>
            {/* <p className="text-lg text-muted-foreground">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p> */}
          </div>

          {/* Main Content */}
          <div className="max-w-4xl mx-auto space-y-8 md:space-y-12">
            {/* Introduction */}
            <section className="bg-card rounded-2xl p-8 md:p-12 shadow-lg border border-border">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
                Agreement to Terms
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                By accessing or using the Womanica website, you agree to be bound by these Terms of Service and all 
                applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from 
                using or accessing this site.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                The materials contained in this website are protected by applicable copyright and trademark law.
              </p>
            </section>

            {/* Use License */}
            <section className="bg-card rounded-2xl p-8 md:p-12 shadow-lg border border-border">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
                Use License
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                Permission is granted to temporarily download one copy of the materials on Womanica's website for personal, 
                non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under 
                this license you may not:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose or for any public display</li>
                <li>Attempt to reverse engineer any software contained on the website</li>
                <li>Remove any copyright or other proprietary notations from the materials</li>
                <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
              </ul>
            </section>

            {/* Disclaimer */}
            <section className="bg-card rounded-2xl p-8 md:p-12 shadow-lg border border-border">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
                Disclaimer
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                The materials on Womanica's website are provided on an 'as is' basis. Womanica makes no warranties, 
                expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, 
                implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement 
                of intellectual property or other violation of rights.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Further, Womanica does not warrant or make any representations concerning the accuracy, likely results, or 
                reliability of the use of the materials on its website or otherwise relating to such materials or on any 
                sites linked to this site.
              </p>
            </section>

            {/* Limitations */}
            <section className="bg-card rounded-2xl p-8 md:p-12 shadow-lg border border-border">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
                Limitations
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                In no event shall Womanica or its suppliers be liable for any damages (including, without limitation, damages 
                for loss of data or profit, or due to business interruption) arising out of the use or inability to use the 
                materials on Womanica's website, even if Womanica or a Womanica authorized representative has been notified 
                orally or in writing of the possibility of such damage.
              </p>
            </section>

            {/* Product Information */}
            <section className="bg-card rounded-2xl p-8 md:p-12 shadow-lg border border-border">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
                Product Information and Purchases
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                Womanica provides product information and links to products available on Amazon India. We do not sell 
                products directly. All purchases are made through Amazon India, and all transactions are subject to Amazon's 
                terms and conditions.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                We strive to provide accurate product information, but we do not guarantee the accuracy, completeness, 
                or timeliness of any product information, prices, or availability. Product prices and availability are 
                subject to change without notice.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Womanica is not responsible for:
              </p>
              <ul className="list-disc list-inside text-muted-foreground mt-3 space-y-2 ml-4">
                <li>The quality, safety, or legality of products sold on Amazon</li>
                <li>The accuracy of product descriptions or images</li>
                <li>The fulfillment of orders placed through Amazon</li>
                <li>Product returns, refunds, or customer service issues</li>
              </ul>
            </section>

            {/* Affiliate Disclosure */}
            <section className="bg-card rounded-2xl p-8 md:p-12 shadow-lg border border-border">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
                Affiliate Disclosure
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                Womanica is a participant in the Amazon Associates Program, an affiliate advertising program designed to 
                provide a means for sites to earn advertising fees by advertising and linking to Amazon.in.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                When you click on product links on our website and make a purchase on Amazon, we may receive a small 
                commission at no additional cost to you. This does not affect the price you pay for products.
              </p>
            </section>

            {/* User Conduct */}
            <section className="bg-card rounded-2xl p-8 md:p-12 shadow-lg border border-border">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
                User Conduct
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                You agree not to use the website to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Violate any applicable laws or regulations</li>
                <li>Infringe upon the rights of others</li>
                <li>Transmit any harmful or malicious code</li>
                <li>Attempt to gain unauthorized access to the website</li>
                <li>Interfere with or disrupt the website's operation</li>
                <li>Collect or store personal information about other users</li>
              </ul>
            </section>

            {/* Intellectual Property */}
            <section className="bg-card rounded-2xl p-8 md:p-12 shadow-lg border border-border">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
                Intellectual Property
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                All content on the Womanica website, including text, graphics, logos, images, and software, is the 
                property of Womanica or its content suppliers and is protected by copyright, trademark, and other 
                intellectual property laws. You may not use, reproduce, or distribute any content from this website without 
                our prior written permission.
              </p>
            </section>

            {/* Links to Other Websites */}
            <section className="bg-card rounded-2xl p-8 md:p-12 shadow-lg border border-border">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
                Links to Other Websites
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our website may contain links to third-party websites, including Amazon India. We are not responsible for 
                the content, privacy policies, or practices of any third-party websites. Your use of third-party websites 
                is at your own risk.
              </p>
            </section>

            {/* Modifications */}
            <section className="bg-card rounded-2xl p-8 md:p-12 shadow-lg border border-border">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
                Modifications
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Womanica may revise these Terms of Service at any time without notice. By using this website, you are 
                agreeing to be bound by the then current version of these Terms of Service.
              </p>
            </section>

            {/* Governing Law */}
            <section className="bg-card rounded-2xl p-8 md:p-12 shadow-lg border border-border">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
                Governing Law
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                These Terms of Service shall be governed by and construed in accordance with the laws of India, without 
                regard to its conflict of law provisions.
              </p>
            </section>

            {/* Contact Us */}
            <section className="bg-card rounded-2xl p-8 md:p-12 shadow-lg border border-border">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
                Contact Us
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                If you have any questions about these Terms of Service, please contact us through our contact page or 
                email us directly.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

