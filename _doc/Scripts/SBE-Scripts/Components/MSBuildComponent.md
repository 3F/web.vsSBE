---
layout: doc
title: MSBuildComponent
description: Forcing evaluation with MSBuild engine.
permalink: /doc/Scripts/SBE-Scripts/Components/MSBuildComponent/
---
# MSBuildComponent

Forcing evaluation with [MSBuild engine]({{site.docp}}/Scripts/MSBuild/).

[ v0.12.6+ ]

This is a very simple component (as a mediator) for immediate result from expression via [MSBuild]({{site.docp}}/Scripts/MSBuild/).

Syntax:

```{{site.sbelang1}}
#[$(...)]
```

Samples:

```{{site.sbelang}}
#[$(name)]
```

```{{site.sbelang}}
#[$([System.String]::Format("v{0}/{1}", $(v), $(r)))]
```

# References

* [MSBuild]({{site.docp}}/Scripts/MSBuild/)
* [SBE-Scripts]({{site.docp}}/Scripts/SBE-Scripts/)
* [Examples & Features]({{site.docp}}/Examples/)