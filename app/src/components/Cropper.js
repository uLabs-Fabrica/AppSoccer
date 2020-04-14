import React,{useState, useCallback, useEffect} from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { Dialog } from 'primereact/dialog';
import { Button } from "primereact/button";

const Cropper = (props) =>{
    console.log(props);
    const [upImg, setUpImg] = useState();
    const [imgRef, setImgRef] = useState(null);
    const [crop, setCrop] = useState({ unit: '%', width: 10, aspect: 9 / 9 });
    const [previewUrl, setPreviewUrl] = useState();
    const [modalCrop, setModalCrop] = useState();
    const [finalBlob, setFinalBlob] = useState();
    console.log(props);
    useEffect(()=>{
        console.log(props);
        setModalCrop(props.modalCrop);
        if(props.imgSelect!=null){
            const reader = new FileReader();
            console.log("if");
            reader.addEventListener('load', () => setUpImg(reader.result));
            reader.readAsDataURL(props.imgSelect);
        }
        console.log("effect");
    })

    const onLoad = useCallback(img => {
        console.log(img);
        setImgRef(img);
    }, []);

    const makeClientCrop = async crop => {
        console.log("imgRef")
        console.log(imgRef);
        console.log("crop")
        console.log(crop);

        if (imgRef && crop.width && crop.height) {
            createCropPreview(imgRef, crop, 'newFile.jpeg');
        }
    };

    const createCropPreview = async (image, crop, fileName) => {
        const canvas = document.createElement('canvas');
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext('2d');

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
        );

        return new Promise((resolve, reject) => {
            canvas.toBlob(blob => {
                if (!blob) {
                    reject(new Error('Canvas is empty'));
                    return;
                }
                blob.name = fileName;
                setFinalBlob(blob);
                window.URL.revokeObjectURL(previewUrl);
                setPreviewUrl(window.URL.createObjectURL(blob));
            }, 'image/jpeg');
        });
    };

    
    const cropped = () => {
        console.log(finalBlob);
        console.log(finalBlob);
        if (finalBlob) {
            props.onHide();
            props.onCut(finalBlob);
        }
    }
    const onHide= ()=>{
        props.onHide();
    }
    const renderFooter = (
        <div>
            <Button label="Cortar" onClick={cropped} icon="pi pi-check" />
            <Button label="Cancelar" icon="pi pi-times" onClick={onHide} className="p-button-secondary" />
        </div>
    );
    return(
        <Dialog header="Corte a sua imagem" visible={modalCrop} style={{ width: '50vw' }} footer={renderFooter} onHide={onHide}>
            <ReactCrop
                src={upImg}
                onImageLoaded={onLoad}
                crop={crop}
                onChange={c => setCrop(c)}
                onComplete={makeClientCrop}
            />
        </Dialog>
    )
}
export default Cropper;