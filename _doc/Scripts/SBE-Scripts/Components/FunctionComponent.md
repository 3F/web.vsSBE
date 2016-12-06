---
layout: doc
title: FunctionComponent
description: Mixed supported functions.
permalink: /doc/Scripts/SBE-Scripts/Components/FunctionComponent/
---
# FunctionComponent

Mixed supported functions.

## hash

*v0.12.4+*

To work with hash.

### MD5

Calculate hash value with MD5.

Syntax:

```{{site.sbelang1}}
string #[Func hash.MD5(string data)]
```

Arguments:

* data - String for calculating.

Sample:

```{{site.sbelang1}}
#[Func hash.MD5("Hello World!")]
```

Result: `ED076287532E86365E841E92BFC50D8C`

### SHA1

Calculate hash value with SHA-1.

Syntax:

```{{site.sbelang1}}
string #[Func hash.SHA1(string data)]
```

Arguments:

* data - String for calculating.

Sample:

```{{site.sbelang1}}
#[Func hash.SHA1("Hello World!")]
```

Result: `2EF7BDE608CE5404E97D5F042F95F89F1C232871`