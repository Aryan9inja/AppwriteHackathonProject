import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Software Engineer",
    content: "Got my dream job after using this! The portfolio looked so professional.",
    rating: 5,
  },
  {
    name: "Marcus Rodriguez",
    role: "UX Designer",
    content: "Created my portfolio in 5 minutes. Absolutely amazing tool for job hunting.",
    rating: 5,
  },
  {
    name: "Emily Johnson",
    role: "Data Scientist",
    content: "The AI perfectly captured my experience. Highly recommend to everyone!",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Loved by Professionals
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of professionals who've landed their dream jobs
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 border border-border/50 
                         shadow-lg hover:shadow-xl hover:border-primary/30
                         animate-in fade-in slide-in-from-bottom-6 duration-500"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {/* Stars */}
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-warning fill-current" />
                ))}
              </div>

              {/* Content */}
              <p className="text-muted-foreground mb-4 leading-relaxed">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div>
                <p className="font-semibold text-foreground">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
