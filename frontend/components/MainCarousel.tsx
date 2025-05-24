import Link from "next/link";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

const imageSources = [
  { src: "/images/HomeCarousel/HomeCarousel1.jpg", alt: "Slide 1" },
  { src: "/images/HomeCarousel/HomeCarousel2.webp", alt: "Slide 2" },
  { src: "/images/HomeCarousel/HomeCarousel3.webp", alt: "Slide 3" },
];

const items = imageSources.map((image, index) => (
  <Link key={index} href="/best-deals">
    <img
      src={image.src}
      alt={image.alt}
      className="w-full h-[68vh] object-center"
    />
  </Link>
));

const MainCarousel = () => (
  <AliceCarousel
    mouseTracking
    items={items}
    autoPlay={true}
    autoPlayInterval={2000}
    infinite
    disableButtonsControls
  />
);

export default MainCarousel;