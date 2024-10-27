export const ViolationViewModelType = {
  Loading: 'Loading',
  Rejected: 'Rejected',
  WithViolations: 'WithViolations',
  WithoutViolations: 'WithoutViolations',
}

export const violationViewModel = (store) => {
  const violations = store.violation.getViolations()
  const violationsState = store.violation.state

  if (violationsState === 'pending') {
    return {
      type: ViolationViewModelType.Loading,
    }
  }

  if (violationsState === 'rejected') {
    return {
      type: ViolationViewModelType.Rejected,
    }
  }
  if ((violations.length === 0 && violationsState === 'fulfilled') || violationsState === 'idle') {
    return {
      type: ViolationViewModelType.WithoutViolations,
    }
  }

  return {
    type: ViolationViewModelType.WithViolations,
    violations: violations,
  }
}
