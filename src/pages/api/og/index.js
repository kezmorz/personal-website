import { ImageResponse } from "@vercel/og";

const og = (req) => {
  const { searchParams } = req.nextUrl;

  const description = searchParams.get("description");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: 48,
          color: "#FAFAFA",
          backgroundColor: "#1C1C1C",
        }}
      >
        <div
          style={{
            width: "100%",
            height: 72,
            display: "flex",
            alignItems: "center",
            paddingBottom: 24,
            borderBottom: "2px solid #FAFAFA",
            boxSizing: "border-box",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt="logo"
            width="48"
            src="https://github.com/kezmorz.png"
            style={{
              borderRadius: 24,
            }}
          />
          <span style={{ marginLeft: 16, fontSize: 24 }}>cerimorse.com</span>
        </div>
        <div
          style={{
            width: "100%",
            flex: "1",
            marginTop: 24,
            fontSize: 64,
          }}
        >
          {description}
        </div>
        <div
          style={{
            width: "100%",
            height: 144,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: 32 }}>Ceri Morse</span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt="avatar"
            width="144"
            src="https://res.cloudinary.com/cerimorse-com/image/upload/f_auto,c_limit,w_144,q_auto/meta/avatar"
            style={{
              borderRadius: 72,
            }}
          />
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
};

export const config = {
  runtime: "experimental-edge",
};

export default og;
