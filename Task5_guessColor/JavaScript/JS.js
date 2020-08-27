const COLOR = "green";
alert("Игра угадай цвет, на угадывание дается 3 попытки. Удачи)")
for(var i = 2;i >= 0; --i){
    var variant = prompt("Введите цвет:")
    if(variant == "green") {
        alert("Вы угадали");
        break;
    }
    else {
        alert("К сожелению у вас осталось " + i + " попыток")
    }
}