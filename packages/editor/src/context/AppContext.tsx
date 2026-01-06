import { type RoleContext, type RoleData, type ValidationResult } from '@axonivy/role-editor-protocol';
import { useReadonly, type useHistoryData } from '@axonivy/ui-components';
import { createContext, useContext, useState } from 'react';
import type { UpdateConsumer } from '../types/types';

export type UI = {
  properties: boolean;
  helpPaddings: boolean;
  deviceMode: 'desktop' | 'tablet' | 'mobile';
};

const DEFAULT_UI: UI = { properties: false, helpPaddings: true, deviceMode: 'desktop' };

export const useUiState = () => {
  const readonly = useReadonly();
  const [ui, setUi] = useState<UI>(readonly ? { ...DEFAULT_UI, helpPaddings: false } : DEFAULT_UI);
  return { ui, setUi };
};

export type AppContext = {
  data: Array<RoleData>;
  setData: UpdateConsumer<Array<RoleData>>;
  selectedElement?: string;
  setSelectedElement: (element?: string) => void;
  context: RoleContext;
  history: ReturnType<typeof useHistoryData<Array<RoleData>>>;
  validations: Array<ValidationResult>;
  detail: boolean;
  setDetail: (visible: boolean) => void;
  helpUrl: string;
};

export const appContext = createContext<AppContext>({
  data: [],
  setData: data => data,
  setSelectedElement: () => {},
  context: { app: '', pmv: '', file: '' },
  history: { push: () => {}, undo: () => {}, redo: () => {}, canUndo: false, canRedo: false },
  validations: [],
  detail: true,
  setDetail: () => {},
  helpUrl: ''
});

export const AppProvider = appContext.Provider;

export const useAppContext = (): AppContext & { setUnhistorisedVariables: UpdateConsumer<Array<RoleData>> } => {
  const context = useContext(appContext);
  return {
    ...context,
    setData: updateData => {
      context.setData(old => {
        const newData = updateData(old);
        context.history.push(newData);
        return newData;
      });
    },
    setUnhistorisedVariables: context.setData
  };
};
