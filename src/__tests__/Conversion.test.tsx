import axios from "axios";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "../App";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

Object.defineProperty(URL, "createObjectURL", {
  writable: true,
  value: () => "http://url",
});

jest.mock("@react-pdf-viewer/core", () => ({
  Worker: jest.fn(),
  Viewer: jest.fn(),
}));

jest.mock("@react-pdf-viewer/default-layout", () => ({
  defaultLayoutPlugin: jest.fn(),
}));

let uuid = 1;
const selfMockValue = {
  crypto: {
    randomUUID: () => uuid++,
  },
};

Object.defineProperty(window, "self", {
  value: selfMockValue,
});

const PDFFileText = "Hello, Universe!";
describe("Text to pdf app tests", () => {
  beforeEach(() => {
    const mockResponse = {
      data: new Blob(["Mock PDF content"], { type: "application/pdf" }),
    };
    mockedAxios.post.mockResolvedValue(mockResponse);

    render(<App />);
  });
  it("should display converted file in the list", async () => {
    const textArea = screen.getByPlaceholderText("Введіть текст тут...");
    const convertButton = screen.getByText("Конвертувати в PDF");

    fireEvent.change(textArea, { target: { value: PDFFileText } });
    fireEvent.click(convertButton);

    const conversionsListItems = await screen.findAllByTestId(
      "conversions-list-item"
    );

    expect(conversionsListItems).toHaveLength(1);
    expect(conversionsListItems[0]).toHaveTextContent(PDFFileText);
  });

  it("should display block with viewer after conversion", async () => {
    const textArea = screen.getByPlaceholderText("Введіть текст тут...");
    const convertButton = screen.getByText("Конвертувати в PDF");

    fireEvent.change(textArea, { target: { value: PDFFileText } });
    fireEvent.click(convertButton);

    const closePDFButton = await screen.findByText("Закрити PDF файл");
    expect(closePDFButton).toBeInTheDocument();
  });
});
