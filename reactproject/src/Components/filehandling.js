import React from "react";
// import { Document } from "react-doc-viewer";
// import ZipViewer from "react-zip-viewer";
// import CSVReader from "react-csv-reader";
// Import the main component
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { toolbarPlugin } from "@react-pdf-viewer/toolbar";
import "@react-pdf-viewer/toolbar/lib/styles/index.css";
export const PdfViewer = ({ PdfUrl }) => {
  const toolbarPluginInstance = toolbarPlugin();
  return (
    <Worker
      workerUrl={"https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js"}
    >
      <div
        style={{
          border: "1px solid rgba(0, 0, 0, 0.3)",
          height: "750px",
        }}
      >
        <Viewer
          fileUrl={PdfUrl}
          plugins={[toolbarPluginInstance]}
          httpHeaders={{
            Authorization:
              "Bearer " + localStorage.getItem("LoginManager.accessToken"),
          }}
        />
      </div>
    </Worker>
  );
};

export const PlainTextViewer = ({ textContent }) => {
  return <pre>{textContent}</pre>;
};
export const JsonViewer = ({ jsonData }) => {
  return <pre>{JSON.stringify(jsonData, null, 2)}</pre>;
};

export const TextViewer = ({ textContent }) => {
  return <pre>{textContent}</pre>;
};

export const ImageViewer = ({ imageUrl }) => {
  return <img src={imageUrl} alt="Image" />;
};

// export const CsvViewer = ({ csvUrl }) => {
//   return <CSVReader url={csvUrl} />;
// };

// export const ZipFileViewer = ({ zipUrl }) => {
//   return <ZipViewer url={zipUrl} />;
// };

// export const WordViewer = ({ docUrl }) => {
//   return <Document file={docUrl} />;
// };
