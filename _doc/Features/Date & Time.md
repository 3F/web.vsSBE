---
layout: doc
title: Date & Time
permalink: /doc/Features/Date & Time/
---
# Date & Time

*Should be enabled the [MSBuild](../../Scripts/MSBuild/) support.*

In examples below, we use the [MSBuild Property Functions](https://msdn.microsoft.com/en-us/library/vstudio/dd633440%28v=vs.120%29.aspx#BKMK_PropertyFunctions) and you can use any static method or property of these system classes:

* [System.DateTime](https://msdn.microsoft.com/en-us/library/system.datetime_methods.aspx)
* [System.TimeSpan](https://msdn.microsoft.com/en-us/library/system.timespan_methods.aspx)
* [System.Math](https://msdn.microsoft.com/en-us/library/system.math_methods.aspx)
* [System.String](https://msdn.microsoft.com/en-us/library/system.string_methods.aspx)
* [System.Decimal](https://msdn.microsoft.com/en-us/library/system.decimal_methods.aspx)
* [System.Double](https://msdn.microsoft.com/en-us/library/system.double_methods.aspx)
* [System.UInt32](https://msdn.microsoft.com/en-us/library/system.uint32_methods.aspx)
* [System.Int32](https://msdn.microsoft.com/en-us/library/system.int32_methods.aspx)
* [...](https://msdn.microsoft.com/en-us/library/vstudio/dd633440%28v=vs.120%29.aspx#BKMK_Static)

## Format & Culture

* [Custom Date and Time Format Strings](https://msdn.microsoft.com/en-us/library/8kb3ddd4)
* [Standard Date and Time Format Strings](https://msdn.microsoft.com/en-us/library/az4se3k1)

*Sortable format: ~ `yyyy/MM/dd`, e.g.: `2016/08/21` for InvariantCulture*

For specific culture, use for example:

```{{site.msblang}}
$([System.DateTime]::Parse("21.08.2016", '$([System.Globalization.CultureInfo]::GetCultureInfo("ru-RU"))'))
```

```{{site.msblang}}
$([System.DateTime]::Parse("08/21/2016", '$([System.Globalization.CultureInfo]::GetCultureInfo("en-US"))'))
```

## How to get the number of ticks from specific date

We can use the next methods:

* [DateTime.Parse](https://msdn.microsoft.com/en-us/library/system.datetime.parse.aspx)
* [DateTime.ToBinary](https://msdn.microsoft.com/en-us/library/system.datetime.tobinary%28v=vs.110%29.aspx)

for example:

```{{site.msblang}}
$([System.DateTime]::Parse("2015/02/17").ToBinary())
```

```{{site.msblang}}
$([System.DateTime]::Parse("2015/02/17 07:21").ToBinary())
```

### Number of ticks from current date and time

We also should use the next properties:

* [DateTime.UtcNow](https://msdn.microsoft.com/en-us/library/system.datetime.utcnow%28v=vs.100%29.aspx)
* [DateTime.Ticks](https://msdn.microsoft.com/en-us/library/system.datetime.ticks%28v=vs.100%29.aspx)

for example ![UtcNow.Ticks]({{site.docp}}/Resources/examples/UtcNow-Ticks.gif):

```{{site.msblang}}
$([System.DateTime]::UtcNow.Ticks)
```

## How to get the total Minutes or Hours from Ticks

You should use the [TimeSpan Properties](https://msdn.microsoft.com/en-us/library/System.TimeSpan_properties%28v=vs.100%29.aspx):

* [TimeSpan.TotalMinutes](https://msdn.microsoft.com/en-us/library/system.timespan.totalminutes%28v=vs.100%29.aspx)
* [TimeSpan.TotalHours](https://msdn.microsoft.com/en-us/library/system.timespan.totalhours%28v=vs.100%29.aspx)
* [...](https://msdn.microsoft.com/en-us/library/System.TimeSpan_properties%28v=vs.100%29.aspx)

and [TimeSpan.FromTicks](https://msdn.microsoft.com/en-us/library/system.timespan.fromticks%28v=vs.100%29.aspx) method, for example:

```{{site.msblang}}
$([System.TimeSpan]::FromTicks(635618792404338780).TotalHours)
$([System.TimeSpan]::FromTicks(635618792404338780).TotalMinutes)
```
You also can use the [ToString(string)](https://msdn.microsoft.com/en-us/library/kfsatb94%28v=vs.110%29.aspx) method to get an integer value, e.g.:

```{{site.msblang}}
$([System.TimeSpan]::FromTicks(635618792404338780).TotalHours.ToString("0"))
$([System.TimeSpan]::FromTicks(635618792404338780).TotalMinutes.ToString("0"))
```

### How to get delta between the time (Ticks)

* Total **minutes** from Ticks 1 to Ticks 2:

```{{site.msblang}}
$([System.TimeSpan]::FromTicks($([MSBuild]::Subtract(635618821282084745, 635618792404338780))).TotalMinutes.ToString("0"))
```

* Total **seconds** from Ticks 1 to Ticks 2:

```{{site.msblang}}
$([System.TimeSpan]::FromTicks($([MSBuild]::Subtract(635618821282084745, 635618792404338780))).TotalSeconds.ToString("0"))
```

## Custom Date and Time Format Strings

[MSDN](https://msdn.microsoft.com/en-us/library/8kb3ddd4%28v=vs.110%29.aspx)

```{{site.msblang}}
$([System.DateTime]::UtcNow.ToString("yyyy.MM.dd_HH;mm;ss.ffff"))
```
Result: `2016.02.07_10;56;54.8265`

## Standard Date and Time Format Strings

[MSDN](https://msdn.microsoft.com/library/az4se3k1%28v=vs.100%29.aspx)

```{{site.msblang}}
$([System.DateTime]::UtcNow.ToString("o"))
```
Result: `2016-02-07T10:57:59.4937445Z`

```{{site.msblang}}
$([System.DateTime]::UtcNow.ToString("R"))
```
Result: `Sun, 07 Feb 2016 10:59:03 GMT`

## Full example for build number

You can [try this](../../Examples/Version/Manually/) If needed a some additional build number and similar.

**Notes**: 

* If you plan use the TotalMinutes as base of rev. you should note that's correct way **only if** you have one or less assemblies for 1 minute. Otherwise, you should use the similar TotalSeconds, but again only if you have one or less assemblies for 1 second etc.
* Give preference to UTC (Coordinated Universal Time) **However!** it does not give any warranty for unique numbers. Please remember about this, and be careful for developing **in team** - for this case use the our **[CI features](../../CI/)** and others...
* Use our [Wizard](../../Examples/Version/Wizard/) as an easy step for quick results.

# References #

* [Math operations](../Math/)
* [Automatic Versioning](../../Examples/Version/)
* [CI](../../CI/)
* [Custom counters](../Custom counters/)
* [MSBuild](../../Scripts/MSBuild/)
* MSDN:
    * [DateTime.Parse](https://msdn.microsoft.com/en-us/library/system.datetime.parse.aspx)
    * [DateTime.ToBinary](https://msdn.microsoft.com/en-us/library/system.datetime.tobinary%28v=vs.110%29.aspx)
    * [DateTime.UtcNow](https://msdn.microsoft.com/en-us/library/system.datetime.utcnow%28v=vs.100%29.aspx)
    * [DateTime.Ticks](https://msdn.microsoft.com/en-us/library/system.datetime.ticks%28v=vs.100%29.aspx)
    * [TimeSpan.TotalMinutes](https://msdn.microsoft.com/en-us/library/system.timespan.totalminutes%28v=vs.100%29.aspx)
    * [TimeSpan.TotalHours](https://msdn.microsoft.com/en-us/library/system.timespan.totalhours%28v=vs.100%29.aspx)
    * [TimeSpan.FromTicks](https://msdn.microsoft.com/en-us/library/system.timespan.fromticks%28v=vs.100%29.aspx)
* [Examples & Features](../../Examples/)
