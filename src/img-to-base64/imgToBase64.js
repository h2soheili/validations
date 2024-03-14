
export const ImgToBase64 = (file, setValue) => {
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    setValue({
      base64: reader.result,
    });
  };
};
