// src/lib/toFormData.js
export function toFormData(obj, form = new FormData(), prefix) {
  if (obj == null) return form;
  if (obj instanceof File || obj instanceof Blob) {
    form.append(prefix || "file", obj);
    return form;
  }
  if (typeof obj === "object" && !(obj instanceof Date)) {
    Object.keys(obj).forEach((k) => {
      const v = obj[k];
      const key = prefix ? `${prefix}[${k}]` : k;
      if (v instanceof File || v instanceof Blob) {
        form.append(key, v);
      } else if (Array.isArray(v)) {
        v.forEach((item, i) => toFormData(item, form, `${key}[${i}]`));
      } else if (v !== null && typeof v === "object") {
        toFormData(v, form, key);
      } else if (v !== undefined) {
        form.append(key, String(v));
      }
    });
    return form;
  }
  form.append(prefix || "value", String(obj));
  return form;
}
