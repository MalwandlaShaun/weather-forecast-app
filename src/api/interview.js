

let review = (decimal) =>{
    let percentageArr = [];

    let num = decimal % 1
    let num2 = decimal - num.toFixed(2)

    for(let i = 1; i <= num2; i++){
            percentageArr.push(100)
    }
    if(num.toFixed(2) > 0){
        percentageArr.push(num2 * 10)
    }else{
        percentageArr.push(0)
    }
    while(percentageArr.length < 5){
        percentageArr.push(0)
    }

    return percentageArr
}



console.log(review(0.2))