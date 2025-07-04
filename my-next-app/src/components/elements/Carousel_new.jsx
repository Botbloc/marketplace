'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import {ProductContext} from '../../global_quantity/ProductContext';

const Carousel_new = () => {



    return(
        <Swiper
            modules={[Navigation]}
            spaceBetween={20}
            slidesPerView={3}
            navigation
            breakpoints={{
                640: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
                1280: { slidesPerView: 4 }
            }}
            >
            {products.map((item, index) => (
                <SwiperSlide key={index}>
                {//<ProductCard item={item} />
                }
                </SwiperSlide>
            ))}
        </Swiper>

    )
}

export default Carousel_new;