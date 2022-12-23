import { Image } from "antd";
import ImageNext from "next/image";
import PublicImage from "public/images";

export default function AppImage({ src, className, alt }: any) {
  return (
    <>
      {src ? (
        <Image src={src} alt="" />
      ) : (
        <ImageNext
          className={className}
          src={PublicImage?.blankImg}
          alt={alt || ""}
        />
      )}
    </>
  );
}
