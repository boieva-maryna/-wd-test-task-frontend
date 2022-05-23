import {
  QueryKey,
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from "react-query";
import { AxiosError } from "axios";
import BaseApiService from "./BaseApiService";
import { AxiosRequestConfig } from "axios";

export const useApiQuery = <TReturnData = any, TRequestPayload = any>(
  key: QueryKey,
  requestOptions: AxiosRequestConfig<TRequestPayload>,
  queryOptions?: Omit<
    UseQueryOptions<TReturnData, AxiosError, TReturnData, QueryKey>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery<TReturnData, AxiosError, TReturnData, QueryKey>(
    key,
    async () => {
      const response = await BaseApiService(requestOptions);
      return response.data;
    },
    queryOptions
  );
};

export const useApiMutation = <TReturnData, TRequestPayload>(
  requestOptions: AxiosRequestConfig<TRequestPayload>,
  mutationOptions?: Omit<
    UseMutationOptions<TReturnData, AxiosError, TRequestPayload>,
    "mutationFn"
  >
) => {
  return useMutation<TReturnData, AxiosError, TRequestPayload>(
    async (data: TRequestPayload) => {
      const response = await BaseApiService({ ...requestOptions, data });
      return response.data;
    },
    mutationOptions
  );
};
