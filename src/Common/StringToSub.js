export default function Change(string){
    if(string){
            let firstFour = string.slice(0,4);
    let lastFour  = string.slice(-4);
    let subString = firstFour + "..." + lastFour;
    return subString;
    }else{
        return ""
    }
};

