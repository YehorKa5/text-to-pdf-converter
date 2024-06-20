import { Worker, Viewer } from "@react-pdf-viewer/core";

import "@react-pdf-viewer/core/lib/styles/index.css";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import Button from "./Button";

type PDFViewerProps = {
  url: string;
  closePdfFile: () => void;
};

const PDFViewer = ({ url, closePdfFile }: PDFViewerProps) => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  return (
    <div className="mt-4">
      <Button
        buttonClasses="bg-orange-500 hover:bg-orange-700 rounded mb-3"
        onClick={closePdfFile}
      >
        Закрити PDF файл
      </Button>
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
        <Viewer
          fileUrl={url}
          plugins={[defaultLayoutPluginInstance]}
          defaultScale={1}
        />
      </Worker>
    </div>
  );
};

export default PDFViewer;
