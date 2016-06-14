
function price_replacement(array) {
    for (var i=0;i<array.length; i++){
        switch(array[i].price.message.toLocaleLowerCase()){
            case "cheap":
                array[i].price.message = "$";
                break;
            case "moderate":
                array[i].price.message = "$$";
                break;
            case "expensive":
                array[i].price.message = "$$$";
                break;
            case "very expensive":
                array[i].price.message = "$$$$";
                break;
        }
    }///end of for loop
    return array;
}
function price_sort(array) {
    var swapped ;
    do {
        swapped = false;
        for (var i=0;i<array.length-1; i++) {
            if (array[i].price.message > array[i+1].price.message) {
                var temp = array[i];
                array[i] = array[i + 1];
                array[i + 1] = temp;
                swapped = true;
            }
        }
   }while (swapped)
    return array;
}


function distance_sort(array) {
    var swapped ;
    do {
        swapped = false;
        for (var i=0;i<array.length-1; i++) {
            if (array[i].distance > array[i+1].distance) {
                var temp = array[i];
                array[i] = array[i + 1];
                array[i + 1] = temp;
                swapped = true;
            }
        }
    }while (swapped)
    return array;
}