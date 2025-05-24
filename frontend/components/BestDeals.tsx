import React, { useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import ProductCard from "./ProductCard";
import Link from "next/link";
import BestDealsData from "../data/BestDealsData"; 

const FeaturedProductsSection = () => {
	const [activeIndex, setActiveIndex] = useState(0);
	const sliderRef = React.useRef(null);

	const handlePrev = () => {
		sliderRef.current.slidePrev();
	};

	const handleNext = () => {
		sliderRef.current.slideNext();
	};

	const handleSlideChanged = (e: { item: number }) => {
		setActiveIndex(e.item);
	};

	const carouselItems = BestDealsData.slice(0,8).map((product) => (
		<ProductCard key={product.id} product={product} />
	));

	return (
		<section className="container mx-auto py-16">
			<h2 className="text-2xl font-bold text-gray-800 mb-8">Best Deals</h2>
			<div className="relative">
				<AliceCarousel
					mouseTracking
					items={carouselItems}
					responsive={{
						0: { items: 1 },
						768: { items: 2.5 },
						1024: { items: 3.5 },
						1280: { items: 4.5 },
					}}
					disableDotsControls
					disableButtonsControls
					ref={sliderRef}
					onSlideChanged={handleSlideChanged}
				/>

				{activeIndex > 0 && (
					<button
						onClick={handlePrev}
						className="absolute top-1/2 -left-14 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-md cursor-pointer"
					>
						&#8592;
					</button>
				)}
				
				{/* 8-4 is only correct for larger viewports */}
				{activeIndex < 8 - 4 && (
					<button
						onClick={handleNext}
						className="absolute top-1/2 -right-14 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-md cursor-pointer"
					>
						&#8594;
					</button>
				)}
			</div>
			<div className="flex justify-center">
				<Link
					href="/best-deals"
					className="mt-6 inline-block px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-300"
				>
					Explore Now
				</Link>
			</div>
		</section>
	);
};

export default FeaturedProductsSection;
