---
layout: doc
title: MSBuildComponent
description: Advanced evaluation with MSBuild engine.
permalink: /doc/Scripts/SBE-Scripts/Components/MSBuildComponent/
---
# MSBuildComponent

Advanced evaluation with [MSBuild engine]({{site.docp}}/Scripts/MSBuild/).

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

## Multiline support

[ v0.12.10+ ]

Now supports multiline definition of MSBuild data, for example:

```{{site.sbelang}}
$([MSBuild]::Add($(revDeltaMin), $([MSBuild]::Modulo($(revBuild), $([MSBuild]::Subtract($(revDeltaMax), $(revDeltaMin)))))))
```

you can format like this:

```{{site.sbelang}}
#[$(
    [MSBuild]::Add(
        $(revDeltaMin), 
        $([MSBuild]::Modulo(
            $(revBuild), 
            $([MSBuild]::Subtract(
                $(revDeltaMax), 
                $(revDeltaMin)
             ))
          ))
    )
)]
```
*please note: the original MSBuild engine still does not support any newline symbols.*

```{{site.sbelang}}
#[$(
    [System.Math]::Exp('$(
        [MSBuild]::Multiply(
            $([System.Math]::Log(10)), 
            4
        ))'
    )
)]
```

```{{site.sbelang}}
#[var revBuild  = #[$(
                    [System.TimeSpan]::FromTicks('$(
                        [MSBuild]::Subtract(
                        $(tNow), 
                        $(tBase))
                    )')
                    .TotalMinutes
                    .ToString('0'))]]
```

# References

* [MSBuild]({{site.docp}}/Scripts/MSBuild/)
* [SBE-Scripts]({{site.docp}}/Scripts/SBE-Scripts/)
* [Examples & Features]({{site.docp}}/Examples/)
* [Math operations]({{site.docp}}/Features/Math/)