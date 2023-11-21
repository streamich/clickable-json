import * as React from 'react';
import {storiesOf} from '@storybook/react';
import {ClickableJson} from '..';
import {applyPatch} from 'json-joy/lib/json-patch';

const doc1 = {
  foo: 'bar',
  test: null,
  inner: {
    name: 'Vadim',
  },
};

const doc2 = {
  id: 'pj7ryzaia1',
  model: 1.6,
  cid: 'og6f0o9v1c',
  type: 'p',
  created: 1596445997247,
  modified: 1596445997381,
  pid: '92lmu7fs9a',
  depth: 1,
  mime: 'image/png',
  ext: 'png',
  file: 'image.png',
  w: 624,
  h: 1390,
  omark: [{x1: 0.027777777777777776, y1: 0.8438848920863309, x2: 0.25, y2: 0.8827338129496403}],
  isPost: true,
  isMature: false,
  parent: null,
  poster: {
    id: 'xxsdfasdf-asdf-asdf-asdf-asdfasdfasdf',
    name: 'Muhammad',
    list: [1, true, false, null, 'asdf'],
  },
};

const Demo: React.FC<{doc: unknown}> = (props) => {
  const [doc, setDoc] = React.useState<unknown>(props.doc);
  const onChange = (patch) => {
    const result = applyPatch(doc, patch, false);
    setDoc(result.doc);
  };
  return (
    <div style={{padding: '32px 64px'}}>
      <ClickableJson doc={doc} onChange={onChange} />
    </div>
  );
};

storiesOf('Molecules|JsonBuilder', module)
  .add('Default', () => (
    <div style={{padding: '32px 64px'}}>
      <ClickableJson doc={doc1} onChange={(patch) => console.log('onChange', patch)} />
    </div>
  ))
  .add('Post', () => (
    <div style={{padding: '32px 64px'}}>
      <ClickableJson doc={doc2} onChange={(patch) => console.log('onChange', patch)} />
    </div>
  ))
  .add('read-only', () => (
    <div style={{padding: '32px 64px'}}>
      <ClickableJson doc={doc2} />
    </div>
  ))
  .add('Interactive', () => <Demo doc={doc2} />)
  .add('Interactive empty', () => <Demo doc={null} />)
  .add('[formal]', () => (
    <div style={{padding: '32px 64px'}}>
      <ClickableJson doc={doc2} formal />
    </div>
  ))
  .add('[compact]', () => (
    <div style={{padding: '32px 64px'}}>
      <ClickableJson doc={doc2} formal compact />
    </div>
  ));
