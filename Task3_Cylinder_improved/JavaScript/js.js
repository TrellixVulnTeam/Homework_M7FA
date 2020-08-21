var r = prompt("Введите радиус цилиндра: ");
var h = prompt("Введите высоту цилиндра: ");
var action = prompt("Выберите действие: 1 - Найти Объем 2 - Найти Площадь");
var s, v;

if(action !== "1" && action !== "2") {
    do{
        var action = prompt("Вы ввели неправильное значение повторите попытку: 1 - Найти Объем 2 - Найти Площадь");
    }while(action !== "1" && action !== "2")
} 

switch(action)
{
    case "1":
        v = Math.PI * +r * 2 * +h;
        alert("Объем: " + v);
        break;
    case "2":
        s = 2 * Math.PI * +r * ( +r + +h ) ;
        alert("Площадь поверхности: " + s);
        break;
}
