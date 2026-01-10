import type { FC, ReactElement, ReactNode } from 'react';
import {
  CopyIcon,
  KEY_MAP,
  MergeIcon,
  PrettifyIcon,
  ToolbarButton,
  useGraphiQLActions,
} from '@graphiql/react';

// cURL icon - terminal/command prompt style
const CurlIcon: FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <polyline points="4 17 10 11 4 5" />
    <line x1="12" y1="19" x2="20" y2="19" />
  </svg>
);

// Python icon - simplified Python logo
const PythonIcon: FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M11.914 0C5.82 0 6.2 2.656 6.2 2.656l.007 2.752h5.814v.826H3.9S0 5.789 0 11.969c0 6.18 3.403 5.96 3.403 5.96h2.03v-2.867s-.109-3.42 3.35-3.42h5.766s3.24.052 3.24-3.148V3.202S18.28 0 11.914 0zM8.708 1.85c.578 0 1.046.47 1.046 1.052 0 .581-.468 1.051-1.046 1.051-.578 0-1.046-.47-1.046-1.051 0-.582.468-1.052 1.046-1.052z" />
    <path d="M12.086 24c6.094 0 5.714-2.656 5.714-2.656l-.007-2.752h-5.814v-.826h8.121s3.9.445 3.9-5.735c0-6.18-3.403-5.96-3.403-5.96h-2.03v2.867s.109 3.42-3.35 3.42H9.451s-3.24-.052-3.24 3.148v5.292S5.72 24 12.086 24zm3.206-1.85c-.578 0-1.046-.47-1.046-1.052 0-.581.468-1.051 1.046-1.051.578 0 1.046.47 1.046 1.051 0 .582-.468 1.052-1.046 1.052z" />
  </svg>
);

// Node.js icon - simplified Node logo
const NodejsIcon: FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M11.998 24c-.321 0-.641-.084-.922-.247l-2.936-1.737c-.438-.245-.224-.332-.08-.383.585-.203.703-.25 1.328-.604.065-.037.151-.023.218.017l2.256 1.339c.082.045.198.045.275 0l8.795-5.076c.082-.047.134-.141.134-.238V6.921c0-.099-.053-.19-.137-.242l-8.791-5.072c-.081-.047-.189-.047-.271 0L3.075 6.68c-.085.05-.139.143-.139.242v10.15c0 .097.054.189.139.235l2.409 1.392c1.307.653 2.108-.116 2.108-.89V7.787c0-.142.114-.253.256-.253h1.115c.139 0 .255.112.255.253v10.021c0 1.745-.95 2.745-2.604 2.745-.508 0-.909 0-2.026-.551l-2.304-1.327c-.57-.329-.922-.943-.922-1.596V6.921c0-.653.352-1.267.922-1.596l8.795-5.082c.557-.315 1.296-.315 1.848 0l8.794 5.082c.57.329.924.943.924 1.596v10.15c0 .653-.354 1.267-.924 1.596l-8.794 5.078c-.28.163-.6.247-.924.247" />
  </svg>
);

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
    {copyCurl}
    {copyPython}
    {copyNodejs}
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
    <ToolbarButton onClick={copyCurl} label="Copy as cURL">
      <CurlIcon className="graphiql-toolbar-icon" />
    </ToolbarButton>
  );

  const copyPythonButton = (
    <ToolbarButton onClick={copyPython} label="Copy as Python">
      <PythonIcon className="graphiql-toolbar-icon" />
    </ToolbarButton>
  );

  const copyNodejsButton = (
    <ToolbarButton onClick={copyNodejs} label="Copy as Node.js">
      <NodejsIcon className="graphiql-toolbar-icon" />
    </ToolbarButton>
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
