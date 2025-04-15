import { motion } from "framer-motion";

export const Banner = () => {
  return (
    <section className="bg-black w-full py-12 border-y border-white/10 select-none">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <motion.div 
          className="w-full p-9 flex relative items-center justify-center border rounded-xl px-8 border-white/20 bg-black my-12 shadow-[0px_0px_107px_0px_rgba(59,_130,_246,_0.5)]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="w-full flex flex-col md:flex-row gap-12 items-center justify-between">
            <motion.div 
              className="flex flex-col gap-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-7xl font-semibold text-muted tracking-tight leading-tight">
                <motion.span 
                  className="block"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  This site
                </motion.span>
                <motion.span 
                  className="block"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                  viewport={{ once: true }}
                >
                  lives on my
                </motion.span>
                <motion.span 
                  className="text-white font-bold block"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.7 }}
                  viewport={{ once: true }}
                >
                  Ubuntu server.
                </motion.span>
              </h2>
              <div className="flex justify-start items-center gap-2">
                <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.9 }}
                viewport={{ once: true }}
                className="text-muted max-w-3xl text-lg md:text-xl lg:text-3xl leading-relaxed">
                  I have practical experience with Linux and distributed deployment workflows.
                </motion.p>
              </div>
            </motion.div>
            
            {/* Mock Terminal */}
            <motion.div 
              className="w-full md:w-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="bg-black rounded-lg overflow-hidden border border-white/10 shadow-lg">
                <div className="bg-white/10 px-4 py-2 flex items-center">
                  <div className="flex space-x-2">
                    <motion.div 
                      className="w-3 h-3 bg-red-500 rounded-full"
                      whileHover={{ scale: 1.2 }}
                    />
                    <motion.div 
                      className="w-3 h-3 bg-yellow-500 rounded-full"
                      whileHover={{ scale: 1.2 }}
                    />
                    <motion.div 
                      className="w-3 h-3 bg-green-500 rounded-full"
                      whileHover={{ scale: 1.2 }}
                    />
                  </div>
                </div>
                <div className="p-4 font-mono text-white text-xs md:text-sm whitespace-pre-wrap h-full">
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ staggerChildren: 0.1, delayChildren: 0.6 }}
                    viewport={{ once: true }}
                  >
                    {["Welcome to Ubuntu 24.10 (GNU/Linux 6.11.0-19-generic x86_64)", 
                      "",
                      "  System load:        0.04",
                      "  Usage of /:         32.9% of 97.87GB",
                      "  Memory usage:       26%",
                      "  Swap usage:         10%",
                      "  Temperature:        65.0 C",
                      "  Processes:          212",
                      ""
                    ].map((line, i) => (
                      <motion.p 
                        key={i}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.6 + (i * 0.1) }}
                        className={line === "" ? "mt-2" : ""}
                      >
                        {line}
                      </motion.p>
                    ))}
                    <motion.p 
                      className="text-green-400 inline-flex"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: 1.5 }}
                    >
                      <span className="text-green-500 font-bold">np@</span>
                      <span className="text-green-500 font-bold blur-[2px]">HOSTNAME</span>
                      <span className="text-white">:</span>
                      <span className="text-blue-500">~</span>
                      <span className="text-white">$ </span>
                    </motion.p>
                    <motion.span 
                      className="inline-block animate-pulse"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: 1.6 }}
                    >
                      |
                    </motion.span>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};