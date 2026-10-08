import type {
  CreateProjectPayload,
  ProjectEntity,
  ProjectFormData,
} from "../interfaces";

export const EMPTY_PROJECT_FORM: ProjectFormData = {
  tradeName: "",
  nif: "",
  sector: "",
  email: "",
  phone: "",
  website: "",
  streetAddress: "",
  neighborhood: "",
  city: "",
  country: "",
};

/** ProjectEntity (API) -> ProjectFormData (formulário) */
export function toProjectFormData(
  project?: ProjectEntity | null,
): ProjectFormData {
  if (!project) return EMPTY_PROJECT_FORM;
  const { company } = project;

  return {
    tradeName: company.tradeName ?? "",
    nif: company.nif ?? "",
    sector: company.sector ?? "",
    email: company.contacts?.email ?? "",
    phone: company.contacts?.phone ? String(company.contacts.phone) : "",
    website: company.website ?? "",
    streetAddress: company.address?.streetAddress ?? "",
    neighborhood: company.address?.neighborhood ?? "",
    city: company.address?.city ?? "",
    country: company.address?.country ?? "",
  };
}

/** ProjectFormData (formulário) -> body de POST /api/v4/projects */
export function toCreateProjectPayload(
  form: ProjectFormData,
): CreateProjectPayload {
  return {
    company: {
      tradeName: form.tradeName.trim(),
      nif: form.nif.trim(),
      sector: form.sector.trim(),
      contacts: {
        phone: Number(form.phone.replace(/\D/g, "")),
        email: form.email.trim().toLowerCase(),
      },
      address: {
        streetAddress: form.streetAddress.trim(),
        neighborhood: form.neighborhood.trim(),
        city: form.city.trim(),
        country: form.country.trim(),
      },
      website: form.website.trim(),
    },
  };
}
