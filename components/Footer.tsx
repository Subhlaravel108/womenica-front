import { Heart, Instagram, Facebook, Twitter, Youtube } from "lucide-react";

const AFFILIATE_TAG = "womanica-21";

const Footer = () => {
  const categories = [
    { name: "Sarees", search: "women+saree" },
    { name: "Fashion", search: "women+fashion" },
    { name: "Makeup", search: "women+makeup" },
    { name: "Beauty", search: "women+beauty" },
    { name: "Home Decor", search: "home+decor" },
    { name: "Kitchen", search: "kitchen+accessories" },
  ];

  const quickLinks = [
    { name: "About Us", href: "/about-us" },
    { name: "Contact", href: "#" },
    { name: "Blog", href: "/blog" },
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Terms of Service", href: "/terms-of-service" },
    { name: "Affiliate Disclosure", href: "/about-us#affiliate-disclosure" },
  ];

  return (
    <footer className="bg-foreground text-primary-foreground py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 xl:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <a href="#" className="flex items-center gap-2 mb-4">
              <Heart className="h-8 w-8 text-primary fill-primary" />
              <span className="font-display text-2xl font-bold">Womanica</span>
            </a>
            <p className="text-primary-foreground/70 mb-6">
              Your trusted destination for curated women's products from Amazon India. 
              We handpick the best deals for you.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="p-2 rounded-full bg-primary-foreground/10 hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="p-2 rounded-full bg-primary-foreground/10 hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="p-2 rounded-full bg-primary-foreground/10 hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="p-2 rounded-full bg-primary-foreground/10 hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Categories</h4>
            <ul className="space-y-3">
              {categories.map((category) => (
                <li key={category.name}>
                  <a
                    href={`https://www.amazon.in/s?k=${category.search}&tag=${AFFILIATE_TAG}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-foreground/70 hover:text-primary transition-colors"
                  >
                    {category.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-primary-foreground/70 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Affiliate Disclosure */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">
              Affiliate Disclosure
            </h4>
            <p className="text-primary-foreground/70 text-sm">
              Womanica is a participant in the Amazon Associates Program. 
              As an Amazon Associate, we earn from qualifying purchases. 
              Product prices and availability are accurate as of the date/time 
              indicated and are subject to change.
            </p>
          </div>
        </div>

        <div className="pt-8 border-t border-primary-foreground/20 text-center">
          <p className="text-primary-foreground/60 text-sm">
            © {new Date().getFullYear()} Womanica. All rights reserved. 
            Made with <Heart className="inline h-4 w-4 text-primary fill-primary" /> for women everywhere.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
