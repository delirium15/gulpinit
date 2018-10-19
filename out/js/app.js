$(document).ready(function(){
    $('.sidenav').sidenav();
    $('.scrollspy').scrollSpy({
        scrollOffset: 0
    });
    $('.materialboxed').materialbox();

    /** INPUT MASK INIT **/
    var element = document.getElementById('icon_telephone');
    var maskOptions = {mask: '+{7}(000)000-00-00'};
    var mask = new IMask(element, maskOptions);

    var msgTxtEl = $('.feedbackMsg'),
        spinner = $('.loading-spinner'),
        actionBtn = $('#modalActionBtn'),
        phoneFieldEl = $('#icon_telephone');

    /** MODAL INIT **/
    $('.modal').modal({
        opacity: .6,
        onCloseEnd: function () {
            if(actionBtn.hasClass("modal-close")){
                refreshBtn();
            }
            phoneFieldEl.val('');
            msgTxtEl.slideUp();
        },
        onOpenEnd: function () {
            mask.updateValue();
            phoneFieldEl.focus();
        }
    });


    function refreshBtn() {
        if(actionBtn.hasClass("modal-close")){
            actionBtn.removeClass('modal-close').text('Готово');
            return;
        } else {
            actionBtn.addClass('modal-close').text('Закрыть');
            return;
        }
    }


    function setMsgTxt(val) {
        val?msgTxtEl.html(val):msgTxtEl.html('');
    }


    function validatePhone(phone) {
        var expr = /^\+7\([0-9]{3}\)[0-9]{3}-[0-9]{2}-[0-9]{2}$/g;
        if(phone === '') {
            setMsgTxt('Введите номер телефона.');
            msgTxtEl.slideDown(300);
        } else {
            if(expr.test(phone)){
                msgTxtEl.slideUp(300);
                return true;
            } else {
                setMsgTxt('Введите номер телефона в указанном формате.');
                msgTxtEl.slideDown(300);
                return false;
            }
        }
    }


    /** SEND FORM BUTTON EVENT LISTENER **/
    $('.modal a.tr-button').on('click', function (e) {
        e.preventDefault();
        if($(e.currentTarget).hasClass('modal-close')) return;
        var phoneNumber = mask.value;

        if(validatePhone(phoneNumber)) {
            var data = {phone: phoneNumber}
            spinner.slideDown(300); // показываем спиннер

            $.ajax({
                url    : 'mailer.php',
                type   : 'post',
                data   : data,
                success: function (response) {
                    spinner.slideUp(300, function () {
                        if(response){
                            setMsgTxt("Ваша заявка отправлена!<br>Спасибо!");
                            msgTxtEl.slideDown(300);
                            refreshBtn();
                        } else {
                            setMsgTxt("Ошибка!<br>При отправке сообщения произошла непредвиденная ошибка.<br>Приносим свои извинения.");
                            msgTxtEl.slideDown(300);
                            refreshBtn();
                        }
                    }); // скрываем спиннер

                },
                error  : function () {
                    // скрываем спиннер
                    spinner.slideUp(300, function () {}); // скрываем спиннер
                    setMsgTxt("Ошибка!<br>При отправке сообщения произошла непредвиденная ошибка.<br>Приносим свои извинения.");
                    msgTxtEl.slideDown(300);
                    refreshBtn();
                    console.log('internal server error');
                }
            });
        }
    })


});
