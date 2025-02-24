import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

export function TeamInfo() {
  const teamMember = [
    {
      quote:
        "The attention to detail and innovative features have completely transformed our workflow. This is exactly what we've been looking for.",
      name: "Ahmed Hashem",
      designation: "Software Engineer",
      src: "/images/team/he4a.jpg",
    },
    {
      quote:
        "Implementation was seamless and the results exceeded our expectations. The platform's flexibility is remarkable.",
      name: "Ahmed Wagih",
      designation: "Software Engineer",
      src: "/images/team/wagih.jpg",
    },
    {
      quote:
        "This solution has significantly improved our team's productivity. The intuitive interface makes complex tasks simple.",
      name: "Osama Mousa",
      designation: "Software Engineer",
      src: "/images/team/osos.jpg",
    },
    {
      quote:
        "Outstanding support and robust features. It's rare to find a product that delivers on all its promises.",
      name: "Eslam Mousa",
      designation: "Software Engineer",
      src: "/images/team/eslam.jpg",
    },
    {
      quote:
        "The scalability and performance have been game-changing for our organization. Highly recommend to any growing business.",
      name: "Ayman Shalaby",
      designation: "Software Engineer",
      src: "/images/team/shalapy.jpg",
    },
    {
      quote:
        "The scalability and performance have been game-changing for our organization. Highly recommend to any growing business.",
      name: "Ahmed Atteya",
      designation: "Software Engineer",
      src: "/images/team/atia.jpg",
    },
    {
      quote:
        "The scalability and performance have been game-changing for our organization. Highly recommend to any growing business.",
      name: "Ahmed Hany",
      designation: "Software Engineer",
      src: "/images/team/hany.jpg",
    },
  ];
  return (
    <div className="w-full h-full py-20">
      <h2 className="max-w-7xl text-white pl-4 mx-auto text-xl md:text-5xl font-bold font-sans">
        Meet Our Talented Engineers
      </h2>
      <AnimatedTestimonials testimonials={teamMember} />;
    </div>
  );
}
