function countWords(str) {
    return str.trim().split(/\s+/).length;
}

str = "fsdfsd sdfsd fsdg fsdf ";

console.log(countWords(str));