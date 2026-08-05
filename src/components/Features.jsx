import { motion } from "framer-motion";
import features from "../utils/features";

const Features = () => {
  return (
    <div className="py-12 sm:py-16 px-6 sm:px-10 max-w-7xl mx-auto overflow-hidden">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-wide uppercase text-white/90 text-center mb-12 sm:mb-16"
        style={{ fontFamily: "'Outfit', sans-serif" }}
      >
        WHY CHOOSE GALLERY X?
      </motion.h2>

      <div className="flex flex-col gap-14 sm:gap-20">
        {features.map((feature, index) => {
          const isReversed = index % 2 !== 0;

          const textInitialX = isReversed ? 80 : -80;
          const imageInitialX = isReversed ? -80 : 80;

          return (
            <div
              key={index}
              className={`flex flex-col ${isReversed ? "lg:flex-row-reverse" : "lg:flex-row"
                } items-center gap-10 lg:gap-20`}
            >
              <motion.div
                initial={{ opacity: 0, x: textInitialX }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                className="flex-1 w-full text-left"
              >
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-wider uppercase leading-tight text-white/90">
                  {feature.title}
                </h3>
                <p
                  className="mt-6 sm:mt-8 text-4 sm:text-base text-white/40 font-normal tracking-wide leading-relaxed"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  {feature.description}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: imageInitialX }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                className="flex-1 w-full flex justify-center"
              >
                <div className="relative w-full rounded-[2.5rem] overflow-hidden">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-auto object-cover rounded-[2.5rem] opacity-80"
                    style={{
                      WebkitMaskImage: "radial-gradient(ellipse 82% 78% at center, black 35%, transparent 88%)",
                      maskImage: "radial-gradient(ellipse 82% 78% at center, black 35%, transparent 88%)",
                    }}
                  />
                  <div
                    className="absolute inset-0 rounded-[2.5rem] pointer-events-none"
                    style={{
                      background: "radial-gradient(ellipse 82% 78% at center, transparent 30%, #09090b 95%)",
                    }}
                  />
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Features;
