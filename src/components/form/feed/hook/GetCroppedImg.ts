export const croppedImg = (img: any, cropped: any) => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  const data =
    "https://img.huffingtonpost.com/asset/5ab4d4ac2000007d06eb2c56.jpeg?cache=sih0jwle4e&ops=1910_1000";

  console.log(cropped, img);
};
