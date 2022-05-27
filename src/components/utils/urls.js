const urls = {
  licenses: () => '/licenses',
  license: id => `/licenses/${id}`,
  licensesEdit: id => `licenses/${id}/edit`,
  notes: () => '/licenses/notes',
  noteView: id => `/licenses/notes/${id}`,
  noteEdit: id => `/licenses/notes/${id}/edit`,
  noteCreate: () => '/licenses/notes/create',
};

export default urls;
