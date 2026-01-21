import React, { useState, useEffect, useCallback } from "react";

const reviews = [
  {
    id: 1,
    name: "Sathya",
    text: "Best team to deliver my business website on time and with lots of ideas to enhance it.",
    link: "https://maps.app.goo.gl/RE3HumqkXnB9uSE6A",
  },
  {
    id: 2,
    name: "Trendy Logic Solutions",
    text: "We highly recommend Cady Infotech for their thorough and efficient background check services. Their attention to detail and quick turnaround time have been invaluable in our hiring process. Trustworthy and professional !",
    link: "https://maps.app.goo.gl/TK2R1ZQNmMxFdxeN9",
  },
  {
    id: 3,
    name: "Ka Shanmugams",
    text: "We are extremely happy with the website that Cady Infotech have created for us. It is visually appealing, clean, easy to navigate and responsive. Thanks to the team.",
    link: "https://maps.app.goo.gl/MbStiwNMwp8hbEfF7",
  },
  {
    id: 4,
    name: "Triple Point Interactive Learning Solutions",
    text: "Working with Cady Infotech has been an absolute pleasure. Their team's professionalism, creativity, and attention to detail surpassed our expectations. They crafted a sleek and functional website that truly reflects our brand identity. Thank you for your outstanding work!",
    link: "https://maps.app.goo.gl/sAkvhKixbbDxwSYj8",
  },
  {
    id: 5,
    name: "Arjun Shankar",
    text: "From the initial consultation to the final launch, Cady Infotech demonstrated unwavering dedication to my cause. Their expertise in web design and development ensured that every aspect of the website was not only visually stunning but also highly functional and user-friendly.",
    link: "https://maps.app.goo.gl/P7kdAxx1hWD8hJ6m9",
  },
  {
    id: 6,
    name: "Manjula Mohan",
    text: "Working with Cady Infotech on my personal website was a fantastic experience. They captured my vision perfectly, ensuring the design was both visually appealing and user-friendly.",
    link: "https://maps.app.goo.gl/aDGrk9zArZntEouh8",
  },
];

const GoogleReviews = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setVisibleItems(1);
      else if (window.innerWidth < 1024) setVisibleItems(2);
      else setVisibleItems(3);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = reviews.length - visibleItems;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <div className="w-full max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 font-sans">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white shadow-md rounded-lg flex items-center justify-center p-2">
            <svg viewBox="0 0 24 24" className="w-full h-full">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.27z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-800">Google Reviews</h3>
          </div>
        </div>

        {/* ✅ ONLY NEW BUTTON ADDED */}
        <a
          href="https://www.google.com/maps/place/Cady+Infotech/@9.9302196,78.0999758,17z/data=!4m8!3m7!1s0x689784a46d31942d:0x79d966eee2a01fc5!8m2!3d9.9302196!4d78.0999758!9m1!1b1!16s%2Fg%2F11vwt9jxrl?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoASAFQAw%3D%3D"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#3498db] hover:bg-[#3498db] text-white px-6 py-2.5 rounded shadow-md transition-all font-medium text-sm"
        >
          Reviews us on Google
        </a>
      </div>

      {/* SLIDER (UNTOUCHED) */}
      <div className="relative border-t border-b border-gray-100 py-10 bg-[#F4FBFE]/30 px-10">
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / visibleItems)}%)`,
            }}
          >
            {reviews.map((review) => (
              <div
                key={review.id}
                className="flex-shrink-0 px-3"
                style={{ width: `${100 / visibleItems}%` }}
              >
                <div className="bg-white border border-[#3498db] rounded-lg p-6 h-full flex flex-col items-center text-center shadow-sm min-h-[250px]">
                  <span className="text-xl font-bold text-gray-800 mb-4">
                    {review.name}
                  </span>

                  <p className="text-gray-600 text-sm italic mb-6">
                    "{review.text}"
                  </p>

                  <a
                    href={review.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto text-[#3498db] font-bold text-sm hover:underline"
                  >
                    View Review
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoogleReviews;
