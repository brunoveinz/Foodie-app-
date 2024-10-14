'use client'

import { useRef, useState } from 'react'
import clasess from './image-picker.module.css'
import Image from 'next/image';

const ImagePicker = ({label, name}) => {
    const [pickedImage, setPicketImage] = useState();
    const imageInput = useRef();

    function handlePickClick(){
        imageInput.current.click();
    }

    function handleImageChange(){
        const file = event.target.files[0];

        if(!file) {
            setPicketImage(null)
            return;
        }

        const fileReader = new FileReader();

        fileReader.onload = () => {
            setPicketImage(fileReader.result)
        }

        fileReader.readAsDataURL(file);
    }

    return (
        <div className={clasess.picker}>
            <label htmlFor={name}>{label}</label>
            <div className={clasess.controls}>
                <div className={clasess.preview}>
                    {!pickedImage && <p>No image picket yet</p>}
                    {pickedImage && <Image src={pickedImage} alt='The image selected by the user' fill/>}
                </div>
                <input 
                    className={clasess.input}
                    type='file' 
                    id={name} 
                    accept="image/png, image/jpeg" 
                    name={name}
                    ref={imageInput}
                    onChange={handleImageChange}
                    required
                />
                <button 
                    className={clasess.button} 
                    type="button"
                    onClick={handlePickClick}
                >
                    Pick an Image
                </button>

            </div>
        </div>
    )
}

export default ImagePicker