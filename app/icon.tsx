import { ImageResponse } from "next/og";

// Google shows favicons in search results and prefers sizes that are multiples of 48px.
export const size = { width: 48, height: 48 };
export const contentType = "image/png";

export default function Icon() {
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
          borderRadius: 12,
          color: "#ffffff",
          fontSize: 30,
          fontWeight: 700,
        }}
      >
        A
        <div
          style={{
            width: 7,
            height: 7,
            borderRadius: 9999,
            background: "#b6d7a8",
            marginLeft: 1,
            marginTop: 16,
          }}
        />
      </div>
    ),
    size,
  );
}
