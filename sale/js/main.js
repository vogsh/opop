$(document).ready(function () {

    $('.toform').click(function () {
        $("html, body").animate({
            scrollTop: $("#form").offset().top
        }, 1300);
        return false;
    });  //якорь

    var i = 0, // итерация
        $count = 16, // кол-во товара
        time2 = new Date().getMinutes(),
        timeM = 3; // итерация изменения времени


    if (time2 < 10){
         time2 = '0'+time2; //если минут меньше 10 ставим 0+
    }

    d_paste('my_hours', set_Time(3) + ':' + time2); // ставим конкретное время сразу + 3 часа


    function d_paste(topaste, whatpaste) {
        $('.' + topaste).html(whatpaste);  // функция вставки
    }

    function set_Time(hour) { // Определяем Часы

        var myDate = new Date();
        myDate.setTime(myDate.getTime() + (hour * 60 * 60 * 1000));

        newHour = myDate.getHours();

        if(newHour < 10){
            newHour = "0"+newHour; //если часов меньше 10 перед ним ставим нолик
        }

        return newHour;

    }

    if ($.cookie('name7') != 'value') {

    // проверяем куку если нету -

    var setCount = setInterval(function () {
        if (i >= 3) {
            clearInterval(setCount); // очищаем интервал после 3х итераций
        }
        else {
            $count -= 3; // рандомное изменение колва упаковок
            if ($count < 10) {
                d_paste('counter_block', '0' + $count);  // если меньше 10 упаковок перед цифрой ставим 0
            }
            else {
                d_paste('counter_block', $count);
            }

            d_paste('my_hours', set_Time(timeM) + ':' + time2); // вставляем время

            timeM--;  // уменьшаем оставшееся время на уменьшенное кол-во упаковок

            i++;
        }


    }, 9000);

    }

    else {
        // если кука есть вставляем оставшиеся 5 упаковок и час до гарантии
        d_paste('counter_block', '07');
        d_paste('my_hours', set_Time(1) + ':' + time2); // ставим конкретное время сразу + 1 час
    }

    $.cookie('name7', 'value');

});




