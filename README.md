# JS-Joda integration for Zod validation library

[![Release](https://github.com/dasprid/zod-joda/actions/workflows/release.yml/badge.svg)](https://github.com/dasprid/zod-joda/actions/workflows/release.yml)
[![codecov](https://codecov.io/gh/DASPRiD/zod-joda/branch/main/graph/badge.svg?token=I960P1I5FR)](https://codecov.io/gh/DASPRiD/zod-joda)

This library adds additional types for [Zod](https://github.com/colinhacks/zod/) to parse and validate dates, times and durations as
[js-joda](https://github.com/js-joda/js-joda) types. This library has support for both `zod` and `@zod/mini`.

## Installation

```bash
npm install zod-joda @js-joda/core

# a) Install zod peer dependency for full zod support
npm install zod

# b) Install zod mini for size optimized results 
npm install @zod/mini
```
  
## Quick Start

Import the schema types from this package. You can either import individual types or import all types via convenience
method:

```typescript
import {zj} from 'zod-joda';
```

For `@zod/mini`, import from the mini sub-path:

```typescript
import {zj} from 'zod-joda/mini';
```

This library supplies the following types:

- `zj.duration()`
- `zj.localDate()`
- `zj.localDateTime()`
- `zj.localTime()`
- `zj.zonedDateTime()`

All constructors except `duration` take an optional object with a `dateTimeFormatter` property, which allows you to
change the default behavior of how dates and times will be parsed. By default, every value should be in an ISO 8601
format. 
