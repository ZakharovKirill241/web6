var name = prompt('Введите ваше имя', '');

function calc() {
    let cost = document.getElementsByName("cost");
    let kol = document.getElementsByName("kol");
    let result = document.getElementById("result");
    let re = /\D\./;
    if ((cost[0].value.match(re) || kol[0].value.match(re)) === null)
        result.innerHTML = (name + "," + "стоимость вашего заказа: " + parseFloat(cost[0].value, 10) * parseInt(kol[0].value, 10));
    else result.innerHTML = "Ошибка! Неверный формат чисел";
    return false;
}

function checkRadio() {
    let radioe = document.getElementsByName("color");
    radioe.forEach(function(radio) {
        radio.checked = false;
    });
}

function checkCheckbox(val) {
    let checkboxer = document.querySelectorAll("#checkboxes input");
    checkboxer.forEach(function(checkbox) {
        if (checkbox.value != val)
            checkbox.checked = false;
    });
}

window.addEventListener('DOMContentLoaded', function(event) {

    let cost = {
        form: [100, 200, 300],
        color: [10, 20, 30],
        border: {
            border1: 1,
            border2: 2,
            border3: 3,
        }
    };
    let form = document.getElementsByName("form");
    let radios = document.getElementById("radios");
    let checkbox = document.getElementById("checkboxes");
    let sum = document.getElementById("sum");
    let result = 0;
    var lastcostform = 0;
    radios.style.display = "none";
    checkbox.style.display = "none";
    form[0].addEventListener("change", function(event) {
        let select = event.target;
        result -= lastcostform;
        result += cost.form[select.value - 1];
        result -= lastcostcolor;
        lastcostcolor = 0;
        result -= lastcostborder;
        lastcostborder = 0;
        lastcostform = cost.form[select.value - 1];
        sum.innerHTML = (name + ", сумма к оплате: " + result);
        if (select.value == "2") {
            radios.style.display = "block";
            checkbox.style.display = "none";
            checkRadio();
        } else if (select.value == "3") {
            checkbox.style.display = "block";
            radios.style.display = "none";
            checkCheckbox(null);
        }
    });
    var lastcostcolor = 0;
    let radioe = document.getElementsByName("color");
    radioe.forEach(function(radio) {
        radio.addEventListener("change", function(event) {
            result -= lastcostborder;
            lastcostborder = 0;
            sum.innerHTML = (name + ", сумма к оплате: " + result);
            let r = event.target;
            if (radio.checked) {
                let optionPrice = cost.color[radio.value];
                if (optionPrice !== undefined) {
                    result -= lastcostcolor;
                    result += optionPrice;
                    lastcostcolor = optionPrice;
                }
                sum.innerHTML = (name + ", сумма к оплате: " + result);
            }
        });
    });
    var lastcostborder = 0;
    let checkboxer = document.querySelectorAll("#checkboxes input");
    checkboxer.forEach(function(checkbox) {
        checkbox.addEventListener("change", function(event) {
            result -= lastcostcolor;
            lastcostcolor = 0;
            sum.innerHTML = (name + ", сумма к оплате: " + result);
            let c = event.target;
            checkCheckbox(c.value);
            if (checkbox.checked) {
                let price = cost.border[c.value];
                if (price !== undefined) {
                    result -= lastcostborder;
                    result += price;
                    lastcostborder = price;
                }
                sum.innerHTML = (name + ", сумма к оплате: " + result);
            }
        });
    });
});