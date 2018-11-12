
import serialize from './serialize'

export default function obj2Query (obj, tag) {
  return (tag === '#' ? '#' : '?') + serialize(obj)
}
