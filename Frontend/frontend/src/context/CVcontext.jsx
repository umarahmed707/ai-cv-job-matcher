import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const CVContext = createContext(null);

export const CVProvider = ({ children }) => {
  const [cvResult, setCvResult] = useState(() => {
    try {
      const savedResult = sessionStorage.getItem("cvResult");

      if (!savedResult) {
        return null;
      }

      return JSON.parse(savedResult);
    } catch (error) {
      console.error("Failed to load CV result:", error);

      sessionStorage.removeItem("cvResult");

      return null;
    }
  });

  useEffect(() => {
    try {
      if (cvResult) {
        sessionStorage.setItem(
          "cvResult",
          JSON.stringify(cvResult)
        );
      } else {
        sessionStorage.removeItem("cvResult");
      }
    } catch (error) {
      console.error("Failed to save CV result:", error);
    }
  }, [cvResult]);

  const saveCVResult = (result) => {
    setCvResult(result);
  };

  const clearCVResult = () => {
    setCvResult(null);
  };

  return (
    <CVContext.Provider
      value={{
        cvResult,
        saveCVResult,
        clearCVResult,
      }}
    >
      {children}
    </CVContext.Provider>
  );
};

export const useCV = () => {
  const context = useContext(CVContext);

  if (context === null) {
    throw new Error(
      "useCV must be used inside CVProvider"
    );
  }

  return context;
};