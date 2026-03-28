import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";

interface TestimonialCardProps {
  text: string;
  organization: string;
  department: string;
}

export default function TestimonialCard({ text, organization, department }: TestimonialCardProps) {
  // Create organization initials
  const initials = organization
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .substring(0, 2);
    
  return (
    <motion.div 
      className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full border border-gray-100 group"
      variants={fadeInUp}
      whileHover={{ 
        scale: 1.03, 
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
      }}
    >
      <div className="flex items-start mb-4">
        <i className="bx bxs-quote-alt-left text-3xl text-primary-300"></i>
      </div>
      
      <p className="text-gray-600 mb-6 flex-grow italic leading-relaxed text-sm">"{text}"</p>
      
      <div className="flex items-center pt-4 border-t border-gray-100">
        <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center text-primary-700 font-semibold mr-3 border border-primary-100">
          {initials}
        </div>
        <div>
          <h4 className="font-semibold text-gray-900">{organization}</h4>
          <p className="text-sm text-gray-500">{department}</p>
        </div>
      </div>
    </motion.div>
  );
}
