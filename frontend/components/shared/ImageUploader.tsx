import { useState, useRef, ChangeEvent } from "react";
import Image from "next/image";
import { Edit2Icon } from "lucide-react";

const ImageUploader = () => {
  const [imageUrl, setImageUrl] = useState<string | undefined>();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      className="relative flex justify-center items-center bg-dark-3 cursor-pointer flex-col overflow-hidden rounded-xl bg-grey-50"
      onClick={() => fileInputRef.current?.click()}
    >
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleImageUpload}
        accept="image/*"
      />
      {imageUrl ? (
        <div className="relative flex h-full w-full flex-1 justify-center">
          <Image
            src={imageUrl}
            alt="image"
            width={250}
            height={250}
            className="w-full object-cover object-center"
          />
          <div className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black text-white flex items-center justify-center p-2">
            <Edit2Icon />
          </div>
        </div>
      ) : (
        <div className="relative flex flex-col items-center justify-center py-5 text-grey-500">
          <Image
            src="/images/avatar.png"
            width={77}
            height={77}
            alt="file upload"
          />
          <div className="absolute top-2 right-0 w-8 h-8 rounded-full bg-black text-white flex items-center justify-center p-2">
            <Edit2Icon />
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
