import { memo } from "react";
import { Conversion } from "../types";

type ConversionsListProps = {
  conversions: Conversion[];
  setPdfUrl: (url: string) => void;
};

const CONVERSION_TEXT_MAX_LENGTH = 20;
const getConversionText = (convertionText: string) => {
  return convertionText.length > CONVERSION_TEXT_MAX_LENGTH
    ? `${convertionText.slice(0, CONVERSION_TEXT_MAX_LENGTH)}...`
    : convertionText;
};

const ConversionsList = ({ conversions, setPdfUrl }: ConversionsListProps) => {
  return (
    <div className="mt-4">
      <h2 className="text-lg font-bold mb-2">Історія конвертацій</h2>
      <ul>
        {conversions.map((item) => (
          <li
            key={item.id}
            className="mb-2"
            data-testid="conversions-list-item"
          >
            <button
              onClick={() => setPdfUrl(item.url)}
              className="text-blue-500 underline"
            >
              {getConversionText(item.text)}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default memo(ConversionsList);
