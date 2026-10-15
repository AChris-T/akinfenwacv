import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0a0a",
          color: "#ffffff",
          fontSize: 110,
          fontWeight: 700,
        }}
      >
        A
        <div
          style={{
            width: 24,
            height: 24,
            borderRadius: 9999,
            background: "#b6d7a8",
            marginLeft: 4,
            marginTop: 62,
          }}
        />
      </div>
    ),
    size,
  );
}
