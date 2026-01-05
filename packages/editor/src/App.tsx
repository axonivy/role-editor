import type { RoleContext } from '@axonivy/role-editor-protocol';
import { useTranslation } from 'react-i18next';

type RoleEditorProps = {
  context: RoleContext;
  directSave?: boolean;
};

function App(props: RoleEditorProps) {
  const { t } = useTranslation();
  return <h1 {...props}>{t('label')}</h1>;
}

export default App;
