import { motion } from "framer-motion";
import { fadeInUp, hoverScale } from "@/lib/animations";

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

export default function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <motion.div
      className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
      variants={fadeInUp}
      whileHover={hoverScale}
    >
      <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mb-4">
        <i className={`bx ${icon} text-2xl text-primary-500`}></i>
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
}
