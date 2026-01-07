import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { contactInfo } from "@/lib/global_variables";

export const metadata: Metadata = {
  title: `Privacy Policy - ${contactInfo.websiteName}`,
  description: "Read Womenica's privacy policy to understand how we collect, use, and protect your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 xl:px-12 py-12 md:py-16">
          {/* Hero Section */}
          <div className="text-center mb-12 md:mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6">
              Privacy Policy
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
                Introduction
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                At Womenica ("we," "our," or "us"), we are committed to protecting your privacy. This Privacy Policy 
                explains how we collect, use, disclose, and safeguard your information when you visit our website.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, 
                please do not access the site.
              </p>
            </section>

            {/* Information We Collect */}
            <section className="bg-card rounded-2xl p-8 md:p-12 shadow-lg border border-border">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
                Information We Collect
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">Information You Provide</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    We may collect information that you voluntarily provide to us when you:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground mt-3 space-y-2 ml-4">
                    <li>Subscribe to our newsletter</li>
                    <li>Contact us through our contact form</li>
                    <li>Leave comments or feedback</li>
                    <li>Participate in surveys or promotions</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">Automatically Collected Information</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    When you visit our website, we may automatically collect certain information about your device, 
                    including information about your web browser, IP address, time zone, and some of the cookies that 
                    are installed on your device.
                  </p>
                </div>
              </div>
            </section>

            {/* How We Use Your Information */}
            <section className="bg-card rounded-2xl p-8 md:p-12 shadow-lg border border-border">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
                How We Use Your Information
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Provide, maintain, and improve our website</li>
                <li>Send you newsletters and marketing communications (with your consent)</li>
                <li>Respond to your comments, questions, and requests</li>
                <li>Monitor and analyze trends, usage, and activities</li>
                <li>Detect, prevent, and address technical issues</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            {/* Cookies and Tracking Technologies */}
            <section className="bg-card rounded-2xl p-8 md:p-12 shadow-lg border border-border">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
                Cookies and Tracking Technologies
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                We use cookies and similar tracking technologies to track activity on our website and hold certain 
                information. Cookies are files with a small amount of data which may include an anonymous unique identifier.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, 
                if you do not accept cookies, you may not be able to use some portions of our website.
              </p>
            </section>

            {/* Third-Party Services */}
            <section className="bg-card rounded-2xl p-8 md:p-12 shadow-lg border border-border">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
                Third-Party Services
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                Our website may contain links to third-party websites and services. We are not responsible for the privacy 
                practices of these third parties. We encourage you to read their privacy policies.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We use third-party services such as:
              </p>
              <ul className="list-disc list-inside text-muted-foreground mt-3 space-y-2 ml-4">
                <li>Google Analytics for website analytics</li>
                <li>Amazon Associates Program for affiliate links</li>
                <li>Email service providers for newsletter delivery</li>
              </ul>
            </section>

            {/* Data Security */}
            <section className="bg-card rounded-2xl p-8 md:p-12 shadow-lg border border-border">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
                Data Security
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We implement appropriate technical and organizational security measures to protect your personal information. 
                However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot 
                guarantee absolute security.
              </p>
            </section>

            {/* Your Rights */}
            <section className="bg-card rounded-2xl p-8 md:p-12 shadow-lg border border-border">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
                Your Rights
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                Depending on your location, you may have certain rights regarding your personal information, including:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>The right to access your personal information</li>
                <li>The right to rectify inaccurate information</li>
                <li>The right to request deletion of your information</li>
                <li>The right to object to processing of your information</li>
                <li>The right to data portability</li>
                <li>The right to withdraw consent</li>
              </ul>
            </section>

            {/* Children's Privacy */}
            <section className="bg-card rounded-2xl p-8 md:p-12 shadow-lg border border-border">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
                Children's Privacy
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our website is not intended for children under the age of 13. We do not knowingly collect personal 
                information from children under 13. If you are a parent or guardian and believe your child has provided 
                us with personal information, please contact us.
              </p>
            </section>

            {/* Changes to This Policy */}
            <section className="bg-card rounded-2xl p-8 md:p-12 shadow-lg border border-border">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
                Changes to This Privacy Policy
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new 
                Privacy Policy on this page and updating the "Last updated" date. You are advised to review this Privacy 
                Policy periodically for any changes.
              </p>
            </section>

            {/* Contact Us */}
            <section className="bg-card rounded-2xl p-8 md:p-12 shadow-lg border border-border">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
                Contact Us
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us through our contact page or 
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





