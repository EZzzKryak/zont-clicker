import { useState } from "react";

interface IDataStatus {
  ok: true | false;
}
interface IError extends IDataStatus {
  error: string;
  error_ui: string;
}

interface IData extends IDataStatus  {
  count: number;
}

const useFetch = () => {
    const [data, setData] = useState<IData>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<IError | null>(null);

    const fetchData = async (url: string, options: RequestInit = {}) => {
      setIsLoading(true);
      try {
        const res = await fetch(url, options);
        const data = await res.json();
        if(data.ok) {
          setData(data);
          setError(null);
        }
        if(!data.ok) {
          setError(data);
        }
        setIsLoading(false);
      } catch (err) {
        throw new Error();
      }
    };
  
    return { data, error, isLoading, fetchData };
};

export default useFetch;