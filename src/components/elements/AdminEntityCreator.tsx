"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import {
  AdminEntityCreatorProps,
  AdminEntityFieldConfig,
  AdminEntityFieldValue,
} from "../../types/Index";

const buildInitialValues = (
  fields: AdminEntityFieldConfig[],
  initialValues?: Record<string, AdminEntityFieldValue>
) =>
  fields.reduce<Record<string, AdminEntityFieldValue>>((accumulator, field) => {
    if (initialValues && initialValues[field.name] !== undefined) {
      accumulator[field.name] = initialValues[field.name];
      return accumulator;
    }

    if (field.defaultValue !== undefined) {
      accumulator[field.name] = field.defaultValue;
      return accumulator;
    }

    if (field.type === "image-list") {
      accumulator[field.name] = [""];
      return accumulator;
    }

    accumulator[field.name] = field.type === "checkbox" ? false : "";
    return accumulator;
  }, {});

const generateDocumentId = () => {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID().replace(/-/g, "").slice(0, 20);
  }

  return Math.random().toString(36).slice(2, 22);
};

export default function AdminEntityCreator({
  buttonLabel,
  title,
  parentPath,
  fields,
  documentIdLabel = "Document ID",
  cancelLabel = "Cancel",
  saveLabel = "Save",
  onSave,
  open,
  onOpenChange,
  showTrigger = true,
  triggerClassName = "admin-add-entity-button",
  showPrefixPlus = true,
  initialDocumentId,
  initialValues,
  showAutoId = true,
  syncFieldWithDocumentId,
}: AdminEntityCreatorProps) {
  const defaultValues = useMemo(
    () => buildInitialValues(fields, initialValues),
    [fields, initialValues]
  );
  const isControlled = open !== undefined;
  const isEditing = Boolean(initialDocumentId);
  const [internalOpen, setInternalOpen] = useState(false);
  const [documentId, setDocumentId] = useState("");
  const [formValues, setFormValues] =
    useState<Record<string, AdminEntityFieldValue>>(defaultValues);
  const [isSaving, setIsSaving] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const isOpen = isControlled ? open : internalOpen;

  const setOpenState = useCallback(
    (nextOpen: boolean) => {
      if (!isControlled) {
        setInternalOpen(nextOpen);
      }

      onOpenChange?.(nextOpen);
    },
    [isControlled, onOpenChange]
  );

  useEffect(() => {
    setFormValues(defaultValues);
    setDocumentId(initialDocumentId ?? "");
    setSubmitError("");
  }, [defaultValues, initialDocumentId]);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenState(false);
      }
    };

    document.body.classList.add("admin-overlay-open");
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.classList.remove("admin-overlay-open");
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, setOpenState]);

  const closeOverlay = () => {
    setOpenState(false);
    setDocumentId(initialDocumentId ?? "");
    setFormValues(defaultValues);
    setIsSaving(false);
    setSubmitError("");
  };

  const openOverlay = () => {
    setDocumentId(initialDocumentId ?? "");
    setFormValues(defaultValues);
    setSubmitError("");
    setOpenState(true);
  };

  const updateDocumentId = (value: string) => {
    setDocumentId(value);

    if (!isEditing && syncFieldWithDocumentId) {
      setFormValues((currentValues) => ({
        ...currentValues,
        [syncFieldWithDocumentId]: value,
      }));
    }
  };

  const updateFieldValue = (name: string, value: AdminEntityFieldValue) => {
    setFormValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }));
  };

  const updateImageItem = (
    fieldName: string,
    index: number,
    value: string
  ) => {
    const currentValue = formValues[fieldName];
    const nextImages = Array.isArray(currentValue) ? [...currentValue] : [""];
    nextImages[index] = value;
    updateFieldValue(fieldName, nextImages);
  };

  const addImageItem = (fieldName: string) => {
    const currentValue = formValues[fieldName];
    const nextImages = Array.isArray(currentValue) ? [...currentValue, ""] : [""];
    updateFieldValue(fieldName, nextImages);
  };

  const removeImageItem = (fieldName: string, index: number) => {
    const currentValue = formValues[fieldName];
    const nextImages = Array.isArray(currentValue)
      ? currentValue.filter((_, imageIndex) => imageIndex !== index)
      : [];

    updateFieldValue(fieldName, nextImages.length > 0 ? nextImages : [""]);
  };

  const getImageListValue = (fieldName: string): string[] => {
    const currentValue = formValues[fieldName];
    return Array.isArray(currentValue) ? currentValue : [""];
  };

  const normalizeValue = (
    field: AdminEntityFieldConfig,
    value: AdminEntityFieldValue
  ): AdminEntityFieldValue => {
    if (field.type === "number") {
      if (typeof value === "number") {
        return value;
      }

      const nextValue = Number(String(value).trim());
      return Number.isNaN(nextValue) ? 0 : nextValue;
    }

    if (field.type === "image-list") {
      return Array.isArray(value)
        ? value.map((image) => image.trim()).filter(Boolean)
        : [];
    }

    return value;
  };

  const shouldForceDocumentIdSync = !isEditing && Boolean(syncFieldWithDocumentId);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedValues = fields.reduce<Record<string, AdminEntityFieldValue>>(
      (accumulator, field) => {
        accumulator[field.name] = normalizeValue(field, formValues[field.name]);
        return accumulator;
      },
      {}
    );

    if (shouldForceDocumentIdSync && syncFieldWithDocumentId) {
      normalizedValues[syncFieldWithDocumentId] = documentId.trim();
    }

    if (!onSave) {
      closeOverlay();
      return;
    }

    try {
      setSubmitError("");
      setIsSaving(true);
      await onSave({
        id: documentId.trim() || undefined,
        originalDocumentId: initialDocumentId?.trim() || undefined,
        values: normalizedValues,
      });
      closeOverlay();
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "Failed to save changes"
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      {showTrigger ? (
        <button
          type="button"
          className={triggerClassName}
          onClick={openOverlay}
        >
          {showPrefixPlus ? `+ ${buttonLabel}` : buttonLabel}
        </button>
      ) : null}

      {isOpen ? (
        <div className="admin-entity-overlay" onClick={closeOverlay}>
          <div
            className="admin-entity-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="admin-entity-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="admin-entity-header">
              <div>
                <h2 id="admin-entity-title">{title}</h2>
                <p>Parent path</p>
                <strong>{parentPath}</strong>
              </div>
              <button
                type="button"
                className="admin-entity-close"
                onClick={closeOverlay}
                aria-label="Close add entity form"
              >
                x
              </button>
            </div>

            <form className="admin-entity-form" onSubmit={handleSubmit}>
              <div className="admin-entity-document-row">
                <label>
                  <span>{documentIdLabel}</span>
                  <input
                    type="text"
                    value={documentId}
                    onChange={(event) => updateDocumentId(event.target.value)}
                    placeholder={
                      isEditing
                        ? "Document ID cannot be changed"
                        : "Leave blank to use an auto-generated ID"
                    }
                    disabled={isEditing}
                    required={shouldForceDocumentIdSync}
                  />
                </label>
                {showAutoId ? (
                  <button
                    type="button"
                    className="admin-entity-auto-id"
                    onClick={() => updateDocumentId(generateDocumentId())}
                  >
                    Auto-ID
                  </button>
                ) : null}
              </div>

              <div className="admin-entity-fields">
                {fields.map((field) => (
                  <div key={field.name} className="admin-entity-field-card">
                    <div className="admin-entity-field-meta">
                      <label htmlFor={`field-${field.name}`}>{field.label}</label>
                      <span>{field.type}</span>
                    </div>

                    {field.type === "textarea" ? (
                      <textarea
                        id={`field-${field.name}`}
                        value={String(formValues[field.name] ?? "")}
                        onChange={(event) =>
                          updateFieldValue(field.name, event.target.value)
                        }
                        placeholder={field.placeholder}
                        required={field.required}
                        rows={field.rows ?? 4}
                        disabled={
                          shouldForceDocumentIdSync &&
                          syncFieldWithDocumentId === field.name
                        }
                      />
                    ) : field.type === "image-list" ? (
                      <div className="admin-entity-image-list">
                        {getImageListValue(field.name).map((imageValue, index) => (
                          <div
                            key={`${field.name}-${index}`}
                            className="admin-entity-image-item"
                          >
                            <div className="admin-entity-image-row">
                              <input
                                id={`field-${field.name}-${index}`}
                                type="text"
                                value={imageValue}
                                onChange={(event) =>
                                  updateImageItem(
                                    field.name,
                                    index,
                                    event.target.value
                                  )
                                }
                                placeholder={field.placeholder}
                                required={field.required && index === 0}
                              />
                              <button
                                type="button"
                                className="admin-entity-remove-image"
                                onClick={() => removeImageItem(field.name, index)}
                                disabled={getImageListValue(field.name).length === 1}
                              >
                                Remove
                              </button>
                            </div>

                            {imageValue ? (
                              <div className="admin-entity-image-preview">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={imageValue} alt={`Preview ${index + 1}`} />
                              </div>
                            ) : null}
                          </div>
                        ))}

                        <button
                          type="button"
                          className="admin-entity-add-image"
                          onClick={() => addImageItem(field.name)}
                        >
                          + {field.addItemLabel ?? `Add ${field.label}`}
                        </button>
                      </div>
                    ) : field.type === "select" ? (
                      <select
                        id={`field-${field.name}`}
                        value={String(formValues[field.name] ?? "")}
                        onChange={(event) =>
                          updateFieldValue(field.name, event.target.value)
                        }
                        required={field.required}
                        disabled={
                          shouldForceDocumentIdSync &&
                          syncFieldWithDocumentId === field.name
                        }
                      >
                        <option value="">Select an option</option>
                        {field.options?.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    ) : field.type === "checkbox" ? (
                      <label className="admin-entity-checkbox">
                        <input
                          id={`field-${field.name}`}
                          type="checkbox"
                          checked={Boolean(formValues[field.name])}
                          onChange={(event) =>
                            updateFieldValue(field.name, event.target.checked)
                          }
                        />
                        <span>{field.placeholder ?? field.label}</span>
                      </label>
                    ) : (
                      <input
                        id={`field-${field.name}`}
                        type={field.type}
                        value={String(formValues[field.name] ?? "")}
                        onChange={(event) =>
                          updateFieldValue(field.name, event.target.value)
                        }
                        placeholder={field.placeholder}
                        required={field.required}
                        disabled={
                          shouldForceDocumentIdSync &&
                          syncFieldWithDocumentId === field.name
                        }
                      />
                    )}

                    {field.helperText ? (
                      <p className="admin-entity-helper">{field.helperText}</p>
                    ) : null}
                  </div>
                ))}
              </div>

              {submitError ? (
                <p className="admin-entity-submit-error">{submitError}</p>
              ) : null}

              <div className="admin-entity-actions">
                <button type="button" onClick={closeOverlay}>
                  {cancelLabel}
                </button>
                <button type="submit" disabled={isSaving}>
                  {isSaving ? "Saving..." : saveLabel}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}
