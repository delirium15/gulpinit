$(document).ready(function(){
    $('.sidenav').sidenav();
    $('.materialboxed').materialbox();
    $('.modal').modal({
        opacity: .6,
        onCloseEnd: function () {
            console.log('MODAL CLOSED!!!');
        }
    });


    /** INPUT MASK **/
    var element = document.getElementById('icon_telephone');
    var maskOptions = {
        mask: '+{7}(000)000-00-00'
    };
    var mask = new IMask(element, maskOptions);


    var msgTxtEl = $('.feedbackMsg'),
        spinner = $('.loading-spinner')

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
    $('.modal a.tr-button').on('click', function () {
        var phoneNumber = mask.value;

        if(validatePhone(phoneNumber)) {
            spinner.slideDown(300); // показываем спиннер


            console.log(phoneNumber);

        }




        /*
        $(document).on("beforeSubmit", formId, function () {
            var form = $(this),
                spinner = form.parent().find('.loading-spinner'),
                formHeaders = form.parent().find('.form-headers'),
                feedbackMsg = form.parent().find('.feedbackMsg');

            if (form.find('.has-error').length) {
                return false;
            }

            formHeaders.slideUp(300);  // скрываем заголовки перед формой
            form.slideUp(300); // скрываем форму
            spinner.slideDown(300); // показываем спиннер

            $.ajax({
                url    : '../',
                type   : 'post',
                data   : form.serialize(),
                success: function (response) {
                    // скрываем спиннер
                    spinner.slideUp(300, function () {});

                    console.log(feedbackMsg);
                    if(response){
                        feedbackMsg.addClass("feedbackSucMsg").html("Ваша заявка отправлена!<br>Спасибо!");
                        feedbackMsg.slideDown(300);
                        setTimeout(reloadModal, 5000,formHeaders, form,feedbackMsg)
                    } else {
                        feedbackMsg.addClass("feedbackErrMsg").html("Ошибка!<br>При отправке сообщениея произошла непредвиденная ошибка. Приносим свои извинения.");
                        feedbackMsg.slideDown(300);
                        setTimeout(reloadModal, 3000,formHeaders, form,feedbackMsg)
                    }

                },
                error  : function () {
                    // скрываем спиннер
                    spinner.slideUp(300, function () {});
                    feedbackMsg.addClass("feedbackErrMsg").html("Ошибка!<br>При отправке сообщениея произошла непредвиденная ошибка. Приносим свои извинения.");
                    feedbackMsg.slideDown(300);
                    console.log('internal server error');
                }
            });

            return false; // cancel form submitting
        });

        */






    })




















});
