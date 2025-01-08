// components/DataFetcher.tsx
import React from "react";
import Table from "./Table";
import { fetchData } from "@/app/dataFetch/fetchData";
import { ErrorScreen } from "@/components/error-screen";

interface DataFetcherProps {
  endPoint: string;
  pageEndPoint: string;
  role: string;
}

const DataFetcher: React.FC<DataFetcherProps> = async ({
  endPoint,
  pageEndPoint,
}) => {
  const response = await fetchData({ endPoint });

  return (
    <>
      {response?.data ? (
        <Table data={response.data} endPoint={pageEndPoint} />
      ) : (
        <ErrorScreen error={response?.message} />
      )}
    </>
  );
};

export default DataFetcher;
