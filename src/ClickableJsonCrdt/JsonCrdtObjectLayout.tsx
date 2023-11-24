import * as React from 'react';
import {ObjectLayout, ObjectLayoutProps} from '../ObjectLayout';
import {useStyles} from '../context/style';

export interface JsonCrdtObjectLayoutProps extends ObjectLayoutProps {}

export const JsonCrdtObjectLayout: React.FC<JsonCrdtObjectLayoutProps> = ({...rest}) => {
  const {collapsed: startsCollapsed} = useStyles();
  const [collapsed, setCollapsed] = React.useState(startsCollapsed);

  return <ObjectLayout collapsed={collapsed} onCollapserClick={() => setCollapsed(!collapsed)} {...rest} />;
};
