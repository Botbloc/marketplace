export type AdminEntityFieldValue = string | number | boolean | string[];
export type AdminEntityPayloadValue =
  | AdminEntityFieldValue
  | Record<string, string>;

export type AdminEntityFieldOption = {
  label: string;
  value: string;
};

export type AdminEntityFieldConfig = {
  name: string;
  label: string;
  type:
    | "text"
    | "email"
    | "number"
    | "select"
    | "textarea"
    | "checkbox"
    | "image-list";
  placeholder?: string;
  defaultValue?: AdminEntityFieldValue;
  options?: AdminEntityFieldOption[];
  helperText?: string;
  required?: boolean;
  rows?: number;
  addItemLabel?: string;
};

export type AdminEntityCreatorPayload = {
  id?: string;
  originalDocumentId?: string;
  values: Record<string, AdminEntityPayloadValue>;
};

export type AdminEntityCreatorProps = {
  buttonLabel: string;
  title: string;
  parentPath: string;
  fields: AdminEntityFieldConfig[];
  documentIdLabel?: string;
  cancelLabel?: string;
  saveLabel?: string;
  onSave?: (
    payload: AdminEntityCreatorPayload
  ) => void | Promise<void>;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  showTrigger?: boolean;
  triggerClassName?: string;
  showPrefixPlus?: boolean;
  initialDocumentId?: string;
  initialValues?: Record<string, AdminEntityFieldValue>;
  showAutoId?: boolean;
  syncFieldWithDocumentId?: string;
};
