import { Navbar } from "@/features/landing/navbar";
import { Typography } from "@/components/ui/typography";
import { Home } from "@/features/landing/home";
import { AboutUs } from "@/features/landing/about-us";
import { Shop } from "@/features/landing/shop";
import { Faq } from "@/features/landing/FAQ";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export function Landing() {
  const faqRef = useRef<HTMLElement>(null);
  const testyRef = useRef<HTMLElement>(null);
  const pricRef = useRef<HTMLElement>(null);
  const featureRef = useRef<HTMLElement>(null);

  const scrollToRef = (ref: React.RefObject<HTMLElement>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <Navbar
        scrollToRef={scrollToRef}
        featureRef={featureRef}
        testyRef={testyRef}
        pricRef={pricRef}
        faqRef={faqRef}
      />

      <section
        className="hero-section relative py-16 px-4 w-full h-[700px] bg-fixed"
        style={{
          backgroundImage:
            "url('https://www.blibli.com/friends-backend/wp-content/uploads/2023/05/B400294-Cover-Apa-Perbedaan-Fashion-dan-Style-1.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "top",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>{" "}
        {/* Tint layer */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent opacity-50"></div>
        <div className="flex flex-col justify-center items-center relative z-10 text-white h-full text-center">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <Typography
              variant="h1"
              className="text-5xl md:text-6xl font-bold mb-6 mt-12 leading-tight"
              style={{
                fontFamily: "Anton SC, sans-serif",
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
              }}
            >
              LAKOE
              <br />
              <span className="text-yellow-400">Discover what you love</span>
            </Typography>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <Link to="/store">
              <Button
                variant={"lakoePrimary"}
                className="mt-4 px-6 py-3 rounded-lg text-white hover:bg-blue-800 transition-all duration-300"
              >
                Get Started
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="text-center mb-8">
          <Typography
            variant="h2"
            className="text-2xl font-bold mb-4 border-none"
          >
            Our Top Picks
          </Typography>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div className="relative">
            <img
              src="https://img.lazcdn.com/g/p/70fd25754fa456662a1ca26aa7845504.jpg_720x720q80.jpg"
              alt="Product 1"
              className="w-full h-[200px] object-cover"
            />
            <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 p-2 text-white">
              <Typography variant="h3" className="text-sm font-semibold">
                Aksesoris Wanita
              </Typography>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://www.prodirectsoccerindonesia.com/image/cache/catalog/Asics-undefined/Sepatu-bola-asics-1-2-550x550w.jpg"
              alt="Product 2"
              className="w-full h-[200px] object-cover"
            />
            <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 p-2 text-white">
              <Typography variant="h3" className="text-sm font-semibold">
                Sport
              </Typography>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://dynamic.zacdn.com/0Z8y3NV2lcUFZ-w5d_t93BYd66k=/filters:quality(70):format(webp)/https://static-id.zacdn.com/p/dzargo-2257-4370663-1.jpg"
              alt="Product 3"
              className="w-full h-[200px] object-cover"
            />
            <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 p-2 text-white">
              <Typography variant="h3" className="text-sm font-semibold">
                Style Pria
              </Typography>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://dibimbing-cdn.sgp1.cdn.digitaloceanspaces.com/1693586160053-10-Rekomendasi-Laptop-Terbaik-untuk-Data-Analyst-2023.webp"
              alt="Product 4"
              className="w-full h-[200px] object-cover"
            />
            <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 p-2 text-white">
              <Typography variant="h3" className="text-sm font-semibold">
                Teknologi
              </Typography>
            </div>
          </div>
        </div>
      </section>

      <section ref={featureRef} className="features-section py-10 px-4">
        <Home />
      </section>

      <section ref={testyRef} className="testimonials-section py-16 px-4">
        <Shop />
      </section>

      <section ref={pricRef} className="pricing-section py-16 px-4">
        <Faq />
      </section>

      <section ref={faqRef} className="faq-section py-16 px-4">
        <AboutUs />
      </section>

      <footer className="footer bg-gray-200 py-8 px-4 text-center">
        <p>© 2024 Lakoe. All rights reserved.</p>
        <div className="social-media-links mt-4">
          <a href="#" className="mx-2">
            Facebook
          </a>
          <a href="#" className="mx-2">
            Twitter
          </a>
          <a href="#" className="mx-2">
            Instagram
          </a>
        </div>
      </footer>
    </div>
  );
}
