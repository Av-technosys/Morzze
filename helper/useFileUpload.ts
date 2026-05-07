/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { uploadFileToS3 } from "@/lib/uploadClient";
import { useState } from "react";


export function useFileUpload() {
  const [uploading, setUploading] = useState(false);

  const upload = async (file: File, folder: any) => {
    setUploading(true);

    try {
      const preview = URL.createObjectURL(file);
      const { fileKey,fileUrl } = await uploadFileToS3(file , folder);

      return { preview, fileKey,fileUrl };
    } finally {
      setUploading(false);
    }
  };

  return { upload, uploading };
}
