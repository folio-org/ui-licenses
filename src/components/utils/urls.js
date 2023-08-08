const urls = {
  licenses: () => '/licenses',
  licenseEdit: id => `/licenses/${id}/edit`,
  licenseView: id => `/licenses/${id}`,
  notes: () => '/licenses/notes',
  noteView: id => `/licenses/notes/${id}`,
  noteEdit: id => `/licenses/notes/${id}/edit`,
  noteCreate: () => '/licenses/notes/create',

  amendments: () => '/licenses/amendments',
  amendmentNativeView: (lId, aId) => `/licenses/amendments/${aId}/license/${lId}`,
  amendmentView: (lId, aId) => `/licenses/${lId}/amendments/${aId}`,
  amendmentCreate: lId => `/licenses/${lId}/amendments/create`,
  amendmentEdit: (lId, aId) => `/licenses/${lId}/amendments/${aId}/edit`,
  amendmentNativeEdit: (lId, aId) => `/licenses/amendments/${aId}/license/${lId}/edit`,
};

export default urls;
