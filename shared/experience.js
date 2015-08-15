exports.levels = {};

var exp = 20;
for(var i = 1; i < 100; i ++){
    exp += i * i * 42;
    exports.levels[i] = exp;
}

exports.getLevelByExp = function(exp){
    var index = 1;

    while(exp > exports.levels[index] && index < exports.levels.length - 1){
        index ++;
    }

    return index;
}
