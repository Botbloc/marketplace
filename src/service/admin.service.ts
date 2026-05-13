import { fetchWithSessionAuth } from "../lib/api";
import { AdminEntityCreatorPayload } from "../types/Index";

type AdminWriteMethod = "POST" | "PATCH";

type AdminWriteResponse = {
  success?: boolean;
  message?: string;
  data?: unknown;
  [key: string]: unknown;
};

const buildAdminRequestBody = (
  payload: AdminEntityCreatorPayload,
  mode: "create" | "update"
) => ({
  documentId: payload.documentId,
  originalDocumentId:
    mode === "update" ? payload.originalDocumentId : undefined,
  ...payload.values,
});

const writeAdminEntity = async (
  endpoint: string,
  method: AdminWriteMethod,
  payload: AdminEntityCreatorPayload,
  mode: "create" | "update"
) => {
  const requestUrl = `${process.env.NEXT_PUBLIC_URL ?? ""}${endpoint}`;

  return fetchWithSessionAuth<AdminWriteResponse>(
    requestUrl,
    { method },
    buildAdminRequestBody(payload, mode)
  );
};

export const createAdminEntity = async (
  endpoint: string,
  payload: AdminEntityCreatorPayload
) => writeAdminEntity(endpoint, "POST", payload, "create");

export const updateAdminEntity = async (
  endpoint: string,
  payload: AdminEntityCreatorPayload
) => writeAdminEntity(endpoint, "PATCH", payload, "update");
