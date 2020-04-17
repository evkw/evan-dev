import * as firebase from 'firebase';
import Jimp from 'jimp';

export const uploadFilesRequest = async(fileList: FileList) => {
    const storage = firebase.storage();
    const firestore = firebase.firestore();
    let files: File[] = [];

    for (var i = 0; i < fileList.length; i++) {
        files.push(fileList.item(i));
    }

    const promises = files.map(async file => {
        return new Promise((resolve, reject) => {
            try {
                const fileType = file.name.split('.').pop();
                const fileName = `${Date.now()}.${fileType}`;
                const ref = storage.ref(fileName);
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
                    .getBuffer(mime, async(err, buffer) => {
                        const metadata = {
                            contentType: mime,
                          };
                        await ref.put(buffer, metadata);
                        const original = await ref.getDownloadURL();
                        resolve({original, fileName})
                    }); 
                }
                reader.readAsArrayBuffer(file);
            }
            catch(err) {
                reject(err)
            }
        }).then((res: any) => {
            const {original, fileName} = res;
            return firestore.collection('gallery').add({
                name: fileName,
                tags: [],
                shopAddress: null,
                showInGallery: false,
                dateUploaded: new Date().toISOString(),
                images: {
                    thumbnail: '',
                    original
                }
            })
        })
    })

    return await Promise.all(promises)
}