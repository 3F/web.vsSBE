# Date & Time

*Should be enabled the [MSBuild](../Scripts_&_Commands/MSBuild) support.*

In examples below, we use the [MSBuild Property Functions](https://msdn.microsoft.com/en-us/library/vstudio/dd633440%28v=vs.120%29.aspx#BKMK_PropertyFunctions) and you can use any static method or property of these system classes:

* [System.DateTime](https://msdn.microsoft.com/en-us/library/system.datetime_methods%28v=vs.100%29.aspx)
* [System.TimeSpan](https://msdn.microsoft.com/en-us/library/system.timespan_methods%28v=vs.100%29.aspx)
* [System.Math](https://msdn.microsoft.com/en-us/library/system.math_methods%28v=vs.100%29.aspx)
* [System.String](https://msdn.microsoft.com/en-us/library/system.string_methods%28v=vs.100%29.aspx)
* [System.Decimal](https://msdn.microsoft.com/en-us/library/system.decimal_methods%28v=vs.100%29.aspx)
* [System.Double](https://msdn.microsoft.com/en-us/library/system.double_methods%28v=vs.100%29.aspx)
* [System.UInt32](https://msdn.microsoft.com/en-us/library/system.uint32_methods%28v=vs.100%29.aspx)
* [System.Int32](https://msdn.microsoft.com/en-us/library/system.int32_methods%28v=vs.100%29.aspx)
* [...](https://msdn.microsoft.com/en-us/library/vstudio/dd633440%28v=vs.120%29.aspx#BKMK_Static)


## How to get the number of ticks from specific date

We can use the next methods:

* [DateTime.Parse](https://msdn.microsoft.com/en-us/library/system.datetime.parse.aspx)
* [DateTime.ToBinary](https://msdn.microsoft.com/en-us/library/system.datetime.tobinary%28v=vs.110%29.aspx)

for example:

```
#!java

$([System.DateTime]::Parse("2015/02/17").ToBinary())
```
or
```
#!java

$([System.DateTime]::Parse("2015/02/17 07:21").ToBinary())
```
or
```
#!java

$([System.DateTime]::Parse("17.02.2015 17:41").ToBinary())
```
etc.

### Number of ticks from current date and time

We also should use the next properties:

* [DateTime.UtcNow](https://msdn.microsoft.com/en-us/library/system.datetime.utcnow%28v=vs.100%29.aspx)
* [DateTime.Ticks](https://msdn.microsoft.com/en-us/library/system.datetime.ticks%28v=vs.100%29.aspx)

for example ![UtcNow.Ticks](https://bytebucket.org/3F/vssolutionbuildevent/wiki/Resources/examples/UtcNow-Ticks.gif):

```
#!java

$([System.DateTime]::UtcNow.Ticks)
```

## How to get the total Minutes or Hours from Ticks

You should use the [TimeSpan Properties](https://msdn.microsoft.com/en-us/library/System.TimeSpan_properties%28v=vs.100%29.aspx):

* [TimeSpan.TotalMinutes](https://msdn.microsoft.com/en-us/library/system.timespan.totalminutes%28v=vs.100%29.aspx)
* [TimeSpan.TotalHours](https://msdn.microsoft.com/en-us/library/system.timespan.totalhours%28v=vs.100%29.aspx)
* [...](https://msdn.microsoft.com/en-us/library/System.TimeSpan_properties%28v=vs.100%29.aspx)

and [TimeSpan.FromTicks](https://msdn.microsoft.com/en-us/library/system.timespan.fromticks%28v=vs.100%29.aspx) method, for example:

```
#!java

$([System.TimeSpan]::FromTicks(635618792404338780).TotalHours)
$([System.TimeSpan]::FromTicks(635618792404338780).TotalMinutes)
```
You also can use the [ToString(string)](https://msdn.microsoft.com/en-us/library/kfsatb94%28v=vs.110%29.aspx) method to get an integer value, e.g.:
```
#!java

$([System.TimeSpan]::FromTicks(635618792404338780).TotalHours.ToString("0"))
$([System.TimeSpan]::FromTicks(635618792404338780).TotalMinutes.ToString("0"))
```

### How to get delta between the time (Ticks)

* Total **minutes** from Ticks 1 to Ticks 2:
```
#!java

$([System.TimeSpan]::FromTicks($([MSBuild]::Subtract(635618821282084745, 635618792404338780))).TotalMinutes.ToString("0"))
```

* Total **seconds** from Ticks 1 to Ticks 2:
```
#!java

$([System.TimeSpan]::FromTicks($([MSBuild]::Subtract(635618821282084745, 635618792404338780))).TotalSeconds.ToString("0"))
```

## Full example for build number

You can [try this](../Examples/Version number) If needed a some additional build number and similar.

**Notes**: 

* In general, the TotalMinutes possible only if you have one or less assemblies for 1 **minute**. Otherwise, you should use the similar TotalSeconds again only if you have one or less assemblies for 1 **second** etc.
* You should use **UTC** (Coordinated Universal Time) **However!** it does not give any warranty for unique numbers. Please remember about this, and be careful for developing in team - for this case use the our **[CI features](../CI)** and others... see also - [custom counters](Custom counters)

# References #

* [Automatic Version Numbering for VSIX Package](../Examples/Version number)
* [CI](../CI)
* [Custom counters](Custom counters)
* [MSBuild](../Scripts_&_Commands/MSBuild)
* MSDN:
* * [DateTime.Parse](https://msdn.microsoft.com/en-us/library/system.datetime.parse.aspx)
* * [DateTime.ToBinary](https://msdn.microsoft.com/en-us/library/system.datetime.tobinary%28v=vs.110%29.aspx)
* * [DateTime.UtcNow](https://msdn.microsoft.com/en-us/library/system.datetime.utcnow%28v=vs.100%29.aspx)
* * [DateTime.Ticks](https://msdn.microsoft.com/en-us/library/system.datetime.ticks%28v=vs.100%29.aspx)
* * [TimeSpan.TotalMinutes](https://msdn.microsoft.com/en-us/library/system.timespan.totalminutes%28v=vs.100%29.aspx)
* * [TimeSpan.TotalHours](https://msdn.microsoft.com/en-us/library/system.timespan.totalhours%28v=vs.100%29.aspx)
* * [TimeSpan.FromTicks](https://msdn.microsoft.com/en-us/library/system.timespan.fromticks%28v=vs.100%29.aspx)
* [Examples & Features](../Examples)
