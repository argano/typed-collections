# typed-collections

A collection utility module for TypeScript


## Usage

```
npm install typed-collections
```

```
import { List } from "typed-collections";

const list = List.fromArray([
  { id: "1", data: 1000 },
  { id: "2", data: 2000 }
]);

const idMap = list.toIDMap();
console.log(idMap.getOrFail("1"));
```

## Classes

- StrictMap
- List

## Interfaces

- ListItem
- ConnectionLike
- PageInfoLike

## Functions

- createEmptyConnectionLike


## Contribution

1. Fork it ( http://github.com/argano/typed-collections )
2. Create your feature branch (git checkout -b my-new-feature)
3. Commit your changes (git commit -am 'Add some feature')
4. Push to the branch (git push origin my-new-feature)
5. Create new Pull Request

## License

MIT
