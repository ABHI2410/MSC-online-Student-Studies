import Button from "@mui/material/Button";

export default function fileUploadButton() {
  const [file, setfile] = React.useState();
  const handleFile = (event) => {
    setfile(event.target.files[0]);
  };
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });
  return (
    <Button
      component="label"
      variant="contained"
      startIcon={<CloudUploadIcon />}
    >
      Upload file
      <VisuallyHiddenInput onChange={handleFile} type="file" />
    </Button>
  );
}
