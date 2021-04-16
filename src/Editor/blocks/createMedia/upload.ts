import axios from "axios";

export function uploadMedia(
  file: any,
  {
    name,
    onProgress,
  }: {
    name?: string;
    onProgress?: (progress: number) => void;
  }
) {
  const fromData = new FormData();
  fromData.append("media", file, name || file.name);
  console.log(fromData.values());

  return axios
    .post("http://localhost:5000/upload/single", fromData, {
      headers: {
        "content-type": "multipart/form-data",
      },
      onUploadProgress: (progressEvent) => {
        const progress = progressEvent.loaded / progressEvent.total;
        if (onProgress) {
          console.log("> File uploading", `${100 * progress}%`);
          onProgress(progress);
        }
      },
    })
    .then((res) => {
      return res.data;
    });
}
