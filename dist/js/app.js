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

    //ОТКРЫТИЕ МОДАЛЬНОГО КАТАЛОГА
    $(document).on('click', '.catalog-modal__btn', function () {
        $('.catalog-modal').addClass('active');
        $('body').addClass('scroll-hide');
    });

    //ЗАКРЫТИЕ МОДАЛЬНЫХ ОКОН
    $(document).on('click', '.close', function () {
        $(this).parents('.modal').removeClass('active');
        $('body').removeClass('scroll-hide');
    });
    // $(document).on('click', '.header-bottom__request-close', function () {
    //     $('.mobile-menu').removeClass('active');
    //     $('body').removeClass('scroll-hide');
    // });

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
    if ($(window).width() >= 1024) {
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
    // map init
    const jsMap = document.querySelector("#map");
    const renderMap = function () {
        if ($("#map").length !== 0) {
            ymaps.ready(function () {
                let myMap = new ymaps.Map("map", {
                    center: [$(jsMap).attr("data-coords").split(",")[0],
                    $(jsMap).attr("data-coords").split(",")[1]],
                    zoom: $(window).width() > 667 ? 17 : 14,
                }),
                    // Создаём макет содержимого.
                    MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
                        '<div class="icon-map">$[properties.iconContent]</div>'
                    ),
                    myPlacemarkWithContent = new ymaps.Placemark(
                        [$(jsMap).attr("data-coords").split(",")[0],
                        $(jsMap).attr("data-coords").split(",")[1]],
                        {},
                        {
                            // Опции.
                            // Необходимо указать данный тип макета.
                            iconLayout: "default#imageWithContent",
                            // Своё изображение иконки метки.
                            iconImageHref: "/upload/imgs_new/map-icon.png",
                            // Размеры метки.
                            iconImageSize: [150, 68],
                            // Смещение левого верхнего угла иконки относительно
                            // её "ножки" (точки привязки).
                            iconImageOffset: [-76, -68],

                            // Макет содержимого.
                            iconContentLayout: MyIconContentLayout,
                        }
                    );

                myMap.controls.remove("zoomControl");
                myMap.controls.remove("rulerControl");
                myMap.controls.remove("trafficControl");
                myMap.controls.remove("typeSelector");
                myMap.controls.remove("fullscreenControl");
                myMap.controls.remove("geolocationControl");
                myMap.controls.remove("searchControl");
                // jsMap.firstChild.remove();
                myMap.geoObjects
                    // .add(myPlacemark)
                    .add(myPlacemarkWithContent);
            });
        }
    };
    // renderMap();
    //check scroll to map block
    const creatMapsScript = function () {
        let scriptYMAPS = document.createElement("script");
        scriptYMAPS.src =
            "https://api-maps.yandex.ru/2.1/?lang=ru_RU&apikey=<ваш API-ключ>";
        scriptYMAPS.setAttribute("async", "");
        document
            .querySelector("body")
            .insertAdjacentElement("beforeend", scriptYMAPS);
        // let loader = `<div class="loader-catalog"><img src="/upload/imgs_new/loader.gif" alt="preloader"></div>`;
        // jsMap.insertAdjacentHTML("afterbegin", loader);
        scriptYMAPS.onload = function () {
            renderMap();
        };
    };

    const revealMapBlock = function (entries, observer) {
        const [entry] = entries;
        if (!entry.isIntersecting) return;
        creatMapsScript();
        observer.unobserve(entry.target);
    };

    const mapObserver = new IntersectionObserver(revealMapBlock, {
        root: null,
        threshold: 0.15,
    });
    if (jsMap) mapObserver.observe(jsMap);
});



