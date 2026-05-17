"use client";

type HeaderImageProps = {
  code: string; // e.g., "CA-BC"
};

export function HeaderImage({ code }: HeaderImageProps) {
  const pngPath = `/headers/png/${code}.png`;

  return (
    <img
      src={pngPath}
      alt={`${code} header`}
      className="w-full h-auto"
    />
  );
}