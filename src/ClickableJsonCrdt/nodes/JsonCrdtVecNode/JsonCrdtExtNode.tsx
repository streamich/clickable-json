import * as React from 'react';
import {NodeRef} from '../../NodeRef';
import {JsonCrdtRegion} from '../../JsonCrdtRegion';
import {JsonCrdtProperty} from '../../JsonCrdtProperty';
import {JsonCrdtObjectLayout} from '../../JsonCrdtObjectLayout';
import {useRerenderModel} from '../../hooks';
import {JsonCrdtConstant} from '../../JsonCrdtConstant';
import {id} from '../../utils';
import {VecNode} from 'json-joy/lib/json-crdt';
import {JsonAtom} from '../../../JsonAtom';

export interface JsonCrdtExtNodeProps {
  node: NodeRef<VecNode>;
}

export const JsonCrdtExtNode: React.FC<JsonCrdtExtNodeProps> = ({node}) => {
  useRerenderModel();

  const vec = node.node as VecNode<any>;
  const view = vec.view();

  return (
    <JsonCrdtRegion node={node} extension>
      <JsonCrdtObjectLayout
        node={node}
        property={<JsonCrdtProperty node={node} />}
        collapsedView={<JsonAtom value={view} />}
        brackets={['(', ')']}
        // header={<span style={{opacity: 0.5, display: 'inline-block', margin: '0.25em 0 0 -0.3em'}}>→</span>}
      >
        <JsonCrdtConstant id={id(node)} view={view} />
      </JsonCrdtObjectLayout>
    </JsonCrdtRegion>
  );
};
