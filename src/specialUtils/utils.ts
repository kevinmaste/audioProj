import axios from "axios";


export const handleDownload = async (videoId:string,songName:string)=>{
    try {
        const response = await
            axios.get(`http://localhost:8080/api//download/${videoId}?name=${songName}`,
            {responseType: 'blob'})
        //console.log('data is ',response.data)
        //il faut créer un URL telechargarble en front-end=
        const url = window.URL.createObjectURL(new Blob([response.data]))

        console.log('url is ',url)
        const link = document.createElement("a")
        link.href = url;
        link.setAttribute("download",`${songName}.mp3`);
        document.body.appendChild(link);

        //permit to start the download when we click the fonction
        link.click()

        //clean up and remove the link
      //  link.parentNode?.removeChild(link)

    }catch (e) {
        console.log("L'erreur est : ",e)
    }

}