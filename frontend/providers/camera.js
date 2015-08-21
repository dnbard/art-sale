var screenWidth = document.querySelector('#app').clientWidth,
    screenHeight = document.querySelector('#app').clientHeight;

exports.getOffset = function(){
    return {
        x: screenWidth * 0.5,
        y: screenHeight * 0.5
    };
}
