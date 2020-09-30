import React from "react"
import { useCurrentUser } from "app/hooks/useCurrentUser"
export const CurrentUser = () => {
  const currentUser = useCurrentUser()
  currentUser ? (
    <div
      style={{
        display: "flex",
        backgroundColor: "rgba(93, 185, 239, 1)",
        color: "white",
      }}
    >
      <div
        style={{
          color: "white",
          backgroundColor: "rgba(116, 194, 240)",
          padding: "10px",
          textAlign: "left",
          fontSize: "0,9em",
          marginRight: "20px",
          textTransform: "uppercase",
        }}
      >
        <a href="Home">Home</a>
      </div>
      <div
        style={{
          color: "white",
          backgroundColor: "rgba(116, 194, 240)",
          padding: "10px",
          textAlign: "left",
          fontSize: "0,9em",
          marginRight: "20px",
          textTransform: "uppercase",
          display: "initial",
        }}
      >
        <a href="Fietsen">Fietsen</a>
      </div>
    </div>
  ) : (
    <div
      style={{
        display: "flex",
        backgroundColor: "rgba(93, 185, 239, 1)",
        color: "white",
      }}
    >
      <div
        style={{
          color: "white",
          backgroundColor: "rgba(116, 194, 240)",
          padding: "10px",
          textAlign: "left",
          fontSize: "0,9em",
          marginRight: "20px",
          textTransform: "uppercase",
        }}
      >
        <a href="Home">Home</a>
      </div>
      <div
        style={{
          color: "white",
          backgroundColor: "rgba(116, 194, 240)",
          padding: "10px",
          textAlign: "left",
          fontSize: "0,9em",
          marginRight: "20px",
          textTransform: "uppercase",
          display: "none",
        }}
      >
        <a href="Fietsen">Fietsen</a>
      </div>
    </div>
  )
  return <> </>
}
