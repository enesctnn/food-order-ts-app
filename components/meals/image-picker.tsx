'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import classes from './image-picker.module.css';
function ImagePicker({ label, name }: { label: string; name: string }) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [pickedImage, setPickedImage] = useState<string | ArrayBuffer | null>(
    null
  );

  const imagePickHandler = () => inputRef.current?.click();

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      setPickedImage(null);
      return;
    }

    const fileReader = new FileReader();

    fileReader.onload = () => {
      setPickedImage(fileReader.result);
    };

    fileReader.readAsDataURL(file);
  };

  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {!pickedImage && <p>No image picked yet.</p>}
          {pickedImage && (
            <Image
              src={pickedImage.toString()}
              alt="uploaded user image"
              fill
            />
          )}
        </div>
        <input
          ref={inputRef}
          className={classes.input}
          type="file"
          id={name}
          name={name}
          accept="image/png, image/jpeg"
          onChange={handleImageChange}
          required
        />
        <button
          className={classes.button}
          type="button"
          onClick={imagePickHandler}
        >
          Pick an Image
        </button>
      </div>
    </div>
  );
}

export default ImagePicker;
