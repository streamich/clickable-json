import type {StrApi} from 'json-joy/es2020/json-crdt';
import type {ITimestampStruct} from 'json-joy/es2020/json-crdt-patch/clock';
import type {SimpleChange} from './types';

export const applyChange = (str: string, [position, remove, insert]: SimpleChange): string =>
  str.slice(0, position) + insert + str.slice(position + remove);

export const indexToId = (str: StrApi, index: number): ITimestampStruct | void => {
  return str.node.find(index);
};

export const idToIndex = (str: StrApi, id: ITimestampStruct): number => {
  const chunk = str.node.findById(id);
  if (!chunk) return -1;
  const pos = str.node.pos(chunk);
  return pos + (chunk.del ? 0 : id.time - chunk.id.time);
};
