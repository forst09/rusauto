'use strict';

$(document).ready(function () {



    //ПОДКЛЮЧЕНИЕ СВАЙПЕРА ГЛАВНАЯ СТРАНИЦА ГЛАВНЫЙ ЭКРАН"
    const swiperMain = new Swiper('.swiper-main', {
        speed: 700,
        slidesPerView: 1,
        autoHeight: true,
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
        },
    });

    // ПОДКЛЮЧЕНИЕ СВАЙПЕРА В СЕКЦИИ НА ЭКРАНАХ >= 1024
    const pageWidth = document.documentElement.scrollWidth;
    if (pageWidth >= 1024) {

        //ГЛАВНАЯ СТРАНИЦА СЕКЦИЯ "ТРАНСПОРТНЫЕ КОМПАНИИ, С КОТОРЫМИ МЫ РАБОТАЕМ"
        const swiperCompanies = new Swiper('.swiper-companies', {
            speed: 700,
            slidesPerView: 'auto',
            mousewheel: {
                invert: true,
            },
            breakpoints: {

                1024: {
                    spaceBetween: 72,
                },

                1500: {
                    spaceBetween: 120,
                },
            }
        });

        //ГЛАВНАЯ СТРАНИЦА СЕКЦИЯ "НАШИ ПАРТНЕРЫ"
        const swiperPartners = new Swiper('.swiper-partners', {
            speed: 700,
            slidesPerView: 'auto',
            mousewheel: {
                invert: true,
            },
            breakpoints: {

                1024: {
                    spaceBetween: 72,
                },

                1500: {
                    spaceBetween: 120,
                },
            }
        });
    }
});



