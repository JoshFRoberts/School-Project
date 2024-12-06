<template>
    <div class="product-slider">
        <Swiper :slides-per-view="4" :space-between="20" :loop="false" navigation>
            <SwiperSlide v-for="(product, index) in products" :key="index">
                <div class="product-card">
                    <img :src="product.image" :alt="product.name" />
                    <h3>{{ product.name }}</h3>
                    <p>{{ product.price }}</p>
                </div>
            </SwiperSlide>
        </Swiper>
    </div>
</template>


<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/swiper-bundle.css";

export default {
    components: {
        Swiper,
        SwiperSlide,
    },
    data() {
        return {
            products: [
                {
                    name: "Talahon Tasche",
                    price: "10€",
                    image: new URL("@/assets/images/product1.svg", import.meta.url).href,
                },
                {
                    name: "Talahon Fortbewegungsmittel",
                    price: "20€",
                    image: new URL("@/assets/images/product2.svg", import.meta.url).href,
                },
                {
                    name: "Talahon Kopfschutz",
                    price: "30€",
                    image: new URL("@/assets/images/product3.svg", import.meta.url).href,
                },
                {
                    name: "Talahon Anzug",
                    price: "40€",
                    image: new URL("@/assets/images/product4.svg", import.meta.url).href,
                },
            ],
        };
    },
};
</script>


<style>
.product-slider {
    width: 80%;
    margin: 0 auto;
}

.product-card {
    text-align: center;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    background-color: #f9f9f9;
}

.product-card img {
    width: 100%;
    height: auto;
    border-radius: 5px;
}
</style>
