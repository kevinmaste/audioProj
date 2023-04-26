//je vais exporter le type Music pour qu'il soit egale au type AudioFile dans composant audio
export type Music = {
    id:number,
    musique:string
    name:string
}

let updateMusique: Music[] = [];

let importTab: string[] = []
for (let i = 0; i < 10; i++) {
    // eslint-disable-next-line no-loop-func
    import(`assets/musique/song-${i}.mp3`).then((module) => {
        //const varName:any = `assets/musique/song-${i}`;
        importTab[i] = module.default
        console.log("we here", module)
    });
}


const musiqueTab :Music[]= [
    {
        id: 1,
        musique: "",
        name: "muz 1"

    },
    {
        id: 2,
        musique: "",
        name: "muz 2"
    },
    {
        id: 3,
        musique: "",
        name: "muz 3"
    }, {
        id: 4,
        musique: "",
        name: "muz 4"
    }, {
        id: 5,
        musique: "",
        name: "muz 5"
    }, {
        id: 6,
        musique: "",
        name: "muz 6"
    },
    {
        id: 7,
        musique: "",
        name: "muz 6"
    }
    ,
    {
        id: 8,
        musique: "",
        name: "muz 6"
    },
    {
        id: 9,
        musique: "",
        name: "muz 6"
    },
    {
        id: 10,
        musique: "",
        name: "muz 6"
    }
]

//Wait function
function wait(ms:number):Promise<void>{
    return  new Promise((resolve)=>setTimeout(resolve,ms))
}

export const updateMusiquePromise =wait(500).then(()=>{
    return musiqueTab.map((obj,index)=>{

        if (obj.musique ===""){
            console.log('import tab id',importTab[index])
            return{
                ...obj,
                musique:importTab[index]
            }
        }else return obj
    })

})





/*that not working for updating and element in the array
for (let i=0;i<importTab.length;i++){
    if(musiqueTab[i].musique===""){
        musiqueTab[i].musique = importTab[i]
    }
}*/

updateMusiquePromise.then((obj)=>console.log('the update array is:',obj))


console.log("update musique outside setTimeout: ", updateMusique);
