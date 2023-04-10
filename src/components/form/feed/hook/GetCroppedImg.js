export const croppedImg = (img, cropped) => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  const dep = document.querySelector(".reactEasyCrop_Image");

  console.log(cropped.x, cropped.y, cropped.width, cropped.height);

  // console.log(dep);

  // console.log(ctx?.drawImage(dep, 3, 100, cropped.width, cropped.height));
  ctx?.drawImage(dep, -cropped.x / 2, -cropped.y / 2, 400, 800);
  document.body.appendChild(canvas);

  return <img alt="" />;
};
