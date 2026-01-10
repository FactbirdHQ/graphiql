import type { FC, ReactElement, ReactNode } from 'react';
import {
  CopyIcon,
  KEY_MAP,
  MergeIcon,
  PrettifyIcon,
  ToolbarButton,
  ToolbarMenu,
  useGraphiQLActions,
} from '@graphiql/react';

const DefaultToolbarRenderProps: FC<{
  prettify: ReactNode;
  copy: ReactNode;
  merge: ReactNode;
  copyCurl: ReactNode;
  copyPython: ReactNode;
  copyNodejs: ReactNode;
}> = ({ prettify, copy, merge, copyCurl, copyPython, copyNodejs }) => (
  <>
    {prettify}
    {merge}
    {copy}
    <ToolbarMenu
      button={
        <ToolbarButton label="Copy code snippet">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="graphiql-toolbar-icon"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5"
            />
          </svg>
        </ToolbarButton>
      }
    >
      {copyCurl}
      {copyPython}
      {copyNodejs}
    </ToolbarMenu>
  </>
);

/**
 * Configure the UI by providing this Component as a child of GraphiQL.
 */
export const GraphiQLToolbar: FC<{
  children?: typeof DefaultToolbarRenderProps | ReactNode;
}> = ({ children = DefaultToolbarRenderProps }) => {
  const isRenderProp = typeof children === 'function';
  const {
    copyQuery,
    prettifyEditors,
    mergeQuery,
    copyCurl,
    copyPython,
    copyNodejs,
  } = useGraphiQLActions();

  if (!isRenderProp) {
    return children as ReactElement;
  }

  const prettify = (
    <ToolbarButton
      onClick={prettifyEditors}
      label={`Prettify query (${KEY_MAP.prettify.key})`}
    >
      <PrettifyIcon className="graphiql-toolbar-icon" aria-hidden="true" />
    </ToolbarButton>
  );

  const merge = (
    <ToolbarButton
      onClick={mergeQuery}
      label={`Merge fragments into query (${KEY_MAP.mergeFragments.key})`}
    >
      <MergeIcon className="graphiql-toolbar-icon" aria-hidden="true" />
    </ToolbarButton>
  );

  const copy = (
    <ToolbarButton
      onClick={copyQuery}
      label={`Copy query (${KEY_MAP.copyQuery.key})`}
    >
      <CopyIcon className="graphiql-toolbar-icon" aria-hidden="true" />
    </ToolbarButton>
  );

  const copyCurlButton = (
    <ToolbarMenu.Item onSelect={copyCurl}>Copy as cURL</ToolbarMenu.Item>
  );

  const copyPythonButton = (
    <ToolbarMenu.Item onSelect={copyPython}>Copy as Python</ToolbarMenu.Item>
  );

  const copyNodejsButton = (
    <ToolbarMenu.Item onSelect={copyNodejs}>Copy as Node.js</ToolbarMenu.Item>
  );

  return children({
    prettify,
    copy,
    merge,
    copyCurl: copyCurlButton,
    copyPython: copyPythonButton,
    copyNodejs: copyNodejsButton,
  });
};
