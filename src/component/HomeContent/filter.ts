

//Peut-être une implementation d'une IA pour reconnaitre des Artistes des chants cherche
export const separate=(searchItem:string,separator:string)=>{
    console.log("data filtré",searchItem.split(separator))
    const result = searchItem.split(separator)
    console.log('the resut in the filter is :',result)
    console.log('the resut in the songNmae is :',result[0])
    console.log('the resut in the artisnmane is :',result[1])
    return{
        songName :searchItem,
        artistName :result[1]
    }

}