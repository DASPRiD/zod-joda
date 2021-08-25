# JS-Joda integration for Zod validation library

[![Node.js CI](https://github.com/dasprid/zod-joda/actions/workflows/ci.yml/badge.svg)](https://github.com/dasprid/zod-joda/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/DASPRiD/zod-joda/branch/main/graph/badge.svg?token=I960P1I5FR)](https://codecov.io/gh/DASPRiD/zod-joda)

This library adds additional types to [Zod](https://github.com/colinhacks/zod/) to parse and validate dates and times
as [js-joda](https://github.com/js-joda/js-joda) types.

## Installation

- Install the npm package:

    `npm install zod-joda`
  
- Additionally, you should have both zod and js-joda installed:

    `npm install zod @js-joda/core`
  
## Quick Start

Import the schema types from this package. You can either import individual types or import all types via convenience
method:

```typescript
import {zj} from 'zod-joda';
```

This library supplies the following types:

- `zj.localDate()`
- `zj.localDateTime()`
- `zj.localTime()`
- `zj.zonedDateTime()`

All constructors take an optional object with a `dateTimeFormatter` property, which allows you to change the default
behavior of how dates and times will be parsed. By default, every value should be in an ISO 8601 format. 
