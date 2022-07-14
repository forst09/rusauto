'use strict';

$(document).ready(function () {

    //ПОИСК НА 1024 В ШАПКЕ
    $(document).on('input', '.header-bottom__search-input', function () {
        $('.header-bottom__search-result').addClass('active');
    });

    // $(document).on('click', '.header__input-reset-label', function () {
    //     $('.header__input-search').removeClass('active');
    //     $('.header .work').removeClass('active');
    //     $('.header .search__result').removeClass('active');
    //     $('.header__form-search-wrapper').removeClass('active');
    // });

    //ЗАКРЫТИЕ ПОИСКА НА 1024 В ШАПКЕ
    $(document).on('blur', '.header-bottom__search-input', function () {
        $('.header-bottom__search-result').removeClass('active');
        $(this).val('');
    });

    //ПОДКЛЮЧЕНИЕ СВАЙПЕРА ГЛАВНАЯ СТРАНИЦА ГЛАВНЫЙ ЭКРАН
    const swiperMain = new Swiper('.swiper-main', {
        speed: 700,
        slidesPerView: 1,
        autoHeight: true,
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true,
        },
    });

    $('.btn-main').on('mousedown touchstart pointerdown', function (e) {
        e.stopPropagation();
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



