'use strict';

// const { active } = require("browser-sync");

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
        $('.modal__background').removeClass('active');
    });

    //ОТКРЫТИЕ МОДАЛКИ С МОДЕЛЯМИ МАРОК НА МОБИЛКАХ
    if ($(window).width() < 668) {
        $(document).on('click', '.catalog-modal__spares .spares__item', function () {
            $('.catalog-groups').addClass('active');
        });

        //ЗАКРЫТИЕ МОДАЛКИ С МОДЕЛЯМИ МАРОК НА МОБИЛКАХ ПО КНОПКЕ НАЗАД
        $(document).on('click', '.catalog-groups .back', function () {
            $('.catalog-groups').removeClass('active');
        });
    }

    //ОТКРЫТИЕ МОДАЛЬНОГО ОКНА С ФИЛЬТРАМИ 
    $(document).on('click', '.catalog-4lvl__catalog-buttons-filters', function () {
        // $('.filters-modal').addClass('active');
        $('.catalog-4lvl__filters').addClass('active');
        $('body').addClass('scroll-hide');
    });

    //ЗАКРЫТИЕ МОДАЛЬНОГО ОКНА С ФИЛЬТРАМИ 
    $(document).on('click', '.catalog-4lvl__filters .header-bottom__request-close', function () {
        // $('.filters-modal').addClass('active');
        $('.catalog-4lvl__filters').removeClass('active');
        $('body').removeClass('scroll-hide');
    });

    // УБРАТЬ ОКОШКО С ПОДТВЕРЖДЕНИЕМ ГОРОДА ПО КНОПКЕ "ВЕРНО"
    $('.choice-city .btn').on('click', function () {
        $('.choice-city').remove();
    });

    // ОТКРЫТИЕ МОДАЛКИ С ВЫБОРОМ ГОРОДА ПО КЛИКУ НА КНОПКУ "ВЫБРАТЬ ГОРОД"
    $('.choice-city .btn-secondary').on('click', function () {
        $('.choice-city').remove();
        $('.modal-choice').addClass('active');
        if ($(window).width() >= 1024) {
            $('.modal__background').addClass('active');
        }
        $('body').addClass('scroll-hide');
    });

    // ОТКРЫТИЕ МОДАЛКИ С ВЫБОРОМ ГОРОДА ПО КЛИКУ НА ГОРОД
    $('.choice-city__link').on('click', function () {
        $('.choice-city').remove();
        $('.modal-choice').addClass('active');
        if ($(window).width() >= 1024) {
            $('.modal__background').addClass('active');
        }
        $('body').addClass('scroll-hide');
    });

    $('.header-top__location-wrapper').on('click', function (e) {

        $('.modal-choice').addClass('active');
        if ($(window).width() >= 1024) {
            $('.modal__background').addClass('active');
        }
        $('body').addClass('scroll-hide');
    });



    //ПОИСК НА 1024 В ШАПКЕ
    $(document).on('input', '.header-bottom__search-input', function () {
        $(this).parents('.header-bottom__search-wrapper').find('.header-bottom__search-result').addClass('active');
        $(this).parents('.header-bottom__search-wrapper').find('.header-bottom__search-close').addClass('active');
    });

    //ЗАКРЫТИЕ ПОИСКА НА 1024 В ШАПКЕ
    $(document).on('blur', '.header-bottom__search-input', function () {
        $(this).parents('.header-bottom__search-wrapper').find('.header-bottom__search-result').removeClass('active');
        $(this).parents('.header-bottom__search-wrapper').find('.header-bottom__search-close').removeClass('active');
        $(this).val('');
    });

    //ПОИСК ГОРОДА В МОДАЛКЕ ВЫБОРА ГОРОДА
    $(document).on('input', '.modal-choice__search-input', function () {
        $(this).parents('.modal-choice__search').find('.header-bottom__search-close').addClass('active');
    });

    //ЗАКРЫТИЕ ПОИСКА ГОРОДА В МОДАЛКЕ ВЫБОРА ГОРОДА
    $(document).on('blur', '.modal-choice__search-input', function () {
        $(this).parents('.modal-choice__search').find('.header-bottom__search-close').removeClass('active');
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
            if ($('body').hasClass('body-cart') && $(window).width() >= 1024) {
                $('.cart-window').addClass('fixed');
            }
            if ($('body').hasClass('body-card') && $(window).width() >= 1024) {
                $('.card-window').addClass('fixed');
            }
        }
        else {
            headerFix.classList.remove('active');
            $('.cart-window').removeClass('fixed');
            $('.card-window').removeClass('fixed');
        }
    };

    //ЗАКРЫТИЕ МОДАЛЬНОГО ОКНА ПО КЛИКУ ВНЕ ЕГО ОБЛАСТИ НА ПК
    $(document).click(function (e) {
        if ($(window).width() >= 1024) {
            if ($(e.target).is('.modal') && (!($(e.target).is('.catalog-modal')))) {
                $('.modal').removeClass('active');
                $('body').removeClass('scroll-hide');
                $('.modal__background').removeClass('active');
            }
        }


        // if ($('.catalog-4lvl__catalog-buttons-sorting-dropdown').hasClass('active')) {
        //     if (!($(e.target).is('.catalog-4lvl__catalog-buttons-sorting-btn'))) {
        //         console.log('cl');
        //         $('.catalog-4lvl__catalog-buttons-sorting-dropdown').removeClass('active');
        //     }
        // }

    });

    //ПОКАЗАТЬ КНОПКУ ПЕРЕЙТИ К... НА МОДАЛЬНОМ КАТАЛОГЕ
    // function showJumpBtn(maxHeight, sectionName) {

    // }
    // if ($(window).width() > 1499) {
    //     const heightParent = Math.floor(+$(".catalog-modal__groups-wrapper").css("max-height").split("px")[0]);
    //     const heightItems = [...$(".catalog-modal__groups-item")].reduce((acc, item) => acc + item.offsetHeight, 0);
    //     if (heightItems > heightParent) $(".catalog-modal__groups-container").addClass("width-100");
    //     console.log(heightItems, heightParent);
    //     if (heightItems > (heightParent * 2)) {
    //         $('.catalog-modal__groups-container .btn-jump__wrapper').addClass('active');
    //     }
    // }

    let container = $('.catalog-modal__groups-js');
    // console.log(container);
    let containerHeight = Math.floor(+$(container).css("max-height").split("px")[0]);
    let doubleContainerHeight = containerHeight * 2;
    // console.log(doubleContainerHeight);
    console.log(containerHeight);
    let containerElements = $(container).find('a');
    // console.log(containerElements);
    let heightAll = 0;
    containerElements.each(function () {
        let elementsHeight = $(this).outerHeight(true);
        // console.log(elementsHeight);
        heightAll = heightAll + elementsHeight;
    });
    // console.log(heightAll, containerHeight);
    if (heightAll > containerHeight) {
        $(".catalog-modal__groups-container").addClass("width-100");
    }
    if (heightAll > doubleContainerHeight) {
        console.log(heightAll, doubleContainerHeight);
        $('.catalog-modal__groups-container').find('.btn-jump__wrapper').addClass('active');
    }

    let containerSP = $('.catalog-modal .spares__container');
    // console.log(container);
    let containerSPHeight = Math.floor(+$(containerSP).css("max-height").split("px")[0]);
    let doublecontainerSPHeight = containerSPHeight * 2;
    // console.log(doubleContainerHeight);
    console.log(containerSPHeight);
    let containerSPElements = $(containerSP).find('.spares__item');
    // console.log(containerElements);
    let heightSPAll = 0;
    containerSPElements.each(function () {
        let elementsSPHeight = $(this).outerHeight(true);
        // console.log(elementsHeight);
        heightSPAll = heightSPAll + elementsSPHeight;
    });
    // console.log(heightAll, containerHeight);
    // if (heightSPAll > containerSPHeight) {
    //     $(".catalog-modal__groups-container").addClass("width-100");
    // }
    if (heightSPAll > doublecontainerSPHeight) {
        console.log(heightSPAll, doublecontainerSPHeight);
        $('.catalog-modal__spares').find('.btn-jump__wrapper').addClass('active');
    }

    //   ПОКАЗАТЬ КНОПКУ ПЕРЕЙТИ К... НА МОДАЛЬНОМ КАТАЛОГЕ
    // function showJumpBtn(divName, divNameElements, divParentName) {
    //     let container = $(`.${divName}`);
    //     console.log(container);
    //     let containerHeight = Math.floor(+$(container).css("max-height").split("px")[0]);
    //     let doubleContainerHeight = containerHeight * 2;
    //     // console.log(doubleContainerHeight);
    //     console.log(containerHeight);
    //     containerElements = $(container).find(`${divNameElements}`);
    //     // console.log(containerElements);
    //     let heightAll = 0;
    //     containerElements.each(function () {
    //         let elementsHeight = $(this).outerHeight(true);
    //         // console.log(elementsHeight);
    //         heightAll = heightAll + elementsHeight;
    //     });
    //     // console.log(heightAll, containerHeight);
    //     if (heightAll > containerHeight) {
    //         $(`.${divParentName}`).addClass("width-100");
    //     }
    //     if (heightAll > doubleContainerHeight) {
    //         console.log(heightAll, doubleContainerHeight);
    //         $(`.${divParentName}`).find('.btn-jump__wrapper').addClass('active');
    //     }
    // };

    // showJumpBtn('catalog-modal__groups-wrapper', 'a', 'catalog-modal__groups-container');

    //УБРАТЬ КНОПКУ ПОКАЗАТЬ ПОЛНОСТЬЮ, ЕСЛИ ТЕКСТ ВМЕЩАЕТСЯ В БЛОК
    let jshide = $('.js-hide');
    console.log(jshide.length);

    jshide.each(function () {
        let texthideHeight = $(this).find('.text-hide').height();
        console.log(texthideHeight);
        if (texthideHeight <= $(this).height()) {
            $(this).parents('section').find('.btn-show__wrapper').hide();
            $(this).css('height', texthideHeight);
        }
    });

    // texthide.each(function (index, el) {
    //     texthideHeight = $(this).height();
    //     let elements = $(this).find('*');
    //     console.log(elements);
    //     let heightAll = 0;
    //     elements.each(function () {
    //         let elementsHeight = $(this).height();
    //         heightAll = heightAll + elementsHeight;
    //     });
    //     console.log(heightAll);
    //     if (heightAll <= texthideHeight) {
    //         $(this).parents('.js-hide').find('.show-btn__wrapper').hide();
    //     }
    // });

    // ПОКАЗАТЬ/СКРЫТЬ ТЕКСТ
    $(document).on('click', ".btn-show", function () {
        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
            $(this).parents('section').find(".js-hide").css('height', '');
        }
        else {
            $(this).addClass('active');
            let h = $(this).parents('section').find(".text-hide").css('height');
            $(this).parents('section').find(".js-hide").css('height', h);
        }
    });

    //УВЕДОМЛЕНИЕ О ДОБАВЛЕНИИ В КОРЗИНУ



    // ПОДКЛЮЧЕНИЕ КАРТЫ
    const jsMap = document.querySelector("#map");
    const jsMapNew = document.querySelector("#map_new");
    const renderMap = function (mapId = "map") {
        if ($("#map").length !== 0 || $("#map_new").length !== 0) {
            ymaps.ready(function () {
                let myMap = new ymaps.Map(`${mapId}`, {
                    center: [$(`#${mapId}`).attr("data-coords").split(",")[0],
                    $(`#${mapId}`).attr("data-coords").split(",")[1]],
                    zoom: $(window).width() > 667 ? 17 : 14,
                }),

                    // Создаём макет содержимого.
                    MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
                        '<div class="icon-map">$[properties.iconContent]</div>'
                    ),
                    myPlacemarkWithContent = new ymaps.Placemark(
                        [$(`#${mapId}`).attr("data-coords").split(",")[0],
                        $(`#${mapId}`).attr("data-coords").split(",")[1]],
                        {},
                        {
                            // Опции.
                            // Необходимо указать данный тип макета.
                            iconLayout: "default#imageWithContent",
                            // Своё изображение иконки метки.
                            iconImageHref: "../img/map.svg",
                            // Размеры метки.
                            iconImageSize: [82, 51],
                            // Смещение левого верхнего угла иконки относительно
                            // её "ножки" (точки привязки).
                            iconImageOffset: [-48, -51],

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

    // ПЕРЕКЛЮЧЕНИЕ ТАБОВ
    let tabs = [...document.querySelectorAll('.tab')];
    let tabContents = [...document.querySelectorAll('.tab-content')];

    tabs.forEach((tab, index, arTab) => {

        if (tab !== null) {
            tab.addEventListener('click', function () {
                let id = this.dataset.id;
                let tab = this.dataset.tab;

                arTab.forEach(el => {
                    if (id === el.dataset.id) {
                        el.classList.remove('active');
                    }
                })
                this.classList.add('active');
                // handler active content
                if (tabContents.length != 0) {
                    tabContents.forEach(tabContent => {
                        if (tabContent.dataset.id === this.dataset.id) {
                            if (tabContent.dataset.tab === this.dataset.tab) {
                                tabContent.classList.add('active');
                                $(tabContent).find('.tab.active').trigger('click');
                                // if ($(tabContent).find('.tab-content').hasClass('active')) {

                                // let dataTab = $(tabContent).find('.tab-content.active').attr('data-tab');
                                // console.log(dataTab);
                                // $($(tabContent).find('.tab-content.active').attr('data-tab'));
                                // console.log($(tabContent).find('.tab').attr('data-tab', dataTab));
                                // console.log($(tabContent).find('.tab').attr('data-tab') == dataTab);
                                // if ($(tabContent).find('.js-map') != null) {
                                //     console.log($(tabContent).find('.js-map').parents('.tab-content').attr('data-tab'));
                                // }
                                // }
                            }
                            else {
                                tabContent.classList.remove('active');
                            }
                        }
                    })
                    // tabContents[index].classList.add('active');
                }

                // if($('.contacts__map'))
                if (this.hasAttribute('data-map')) {
                    console.log(this);
                    $.map([...$(".js-map")], function (map) {
                        $(map).empty();
                        console.log($(map));
                    });
                    renderMap($(this).attr('data-map').split("#")[1]);
                }
                // console.log($(this).attr('data-map'));
            })
        }

    })


    // ТАБЫ, НА МОБИЛКАХ ВКЛЮЧАТЬ ДЛИННЫЕ КАРТОЧКИ
    if (($(window).width() >= 320) && ($(window).width() < 1023)) {
        $("#catalog4lvlTabLines").trigger("click");
        $('.catalog-4lvl__catalog-lines').addClass('active');
    }
    // ТАБЫ, НАЧИНАЯ С ПК ВКЛЮЧАТЬ ПЛИТКИ
    if ($(window).width() >= 1024) {
        $("#catalog4lvlTabTiles").addClass('active');
        $('.catalog-4lvl__catalog-tile').addClass('active');
    }

    //ВЫПАДАШКА С СОРТИРОВКОЙ В КАТАЛОГЕ 4 УРОВНЯ 
    $(document).on('click', ".catalog-4lvl__catalog-buttons-sorting-btn", function () {
        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
            $(this).parents('.catalog-4lvl__catalog-buttons').find('.catalog-4lvl__catalog-buttons-sorting-dropdown').removeClass('active');
        }
        else {
            $(this).addClass('active');
            $(this).parents('.catalog-4lvl__catalog-buttons').find('.catalog-4lvl__catalog-buttons-sorting-dropdown').addClass('active');
        }
    });

    //УБРАТЬ ВЫПАДАШКУ ПО КЛИКУ ВНЕ ЕЕ ОБЛАСТИ
    window.onclick = e => {
        if (document.querySelector('.catalog-4lvl__catalog-buttons-sorting-span') != null) {
            if (e.target != document.querySelector('.catalog-4lvl__catalog-buttons-sorting-span')) {
                document.querySelector('.catalog-4lvl__catalog-buttons-sorting-btn').classList.remove('active');
                document.querySelector('.catalog-4lvl__catalog-buttons-sorting-dropdown').classList.remove('active');
            }
        }
    }

    //ПЕРЕДАЧА ТЕКСТА В ВЫПАДАШКУ С СОРТИРОВКОЙ В КАТАЛОГЕ 4 УРОВНЯ 
    $(document).on('click', ".catalog-4lvl__catalog-buttons-sorting-dropdown-item", function () {
        $(this).parents('.catalog-4lvl__catalog-buttons-sorting-btn').find('.catalog-4lvl__catalog-buttons-sorting-span').html($(this).attr('data-text'));
    });

    //ВМЕСТО КНОПКИ В КОРЗИНУ ПОКАЗАТЬ СЧЕТЧИК
    $(document).on('click', ".buy", function () {
        $(this).hide();
        $(this).parents('.buy-wrapper').find('.catalog-4lvl__catalog-item-bottom-buttons-basket').addClass('active');
        $('.ma-notification').addClass('active');
        setTimeout(function () {
            $('.ma-notification').removeClass('active');
        }, 2000);
    });

    //УМЕНЬШИТЬ СЧЕТЧИК ТОВАРА
    $(document).on('click', ".catalog-4lvl__catalog-item-bottom-buttons-basket-minus", function () {

        let val = $(this).parents('.catalog-4lvl__catalog-item-bottom-buttons-basket').find('.catalog-4lvl__catalog-item-bottom-buttons-basket-value').val();
        if (val == 1) {
            $(this).parents('.catalog-4lvl__catalog-item-bottom-buttons-basket').removeClass('active');
            $(this).parents('.buy-wrapper').find('.buy').show();
        }
        else {
            $(this).parents('.catalog-4lvl__catalog-item-bottom-buttons-basket').find('.catalog-4lvl__catalog-item-bottom-buttons-basket-value').val(--val);
        }
    });

    //УВЕЛИЧИТЬ СЧЕТЧИК ТОВАРА
    $(document).on('click', ".catalog-4lvl__catalog-item-bottom-buttons-basket-plus", function () {
        let val = $(this).parents('.catalog-4lvl__catalog-item-bottom-buttons-basket').find('.catalog-4lvl__catalog-item-bottom-buttons-basket-value').val();
        $(this).parents('.catalog-4lvl__catalog-item-bottom-buttons-basket').find('.catalog-4lvl__catalog-item-bottom-buttons-basket-minus').removeClass('disabled');
        $(this).parents('.catalog-4lvl__catalog-item-bottom-buttons-basket').find('.catalog-4lvl__catalog-item-bottom-buttons-basket-value').val(++val);
    });

    //УДАЛЕНИЕ КУКОВ
    let cookieCloseBtns = [document.querySelector('.ma-cookie__close'), document.querySelector('.ma-cookie__button')];
    console.log(typeof (cookieCloseBtns));
    cookieCloseBtns.forEach(buttonClose => {
        if (buttonClose != null) {
            buttonClose.addEventListener('click', function (e) {
                document.querySelector('.ma-cookie').remove();
            })
        }
    });

    //скролл страницы наверх
    $(window).scroll(function () {
        let height = $(window).scrollTop();
        if (height > 1000) {
            $('.arrow-top').show();
        } else {
            $('.arrow-top').hide();
        }
    });

    //РАСКРЫТИЕ ТАБА
    $(document).on('click', ".catalog-4lvl__filters-dropdown-link", function () {
        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
            $(this).parents('.catalog-4lvl__filters-dropdown-wrapper').find('.catalog-4lvl__filters-dropdown-content').slideUp();
        }
        else {
            $(this).addClass('active');
            $(this).parents('.catalog-4lvl__filters-dropdown-wrapper').find('.catalog-4lvl__filters-dropdown-content').slideDown();
        }
    });

    //ВЫБРАТЬ ВСЕ ДОЧЕРНИЕ ЧЕКБОКСЫ ПО КЛИКУ НА РОДИТЕЛЯ
    let checkboxDaughter;
    $(document).on('change', ".checkbox-input-parent", function () {
        if ($(this).prop('checked') == true) {
            $(this).removeClass('not-all');
            $(this).parents('.catalog-4lvl__filters-list-item').find('.catalog-4lvl__filters-list-2 .catalog-4lvl__filters-checkbox-input:not(.not-found)').prop('checked', true);
        }
        else {
            $(this).parents('.catalog-4lvl__filters-list-item').find('.catalog-4lvl__filters-list-2 .catalog-4lvl__filters-checkbox-input:not(.not-found)').prop('checked', false);
        }
    });

    //КАК ВЕДЕТ СЕБЯ РОДИТЕЛЬ ЧЕКБОКСОВ В ЗАВИСИМОСТИ ОТ КОЛИЧЕСТВА ЧЕКНУТЫХ ДЕТЕЙ
    $(document).on('change', ".checkbox-input-daughter", function () {
        if ($(this).parents('.catalog-4lvl__filters-list-item').find('.catalog-4lvl__filters-list-2 .checkbox-input-daughter:not(.not-found):checked').length == $(this).parents('.catalog-4lvl__filters-list-item').find('.catalog-4lvl__filters-list-2 .checkbox-input-daughter:not(.not-found)').length) {
            $(this).parents('.catalog-4lvl__filters-list-item').find('.checkbox-input-parent').prop('checked', true);
            $(this).parents('.catalog-4lvl__filters-list-item').find('.checkbox-input-parent').removeClass('not-all');
        }
        else if ($(this).parents('.catalog-4lvl__filters-list-item').find('.catalog-4lvl__filters-list-2 .checkbox-input-daughter:not(.not-found):checked').length < $(this).parents('.catalog-4lvl__filters-list-item').find('.catalog-4lvl__filters-list-2 .checkbox-input-daughter:not(.not-found)').length && $(this).parents('.catalog-4lvl__filters-list-item').find('.catalog-4lvl__filters-list-2 .checkbox-input-daughter:checked').length != 0) {
            $(this).parents('.catalog-4lvl__filters-list-item').find('.checkbox-input-parent').prop('checked', true);
            $(this).parents('.catalog-4lvl__filters-list-item').find('.checkbox-input-parent').addClass('not-all');
        }
        else if ($(this).parents('.catalog-4lvl__filters-list-item').find('.catalog-4lvl__filters-list-2 .checkbox-input-daughter:not(.not-found):checked').length == 0) {
            $(this).parents('.catalog-4lvl__filters-list-item').find('.checkbox-input-parent').prop('checked', false);
        }
    });

    //ПОКАЗАТЬ ПОЛЯ ДЛЯ ЮРИДИЧЕСКОГО ЛИЦА
    let entityInputs = [...document.querySelectorAll('.form-radio')];

    entityInputs.forEach(entityInput => {

        entityInput.addEventListener('change', function () {
            if (entityInput !== null) {
                if (this.checked === true && this.classList.contains('form-entity-radio')) {
                    document.querySelectorAll('.form-entity').forEach(el => {
                        el.classList.add('active');
                    })
                } else {
                    document.querySelectorAll('.form-entity').forEach(el => {
                        el.classList.remove('active');
                    })
                }
            }
        })
    })


    //ПОКАЗЫВАТЬ КНОПКУ ПРИМЕНИТЬ НА ИНПУТЕ ВВОДА ПРОМОКОДА
    $(document).on('input', '.cart__ordering-promocode', function () {
        $(this).addClass('active');
        if ($(this).val() != '') {
            $(this).parents('.cart__ordering-promocode-wrapper').addClass('active');
        }
        else {
            $(this).parents('.cart__ordering-promocode-wrapper').removeClass('active');
        }
    });

    //УБИРАТЬ КНОПКУ ПРИМЕНИТЬ НА ИНПУТЕ ВВОДА ПРОМОКОДА
    $(document).on('blur', '.cart__ordering-promocode', function () {
        $(this).removeClass('active');
    });

    //ДОБАВИТЬ ПРОМОКОД СНИЗУ ИНПУТА
    $(document).on('click', '.cart__ordering-submit', function () {
        let inputValue = $('.cart__ordering-promocode').val();
        $(this).parents('.cart__ordering-promocode-wrapper').find('.cart__promocode-accept-wrapper').addClass('active');
        let layout = `<div class="cart__promocode-accept"><span>${inputValue}</span></div>`;
        $(this).parents('.cart__ordering-promocode-wrapper').find('.cart__promocode-accept-wrapper').prepend($(layout));
    });

    //УДАЛИТЬ ПРОМОКОД
    $(document).on('click', '.cart__promocode-accept', function () {
        $(this).remove();
    });

    //ОБЕРНУТЬ КОНТЕНТУЮ ЧАСТЬ
    let content = document.querySelector('.ma-production__content ');

    let imgs = document.querySelectorAll('.ma-production__content img');
    let allTagInContent = [];

    if (content != null) {

        let allEltsInContent = [...content.querySelectorAll('*')];
        let allTagInContent = [];
        allEltsInContent.forEach(elt => {
            allTagInContent.push(elt.tagName.toLocaleLowerCase())

        })
        if (allTagInContent.includes('table')) {
            let tables = content.querySelectorAll('table');
            tables.forEach(table => {
                let wrapper = document.createElement('div')
                let content = document.createElement('div')
                wrapper.classList.add('ma-production__scroll')
                content.classList.add('ma-production__scroll-content')
                let parent = table.parentNode
                parent.replaceChild(wrapper, table)
                content.appendChild(table)
                wrapper.appendChild(content)
                console.log(wrapper)
            })
        }
        imgs.forEach(img => {
            let imgParentClass = img.parentNode.className;
            if (!imgParentClass.includes('__img')) {
                let div = document.createElement('div');
                div.innerHTML = `<img src="${img.src}" alt="${img.getAttribute('alt')}" >`;
                div.classList.add('ma-production__img-auto')
                img.parentNode.replaceChild(div, img);
                console.log(div)
            }

        })

        if (allTagInContent.includes('iframe')) {

            let iframes = content.querySelectorAll('iframe');
            console.log(iframes)
            iframes.forEach(iframe => {
                let wrapper = document.createElement('div')
                let iframeSrc = iframe.src
                wrapper.classList.add('wrapper-iframe');
                let parent = iframe.parentNode;
                parent.replaceChild(wrapper, iframe);
                wrapper.appendChild(iframe);

            })
        }
    }



    //СКРОЛЛ ОПЛАТА И ДОСТАВКА
    let leftLinks = [...document.querySelectorAll('.content-left-nav__link')];
    let body = document.querySelector('.ma-pay-body');
    let leftBlock = document.querySelector('.ma-pay-left');
    let titles = [...document.querySelectorAll('.ma-pay__title')];
    let linkTexts = [...document.querySelectorAll('.ma-pay-left__link span')];


    // detect element in viewport
    function elementInViewport(el) {
        var top = el.offsetTop;
        var left = el.offsetLeft;
        var width = el.offsetWidth;
        var height = el.offsetHeight;

        while (el.offsetParent) {
            el = el.offsetParent;
            top += el.offsetTop;
            left += el.offsetLeft;
        }

        return (
            top >= window.pageYOffset &&
            left >= window.pageXOffset &&
            (top + height) <= (window.pageYOffset + window.innerHeight) &&
            (left + width) <= (window.pageXOffset + window.innerWidth)
        );
    }


    let blockItems = [...document.querySelectorAll('.ma-pay__item')]
    let containerItem = document.querySelector('.ma-container');


    // leftLinks.forEach((link, index, arr) => {

    //     link.addEventListener('click', function (e) {

    //         e.preventDefault();
    //         blockItems.forEach(item => {
    //             if (item.id === link.getAttribute('data-id')) {

    //                 let prevElt = item.previousElementSibling
    //                 if (prevElt != null) {
    //                     prevElt.lastElementChild.scrollIntoView();
    //                 } else {
    //                     if (containerItem.previousElementSibling != null) {
    //                         containerItem.previousElementSibling.lastElementChild.scrollIntoView()
    //                     } else {
    //                         item.scrollIntoView()
    //                     }
    //                 }

    //             }



    //         })
    //     })
    // })
    window.addEventListener('scroll', function () {
        blockItems.forEach(item => {
            if (elementInViewport(item.lastElementChild)) {
                //    item.classList.add('ma-pay-left__link--active');
                leftLinks.forEach(link => {
                    link.classList.remove('ma-pay-left__link--active')
                    if (item.id === link.getAttribute('data-id')) {
                        link.classList.add('ma-pay-left__link--active')
                    }
                })

            }
        })
    })
    const scrollAnchor = function () {


        let elementClick = $(this).attr("href");
        let destination = $(elementClick).offset().top - $('.header-fixed').height();
        jQuery("html:not(:animated),body:not(:animated)").animate(
            {
                scrollTop: destination,
            },
            0
        );
        return false;
    };
    $(".content-left-nav__link").bind("click", {}, scrollAnchor)



    // let leftLinks = [...document.querySelectorAll('.ma-pay-left__link')];
    // let body = document.querySelector('.ma-pay-body');
    // let leftBlock = document.querySelector('.ma-pay-left');
    // let titles = [...document.querySelectorAll('.ma-pay__title')];



    // // detect element in viewport
    // function elementInViewport(el) {
    //     var top = el.offsetTop;
    //     var left = el.offsetLeft;
    //     var width = el.offsetWidth;
    //     var height = el.offsetHeight;

    //     while (el.offsetParent) {
    //         el = el.offsetParent;
    //         top += el.offsetTop;
    //         left += el.offsetLeft;
    //     }

    //     return (
    //         top >= window.pageYOffset &&
    //         left >= window.pageXOffset &&
    //         (top + height) <= (window.pageYOffset + window.innerHeight) &&
    //         (left + width) <= (window.pageXOffset + window.innerWidth)
    //     );
    // }


    // window.addEventListener('scroll', function (e) {
    //     this.document.querySelectorAll('.ma-pay__item').forEach(item => {


    //         if (elementInViewport(item.lastElementChild)) {
    //             leftLinks.forEach(link => {
    //                 link.classList.remove('ma-pay-left__link--active')
    //                 if (item.id === link.getAttribute('data-id')) {
    //                     link.classList.add('ma-pay-left__link--active')
    //                 }
    //             })


    //         }
    //     })
    // })

    // window.addEventListener('load', function (e) {
    //     let headerFixed = document.querySelector('.header-fixed');
    //     // let headerFixed_height = parseFloat(this.getComputedStyle(headerFixed).height);
    //     let headerFixed_height = headerFixed.offsetHeight
    //     // console.log(headerFixed_height + 'mamamamama')
    //     leftLinks.forEach(link => {
    //         link.addEventListener('click', e => {
    //             e.preventDefault()
    //             if (!link.classList.contains('ma-pay-left__link--active')) {
    //                 this.document.querySelectorAll('.ma-pay__item').forEach(item => {
    //                     if (item.id === link.getAttribute('data-id')) {

    //                         // item.scrollIntoView();
    //                         this.window.scrollTo(0, item.offsetTop);

    //                     }

    //                 })
    //             }
    //         })
    //     })


    // })
    // let leftLinks = [...document.querySelectorAll('.ma-pay-left__link')];
    // let body = document.querySelector('.ma-pay-body');
    // let leftBlock = document.querySelector('.ma-pay-left');




    // window.addEventListener('scroll', function (e) {




    //     if (this.scrollY < 600) {
    //         leftLinks[0].classList.add('ma-pay-left__link--active')
    //         leftLinks[1].classList.remove('ma-pay-left__link--active')
    //     } else {
    //         leftLinks[1].classList.add('ma-pay-left__link--active')
    //         leftLinks[0].classList.remove('ma-pay-left__link--active')

    //     }

    //     if (this.scrollY >= body.offsetHeight - 105) {
    //         leftBlock.classList.add('absolute')
    //     } else {
    //         leftBlock.classList.remove('absolute')
    //     }

    // })
    //     let header = document.querySelector('header');
    //     let navbar = document.querySelector('.ma-pay-left');

    //     navbar.style.top = parseFloat(getComputedStyle(header).height) + 100 + 'px';
    //     console.log(getComputedStyle(header).height);


    // })




    //СЛАЙДЕР В ФИЛЬТРАХ КАТАЛОГА 4 УРОВНЯ


    let slider = document.getElementById('filtersSlider');
    if (slider != null) {
        let input0 = document.getElementById('filtersSliderInput1');
        let input1 = document.getElementById('filtersSliderInput2');
        let inputs = [input0, input1];
        noUiSlider.create(slider, {
            start: [36, 210000],
            connect: true,
            range: {
                'min': 36,
                'max': 210000
            },
            format: {
                to: (v) => parseFloat(v).toFixed(0),
                from: (v) => parseFloat(v).toFixed(0)
            },
        });

        slider.noUiSlider.on('update', function (values, handle) {
            inputs[handle].value = values[handle];
        });

        inputs.forEach(function (input, handle) {

            input.addEventListener('change', function () {
                slider.noUiSlider.setHandle(handle, this.value);
            });

            input.addEventListener('keydown', function (e) {

                let values = slider.noUiSlider.get();
                let value = Number(values[handle]);

                // [[handle0_down, handle0_up], [handle1_down, handle1_up]]
                let steps = slider.noUiSlider.steps();

                // [down, up]
                let step = steps[handle];

                let position;

                // 13 is enter,
                // 38 is key up,
                // 40 is key down.
                switch (e.which) {

                    case 13:
                        slider.noUiSlider.setHandle(handle, this.value);
                        break;

                    case 38:

                        // Get step to go increase slider value (up)
                        position = step[1];

                        // false = no step is set
                        if (position === false) {
                            position = 1;
                        }

                        // null = edge of slider
                        if (position !== null) {
                            slider.noUiSlider.setHandle(handle, value + position);
                        }

                        break;

                    case 40:

                        position = step[0];

                        if (position === false) {
                            position = 1;
                        }

                        if (position !== null) {
                            slider.noUiSlider.setHandle(handle, value - position);
                        }

                        break;
                }
            });
        });
    }

    //ПОИСК ПО ПРОИЗВОДИТЕЛЯМ В КАТАЛОГЕ 4 УРОВНЯ
    $(".catalog-4lvl__filters-search .header-bottom__search-input").keyup(function () {
        let filter = $(this).val(),
            count = 0;
        $(this)
            .parents(".catalog-4lvl__filters-dropdown-content")
            .find(".catalog-4lvl__filters-checkbox-label")
            .each(function () {
                if ($(this).attr("title").search(new RegExp(filter, "i")) < 0) {
                    $(this).hide();
                } else {
                    $(this).show();

                    count++;
                }
            });
    });

    //МАСКА НА ИНПУТЫ С ТЕЛЕФОНОМ
    if ($(".input-phone").length !== 0) {
        Inputmask("+7 (999) 999-99-99").mask(".input-phone");
    }

    //ПОКАЗАТЬ/СКРЫТЬ ПАРОЛЬ
    $(document).on('click', '.personal-data__label', function () {
        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
            $(this).parents('.form-input__wrapper').find('.form-input').attr('type', 'password');
        }
        else {
            $(this).addClass('active');
            $(this).parents('.form-input__wrapper').find('.form-input').attr('type', 'text');
        }
    });

    //УБИРАТЬ С КНОПКИ САБМИТ DISABLED, ЕСЛИ В ФОРМУ БЫЛИ ВНЕСЕНЫ ИЗМЕНЕНИЯ
    function handle(event) {
        if (event.target.classList.contains('form-input')) {
            document.querySelector('.personal-data__submit').classList.add('undisabled');
        }
    }

    if (document.querySelector('.personal-data__form form') != null) {
        document.querySelector('.personal-data__form form').addEventListener('input', handle);
    }

    //ОТКРЫТИЕ ВИДЕО НА СТРАНИЦЕ О КОМПАНИИ
    $(document).on('click', '.about-company__video-link', function (e) {
        e.preventDefault();
        let firstString = 'https://www.youtube.com/embed/';
        let link = $(this).attr('href');
        let newLink;
        if (link.indexOf('v=') !== -1) {
            let arrayLinks = link.split('v=');
            let secondString = arrayLinks[arrayLinks.length - 1];
            newLink = firstString + secondString;
        }
        else {
            newLink = link;
        }

        $.fancybox.open({
            src: newLink,
            type: 'iframe'
        });

    });

    //УДАЛИТЬ АДРЕС
    let LivraisonDeleteIcons = [...document.querySelectorAll('.livraison-delete-icon')];

    let LivraisonOpenIcons = [...document.querySelectorAll('.livraison-open-icon')];
    let livraisonAddressItems = [...document.querySelectorAll('.livraison__address')];
    LivraisonDeleteIcons.forEach((LivraisonDeleteIcon, index, tab) => {
        LivraisonDeleteIcon.addEventListener('click', e => {
            livraisonAddressItems[index].remove()

        })
    });

    //ВЫПАДАШКА С ВЫБОРОМ РЕГИОНА В ОФОРМЛЕНИИ ЗАКАЗА
    $(document).on('input', ".checkout__company-region-input", function () {
        $(this).addClass('active');
        $(this).parents('.checkout__company-region').addClass('active');
        $(this).parents('.checkout__company-region').find('.checkout__company-region-content').addClass('active');
    });
    //ВЫПАДАШКА С ВЫБОРОМ РЕГИОНА В ОФОРМЛЕНИИ ЗАКАЗА
    // $(document).on('blur', ".checkout__company-region-input", function () {
    //     $(this).removeClass('active');
    //     $(this).parents('.checkout__company-region').find('.checkout__company-region-content').removeClass('active');
    //     $(this).parents('.checkout__company-region').removeClass('active');
    // });
    //ПЕРЕДАЧА ТЕКСТА В ВЫПАДАШКУ С ВЫБОРОМ РЕГИОНА В ОФОРМЛЕНИИ ЗАКАЗА
    $(document).on('click', ".checkout__company-region-item", function () {
        $(this).parents('.checkout__company-region').find('input').val($(this).attr('data-text'));
    });
    //ПОИСК ПО РЕГИОНАМ В ОФОРМЛЕНИИ ЗАКАЗА
    $(".checkout__company-region-input").keyup(function () {
        let filter = $(this).val(),
            count = 0;
        $(this)
            .parents(".checkout__company-region")
            .find(".checkout__company-region-item")
            .each(function () {
                if ($(this).attr("data-text").search(new RegExp(filter, "i")) < 0) {
                    $(this).hide();
                } else {
                    $(this).show();

                    count++;
                }
            });
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

    //ВОЗМОЖНОСТЬ КЛИКАТЬ ПО КНОПКЕ ГЛАВНОЙ СТРАНИЦЫ ГЛАВНОГО ЭКРАНА
    $('.btn-main').on('mousedown touchstart pointerdown', function (e) {
        e.stopPropagation();
    });

    let thumbsCard;

    if ($(window).width() < 1024) {
        thumbsCard = {};
    }
    else {
        const swiperCardThumbs = new Swiper('.swiper-card-thumbs', {
            speed: 700,
            slidesPerView: 'auto',
            spaceBetween: 8,
            freeMode: true,
            watchSlidesProgress: true
        });
        thumbsCard = {
            swiper: swiperCardThumbs
        };
    }

    console.log(thumbsCard);

    //ПОДКЛЮЧЕНИЕ СВАЙПЕРА КАРТОЧКА ТОВАРА
    const swiperCard = new Swiper('.swiper-card', {
        speed: 700,
        slidesPerView: 1,
        autoHeight: true,
        pagination: {
            el: '.swiper-card__pagination',
            type: 'bullets',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-card-next',
            prevEl: '.swiper-card-prev',
        },
        thumbs: thumbsCard
        // thumbs: {
        //     swiper: swiperCardThumbs
        // }
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

        //ВЫ НЕДАВНО СМОТРЕЛИ
        const swiperRecently = new Swiper('.swiper-recently', {
            speed: 700,
            slidesPerView: 'auto',
            breakpoints: {

                1024: {
                    spaceBetween: 24,
                },

                1500: {
                    spaceBetween: 32,
                },
            },
            navigation: {
                nextEl: '.swiper-recently-button-next',
                prevEl: '.swiper-recently-button-prev',
            }
        });

        //СОПУТСТВУЮЩИЕ ТОВАРЫ
        const swiperRelated = new Swiper('.swiper-related', {
            speed: 700,
            slidesPerView: 'auto',
            breakpoints: {

                1024: {
                    spaceBetween: 32,
                },

                1500: {
                    spaceBetween: 62,
                },
            },
            navigation: {
                nextEl: '.swiper-related-button-next',
                prevEl: '.swiper-related-button-prev',
            },
        });

        //УБРАТЬ ОТСТУП ОБЕРТКИ ДЛЯ КНОПОК СВАЙПЕРА, ЕСЛИ СЛАЙДОВ НЕДОСТАТОЧНО ДЛЯ ПРОЛИСТЫВАНИЯ
        let swipers = $('.swiper');
        if (swipers.length != 0) {
            swipers.each(function () {
                if ($(this).find($('.swiper-button-prev')).hasClass('swiper-button-lock')) {
                    $(this).find('.swiper-buttons').css('margin', 0);
                }
            });
        }

        //СТРАНИЦА О КОМПАНИИ СЕКЦИЯ "НАШИ НАГРАДЫ"
        const swiperRewards = new Swiper('.swiper-rewards', {
            speed: 700,
            slidesPerView: 'auto',
            spaceBetween: 85,
            navigation: {
                nextEl: '.swiper-rewards-button-next',
                prevEl: '.swiper-rewards-button-prev',
            }
        });


        //УБРАТЬ ПАГИНАЦИЮ НА СЛАЙДЕРЕ КАРТОЧКИ ТОВАРА
        swiperCard.pagination.destroy();
        $('.swiper-card__pagination').remove();

        // const swiperCardThumbs = new Swiper('.swiper-card-thumbs', {
        //     speed: 700,
        //     slidesPerView: 'auto',
        //     spaceBetween: 8,
        //     navigation: {
        //         nextEl: '.swiper-card-next',
        //         prevEl: '.swiper-card-prev',
        //     }
        // });



        //СВАЙПЕР ДЛЯ ТАБОВ КАРТОЧКИ ТОВАРА
        const swiperCardTabs = new Swiper('.swiper-card-tabs', {
            speed: 700,
            slidesPerView: 'auto',
            mousewheel: {
                invert: true,
            },
        });

    }






    // $(document).on('click', ".tab", function () {
    //     $('.tab-content').removeClass('active');
    //     $('#' + $(this).attr("data-tab")).addClass('active');
    //     $('.tab').removeClass('active');
    //     $(this).addClass('active');

    //     $.map([...$(".contacts__map")], function (map) {
    //         $(map).empty();
    //     });
    //     renderMap($(this).attr('data-map').split("#")[1]);

    // });
});



