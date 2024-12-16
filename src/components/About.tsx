import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Shield, Code2, Bug } from 'lucide-react';

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-20 bg-black text-green-500" id="about">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-mono mb-8 flex items-center">
            <Shield className="mr-4" />
            ABOUT ME
          </h2>
          
          <div className="text-lg md:text-xl font-mono mb-8 text-green-400 italic">
            "Security involves a different way of looking at problems that no one's thought of"
          </div>

          <div className="space-y-6 text-gray-300 leading-relaxed">
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.3 }}
            >
              Passionate about computer security since my youth, it has continued to grow over the years, transforming this passion into a career.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6 }}
              className="flex items-start space-x-4"
            >
              <Code2 className="mt-1 flex-shrink-0" />
              <p>
                An open-source enthusiast, blockchain developer, and cybersecurity researcher with an interest in IoT devices, I enjoy reversing programs, finding bugs, and understanding the logic of other developers' code, which represents new ways of thinking for me.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.9 }}
              className="flex items-start space-x-4"
            >
              <Bug className="mt-1 flex-shrink-0" />
              <p>
                When I'm not writing code that breaks codes, you'll find me playing table tennis in the neighborhood, creating innovative projects with my 3D printer, or exploring new areas in Japan.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;