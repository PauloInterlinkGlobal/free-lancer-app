"use client";

import { Button } from "@/core/components/Button";
import { Input } from "@/core/components/Input";
import { useToastStore } from "@/core/store";
import { Building2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState, type ChangeEvent, type FormEvent } from "react";
import type {
  ProjectEntity,
  ProjectFormData,
  ProjectFormErrors,
} from "../interfaces";
import { createProject } from "../services/project.service";
import {
  toCreateProjectPayload,
  toProjectFormData,
} from "../utils/project-mapper";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const URL_REGEX = /^(https?:\/\/)?([\w-]+\.)+[a-z]{2,}(\/\S*)?$/i;
const PHONE_REGEX = /^\+?\d{9,15}$/;
const NIF_REGEX = /^[0-9A-Z]{9,14}$/i;

type Translate = ReturnType<typeof useTranslations>;

function validate(v: ProjectFormData, t: Translate): ProjectFormErrors {
  const errors: ProjectFormErrors = {};

  if (!v.tradeName.trim()) errors.tradeName = t("errors.required");
  if (v.nif.trim() && !NIF_REGEX.test(v.nif.trim()))
    errors.nif = t("errors.nif");
  if (v.email.trim() && !EMAIL_REGEX.test(v.email.trim()))
    errors.email = t("errors.email");
  if (v.phone.trim() && !PHONE_REGEX.test(v.phone.replace(/[\s-]/g, "")))
    errors.phone = t("errors.phone");
  if (v.website.trim() && !URL_REGEX.test(v.website.trim()))
    errors.website = t("errors.website");

  return errors;
}

interface ProjectFormProps {
  initialData?: ProjectEntity | null;
}

export function ProjectForm({ initialData }: ProjectFormProps) {
  const t = useTranslations("settings.project.companyData");
  const { success, error } = useToastStore();

  const [initial, setInitial] = useState<ProjectFormData>(() =>
    toProjectFormData(initialData),
  );
  const [values, setValues] = useState<ProjectFormData>(initial);
  const [errors, setErrors] = useState<ProjectFormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const isDirty = JSON.stringify(values) !== JSON.stringify(initial);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleCancel = () => {
    setValues(initial);
    setErrors({});
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const found = validate(values, t);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setIsLoading(true);
    try {
      // Sem HTTP: o serviço apenas regista o payload e simula a resposta.
      await createProject(toCreateProjectPayload(values));
      setInitial(values);
      success(t("success"));
    } catch {
      error(t("errors.generic"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="flex flex-col gap-6 rounded-2xl bg-surface p-5 shadow-sm md:p-6"
    >
      <div className="flex items-start gap-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center text-primary">
          <Building2 size={24} aria-hidden />
        </span>

        <div className="min-w-0">
          <h2 className="text-lg font-bold leading-tight text-primary-content md:text-xl">
            {t("title")}
          </h2>
          <p className="mt-1 text-sm text-muted-content">{t("description")}</p>
        </div>
      </div>

      <fieldset
        disabled={isLoading}
        className="grid grid-cols-1 gap-4 md:grid-cols-2"
      >
        <Input
          id="tradeName"
          name="tradeName"
          label={t("fields.tradeName.label")}
          placeholder={t("fields.tradeName.placeholder")}
          value={values.tradeName}
          onChange={handleChange}
          error={errors.tradeName}
          required
        />

        <Input
          id="nif"
          name="nif"
          label={t("fields.nif.label")}
          placeholder={t("fields.nif.placeholder")}
          value={values.nif}
          onChange={handleChange}
          error={errors.nif}
        />

        <Input
          id="streetAddress"
          name="streetAddress"
          label={t("fields.streetAddress.label")}
          placeholder={t("fields.streetAddress.placeholder")}
          value={values.streetAddress}
          onChange={handleChange}
          error={errors.streetAddress}
        />

        <Input
          id="sector"
          name="sector"
          label={t("fields.sector.label")}
          placeholder={t("fields.sector.placeholder")}
          value={values.sector}
          onChange={handleChange}
          error={errors.sector}
        />

        <Input
          id="email"
          name="email"
          type="email"
          label={t("fields.email.label")}
          placeholder={t("fields.email.placeholder")}
          value={values.email}
          onChange={handleChange}
          error={errors.email}
        />

        <Input
          id="phone"
          name="phone"
          type="tel"
          inputMode="tel"
          label={t("fields.phone.label")}
          placeholder={t("fields.phone.placeholder")}
          value={values.phone}
          onChange={handleChange}
          error={errors.phone}
        />

        <Input
          id="website"
          name="website"
          type="url"
          label={t("fields.website.label")}
          placeholder={t("fields.website.placeholder")}
          value={values.website}
          onChange={handleChange}
          error={errors.website}
        />
      </fieldset>

      <div className="flex justify-end gap-2 border-t border-divider pt-4">
        <Button
          type="button"
          variant="ghost"
          onClick={handleCancel}
          disabled={!isDirty || isLoading}
        >
          {t("actions.cancel")}
        </Button>

        <Button type="submit" disabled={!isDirty} isLoading={isLoading}>
          {t("actions.save")}
        </Button>
      </div>
    </form>
  );
}

export default ProjectForm;
