import { useMemo, useState } from "react";
import useEnhancedEffect from "@/hooks/useEnhancedEffect";
import useEventListener from "@/hooks/useEventListener";
import parseJSON from "@/utils/parseJson";

const data = {};

const readLocalStorage = (key, defaultValue) => {
  try {
    return data[key] ?? parseJSON(localStorage.getItem(key));
  } catch (error) {
    return defaultValue;
  }
};

const setLocalStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    data[key] = undefined;
    return true;
  } catch {
    data[key] = value;
    return false;
  }
};

const removeLocalStorage = (key) => {
  data[key] = undefined;
  localStorage.removeItem(key);
};

const useLocalStorage = (key, initialValue) => {
  const defaultValueForKey = useMemo(() => {
    const value =
      typeof initialValue === "function" ? initialValue() : initialValue;
    return value;
  }, [key]);
  const [storedValue, setStoredValue] = useState(defaultValueForKey);

  const setValue = useMemo(() => {
    return (newValue) => {
      const value =
        typeof newValue === "function" ? newValue(storedValue) : newValue;
      setLocalStorage(key, value);
      setStoredValue(value);
      dispatchEvent(new Event("localstorage"));
    };
  }, [key]);

  const removeValue = useMemo(() => {
    return () => {
      removeLocalStorage(key);
      setStoredValue(defaultValueForKey);
      dispatchEvent(new Event("localstorage"));
    };
  }, [key]);

  useEventListener("storage", () => {
    setStoredValue(readLocalStorage(key, defaultValueForKey));
  });
  useEventListener("localstorage", () => {
    setStoredValue(readLocalStorage(key, defaultValueForKey));
  });

  useEnhancedEffect(() => {
    const value = readLocalStorage(key, defaultValueForKey);
    if (value === undefined) {
      return;
    }
    setLocalStorage(key, value);
    setStoredValue(value);
  }, []);

  return [storedValue, setValue, removeValue];
};

export default useLocalStorage;
