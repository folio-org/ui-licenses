const historyPushMock = jest.fn();

const mockButtons = [
  { handlerKey: 'onClone', label: 'CloneButton' },
  { handlerKey: 'onClose', label: 'CloseButton' },
  { handlerKey: 'onDelete', label: 'DeleteButton' },
  { handlerKey: 'onEdit', label: 'EditButton' },
  { callback: historyPushMock, handlerKey: 'onAmendmentClick', label: 'ViewAmendmentButton' },
  { handlerKey: 'onToggleHelper', label: 'HandleToggleHelperButton' },
  { handlerKey: 'onToggleTags', label: 'HandleToggleTagsButton' },
];

export {
  historyPushMock,
  mockButtons
};
