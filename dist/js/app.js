'use strict';

$(document).ready(function () {

    // ОТКЛЮЧЕНИЕ ZOOM ЧЕРЕЗ СКРОЛЛ (В ТОМ ЧИСЛЕ ТРЕКАПАДАМИ В MACOS)
    document.addEventListener('mousewheel', function (e) {
        if (!e.ctrlKey && !e.metaKey) return;

        e.preventDefault();
        e.stopImmediatePropagation();
    }, { passive: false });

    // ОТКЛЮЧЕНИЕ ZOOM ПРИКОСНОВЕНИЯМИ (В ТОМ ЧИСЛЕ ТРЕКАПАДАМИ И Т.П.) В SAFARI И IOS
    document.addEventListener('gesturestart', function (e) {
        e.preventDefault();
        e.stopImmediatePropagation();
    }, { passive: false });

    // ОТКЛЮЧЕНИЕ ZOOM ЧЕРЕЗ КЛАВИАТУРУ (CTRL + "+", CTRL + "-")
    // КНОПКИ БРАУЗЕРА ДЛЯ УПРАВЛЕНИЯ ZOOM ОТКЛЮЧЕНЫ НЕ БУДУТ
    document.addEventListener('keydown', function (e) {
        if (!e.ctrlKey && !e.metaKey) return;
        if (e.keyCode != 189 && e.keyCode != 187) return;

        e.preventDefault();
        e.stopImmediatePropagation();
    }, { passive: false });

    //ОТКРЫТИЕ МОБИЛЬНОГО МЕНЮ
    $(document).on('click', '.header-bottom__burger', function () {
        $('.mobile-menu').addClass('active');
        $('body').addClass('scroll-hide');
    });

    //ЗАКРЫТИЕ МОБИЛЬНОГО МЕНЮ
    $(document).on('click', '.header-bottom__request-close', function () {
        $('.mobile-menu').removeClass('active');
        $('body').removeClass('scroll-hide');
    });

    //ПОИСК НА 1024 В ШАПКЕ
    $(document).on('input', '.header-bottom__search-input', function () {
        $(this).parents('.header-bottom__search').find('.header-bottom__search-result').addClass('active');
        $(this).parents('.header-bottom__search').find('.header-bottom__search-close').addClass('active');
    });

    //ЗАКРЫТИЕ ПОИСКА НА 1024 В ШАПКЕ
    $(document).on('blur', '.header-bottom__search-input', function () {
        $(this).parents('.header-bottom__search').find('.header-bottom__search-result').removeClass('active');
        $(this).parents('.header-bottom__search').find('.header-bottom__search-close').removeClass('active');
        $(this).val('');
    });

    //ФИКСИРОВАННАЯ ШАПКА НА СКРОЛЛЕ 
    let header = document.querySelector('.header');
    let headerFix = document.querySelector('.header-fixed');
    let headerHeight = header.clientHeight + 200;
    document.onscroll = function () {
        let scroll = window.scrollY;

        if (scroll > headerHeight) {
            headerFix.classList.add('active');
        }
        else {
            headerFix.classList.remove('active');
        }
    };

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

    //ВОЗМОЖНОСТЬ КЛИКАТЬ ПО КНОПКЕ ГЛАВНОЙ СТРАНИЦЫ ГЛАВНОГО ЭКРАНА
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



