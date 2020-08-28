var result;

function substringExists(str = 'Я люблю круассаны', subStr = 'люблю') {
    if (str.indexOf(subStr) != -1) {
        return true;
    } else {
        return false;
    }
}

result = substringExists("Существует старый трюк с использованием", "часть");
alert(result);