import * as firebase from 'firebase';
import Jimp from 'jimp';

export const uploadFiles = async(fileList: FileList) => {

    
    const storage = firebase.storage();
    let files: File[] = [];

    for (var i = 0; i < fileList.length; i++) {
        files.push(fileList.item(i));
    }

    const promises = files.map(async file => {
        return new Promise((resolve, reject) => {
            try {
                const ref = storage.ref(file.name);
                const wmref = storage.ref('watermark.png');
                const reader = new FileReader();
                reader.onload = async() => {
                    const buffer = reader.result as ArrayBuffer;
                    const url = await wmref.getDownloadURL();
                    const [image, wm] = await Promise.all([
                            Jimp.read(Buffer.from(buffer)),
                            Jimp.read(url)
                    ]);
                    const mime = image._originalMime ? image._originalMime : Jimp.MIME_JPEG;
                    image.composite(wm, 0, 0)
                    .getBuffer(mime, (err, buffer) => {
                        const metadata = {
                            contentType: mime,
                          };
                        ref.put(buffer, metadata);
                        resolve()
                    }); 
                }
                reader.readAsArrayBuffer(file);
            }
            catch(err) {
                reject(err)
            }
        })
    })

    return await Promise.all(promises)
}