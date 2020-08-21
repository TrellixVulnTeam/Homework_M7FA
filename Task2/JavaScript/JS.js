var x=6,  y=15,  z=4;
x += y - x++ * z ; //-3
alert(x);
z = -- x - y * 5 ; //-79
alert(z);
y /= x + 5 % z ;  //15
alert(y);
z = x++ + y * 5 ; //71
alert(z);
x = y - x++ * z ; //228
alert(x);