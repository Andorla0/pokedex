export function showSuccess(toastRef, summary, detail) {
  toastRef.current?.show({
    severity: 'success',
    summary,
    detail,
    life: 2500,
  });
}

export function showError(toastRef, summary, detail) {
  toastRef.current?.show({
    severity: 'error',
    summary,
    detail,
    life: 3500,
  });
}