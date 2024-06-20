import { useState } from "react";
import { convertTextToPDF } from "./services/api";
import PDFViewer from "./components/PDFViewer";
import { Conversion } from "./types";
import { getConversions, saveConversion } from "./services/storage";
import TextInput from "./components/TextInput";
import ConversionsList from "./components/ConversionsList";
import Button from "./components/Button";

function App() {
  const [pdfText, setPdfText] = useState("");
  const [pdfUrl, setPdfUrl] = useState("");
  const [pdfConvertions, setPdfConvertions] = useState<Conversion[]>(
    getConversions()
  );

  const handleConvert = async () => {
    try {
      const pdfBlob = await convertTextToPDF(pdfText);
      const url = URL.createObjectURL(pdfBlob);

      const newConvertion = {
        text: pdfText,
        url,
        id: window.self.crypto.randomUUID(),
      };

      setPdfUrl(url);
      saveConversion(newConvertion);
      setPdfConvertions((prev) => [...prev, newConvertion]);
      setPdfText("");
    } catch (e) {
      console.log(e);
    }
  };

  const closePdfFile = () => {
    setPdfUrl("");
  };

  const isTextInputEmpty = !pdfText.trim();

  return (
    <div className="container mx-auto p-4">
      <TextInput text={pdfText} setText={setPdfText} />
      <Button
        onClick={handleConvert}
        buttonClasses={
          isTextInputEmpty
            ? "bg-blue-200 cursor-default"
            : "bg-blue-500 hover:bg-blue-700"
        }
        disabled={isTextInputEmpty}
      >
        Конвертувати в PDF
      </Button>
      {pdfUrl && <PDFViewer url={pdfUrl} closePdfFile={closePdfFile} />}
      <ConversionsList conversions={pdfConvertions} setPdfUrl={setPdfUrl} />
    </div>
  );
}

export default App;
