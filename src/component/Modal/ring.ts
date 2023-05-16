// @ts-ignore


export const ring = (ring:string)=>{

    console.log("ring is :",ring)
    const audio = document.createElement("audio")

    audio.setAttribute('autoPlay','')
    const source = document.createElement('source')

    source.src = ring
    source.type = "audio/mpeg"

    audio.appendChild(source);

    document.body.appendChild(audio)
}