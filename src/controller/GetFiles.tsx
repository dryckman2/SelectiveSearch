import HeldFile from "../model/heldfile";
import Axios from "axios";


export async function getFileFromId(id: string): Promise<HeldFile[]> {
    let res = await Axios.get(`http://localhost:3002/api/getFiles/${id}`);
    if (res.status === 200) {
        console.log(res.data)
        let result = new Array<HeldFile>()
       for(let i = 0; i < res.data.length;i++){
           let fileData = res.data[i];
           result.push(new HeldFile(i,fileData.filename,fileData.filecontents))
       }
       console.log(result)
       return result;
    }
    return [];
}
