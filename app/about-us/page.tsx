import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { contactInfo } from "@/lib/global_variables";

export const metadata: Metadata = {
  title: `About Us - ${contactInfo.websiteName}`,
  description: "Learn about Womenica - your trusted destination for curated women's products from Amazon India.",
};

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 xl:px-12 py-12 md:py-16">
          {/* Hero Section */}
          <div className="text-center mb-12 md:mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6">
              About Womenica
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Your trusted destination for handpicked women's products from Amazon India
            </p>
          </div>

          {/* Main Content */}
          <div className="max-w-4xl mx-auto space-y-8 md:space-y-12">
            {/* Mission Section */}
            <section className="bg-card rounded-2xl p-8 md:p-12 shadow-lg border border-border">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                At Womenica, we believe that every woman deserves access to quality products that enhance her lifestyle. 
                Our mission is to curate and showcase the best products available on Amazon India, making it easier for 
                you to discover items that truly matter.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We carefully handpick products across categories like fashion, beauty, home decor, kitchen essentials, 
                and more, ensuring that you only see items that meet our high standards for quality and value.
              </p>
            </section>

            {/* What We Do Section */}
            <section className="bg-card rounded-2xl p-8 md:p-12 shadow-lg border border-border">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
                What We Do
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">Product Curation</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Our team spends countless hours researching and testing products to bring you only the best options. 
                    We consider factors like quality, customer reviews, value for money, and overall user satisfaction.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">Best Deals</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    We keep an eye on prices and promotions, helping you find the best deals on products you love. 
                    Our goal is to help you save money while getting the quality you deserve.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">Trusted Recommendations</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Every product featured on Womenica has been carefully selected. We provide honest recommendations 
                    and detailed information to help you make informed purchasing decisions.
                  </p>
                </div>
              </div>
            </section>

            {/* Values Section */}
            <section className="bg-card rounded-2xl p-8 md:p-12 shadow-lg border border-border">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
                Our Values
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-muted/50 rounded-xl">
                  <h3 className="text-xl font-semibold text-foreground mb-3">Quality First</h3>
                  <p className="text-muted-foreground">
                    We prioritize quality over quantity. Every product we feature meets our strict quality standards.
                  </p>
                </div>
                <div className="p-6 bg-muted/50 rounded-xl">
                  <h3 className="text-xl font-semibold text-foreground mb-3">Transparency</h3>
                  <p className="text-muted-foreground">
                    We believe in being transparent about our affiliate relationships and always put your interests first.
                  </p>
                </div>
                <div className="p-6 bg-muted/50 rounded-xl">
                  <h3 className="text-xl font-semibold text-foreground mb-3">Customer Focus</h3>
                  <p className="text-muted-foreground">
                    Your satisfaction is our priority. We're committed to helping you find products that truly meet your needs.
                  </p>
                </div>
                <div className="p-6 bg-muted/50 rounded-xl">
                  <h3 className="text-xl font-semibold text-foreground mb-3">Continuous Improvement</h3>
                  <p className="text-muted-foreground">
                    We constantly work to improve our curation process and expand our product selection to serve you better.
                  </p>
                </div>
              </div>
            </section>

            {/* Affiliate Disclosure */}
            <section className="bg-card rounded-2xl p-8 md:p-12 shadow-lg border border-border">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
                Affiliate Disclosure
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Womenica is a participant in the Amazon Associates Program, an affiliate advertising program designed 
                to provide a means for sites to earn advertising fees by advertising and linking to Amazon.in.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                When you click on our product links and make a purchase, we may receive a small commission at no 
                additional cost to you. This helps us maintain our website and continue providing you with quality 
                product recommendations. Rest assured, our affiliate relationships do not influence our product 
                selection or reviews - we only recommend products we genuinely believe in.
              </p>
            </section>

            {/* Contact Section */}
            <section className="bg-card rounded-2xl p-8 md:p-12 shadow-lg border border-border text-center">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
                Get in Touch
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Have questions, suggestions, or feedback? We'd love to hear from you!
              </p>
              <p className="text-muted-foreground">
                Feel free to reach out to us through our contact page or social media channels.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}





