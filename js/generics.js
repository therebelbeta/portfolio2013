$gen = {
  hueVariant:1,
  getHue: function(){
    var date = new Date();
    var d = new Date(date.getTime() + ($gen.hueVariant*960000));
    $gen.hueVariant++;
    var h = ((d.getHours())*60)*60;
    var m = (d.getMinutes())*60;
    var s = d.getSeconds();
    var seconds = h+m+s;
    var hue = (seconds*360)/86400;
    return Math.round(hue);
  },
  backgroundChange:function(){
    var newColor = $.Color({ hue: $gen.getHue(), saturation: .5428571428571428, lightness: .4117647058823529, alpha: 1 }).rgba();
    var newColorToRgba = 'rgba('+newColor[0]+','+newColor[1]+','+newColor[2]+','+newColor[3]+')';
   
    $('body').animate({
      backgroundColor: newColorToRgba
    }, 5000, function(){
      $gen.backgroundChange();
    });
  }
}