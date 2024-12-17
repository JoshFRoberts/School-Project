<template>
    <div class="product-slider" :style="styleObject">
        <Swiper :slides-per-view="4" :space-between="20" :loop="false" navigation>
            <SwiperSlide v-for="(product, index) in products" :key="index">
                <div class="product-card">
                    <img :src="product.image" :alt="product.name" />
                    <h3 class="product-name">{{ product.name }}</h3>
                    <p class="product-price">{{ product.price }}</p>
                </div>
            </SwiperSlide>
        </Swiper>
    </div>
</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/swiper-bundle.css";
import productImage from "@/assets/images/beispielprodukt.svg";

export default {
    components: {
        Swiper,
        SwiperSlide,
    },
    props: {
        nameColor: {
            type: String,
            default: "#000",
        },
        priceColor: {
            type: String,
            default: "#555",
        },
    },
    computed: {
        styleObject() {
            return {
                "--name-color": this.nameColor,
                "--price-color": this.priceColor,
            };
        },
    },
    data() {
        return {
            products: [
                { name: "3D Spielfigur Erweiterungsset 1", price: "10€", image: productImage },
                { name: "3D Spielfigur Erweiterungsset 2", price: "20€", image: productImage },
                { name: "Spielfeld-Erweiterung", price: "30€", image: productImage },
                { name: "Oster-Deko Set "Hase", price: "40€", image: productImage },
                { name: "Oster-Deko Set "Ei")", price: "400€", image: productImage },
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

.product-name {
    color: var(--name-color, #000);
}

.product-price {
    color: var(--price-color, #555);
}
</style>
