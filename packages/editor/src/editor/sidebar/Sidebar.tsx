import { Button, SidebarHeader, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, useHotkeys } from '@axonivy/ui-components';
import { IvyIcons } from '@axonivy/ui-icons';
import { useTranslation } from 'react-i18next';
import { useAppContext } from '../../context/AppContext';
import { useAction } from '../../context/useAction';
import { useKnownHotkeys } from '../../utils/useKnownHotkeys';

export const Sidebar = () => {
  const { helpUrl, selectedElement } = useAppContext();
  const { t } = useTranslation();
  const openUrl = useAction('openUrl');
  const { openHelp: helpText } = useKnownHotkeys();
  useHotkeys(helpText.hotkey, () => openUrl(helpUrl), { scopes: ['global'] });

  return (
    <>
      <SidebarHeader
        title={selectedElement ?? t('title.detail')}
        icon={IvyIcons.PenEdit}
        className='role-editor-detail-header'
        tabIndex={-1}
      >
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button icon={IvyIcons.Help} onClick={() => openUrl(helpUrl)} aria-label={helpText.label} />
            </TooltipTrigger>
            <TooltipContent>{helpText.label}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </SidebarHeader>
      {/* <VariablesDetailContent /> */}
    </>
  );
};
