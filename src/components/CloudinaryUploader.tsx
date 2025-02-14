'use client';

import { CldUploadButton } from 'next-cloudinary';

const cloudPresetName = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME;

interface CloudinaryUploaderProps {
  onUploadSuccess: (urls: string[]) => void;
}

const CloudinaryUploader: React.FC<CloudinaryUploaderProps> = ({ onUploadSuccess }) => {
  const handleUpload = (result: any) => {
    if (result.event === 'success' && result.info) {
      const uploadedImageUrl = result.info.secure_url;
    //   console.log(uploadedImageUrl)
      onUploadSuccess([uploadedImageUrl]); // Pass URL to parent component
    }
  };

  return (
    <div className="flex items-left justify-start">
      <CldUploadButton
        options={{ multiple: true }}
        uploadPreset={cloudPresetName}
        onSuccess={handleUpload}
        className="bg-green-400 py-2 px-3 rounded border mt-4 text-white hover:bg-green-500 transition ease-in-out delay-200"
      >
        <span className="text-2xl">Upload Images</span>
      </CldUploadButton>
    </div>
  );
};

export default CloudinaryUploader;
